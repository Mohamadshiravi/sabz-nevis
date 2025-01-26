"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import { AddCommentToProduct } from "@/redux/slices/post";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

type AddCommentSectionProps = {
  avatar: string;
  name: string;
  id: string;
};

export default function AddCommentSection({
  avatar,
  name,
  id,
}: AddCommentSectionProps) {
  const preText = [
    "ای کاش",
    "از مطلب شما بسیار لذت بردم اما",
    "مفید بود ولی",
    "میخواهم بدانم که",
    "اگر این پست",
  ];

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  console.log(name);

  const dispatch = useTypedDispatch();
  return (
    <form
      id="commentSection"
      onSubmit={AddCommentHandler}
      onClick={!isOpen ? () => setIsOpen(true) : undefined}
      className="mt-8 border border-zinc-200 dark:border-zinc-800 rounded-sm p-4"
    >
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          width={200}
          height={200}
          alt={name}
          className="rounded-full w-[30px] h-[30px] object-cover"
        />
        <div className="relative overflow-hidden w-full cursor-text">
          <span
            className={`text-myGreen-600 absolute block transition duration-300 ${
              isOpen ? "translate-y-0" : "translate-y-[25px]"
            }`}
          >
            {name}
          </span>
          <span
            className={`block transition duration-300 text-myText-600 text-sm ${
              !isOpen ? "translate-y-0" : "translate-y-[-25px]"
            }`}
          >
            نظر خود را درباره این پست بنویسید
          </span>
        </div>
      </div>
      {isOpen && (
        <div>
          {input === "" && (
            <div className="flex items-center gap-2 flex-wrap mt-8">
              {preText.map((e, i) => (
                <span
                  onClick={() => setInput(e)}
                  key={i}
                  className="border cursor-pointer border-myGreen-600 text-myGreen-600 text-xs px-2 py-1 rounded-sm"
                >
                  {e}...
                </span>
              ))}
            </div>
          )}
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="bg-inherit text-sm mt-4 w-full min-h-[100px] max-h-[600px] outline-none"
            placeholder="نظر خود را بنویسید"
          />
          <div className="flex items-center justify-end gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <PrimaryBtn
              onPress={() => {
                setIsOpen(false);
                setInput("");
              }}
              width="w-[130px]"
            >
              منصرف شدم
            </PrimaryBtn>
            <LoadingBtn
              isDisable={input === "" ? true : false}
              loading={false}
              width="w-[130px]"
            >
              ارسال نظر
            </LoadingBtn>
          </div>
        </div>
      )}
    </form>
  );
  async function AddCommentHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await dispatch(
      AddCommentToProduct({ id, name, body: input, avatar })
    );
    console.log(res);

    if (res.payload) {
      SendSucToast("کامنت شما ثبت شد و پس از تایید نمایش داده میشود");
      setInput("");
      setIsOpen(false);
    } else {
      SendErrorToast("مشکلی در ثبت کامنت وجود دارد");
    }
  }
}
