import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const KEY = "asdkfhasjdfajdfbakshdf";

export async function POST(request: Request, response: Response) {
  try {
    const { email, password }: any = await request.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing email or password" }),
        {
          headers: {
            "Content-type": "application/json",
          },
          status: 400,
        }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 400,
      });
    }
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: { email: email },
      data: { password: passwordhash },
    });
    return new Response(JSON.stringify({ message: "done" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
