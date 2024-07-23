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

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 400,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, KEY);

    // Remove password from user object before sending response
    const { password: _, ...rest } = user;

    // Send response with token and user object
    return new Response(JSON.stringify({ token, user }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
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
