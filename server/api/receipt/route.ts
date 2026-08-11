import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReceiptPDF } from "@/lib/receipt";

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { reference: ref } });
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const receiptData = {
    customerName: booking.fullName,
    bookingReference: booking.reference,
    packageName: booking.packageName,
    destination: booking.destination,
    paymentDate: booking.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    amountPaid: booking.amountPaid,
    totalAmount: booking.totalAmount,
    currency: booking.currency,
    paymentType: booking.paymentType as "PARTIAL PAYMENT" | "FULL PAYMENT",
    remainingBalance: booking.remainingBalance ?? undefined,
    paymentStatus: booking.paymentStatus,
    transactionRef: booking.transactionRef || booking.reference,
  };

  const pdfBuffer = generateReceiptPDF(receiptData);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="receipt-${ref}.pdf"`,
    },
  });
}
