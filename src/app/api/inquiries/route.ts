import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendInquiryNotification } from "@/lib/email";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  whatsapp: z.string().optional(),
  country: z.string().min(2),
  preferredDest: z.string().optional(),
  travelDates: z.string().optional(),
  travelers: z.number().optional(),
  budgetRange: z.string().optional(),
  experienceType: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = inquirySchema.parse(body);

    const inquiry = await prisma.inquiry.create({ data });

    try {
      await sendInquiryNotification({
        name: data.name,
        email: data.email,
        message: data.message,
      });
    } catch (emailError) {
      console.error("Inquiry email failed:", emailError);
    }

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
