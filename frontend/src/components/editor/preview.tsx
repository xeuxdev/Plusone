import React from "react";
import { Button } from "../ui/button";

export default function PostPreview({
  content,
  setShowPreview,
}: {
  content: string;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Button onClick={() => setShowPreview(false)} className="ml-auto">
        Close Preview
      </Button>
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </>
  );
}
