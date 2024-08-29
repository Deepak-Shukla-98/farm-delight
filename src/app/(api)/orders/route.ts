import { apiMiddleware } from "@/components/utils/apimiddleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!!id) {
      const orders = await prisma.order.findMany({
        include: {
          orderItems: true,
          user: {
            select: {
              email: true,
              first_name: true,
              last_name: true,
            },
          },
          shipping: true,
          payment: true,
        },
      });
      if (!orders) {
        return new Response(JSON.stringify({ error: "No Orders" }), {
          headers: {
            "Content-type": "application/json",
          },
          status: 404, // Not Found
        });
      }
      return new Response(JSON.stringify(orders.reverse()), {
        headers: {
          "Content-type": "application/json",
        },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 401, // Not Found
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!!id) {
      const data = await request.json();
      const product = await prisma.order.create({ data });
      return new Response(JSON.stringify(product), {
        headers: {
          "Content-type": "application/json",
        },
        status: 201, // Created
      });
    } else {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 401, // Unauthorized
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
export async function PUT(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!id) {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 401, // Unauthorized
      });
    }
    const data = await request.json();
    const { id: orderId, ...updateData } = data;
    const order = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });
    return new Response(JSON.stringify(order), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200, // OK
    });
  } catch (error) {
    console.log({ error });
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!!id) {
      const { orderId } = await request.json();
      const product = await prisma.order.delete({
        where: { id: orderId },
      });
      return new Response(JSON.stringify(product), {
        headers: {
          "Content-type": "application/json",
        },
        status: 200, // OK
      });
    } else {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 401, // Unauthorized
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
