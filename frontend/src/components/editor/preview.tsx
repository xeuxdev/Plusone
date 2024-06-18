import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import {
  getFirstH1Content,
  getFirstImageUrl,
  stripFirstH1,
  stripFirstImg,
} from "@/lib/utils";

export default function PostPreview({
  content,
  setShowPreview,
}: {
  content: string;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const title = getFirstH1Content(content);
  const body = stripFirstH1(stripFirstImg(content));
  const imageUrl = getFirstImageUrl(content);

  console.log(imageUrl);

  return (
    <>
      <Button onClick={() => setShowPreview(false)} className="ml-auto">
        Close Preview
      </Button>

      <section className="flex flex-col w-full gap-10">
        <div className="relative w-full h-40 overflow-hidden rounded-md md:h-64 ">
          {imageUrl ? (
            <img src={imageUrl} className="object-contain w-full h-full" />
          ) : (
            <div className="grid w-full h-full place-items-center bg-secondary">
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
