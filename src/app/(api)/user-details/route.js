import { apiMiddleware } from "@/components/utils/apimiddleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { id } = await apiMiddleware(request);
    if (!id) {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 401, // Not Found
      });
    }
    const { password, userType, ...user } = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return new Response(JSON.stringify({ error: "User Not Found" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 404, // Not Found
      });
    }

    return new Response(JSON.stringify(user), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
