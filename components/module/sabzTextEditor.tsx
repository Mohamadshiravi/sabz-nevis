"use client";
import { useEffect, useState } from "react";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaListUl,
  FaPlus,
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import { MdInsertPhoto } from "react-icons/md";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { BiText } from "react-icons/bi";
import { SiComma } from "react-icons/si";
import Heading from "@tiptap/extension-heading";

export default function SabzTextEditor() {
  const [headerInp, setHeaderInp] = useState("");
  const [body, setbody] = useState("");

  useEffect(() => {
    if (body === "" || body === '<p dir="auto"></p>') {
      setIsToolbarVisible(true);
    }
  }, [body]);

  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isToolbarOpen, setIsToolBarOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      Link.configure({
        openOnClick: true,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Italic,
      Bold,
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            dir: "auto",
          },
        },

        paragraph: {
          HTMLAttributes: {
            dir: "auto",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "هر چی دوست داری بنویس ...",
        emptyEditorClass: "is-editor-empty",
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setbody(content);
      console.log(content);

      if (content.trim()) {
        setIsToolbarVisible(false);
        setIsToolBarOpen(false);
      }
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none leading-loose",
      },
    },
  });

  return (
    <section className="mt-10">
      <input
        autoComplete="false"
        onChange={(e) => {
          setHeaderInp(e.target.value);
        }}
        value={headerInp}
        placeholder="عنوان را اینجا وارد کنید"
        className="text-3xl vazir-bold lg:pr-10 bg-inherit w-full outline-none"
      />
      <section className="relative mt-16">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex">
              <div className="flex items-center gap-2 shadow-lg bg-zinc-50 dark:bg-zinc-800 p-2 rounded-md">
                <div className="flex items-center gap-2 pl-1">
                  <button className="bg-zinc-50 hover:bg-zinc-100 shadow-none dark:bg-zinc-700 dark:hover:bg-zinc-600 transition rounded-sm dark:shadow-lg w-[35px] h-[35px] flex items-center justify-center">
                    <SiComma />
                  </button>
                  <button className="bg-zinc-50 hover:bg-zinc-100 shadow-none dark:bg-zinc-700 dark:hover:bg-zinc-600 transition rounded-sm dark:shadow-lg w-[35px] h-[35px] flex items-center justify-center">
                    <FaCode />
                  </button>
                  <button className="bg-zinc-50 hover:bg-zinc-100 shadow-none dark:bg-zinc-700 dark:hover:bg-zinc-600 transition rounded-sm dark:shadow-lg w-[35px] h-[35px] flex items-center justify-center">
                    <FaListUl />
                  </button>
                  <button
                    onClick={AddHyperLinkHandler}
                    className={`${
                      editor.isActive("link")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    } shadow-none transition rounded-full dark:shadow-lg w-[35px] h-[35px] flex items-center justify-center`}
                  >
                    <FaLink />
                  </button>
                </div>
                <div className="flex items-center gap-2 border-r dark:border-zinc-700 border-zinc-200 pr-3">
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    className={`${
                      editor.isActive("heading", { level: 3 })
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    } shadow-none transition rounded-full dark:shadow-lg w-[35px] h-[35px] flex items-center justify-center`}
                  >
                    <BiText />
                  </button>
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={`${
                      editor.isActive("heading", { level: 2 })
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    } shadow-none transition rounded-full dark:shadow-lg w-[35px] h-[35px] flex items-center justify-center`}
                  >
                    <BiText className="text-2xl" />
                  </button>
                </div>
                <div className="flex items-center gap-2 border-r dark:border-zinc-700 border-zinc-200 pr-3">
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`${
                      editor.isActive("italic")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    } shadow-none transition rounded-full dark:shadow-lg w-[35px] h-[35px] flex items-center justify-center`}
                  >
                    <FaItalic />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`${
                      editor.isActive("bold")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    } shadow-none transition rounded-full dark:shadow-lg w-[35px] h-[35px] flex items-center justify-center`}
                  >
                    <FaBold />
                  </button>
                </div>
              </div>
            </div>
          </BubbleMenu>
        )}
        <EditorContent
          editor={editor}
          onKeyDown={(e) => e.key === "Enter" && setIsToolbarVisible(true)}
        />
        <div className="flex items-end gap-3 mt-1 absolute bottom-0">
          <div
            className={`${
              isToolbarVisible ? "flex" : "hidden"
            } flex items-center gap-3 w-full`}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsToolBarOpen((p) => !p)}
                className={`border flex dark:border-zinc-500 z-[4] text-sm dark:text-zinc-500 w-[35px] h-[35px] items-center justify-center rounded-full`}
              >
                <FaPlus
                  className={`${isToolbarOpen && "rotate-45"} transition`}
                />
              </button>

              <button
                className={`${
                  isToolbarOpen
                    ? "translate-x-[-45px] opacity-100"
                    : "translate-x-0 opacity-0"
                } absolute transition z-[3] border-2 border-zinc-500 bg-white rounded-full w-[35px] h-[35px] flex items-center justify-center text-zinc-700 text-xl shadow-lg`}
              >
                <MdInsertPhoto />
              </button>
              <button
                className={`${
                  isToolbarOpen
                    ? "translate-x-[-90px] opacity-100"
                    : "translate-x-0 opacity-0"
                } absolute duration-300 transition z-[2] border-2 border-zinc-500 bg-white rounded-full w-[35px] h-[35px] flex items-center justify-center text-zinc-700 text-xl shadow-lg`}
              >
                <HiDotsHorizontal />
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
  function AddHyperLinkHandler() {
    if (editor?.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    } else {
      const url = prompt("ادرس url را بنویسید یا paste کنید");
      if (url) {
        editor?.commands.setLink({ href: url, target: "_blank" });
      }
    }
  }
}
