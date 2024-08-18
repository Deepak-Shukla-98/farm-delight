import { apiMiddleware } from "@/components/utils/apimiddleware";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const key_id = process.env.RAZORPAY_KEY;
const key_secret = process.env.RAZORPAY_SECRET;

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
    const total = await request.json();
    if (!total) {
      return new NextResponse(JSON.stringify({ error: "Invalid input" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
    // Create Razorpay order
    const razorpay = new Razorpay({
      key_id: key_id as string,
      key_secret: key_secret as string,
    });
    console.log({ key_id, key_secret });
    const { id: razorpayId } = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: id,
    });
    return new NextResponse(
      JSON.stringify({ orderId: razorpayId, amount: total * 100 }),
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
