import { ReactNode } from "react";

type PrimaryBtnProps = {
  children: ReactNode;
  onPress?: any;
  width?: string;
};

export default function PrimaryBtn({
  children,
  onPress,
  width,
}: PrimaryBtnProps) {
  return (
    <span
      onClick={onPress ? onPress : undefined}
      className={`${`${
        width ? `${width}` : "lg:w-[180px] w-full"
      }`} text-sm cursor-pointer vazir-medium flex items-center justify-center gap-2 hover:bg-zinc-700 hover:text-white transition px-4 h-[35px] border-2 border-zinc-700 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-800 rounded-full`}
    >
      {children}
    </span>
  );
}
