"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Superscript from "@tiptap/extension-superscript";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Superscript as SupIcon,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export function RichEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { target: "_blank", rel: "noreferrer" } }),
      Placeholder.configure({ placeholder: "Begin writing the article…" }),
      Superscript,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose-paper max-w-none focus:outline-none min-h-[420px] px-6 py-6 bg-white text-ink",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) {
    return (
      <div className="border border-admin-border rounded-card h-[480px] bg-white grid place-items-center text-ink-2 text-[13px]">
        Loading editor…
      </div>
    );
  }

  const btn =
    "w-8 h-8 grid place-items-center rounded-[6px] text-ink hover:bg-admin-surface transition-colors";
  const btnActive = "bg-forest text-paper hover:bg-forest-deep";

  const insertCitation = () => {
    const num = prompt("Citation number (matches a reference index, 1-based)?");
    if (!num) return;
    const html = `<sup data-cite="${num}">[${num}]</sup>`;
    editor.chain().focus().insertContent(html).run();
  };

  const promptLink = () => {
    const url = prompt("URL?", editor.getAttributes("link").href || "https://");
    if (url === null) return;
    if (url === "") editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-admin-border rounded-card overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-admin-border bg-admin-surface">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btn} ${editor.isActive("heading", { level: 2 }) ? btnActive : ""}`}
          title="Heading 2"
        >
          <Heading2 size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${btn} ${editor.isActive("heading", { level: 3 }) ? btnActive : ""}`}
          title="Heading 3"
        >
          <Heading3 size={15} />
        </button>
        <span className="w-px h-5 bg-admin-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btn} ${editor.isActive("bold") ? btnActive : ""}`}
          title="Bold"
        >
          <Bold size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btn} ${editor.isActive("italic") ? btnActive : ""}`}
          title="Italic"
        >
          <Italic size={15} />
        </button>
        <button type="button" onClick={promptLink} className={`${btn} ${editor.isActive("link") ? btnActive : ""}`} title="Link">
          <LinkIcon size={15} />
        </button>
        <button type="button" onClick={insertCitation} className={btn} title="Insert citation">
          <SupIcon size={15} />
        </button>
        <span className="w-px h-5 bg-admin-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${btn} ${editor.isActive("blockquote") ? btnActive : ""}`}
          title="Quote"
        >
          <Quote size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btn} ${editor.isActive("bulletList") ? btnActive : ""}`}
          title="Bullet list"
        >
          <List size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btn} ${editor.isActive("orderedList") ? btnActive : ""}`}
          title="Numbered list"
        >
          <ListOrdered size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={btn}
          title="Divider"
        >
          <Minus size={15} />
        </button>
        <span className="flex-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn} title="Undo">
          <Undo2 size={15} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn} title="Redo">
          <Redo2 size={15} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
