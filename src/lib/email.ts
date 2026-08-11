import nodemailer from "nodemailer";
import { generateReceiptHTML, ReceiptData } from "./receipt";
import { siteConfig } from "@/data/packages";

export async function sendReceiptEmail(
  to: string,
  data: ReceiptData,
  pdfBuffer?: Buffer
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const attachments = pdfBuffer
    ? [
        {
          filename: `receipt-${data.bookingReference}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ]
    : [];

  await transporter.sendMail({
    from: process.env.SMTP_FROM || siteConfig.email,
    to,
    subject: `Payment Receipt — ${data.bookingReference} | ${siteConfig.name}`,
    html: generateReceiptHTML(data),
    attachments,
  });
}

export async function sendInquiryNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || siteConfig.email,
    to: siteConfig.email,
    subject: `New Inquiry from ${data.name}`,
    html: `<p><strong>${data.name}</strong> (${data.email})</p><p>${data.message}</p>`,
  });
}
