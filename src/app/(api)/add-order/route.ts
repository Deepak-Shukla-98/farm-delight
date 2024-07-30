import { apiMiddleware } from "@/components/utils/apimiddleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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
                discount: item.discount,
                quantity: item.quantity,
              })),
            },
          },
        })
      );
      await Promise.all(orderPromises);

      return updatedUser;
    });

    return new NextResponse(JSON.stringify(transaction), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error(error);
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
