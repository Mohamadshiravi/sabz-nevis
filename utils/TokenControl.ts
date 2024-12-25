import { sign, verify } from "jsonwebtoken";

export function JenerateAccessToken(payload: { phone: string }) {
  const token = sign({ ...payload }, process.env.PRIVATE_KEY!, {
    expiresIn: "10d",
  });
  return token;
}
export function VerifyAccessToken(token: string) {
  try {
    const payload = verify(token, process.env.PRIVATE_KEY!);
    return payload;
  } catch (error) {
    return false;
  }
}
