import { useEditPost } from "@/api/posts/edit-post";
import { useGetPostDetails } from "@/api/posts/get-details";
import MarkdownEditor from "@/components/editor/markdown";
import PostPreview from "@/components/editor/preview";
import { Icons } from "@/components/icons";
import Layout from "@/components/layout";
import NotFound from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { getFirstH1Content, stripFirstH1 } from "@/lib/utils";
import { useEffect, useState } from "react";

export type EditPostType = {
  title: string;
  content: string;
  id: string;
  full_content: string;
};

export default function EditBlogPage() {
  const { mutate: editPost, isPending } = useEditPost();
  const { data, isLoading } = useGetPostDetails();

  const [content, setContent] = useState(data?.full_content || "");
  const [showPreview, setShowPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  function handleEditPost() {
    const title = getFirstH1Content(content);
    const newContent = stripFirstH1(content);

    if (!title || !newContent) {
      return;
    }

    const payload = {
      id: `${data?.id}`,
      title,
      content: newContent,
      full_content: content,
    };

    editPost(payload);
  }

  useEffect(() => {
    if (data?.content) {
      setContent(data.full_content);
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;

    setIsMounted(true);
  }, [data]);

  if (!data) {
    return <NotFound resource_name="post" />;
  }

  if (!isMounted || isLoading) {
    return (
      <div>
        <Icons.spinner />
      </div>
    );
  }

  return (
    <Layout>
      {showPreview ? (
        <PostPreview content={content} setShowPreview={setShowPreview} />
      ) : (
        <>
          <div className="flex items-center gap-5 ml-auto">
            <Button
              variant={"secondary"}
              onClick={() => {
                setShowPreview(true);
              }}
            >
              Preview
            </Button>
            <Button onClick={handleEditPost} isLoading={isPending}>
              Save
            </Button>
          </div>
          <MarkdownEditor
            content={content}
            setContent={setContent}
            type="edit"
          />
        </>
      )}
    </Layout>
  );
}
