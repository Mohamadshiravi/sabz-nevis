export default function LoadingBtn({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <button
      className={`rounded-full ${
        fullWidth ? "w-full" : "lg:w-[180px] w-full"
      } flex items-center justify-center bg-zinc-100`}
      disabled
    >
      <img
        src="/images/Circles-menu-3.gif"
        className="w-[35px] mix-blend-multiply"
      />
    </button>
  );
}
