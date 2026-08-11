const FLUTTERWAVE_BASE = "https://api.flutterwave.com/v3";

export type PaymentInitData = {
  amount: number;
  currency: string;
  email: string;
  phone: string;
  name: string;
  bookingReference: string;
  packageName: string;
  redirectUrl: string;
};

export async function initializePayment(data: PaymentInitData) {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey || secretKey.includes("placeholder")) {
    return {
      success: false,
      demo: true,
      message: "Payment gateway not configured. Running in demo mode.",
      data: {
        link: `/booking/confirmation?ref=${data.bookingReference}&demo=true`,
      },
    };
  }

  const response = await fetch(`${FLUTTERWAVE_BASE}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: data.bookingReference,
      amount: data.amount,
      currency: data.currency,
      redirect_url: data.redirectUrl,
      customer: {
        email: data.email,
        phone_number: data.phone,
        name: data.name,
      },
      customizations: {
        title: "Kitum Cave Safaris",
        description: data.packageName,
        logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/Logo.png`,
      },
      meta: {
        booking_reference: data.bookingReference,
      },
    }),
  });

  const result = await response.json();
  return result;
}

export async function verifyPayment(transactionId: string) {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey || secretKey.includes("placeholder")) {
    return { status: "success", demo: true };
  }

  const response = await fetch(
    `${FLUTTERWAVE_BASE}/transactions/${transactionId}/verify`,
    {
      headers: { Authorization: `Bearer ${secretKey}` },
    }
  );

  return response.json();
}
