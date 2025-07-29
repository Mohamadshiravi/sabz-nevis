"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import { CategoryModelType } from "@/models/category";
import { fetchPostFromServer } from "@/redux/slices/post";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";

type PublishModalProps = {
  CloseModal: () => void;
  postId: string;
  images: string[] | null;
  title: string;
};

export default function PublishModal({
  CloseModal,
  postId,
  images,
  title,
}: PublishModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [category, setCategory] = useState("");
  const [descInp, setDescInp] = useState("");
  const [descInpLength, setDescInpLength] = useState(0);
  const [time, setTime] = useState(1);

  const [postCover, setPostCover] = useState("");
  const [isChangeCoverOpen, setIsChangeCoverOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [categories, setCategories] = useState<[] | CategoryModelType[]>([]);

  const dispatch = useTypedDispatch();

  function AnimateCloseModal() {
    setIsModalOpen(false);
    setTimeout(() => {
      CloseModal();
    }, 300);
  }

  function stopPropagation(event: React.MouseEvent) {
    event.stopPropagation();
  }

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isModalOpen]);

  useEffect(() => {
    Fetchcategories();

    if (images && images[0]) {
      setPostCover(images[0]);
    }
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const router = useRouter();

  async function Fetchcategories() {
    setCategoryLoading(true);
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data.categories);
      setCategoryLoading(false);
    } catch (error) {
      setCategoryLoading(false);
    }
  }

  return (
    <>
      <section
        className={`${
          isModalOpen ? "opacity-100" : "opacity-0"
        } fade-animate transition duration-300 w-full min-h-screen bg-white/30 dark:bg-black/10
         backdrop-blur-md fixed top-0 left-0 z-[40]`}
      >
        <button
          onClick={AnimateCloseModal}
          className="fixed md:top-[12px] top-[8px] right-[2%] text-2xl text-zinc-500"
        >
          <IoClose />
        </button>
      </section>
      <form
        onSubmit={PublishPostHandler}
        onClick={stopPropagation}
        className={`${
          isModalOpen ? "scale-[100%] opacity-1" : "scale-[80%] opacity-0"
        } transition duration-300 border z-[50] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-darkColor-800 open-animate sm:p-10 p-4 rounded-md shadow-xl no-scrollbar fixed overflow-y-scroll md:h-auto h-[90vh] w-[96%] md:top-[50px] top-[40px] left-[2%]`}
      >
        <div className="grid md:grid-cols-[6fr_6fr] gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="vazir-medium text-myGreen-600">پیش نمایش پست</h3>
            <h4 className="text-sm">
              می‌توانید از این بخش نحوه نمایش پست خود را در صفحات مختلف مانند
              صفحه اصلی سبزنویس یا پروفایلتان تغییر دهید.
            </h4>
            {images && images[0] ? (
              <div className="relative w-full h-[300px] border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden">
                {isChangeCoverOpen ? (
                  <div className="w-full h-full grid grid-cols-[3fr_3fr_3fr_3fr] gap-2 overflow-y-scroll p-1">
                    {images.map((e, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setPostCover(e);
                          setIsChangeCoverOpen(false);
                        }}
                        className={`${
                          e === postCover &&
                          "border-4 border-myGreen-600 rounded-md"
                        } w-full h-full max-h-[150px] cursor-pointer`}
                      >
                        <Image
                          key={i}
                          width={500}
                          height={500}
                          alt="cover"
                          src={e}
                          className="object-cover w-full h-full rounded-sm"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="w-full h-full absolute bg-zinc-800/50 top-0 left-0 flex items-center justify-center">
                      <span
                        onClick={() => setIsChangeCoverOpen(true)}
                        className="border  px-3 py-2 rounded-md text-white cursor-pointer"
                      >
                        عوض کردن عکس کاور
                      </span>
                    </div>
                    <Image
                      width={1000}
                      height={800}
                      alt="cover"
                      src={postCover || images[0]}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[300px] gap-2 rounded-md flex items-center justify-center flex-col">
                <p className="vazir-bold">شما هنوز تصویری آپلود نکرده‌اید.</p>
                <button className="text-sm">
                  اگه میخای پستت کاور داشته باشه برگرد و یک عکس هر جای پست که
                  خواستی بذار
                </button>
              </div>
            )}
            <div className="relative">
              <textarea
                maxLength={200}
                value={descInp}
                onChange={(e) => {
                  if (e.target.value.length <= 200) {
                    setDescInpLength(e.target.value.length);
                    setDescInp(e.target.value); // فقط زمانی مقدار را تغییر دهید که کمتر از ۱۴۰ کاراکتر باشد
                  }
                }}
                dir="rtl"
                className="outline-none w-full border-b text-sm min-h-[100px] max-h-[150px] bg-inherit border-zinc-300 dark:border-zinc-700 py-2 mt-4"
                placeholder=" توضیحات پست را وارد کنید"
              />
              <span className="absolute text-xs left-0 bottom-4">
                200/{descInpLength}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="vazir-medium text-myGreen-600">
              پست خود را ساده‌تر به دست خوانندگان برسانید
            </h3>
            <h4 className="text-sm">یک تگ موضوع برای پست خود انتخاب کنید</h4>
            <div className="flex items-center gap-2 flex-wrap">
              {categoryLoading
                ? Array.from({ length: 20 }).map((e, i) => (
                    <span
                      key={i}
                      className="w-[100px] animate-pulse h-[30px] rounded-sm bg-zinc-200 dark:bg-zinc-800"
                    ></span>
                  ))
                : categories.map((e, i) => (
                    <span
                      onClick={() => setCategory(e._id)}
                      key={i}
                      className={`${
                        category === e._id
                          ? "bg-myGreen-600 text-white"
                          : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-400 dark:border-zinc-600"
                      } text-sm transition px-3 py-1 rounded-sm cursor-pointer`}
                    >
                      {e.name}
                    </span>
                  ))}
            </div>
            <h4 className="text-sm border-t pt-3 border-zinc-200 dark:border-zinc-800">
              خواندن پست شما حدودا چقدر طول میکشد ؟
            </h4>
            <div className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <span
                  onClick={() => setTime(time + 1)}
                  className="bg-zinc-200 cursor-pointer hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-400 dark:border-zinc-600 text-sm transition px-2 py-1 rounded-sm cursor-pointer"
                >
                  <IoIosArrowUp />
                </span>
                <span className="l">{time}</span>
                <span
                  onClick={() => time > 1 && setTime(time - 1)}
                  className="bg-zinc-200 cursor-pointer hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-400 dark:border-zinc-600 text-sm transition px-2 py-1 rounded-sm cursor-pointer"
                >
                  <IoIosArrowDown />
                </span>
              </div>
              دقیقه
            </div>
            <div className="md:mt-6 mt-2 pt-6 h-full w-full flex items-end justify-between gap-6">
              <PrimaryBtn width="w-full" onPress={AnimateCloseModal}>
                منصرف شدم
              </PrimaryBtn>

              <LoadingBtn fullWidth loading={loading}>
                انتشار
              </LoadingBtn>
            </div>
          </div>
        </div>
      </form>
    </>
  );
  async function PublishPostHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (category) {
      setLoading(true);
      try {
        const res = await axios.post("/api/post/publish", {
          postID: postId,
          cover: postCover,
          desc: descInp,
          readingTime: time,
          category,
          title,
        });

        localStorage.removeItem("postId");
        setLoading(false);
        SendSucToast("پست با موفقیت منتشر شد");
        dispatch(fetchPostFromServer());
        router.push("/home");
      } catch (error) {
        setLoading(false);
        SendErrorToast("پست شما انتشار نیافت اتصال خود را بررسی کنید !");
      }
    } else {
      SendErrorToast("لطفا موضوع نوشته خود را انتخاب کنید");
    }
  }
}
