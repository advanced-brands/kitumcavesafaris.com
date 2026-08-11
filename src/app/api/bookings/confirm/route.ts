import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReceiptPDF } from "@/lib/receipt";
import { sendReceiptEmail } from "@/lib/email";
import { verifyPayment } from "@/lib/payment";

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { reference: ref } });
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

export async function POST(request: NextRequest) {
  try {
    const { reference, transactionId, demo } = await request.json();

    const booking = await prisma.booking.findUnique({ where: { reference } });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (!demo && transactionId) {
      const verification = await verifyPayment(transactionId);
      if (verification.status !== "success") {
        return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
      }
    }

    const updated = await prisma.booking.update({
      where: { reference },
      data: {
        paymentStatus:
          booking.paymentType === "FULL PAYMENT" ? "PAID IN FULL" : "PARTIAL PAYMENT RECEIVED",
        transactionRef: transactionId || booking.transactionRef || `DEMO-${reference}`,
      },
    });

    const receiptData = {
      customerName: updated.fullName,
      bookingReference: updated.reference,
      packageName: updated.packageName,
      destination: updated.destination,
      paymentDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      amountPaid: updated.amountPaid,
      totalAmount: updated.totalAmount,
      currency: updated.currency,
      paymentType: updated.paymentType as "PARTIAL PAYMENT" | "FULL PAYMENT",
      remainingBalance: updated.remainingBalance ?? undefined,
      paymentStatus: updated.paymentStatus,
      transactionRef: updated.transactionRef || reference,
    };

    try {
      const pdfBuffer = generateReceiptPDF(receiptData);
      await sendReceiptEmail(updated.email, receiptData, pdfBuffer);
    } catch (emailError) {
      console.error("Email send failed:", emailError);
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("Confirmation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
