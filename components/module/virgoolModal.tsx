"use client";

import { ReactNode, useEffect, useState } from "react";

type VirgoolModalProps = { children: ReactNode; CloseModal: () => void };

export default function VirgoolModal({
  children,
  CloseModal,
}: VirgoolModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

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
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <section
        onClick={AnimateCloseModal}
        className={`${
          isModalOpen ? "opacity-100" : "opacity-0"
        } fade-animate transition duration-300 w-full h-screen bg-white/30
         backdrop-blur-md fixed top-0 left-0 z-40 flex items-center justify-center`}
      >
        <div
          onClick={stopPropagation}
          className={`${
            isModalOpen ? "scale-[100%] opacity-1" : "scale-[80%] opacity-0"
          } transition duration-300 bg-white open-animate z-50 p-1 rounded-md shadow-xl sm:w-[600px] w-[92%]`}
        >
          {children}
        </div>
      </section>
    </>
  );
}
