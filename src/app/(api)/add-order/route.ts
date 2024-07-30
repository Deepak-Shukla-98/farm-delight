import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { user, orders } = await request.json();

    // Validate input
    if (!user || !orders || !Array.isArray(orders) || orders.length === 0) {
      return new NextResponse(JSON.stringify({ error: "Invalid input" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create user and orders in a transaction
    const createdUser = await prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
          userType: user.userType,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          apartment: user.apartment,
          city: user.city,
          state: user.state,
          pincode: user.pincode,
          phone: user.phone,
        },
      });

      const orderPromises = orders.map((order) =>
        prisma.order.create({
          data: {
            userId: newUser.id,
            status: order.status,
            orderItems: {
              create: order.items.map((item: any) => ({
                productId: item.productId,
                price: item.price,
                discount: item.discount,
                quantity: item.quantity,
              })),
            },
          },
        })
      );

      await Promise.all(orderPromises);

      return newUser;
    });

    return new NextResponse(JSON.stringify(createdUser), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
