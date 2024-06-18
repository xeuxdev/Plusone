import { useEditPost } from "@/api/posts/edit-post";
import {
  getPostDetails,
  useGetPostDetails,
} from "@/api/posts/get-post-details";
import MarkdownEditor from "@/components/editor/markdown";
import PostPreview from "@/components/editor/preview";
import NotFound from "@/components/not-found";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { getFirstH1Content, stripFirstH1 } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type EditPostType = {
  title: string;
  content: string;
  id: string;
  full_content: string;
};

export default function EditBlogPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetPostDetails();
  const { mutate: editPost, isPending } = useEditPost();

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
    const fetchData = async () => {
      const data = await getPostDetails(id!);
      setContent(data?.full_content || "");
      setIsMounted(true);
    };

    fetchData();
  }, [id]);

  if (!isMounted || isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <NotFound resource_name="post" />;
  }

  return (
    <>
      {showPreview ? (
        <PostPreview
          data={{
            content: content,
            image: "",
          }}
          setShowPreview={setShowPreview}
        />
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
    </>
  );
}
