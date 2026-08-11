import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateBookingReference } from "@/lib/utils";
import { initializePayment } from "@/lib/payment";
import { getPackageBySlug } from "@/data/packages";

const bookingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  whatsapp: z.string().optional(),
  country: z.string().min(2),
  travelers: z.number().min(1),
  preferredDate: z.string().min(1),
  packageId: z.string(),
  packageSlug: z.string(),
  specialRequests: z.string().optional(),
  paymentType: z.enum(["partial", "full"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const pkg = getPackageBySlug(data.packageSlug);
    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const reference = generateBookingReference();
    const totalAmount = pkg.price > 0 ? pkg.price * data.travelers : 0;
    const amountPaid =
      data.paymentType === "full"
        ? totalAmount
        : Math.round(totalAmount * (pkg.partialPaymentPercent / 100));
    const remainingBalance =
      data.paymentType === "partial" ? totalAmount - amountPaid : 0;

    const booking = await prisma.booking.create({
      data: {
        reference,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp || "",
        country: data.country,
        travelers: data.travelers,
        preferredDate: data.preferredDate,
        packageId: data.packageId,
        packageName: pkg.name,
        destination: pkg.destination,
        specialRequests: data.specialRequests || "",
        paymentType: data.paymentType === "full" ? "FULL PAYMENT" : "PARTIAL PAYMENT",
        amountPaid,
        totalAmount,
        currency: pkg.currency,
        remainingBalance: data.paymentType === "partial" ? remainingBalance : null,
        paymentStatus: "PENDING",
      },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const paymentResult = await initializePayment({
      amount: amountPaid,
      currency: pkg.currency,
      email: data.email,
      phone: data.phone,
      name: data.fullName,
      bookingReference: reference,
      packageName: pkg.name,
      redirectUrl: `${siteUrl}/booking/confirmation?ref=${reference}`,
    });

    if (paymentResult.demo) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          paymentStatus: "PAID",
          transactionRef: `DEMO-${reference}`,
        },
      });

      return NextResponse.json({
        success: true,
        demo: true,
        reference,
        redirectUrl: `${siteUrl}/booking/confirmation?ref=${reference}&demo=true`,
      });
    }

    if (paymentResult.status === "success" && paymentResult.data?.link) {
      return NextResponse.json({
        success: true,
        reference,
        paymentLink: paymentResult.data.link,
      });
    }

    return NextResponse.json(
      { error: "Payment initialization failed", details: paymentResult },
      { status: 500 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
