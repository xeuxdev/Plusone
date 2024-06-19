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
import { getFirstH1Content, getFirstImageUrl, stripFirstH1 } from "@/lib/utils";
import useUserStore from "@/store/user";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export type EditPostType = {
  title: string;
  content: string;
  id: string;
  full_content: string;
  image: string | null;
};

export default function EditBlogPage() {
  const { id } = useParams();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { data, isLoading } = useGetPostDetails();
  const { mutate: editPost, isPending } = useEditPost();

  const [content, setContent] = useState(data?.full_content || "");
  const [showPreview, setShowPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  function handleEditPost() {
    const title = getFirstH1Content(content);
    const newContent = stripFirstH1(content);
    const image = getFirstImageUrl(content);

    if (!title || !newContent) {
      return;
    }

    const payload = {
      id: `${data?.id}`,
      title,
      content: newContent,
      full_content: content,
      image: image || "",
    };

    editPost(payload);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostDetails(id!);
      if (data?.author.id !== user?.id) {
        navigate(-1);
        return;
      }

      setContent(data?.full_content || "");
      setIsMounted(true);
    };

    fetchData();
  }, [id, navigate, user]);

  if (!isMounted || isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <NotFound resource_name="post" />;
  }

  return (
    <>
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
          <p className="font-medium text-destructive">
            Note: The First image would be used as the banner for the post.
          </p>
        </>
      )}
    </>
  );
}
