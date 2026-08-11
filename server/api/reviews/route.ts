import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().optional(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().min(20),
  packageId: z.string().optional(),
});

export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: { ...data, approved: false },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review has been submitted and will appear after approval.",
      id: review.id,
    });
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
