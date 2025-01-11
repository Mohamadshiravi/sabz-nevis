"use client";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function VirgoolTextEditor() {
  const [body, setBody] = useState("");
  const [headerInp, setHeaderInp] = useState("");
  const [text, setText] = useState("");
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const persianRegex = /[\u0600-\u06FF]/;
  const englishRegex = /[A-Za-z]/;

  const headerInpRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log(body);
  }, [body]);

  useEffect(() => {
    if (headerInpRef.current) {
      if (persianRegex.test(headerInp)) {
        const header = `<h1 dir='rtl'>${headerInp}</h1>`;
        setBody(header);
      } else if (englishRegex.test(headerInp)) {
        const header = `<h1 dir='ltr'>${headerInp}</h1>`;
        setBody(header);
      }
    }
    if (headerInp === "") {
      setBody("");
    }
  }, [headerInp]);

  useEffect(() => {
    if (textAreaRef.current) {
      console.log(textAreaRef.current.scrollHeight);

      if (
        text.split("\n").length === 1 &&
        textAreaRef.current.scrollHeight <= 70
      ) {
        textAreaRef.current.style.height = "30px";
      } else {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }
  }, [text]);

  function WriteBodyText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputText = event.target.value;
    setText(inputText);

    // تقسیم متن به پاراگراف‌ها بر اساس Enter
    const paragraphs = inputText.split("\n");

    const formattedBody = paragraphs.map((paragraph) => {
      if (paragraph === "") {
        setIsToolbarVisible(true);
        return "<br />";
      } else {
        setIsToolbarVisible(false);
        return `<p>${paragraph}</p>`;
      }
    });

    setBody(formattedBody.join(""));
  }

  return (
    <section className="mt-10">
      <input
        autoComplete="false"
        ref={headerInpRef}
        onChange={(e) => {
          setHeaderInp(e.target.value);
        }}
        dir="auto"
        value={headerInp}
        placeholder="عنوان را اینجا وارد کنید"
        className="text-3xl vazir-bold lg:pr-10 bg-inherit w-full outline-none"
      />
      <div className="flex items-end gap-3 mt-16 relative">
        <div
          className={`${
            isToolbarVisible ? "flex" : "hidden"
          } flex items-center gap-3 absolute bottom-0`}
        >
          <button
            className={`border flex dark:border-zinc-500 text-sm dark:text-zinc-500 w-[35px] h-[35px] items-center justify-center rounded-full`}
          >
            <FaPlus />
          </button>
          <label
            htmlFor="textEditorInp"
            className={`${
              body === "" || body === "<br />" ? "block" : "hidden"
            } text-[#8e8e8e] cursor-text`}
          >
            هر چی دوست داری بنویس ...
          </label>
        </div>
        <textarea
          id="textEditorInp"
          autoComplete="false"
          ref={textAreaRef}
          value={text}
          onChange={(e) => {
            WriteBodyText(e);
          }}
          className="w-full bg-inherit outline-none overflow-hidden resize-none leading-loose
"
          style={{ height: "30px" }}
        />
      </div>
    </section>
  );
}
