import { apiMiddleware } from "@/components/utils/apimiddleware";
import { sendMail } from "@/components/utils/mailer";
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
      let data = orders
        .map((d) => ({
          ...d,
          total: d.orderItems.reduce((a, s) => a + s.price, 0),
        }))
        .reverse();
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
    let name;
    const transaction = await prisma.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          email: user.email,
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
      name = `${updatedUser.first_name} ${updatedUser.last_name}`;
      return orderid;
    });
    const mail = await sendMail({
      to: user.email,
      subject: "Order Placed",
      content: htmlTemplate(name, transaction),
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

const htmlTemplate = (name: any, id: any) => {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Your Order</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .header h1 {
                margin: 0;
                color: #007bff;
              }
              .content {
                line-height: 1.6;
              }
              .footer {
                text-align: center;
                padding-top: 20px;
                color: #888;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Your Order!</h1>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                <p>Thank you for your order from Farm Delight. We appreciate your business and are working hard to get your order to you as soon as possible.</p>
                <p>Order Number: ${id}</p>
                <p>We will send you another email once your order has shipped. If you have any questions, feel free to reply to this email or contact our support team.</p>
                <p>Thank you for choosing Farm Delight.</p>
                <p>Best regards,</p>
                <p>Farm Delight Team</p>
              </div>
              <div class="footer">
                <p>&copy; ${year} Farm Delight. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>`;
};
