import { ReactNode } from "react";

type loadingBtnProps = {
  fullWidth?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  loading: boolean;
  width?: string;
  isDisable?: boolean;
};

export default function LoadingBtn({
  fullWidth,
  children,
  loading,
  icon,
  width,
  isDisable,
}: loadingBtnProps) {
  return (
    <button
      type="submit"
      className={`rounded-full ${
        fullWidth ? "w-full" : `${width ? `${width}` : "lg:w-[180px] w-full"}`
      } ${
        !loading
          ? `${
              isDisable
                ? "bg-myGreen-600/50"
                : "bg-myGreen-600 hover:bg-myGreen-700"
            }`
          : "bg-zinc-200 cursor-not-allowed"
      } flex items-center py-1.5 overflow-hidden h-[35px] transition justify-center text-sm text-white vazir-medium`}
      disabled={isDisable || loading}
    >
      {loading ? (
        <img
          src="/images/Circles-menu-3.gif"
          className="w-[35px] mix-blend-multiply"
        />
      ) : (
        <div className="flex items-center gap-3">
          {children}
          {icon}
        </div>
      )}
    </button>
  );
}
