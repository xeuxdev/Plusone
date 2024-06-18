import "./styles.css";

import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import React from "react";

import { MenuBar } from "./menus";
import Underline from "@tiptap/extension-underline";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default function MarkdownEditor({
  content,
  setContent,
  type = "new",
}: {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  type?: "new" | "edit";
}) {
  const editor = useEditor({
    extensions: [
      Highlight,
      Typography,
      CustomDocument,
      Underline,
      Image,
      Dropcursor,
      StarterKit.configure({
        document: false,
        heading: {
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        bulletList: {
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        orderedList: {
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    content: content,
    editable: true,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setContent(content);
      localStorage.setItem(`${type}-post`, JSON.stringify(content));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[70vh] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
