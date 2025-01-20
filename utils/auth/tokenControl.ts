import { JwtPayload, sign, verify } from "jsonwebtoken";

export function JenerateAccessToken(payload: { phone: string }) {
  const token = sign({ ...payload }, process.env.CLOUD_PRIVATE_KEY!, {
    expiresIn: "10d",
  });
  return token;
}
export function VerifyAccessToken(token: string) {
  try {
    const payload = verify(token, process.env.CLOUD_PRIVATE_KEY!);
    if (typeof payload === "object") {
      return payload;
    }
  } catch (error) {
    return false;
  }
}
