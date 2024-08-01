import { apiMiddleware } from "@/components/utils/apimiddleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!id) {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 401, // Not Found
      });
    }
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("id") as string;
    if (!!query) {
      const orders = await prisma.order.findMany({
        where: { id: query },
        include: { orderItems: true },
      });
      if (!orders) {
        return new Response(JSON.stringify({ error: "No Orders" }), {
          headers: {
            "Content-type": "application/json",
          },
          status: 404, // Not Found
        });
      }
      return new Response(JSON.stringify(orders), {
        headers: {
          "Content-type": "application/json",
        },
        status: 200,
      });
    } else {
      const orders = await prisma.order.findMany({
        where: { userId: id },
        include: { orderItems: true },
      });
      if (!orders) {
        return new Response(JSON.stringify({ error: "No Orders" }), {
          headers: {
            "Content-type": "application/json",
          },
          status: 404, // Not Found
        });
      }
      let data = orders.map((d) => ({
        ...d,
        total: d.orderItems.reduce((a, s) => a + s.price, 0),
      }));
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-type": "application/json",
        },
        status: 200,
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
    if (!id) {
      return new NextResponse(JSON.stringify({ error: "Not Authorised" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 401,
      });
    }

    const { user, orders } = await request.json();
    if (!user || !orders || !Array.isArray(orders) || orders.length === 0) {
      return new NextResponse(JSON.stringify({ error: "Invalid input" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
    const transaction = await prisma.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          address: user.address,
          apartment: user.apartment,
          city: user.city,
          state: user.state,
          pincode: user.pincode,
          phone: user.phone,
        },
      });
      const orderPromises = orders.map((order: any) =>
        prisma.order.create({
          data: {
            userId: id,
            status: order.status,
            orderItems: {
              create: order.items.map((item: any) => ({
                productId: item.id,
                name: item.name,
                photo: item.photo,
                price: item.price,
                discount: !!item?.discount ? item?.discount : null,
                quantity: item.quantity,
              })),
            },
          },
        })
      );
      let [{ id: orderid }] = await Promise.all(orderPromises);
      return orderid;
    });

    return new NextResponse(JSON.stringify({ id: transaction }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
