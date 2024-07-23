import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const KEY = "asdkfhasjdfajdfbakshdf";

export const apiMiddleware = async (req: NextRequest) => {
  let token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return null;
  }
  const verified = jwt.verify(token, KEY);
  return verified;
};
