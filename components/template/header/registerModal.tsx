import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

type RegisterModalProps = {
  value: string;
  CloseModal: () => void;
};
export default function RegisterModal({
  value,
  CloseModal,
}: RegisterModalProps) {
  const [phoneInp, setPhoneInp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    setPhoneInp(value);
  }, []);

  function AnimateCloseModal() {
    setIsModalOpen(false);
    setTimeout(() => {
      CloseModal();
    }, 300);
  }
  return (
    <>
      <section
        onClick={AnimateCloseModal}
        className={`${
          isModalOpen ? "opacity-100" : "opacity-0"
        } fade-animate transition duration-300 w-full h-screen bg-white/50 backdrop-blur-md fixed top-0 left-0 z-40`}
      ></section>
      <form
        className={`${
          isModalOpen ? "scale-[100%] opacity-1" : "scale-[80%] opacity-0"
        } transition duration-300 open-animate z-50 bg-white flex flex-col sm:px-20 px-8 gap-2 py-16 rounded-md shadow-xl items-center lg:w-[40%] w-[86%] fixed top-[30%] lg:left-[30%] left-[7%]`}
      >
        <h3 className="text-lg vazir-bold text-virgoolBlue">
          ایجاد حساب کاربری
        </h3>
        <h4 className="text-virgoolText-600">شماره موبایل خود را وارد کنید</h4>
        <input
          onChange={(e) => setPhoneInp(e.target.value)}
          value={phoneInp}
          type="text"
          className="outline-none w-full border-b border-zinc-300 py-2"
          placeholder="شماره موبایل خود را وارد کنید"
        />
        <button className="flex text-nowrap vazir-bold w-full mt-2 text-sm items-center justify-center gap-4 bg-virgoolBlue hover:bg-virgoolBlueHover transition rounded-full pr-5 pl-3 py-2 text-white">
          ایجاد حساب کاربری
          <IoIosArrowBack className="text-lg" />
        </button>
      </form>
    </>
  );
}
