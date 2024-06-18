import { BubbleMenu, Editor } from "@tiptap/react";
import { Icons } from "../icons";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import UploadPostBannerImage from "../modals/upload-banner";
import { useState } from "react";

export function MenuBar({ editor }: { editor: Editor | null }) {
  const [openBannerModal, setOpenBannerModal] = useState(false);

  return (
    <>
      {editor && (
        <BubbleMenu
          className="flex items-center gap-4 p-2 rounded-sm bg-primary"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              aria-label="Toggle bold"
            >
              <Icons.bold />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              aria-label="Toggle italic"
            >
              <Icons.italic />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              aria-label="Toggle strikethrough"
            >
              <Icons.strikeThrough />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              aria-label="Toggle strikethrough"
            >
              <Icons.underline />
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      )}

      <div className="w-full">
        <div className="flex flex-wrap items-center gap-5">
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("heading", { level: 1 }) ? "bg-muted" : ""
            )}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("heading", { level: 2 }) ? "bg-muted" : ""
            )}
          >
            H2
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("heading", { level: 3 }) ? "bg-muted" : ""
            )}
          >
            H3
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("heading", { level: 4 }) ? "bg-muted" : ""
            )}
          >
            H4
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("heading", { level: 5 }) ? "bg-muted" : ""
            )}
          >
            H5
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("heading", { level: 6 }) ? "bg-muted" : ""
            )}
          >
            H6
          </button>
          <button
            onClick={() => editor?.chain().focus().setParagraph().run()}
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("paragraph") ? "bg-muted" : ""
            )}
          >
            <Icons.paragraph />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("bulletList") ? "bg-muted" : ""
            )}
          >
            <Icons.bulletList className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("orderedList") ? "bg-muted" : ""
            )}
          >
            <Icons.orderedList />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("codeBlock") ? "bg-muted" : ""
            )}
          >
            <Icons.codeBlock />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("blockquote") ? "bg-muted" : ""
            )}
          >
            <Icons.blockQuote />
          </button>
          <button
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
            className={cn(
              "px-3 py-2 rounded-sm",
              editor?.isActive("horizontalrule") ? "bg-muted" : ""
            )}
          >
            <Icons.horizontalRule />
          </button>
        </div>
        <Button onClick={() => setOpenBannerModal(true)} variant={"ghost"}>
          <Icons.image />
        </Button>
      </div>

      <UploadPostBannerImage
        data={{
          editor: editor,
        }}
        open={openBannerModal}
        onOpenChange={setOpenBannerModal}
      />
    </>
  );
}
