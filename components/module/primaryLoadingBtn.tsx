import { ReactNode } from "react";

type loadingBtnProps = {
  fullWidth?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  width?: string;
  isDisable?: boolean;
  onPress?: any;
};

export default function PrimaryLoadingBtn({
  fullWidth,
  children,
  loading,
  icon,
  width,
  isDisable,
  onPress,
}: loadingBtnProps) {
  return (
    <button
      onClick={onPress ? onPress : undefined}
      type="submit"
      className={`rounded-full ${
        fullWidth ? "w-full" : `${width ? `${width}` : "lg:w-[180px] w-full"}`
      } ${
        !loading
          ? `${
              isDisable
                ? "border-myGreen-600/50 text-myGreen-600/50"
                : "border-myGreen-600 hover:bg-myGreen-600 text-myGreen-600 hover:text-white"
            }`
          : "bg-zinc-200 cursor-not-allowed"
      } flex items-center border-2 py-1.5 overflow-hidden h-[35px] transition justify-center text-sm vazir-medium`}
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
