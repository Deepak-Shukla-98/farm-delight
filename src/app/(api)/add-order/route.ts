import { apiMiddleware } from "@/components/utils/apimiddleware";
import { sendMail } from "@/components/utils/mailer";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import axios from "axios";

const prisma = new PrismaClient();
const key_id = process.env.RAZORPAY_KEY;
const key_secret = process.env.RAZORPAY_SECRET;

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
    console.log({ error });
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
    const total = orders.reduce((totalAmount: number, order: any) => {
      const orderTotal = order.items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
      return totalAmount + orderTotal;
    }, 0);
    // Create Razorpay order
    const razorpay = new Razorpay({
      key_id: key_id as string,
      key_secret: key_secret as string,
    });
    const { id: razorpayId } = await razorpay.orders.create({
      amount: total,
      currency: "INR",
      receipt: id,
    });
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
      const [{ id: orderId }] = await Promise.all(orderPromises);
      // Store payment information in the database
      await prisma.payment.create({
        data: {
          orderId: orderId,
          method: "PREPAID",
          amount: total,
          status: "PENDING", // Payment was successfully captured
          date: new Date(),
        },
      });
      // Create shipment with Shiprocket
      let shippingResponse;
      const token = await getShiprocketToken();
      if (token) {
        shippingResponse = await createShiprocketShipment(
          token,
          { id: orderId, items: orders.flatMap((order) => order.items) },
          updatedUser
        );
      }
      // Save the shipping response
      await prisma.shipping.create({
        data: {
          orderId: orderId,
          address: user.address,
          city: user.city,
          state: user.state,
          pinCode: user.pincode,
          status: "PENDING",
          shippedAt: shippingResponse.shipped_at
            ? new Date(shippingResponse.shipped_at)
            : null,
          deliveredAt: shippingResponse.delivered_at
            ? new Date(shippingResponse.delivered_at)
            : null,
        },
      });
      const name = `${updatedUser.first_name} ${updatedUser.last_name}`;
      return { orderId, name };
    });
    // Send order confirmation email
    await sendMail({
      to: user.email,
      subject: "Order Placed",
      content: htmlTemplate(transaction.name, transaction.orderId),
    });
    return new NextResponse(
      JSON.stringify({
        ...user,
        id: transaction.orderId,
        orderId: razorpayId,
        amount: total,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 201,
      }
    );
  } catch (error) {
    console.log({ error });
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

async function getShiprocketToken() {
  const response = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      email: process.env.SHIPROCKET_USER,
      password: process.env.SHIPROCKET_PASSWORD,
    }
  );
  return response.data.token;
}

async function createShiprocketShipment(token: string, order: any, user: any) {
  const response = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      order_id: order.id,
      order_date: new Date().toISOString(),
      pickup_location: "Primary",
      channel_id: "", // Leave empty if not applicable
      comment: "Order for shipment",
      billing_customer_name: user.first_name,
      billing_last_name: user.last_name,
      billing_address: user.address,
      billing_city: user.city,
      billing_pincode: user.pincode,
      billing_state: user.state,
      billing_country: "India",
      billing_email: user.email,
      billing_phone: user.phone,
      shipping_is_billing: true,
      order_items: order.items.map((item: any) => ({
        name: item.name,
        sku: item.id,
        units: item.quantity,
        selling_price: item.price,
        discount: item.discount || 0,
        tax: "",
        hsn: "",
      })),
      payment_method: "Prepaid",
      sub_total: order.items.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      ),
      length: 10,
      breadth: 10,
      height: 10,
      weight: 1.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
