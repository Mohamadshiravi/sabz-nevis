"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import RegisterModal from "./registerModal";
import VerifyCodeInModal from "./verifyCodeModal";
import AddDisplayNameModal from "./addDisplayNameModal";

export default function RegisterBtn() {
  const [isDeskModalOpen, setIsDeskModalOpen] = useState(true);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isVerifyCodeModalOpen, setIsVerifyCodeModalOpen] = useState(false);
  const [isAddDisplayNameModalOpen, setIsAddDisplayNameModalOpen] =
    useState(false);

  const [inp, setInp] = useState("");
  return (
    <>
      <div className="relative">
        <Link
          href={"/register"}
          className="bg-my-green-600 hover:bg-my-green-700 transition rounded-full px-4 py-1.5 text-white vazir-bold"
        >
          ثبت نام
        </Link>
        <div
          className={`${
            isDeskModalOpen ? "flex" : "hidden"
          } bg-my-green-600 flex-col gap-4 rounded-md w-[330px] absolute top-12 left-0 px-5 py-6`}
        >
          <div className="w-[40px] h-[40px] bg-my-green-600 absolute -top-2 left-4 rotate-45 z-0"></div>
          <div className="flex items-center justify-between z-1">
            <h4 className="text-white vazir-medium">
              ثبت‌نام برای دسترسی به تمام امکانات سایت
            </h4>
            <IoMdClose
              onClick={() => {
                setIsDeskModalOpen(false);
              }}
              className="text-2xl text-white cursor-pointer"
            />
          </div>
          <input
            type="number"
            placeholder="شماره موبایل خود را وارد کنید"
            className="px-3 py-3 rounded-md bg-white/20 placeWhite outline-hidden"
            value={inp}
            onChange={(e) => {
              setInp(e.target.value);
            }}
          />
          <button
            className="text-white self-end"
            onClick={() => {
              setIsDeskModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          >
            ثبت نام
          </button>
        </div>
      </div>
      {isRegisterModalOpen && (
        <RegisterModal
          value={inp}
          RealTimeInput={RealTimeInput}
          CloseModal={() => {
            setIsRegisterModalOpen(false);
          }}
          OpenVerifyModal={() => {
            setIsVerifyCodeModalOpen(true);
          }}
        />
      )}
      {isVerifyCodeModalOpen && (
        <VerifyCodeInModal
          CloseModal={() => {
            setIsVerifyCodeModalOpen(false);
          }}
          phone={inp}
          back={() => {
            setIsVerifyCodeModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
          OpenDisplaynameModal={() => {
            setIsAddDisplayNameModalOpen(true);
          }}
        />
      )}
      {isAddDisplayNameModalOpen && (
        <AddDisplayNameModal
          CloseModal={() => {
            setIsAddDisplayNameModalOpen(false);
          }}
        />
      )}
    </>
  );
  function RealTimeInput(value: string) {
    setInp(value);
  }
}
