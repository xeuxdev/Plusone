import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { getFirstH1Content, stripFirstH1 } from "@/lib/utils";

export default function PostPreview({
  data,
  setShowPreview,
}: {
  data: {
    content: string;
    image: string;
  };
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { content, image } = data;

  const title = getFirstH1Content(content);
  const body = stripFirstH1(content);

  return (
    <>
      <Button onClick={() => setShowPreview(false)} className="ml-auto">
        Close Preview
      </Button>

      <section className="flex flex-col w-full gap-10">
        <div className="relative w-full h-40 overflow-hidden rounded-md md:h-64 bg-secondary">
          {image ? (
            <img src={image} className="object-cover w-full h-full" />
          ) : (
            <div className="grid w-full h-full place-items-center">
              <Icons.image className="w-2/4 mx-auto h-2/4" />
            </div>
          )}
        </div>

        <div
          className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        <div
          className="p-2 *:text-lg md:*:text-xl w-full"
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      </section>
    </>
  );
}
