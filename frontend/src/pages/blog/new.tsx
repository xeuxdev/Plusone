import { useCreatePost } from "@/api/posts/create-post";
import MarkdownEditor from "@/components/editor/markdown";
import PostPreview from "@/components/editor/preview";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { getFirstH1Content, stripFirstH1 } from "@/lib/utils";

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
};

export default function NewBlogPage() {
  const [content, setContent] = useState(defaultContent);
  const [showPreview, setShowPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { mutate: createPost, isPending } = useCreatePost();

  function handleCreatePost() {
    const title = getFirstH1Content(content);
    const newContent = stripFirstH1(content);

    if (!title || !newContent) {
      return;
    }

    const payload = {
      title,
      content: newContent,
      full_content: content,
    };

    createPost(payload);
  }

  useEffect(() => {
    const content = localStorage.getItem("new-post");
    console.log(content, "content");
    if (content) {
      try {
        const parsedContent = JSON.parse(content);
        setContent(parsedContent);
      } catch (error) {
        console.error("Error parsing local storage content:", error);
      }
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
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
            <Button onClick={handleCreatePost} isLoading={isPending}>
              Save
            </Button>
          </div>
          <MarkdownEditor content={content} setContent={setContent} />
        </>
      )}
    </Layout>
  );
}
