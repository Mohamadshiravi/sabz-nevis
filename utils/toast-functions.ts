import { toast } from "react-toastify";

export async function SendNormalToast(body: string) {
  return toast(body, { position: "top-center" });
}
export async function SendErrorToast(body: string) {
  return toast.error(body, { theme: "colored", position: "top-center" });
}
export async function SendWarningToast(body: string) {
  return toast.warning(body, { theme: "colored", position: "top-center" });
}
