import { toast } from "react-toastify";

export async function SendNormalToast(body: string) {
  return toast(body, { position: "top-right" });
}
export async function SendErrorToast(body: string) {
  return toast.error(body, { theme: "colored", position: "top-right" });
}
export async function SendWarningToast(body: string) {
  return toast.warning(body, { theme: "colored", position: "top-right" });
}
export async function SendSucToast(body: string) {
  return toast.success(body, { theme: "colored", position: "top-right" });
}
