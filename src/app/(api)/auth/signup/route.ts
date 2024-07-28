import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  userType: string;
}

export async function POST(request: Request) {
  try {
    let userData: User;
    // Check if the request is JSON
    const { first_name, last_name, email, password }: User =
      await request.json();

    if (!first_name || !last_name || !email || !password) {
      throw new Error("Missing required fields");
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 400,
      });
    }
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: passwordhash,
        userType: "CUSTOMER",
      },
    });
    return new Response(JSON.stringify(newUser), {
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
