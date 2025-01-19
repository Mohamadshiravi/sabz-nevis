"use client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaListUl,
  FaPlus,
} from "react-icons/fa";
import Image from "@tiptap/extension-image";
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
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useTypedSelector } from "@/redux/typedHooks";
import axios from "axios";
import { SendErrorToast } from "@/utils/toast-functions";

export default function SabzTextEditor({
  setBody: setOutBody,
  setTitle,
  prewBody,
  prewTitle,
}: {
  prewBody: string;
  prewTitle: string;
  setBody: (value: string) => void;
  setTitle: (value: string) => void;
}) {
  const [headerInp, setHeaderInp] = useState("");
  const [body, setBody] = useState("");

  const [color, setColor] = useState("#323232");

  const [photoloading, setPhotoLoading] = useState(false);

  const userData = useTypedSelector((state) => state);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (color !== "#323232") {
        editor?.chain().focus().setColor(color).run();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [color]);

  useEffect(() => {
    if (body === "" || body === '<p dir="auto"></p>') {
      setIsToolbarVisible(true);
    }

    setOutBody(body);
  }, [body]);

  useEffect(() => {
    setTitle(headerInp);
  }, [headerInp]);

  useEffect(() => {
    setOutBody(prewBody);
    setHeaderInp(prewTitle);
  }, []);

  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isToolbarOpen, setIsToolBarOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "m-auto rounded-md shadow-md",
        },
      }),
      Color,
      TextStyle,
      Blockquote.configure({
        HTMLAttributes: {
          dir: "auto",
          class:
            "bg-zinc-100 dark:bg-zinc-800 px-4 py-2 border-zinc-300 dark:border-zinc-700 border-x-4 my-2",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          dir: "ltr",
          class:
            "bg-zinc-100 dark:bg-zinc-800 p-6 rounded-md leading-loose my-6",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          dir: "auto",
          class: "listStyle",
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          dir: "auto",
          class: "linkStyle",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          dir: "auto",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          dir: "auto",
        },
      }),
      Italic,
      Bold,
      Placeholder.configure({
        placeholder: "هر چی دوست داری بنویس ...",
        emptyEditorClass: "is-editor-empty",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          dir: "auto",
          class:
            "text-myGreen-600 hover:text-myGreen-700 underline transition cursor-pointer",
        },
      }),
    ],
    content: prewBody,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setBody(content);

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
    <section className="mt-10 mb-20">
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
              <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 p-1 rounded-md">
                <div className="flex lg:flex-row flex-col items-center gap-2 pl-1">
                  <label
                    title="Change Text Color"
                    className={`bg-white curosr-pointer hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <input
                      onChange={(e) => {
                        setColor(e.target.value);
                      }}
                      type="color"
                      className="w-0 h-0 absolute"
                    />
                    <span
                      style={{
                        backgroundColor:
                          editor.getAttributes("textStyle").color ||
                          (userData.user.theme === "light"
                            ? "#323232"
                            : "white"),
                      }}
                      className="w-[22px] h-[22px] rounded-full"
                    ></span>
                  </label>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                    title="add blockquote area"
                    className={`${
                      editor.isActive("blockquote")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    } shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <SiComma />
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleCodeBlock().run()
                    }
                    title="add code area"
                    className={`${
                      editor.isActive("codeBlock")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    } shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <FaCode />
                  </button>
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleBulletList().run();
                    }}
                    title="add list circle"
                    className={`${
                      editor.isActive("bulletList")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    } shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <FaListUl />
                  </button>

                  <button
                    title="italic selected text"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`${
                      editor.isActive("italic")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    } shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <FaItalic />
                  </button>
                  <button
                    title="bold selected text"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`${
                      editor.isActive("bold")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    } shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <FaBold />
                  </button>
                </div>
                <div className="border-r dark:border-zinc-700 border-zinc-200 h-[28px]"></div>
                <div className="flex items-center gap-2">
                  <button
                    title="add hyperlink"
                    onClick={AddHyperLinkHandler}
                    className={`${
                      editor.isActive("link")
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    } shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <FaLink />
                  </button>
                </div>
                <div className="border-r dark:border-zinc-700 border-zinc-200 h-[28px]"></div>
                <div className="flex items-center gap-2 lg:flex-row flex-col">
                  <button
                    title="add heading h3"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    className={`${
                      editor.isActive("heading", { level: 3 })
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    } shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <BiText />
                  </button>
                  <button
                    title="add heading h2"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={`${
                      editor.isActive("heading", { level: 2 })
                        ? "bg-myGreen-600 hover:bg-mygreen-700 text-white"
                        : "bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    } shadow-none transition rounded-sm dark:shadow-lg w-[33px] h-[33px] flex items-center justify-center`}
                  >
                    <BiText className="text-2xl" />
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

        {photoloading && (
          <div className="w-full h-[500px] bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center animate-pulse">
            <h2>در حال اپلود عکس ...</h2>
          </div>
        )}

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
                } absolute transition z-[3] border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-800 rounded-full text-zinc-700 dark:text-zinc-300 text-xl shadow-lg`}
              >
                <label className="w-[35px] cursor-pointer h-[35px] flex items-center justify-center">
                  <input
                    accept="image/*"
                    type="file"
                    className="w-0 h-0 opacity-0"
                    onChange={AddImagesHandler}
                  />
                  <MdInsertPhoto />
                </label>
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
      const url = prompt("ادرس url کامل را paste کنید");
      if (url) {
        editor?.commands.setLink({ href: url, target: "_blank" });
      }
    }
  }
  async function AddImagesHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      try {
        setPhotoLoading(true);
        const formData = new FormData();
        formData.append("img", event.target.files[0]);

        const res = await axios.post("/api/post/photo", formData);

        if (res.data.path) {
          editor?.chain().focus().setImage({ src: res.data.path }).run();
          setPhotoLoading(false);
        } else {
          SendErrorToast("مشکلی در اپلود تصویر");
          setPhotoLoading(false);
        }
      } catch (error) {
        SendErrorToast("مشکلی در اپلود تصویر");
        setPhotoLoading(false);
      }
    }
  }
}
