import nodemailer from "nodemailer";

const mail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: mail,
    pass: password,
  },
});

export const sendMail = async ({ to, subject, content }) => {
  return await transporter.sendMail({
    from: mail,
    to: to,
    subject: subject,
    html: content,
  });
};
