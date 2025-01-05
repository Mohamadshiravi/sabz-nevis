import swal from "sweetalert";

export default async function ShowSwal(
  icon: string,
  title: string,
  btn1: string,
  btn2: string | false
) {
  return swal({
    icon,
    text: title,
    buttons: [btn1, btn2],
  });
}
