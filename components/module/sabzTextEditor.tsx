"use client";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import { MdInsertPhoto } from "react-icons/md";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function SabzTextEditor() {
  const [headerInp, setHeaderInp] = useState("");
  const [body, setbody] = useState("");

  useEffect(() => {
    if (body === "" || body === "<p></p>") {
      setIsToolbarVisible(true);
    }
  }, [body]);

  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isToolbarOpen, setIsToolBarOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
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
                <IoLink onClick={AddLinkHandler} />
              </button>
              <button
                className={`${
                  isToolbarOpen
                    ? "translate-x-[-135px] opacity-100"
                    : "translate-x-0 opacity-0"
                } absolute duration-500 transition z-[1] border-2 border-zinc-500 bg-white rounded-full w-[35px] h-[35px] flex items-center justify-center text-zinc-700 text-xl shadow-lg`}
              >
                <HiDotsHorizontal />
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
  function HandleContentChange() {}
  function AddLinkHandler() {}
}
