import { ReactNode } from "react";

type PrimaryBtnProps = {
  children: ReactNode;
  onPress?: any;
};

export default function PrimaryBtn({ children, onPress }: PrimaryBtnProps) {
  return (
    <button
      onClick={onPress ? onPress : undefined}
      className="sm:text-sm text-xs vazir-medium hover:bg-zinc-800 hover:text-white transition px-4 py-1 border-2 border-zinc-800 dark:border-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-800 rounded-full"
    >
      {children}
    </button>
  );
}
