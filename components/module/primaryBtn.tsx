import { ReactNode } from "react";

type PrimaryBtnProps = {
  children: ReactNode;
  onPress?: any;
};

export default function PrimaryBtn({ children, onPress }: PrimaryBtnProps) {
  return (
    <button
      onClick={onPress ? onPress : undefined}
      className="text-sm vazir-medium flex items-center gap-2 hover:bg-zinc-700 hover:text-white transition px-4 py-1 border-2 border-zinc-700 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-800 rounded-full"
    >
      {children}
    </button>
  );
}
