import { NextResponse, NextRequest } from "next/server";
import { transporter, sendMail } from "@/components/utils/mailer";

export async function POST(request: NextRequest) {
  const myEmail = process.env.PERSONAL_EMAIL;
  const formData = await request.formData();
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  try {
    const mail = await transporter.sendMail({
      from: myEmail,
      to: myEmail,
      replyTo: email,
      subject: `Website activity from ${email}`,
      html: `
            <p>Email: ${email} </p>
            <p>Subject: ${subject} </p>
            <p>Message: ${message} </p>
            `,
    });
    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
