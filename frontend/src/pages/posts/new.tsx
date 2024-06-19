import { useCreatePost } from "@/api/posts/create-post";
import MarkdownEditor from "@/components/editor/markdown";
import PostPreview from "@/components/editor/preview";
import { Button } from "@/components/ui/button";
import { getFirstH1Content, getFirstImageUrl, stripFirstH1 } from "@/lib/utils";

import { useEffect, useState } from "react";

const defaultContent = `
    <h1>
        It’ll always have a heading …
      </h1>
      <p>
        … if you pass a custom document. That’s the beauty of having full control over the schema.
      </p>
    `;

export type CreatePostType = {
  title: string;
  content: string;
  full_content: string;
  image: string | undefined;
};

export default function NewBlogPage() {
  const [content, setContent] = useState(defaultContent);
  const [showPreview, setShowPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { mutate: createPost, isPending } = useCreatePost();

  function handleCreatePost() {
    const title = getFirstH1Content(content);
    const newContent = stripFirstH1(content);
    const image = getFirstImageUrl(content);

    if (!title || !newContent) {
      return;
    }

    const payload = {
      title,
      content: newContent,
      full_content: content,
      image: image || "",
    };

    createPost(payload);
  }

  useEffect(() => {
    const content = localStorage.getItem("new-post");
    if (content) {
      try {
        const parsedContent = JSON.parse(content);
        setContent(parsedContent);
      } catch (error) {
        console.error("Error parsing local storage content:", error);
      }
    }
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {showPreview ? (
        <PostPreview content={content} setShowPreview={setShowPreview} />
      ) : (
        <>
          <div className="flex items-center gap-5 ml-auto ">
            <Button
              variant={"secondary"}
              onClick={() => {
                setShowPreview(true);
              }}
            >
              Preview
            </Button>
            <Button onClick={handleCreatePost} isLoading={isPending}>
              Publish
            </Button>
          </div>
          <MarkdownEditor content={content} setContent={setContent} />

          <p className="font-medium text-destructive">
            Note: The First image would be used as the banner for the post.
          </p>
        </>
      )}
    </>
  );
}
