import { jsPDF } from "jspdf";
import { siteConfig } from "@/data/packages";

export type ReceiptData = {
  customerName: string;
  bookingReference: string;
  packageName: string;
  destination: string;
  paymentDate: string;
  amountPaid: number;
  totalAmount: number;
  currency: string;
  paymentType: "PARTIAL PAYMENT" | "FULL PAYMENT";
  remainingBalance?: number;
  paymentStatus: string;
  transactionRef: string;
};

export function generateReceiptPDF(data: ReceiptData): Buffer {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(27, 61, 47);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("KITUM CAVE SAFARIS", pageWidth / 2, 18, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("LIMITED", pageWidth / 2, 26, { align: "center" });
  doc.text("Payment Receipt", pageWidth / 2, 34, { align: "center" });

  doc.setTextColor(45, 45, 45);
  let y = 55;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(
    data.paymentType === "FULL PAYMENT" ? "PAID IN FULL" : "PARTIAL PAYMENT",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 15;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const fields = [
    ["Booking Reference", data.bookingReference],
    ["Customer Name", data.customerName],
    ["Package", data.packageName],
    ["Destination", data.destination],
    ["Payment Date", data.paymentDate],
    ["Amount Paid", `${data.currency} ${data.amountPaid.toLocaleString()}`],
    ["Payment Type", data.paymentType],
    ["Payment Status", data.paymentStatus],
    ["Transaction Reference", data.transactionRef],
  ];

  if (data.paymentType === "PARTIAL PAYMENT" && data.remainingBalance !== undefined) {
    fields.push(["Remaining Balance", `${data.currency} ${data.remainingBalance.toLocaleString()}`]);
    fields.push(["Total Package Amount", `${data.currency} ${data.totalAmount.toLocaleString()}`]);
  }

  fields.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(String(label) + ":", 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(value), 80, y);
    y += 8;
  });

  y += 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(siteConfig.name, 20, y);
  y += 5;
  doc.text(siteConfig.email, 20, y);
  y += 5;
  doc.text(`Phone: ${siteConfig.phone}`, 20, y);
  y += 5;
  doc.text(siteConfig.address, 20, y);

  return Buffer.from(doc.output("arraybuffer"));
}

export function generateReceiptHTML(data: ReceiptData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Receipt - ${data.bookingReference}</title></head>
    <body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #2D2D2D;">
      <div style="background: #1B3D2F; color: white; padding: 24px; text-align: center; margin-bottom: 32px;">
        <h1 style="margin: 0; font-size: 24px;">KITUM CAVE SAFARIS</h1>
        <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.8;">LIMITED — Payment Receipt</p>
      </div>
      <h2 style="text-align: center; color: #C4785A; font-size: 18px;">${data.paymentType === "FULL PAYMENT" ? "PAID IN FULL" : "PARTIAL PAYMENT"}</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        ${[
          ["Booking Reference", data.bookingReference],
          ["Customer Name", data.customerName],
          ["Package", data.packageName],
          ["Destination", data.destination],
          ["Payment Date", data.paymentDate],
          ["Amount Paid", `${data.currency} ${data.amountPaid.toLocaleString()}`],
          ["Payment Type", data.paymentType],
          ["Payment Status", data.paymentStatus],
          ["Transaction Reference", data.transactionRef],
          ...(data.paymentType === "PARTIAL PAYMENT" && data.remainingBalance !== undefined
            ? [
                ["Remaining Balance", `${data.currency} ${data.remainingBalance.toLocaleString()}`],
                ["Total Package Amount", `${data.currency} ${data.totalAmount.toLocaleString()}`],
              ]
            : []),
        ]
          .map(
            ([label, value]) =>
              `<tr><td style="padding: 8px 0; font-weight: bold; width: 40%;">${label}</td><td style="padding: 8px 0;">${value}</td></tr>`
          )
          .join("")}
      </table>
      <hr style="border: none; border-top: 1px solid #E8DFD0; margin: 24px 0;">
      <p style="font-size: 12px; color: #888;">
        ${siteConfig.name}<br>
        ${siteConfig.email} | ${siteConfig.phone}<br>
        ${siteConfig.address}
      </p>
    </body>
    </html>
  `;
}
