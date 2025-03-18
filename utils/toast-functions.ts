import { toast } from "react-hot-toast";

export async function SendNormalToast(body: string) {
  return toast(body);
}
export async function SendErrorToast(body: string) {
  return toast.error(body, {
    position: "top-center",
  });
}
export async function SendWarningToast(body: string) {
  return toast.error(body);
}
export async function SendSucToast(body: string) {
  return toast.success(body);
}
