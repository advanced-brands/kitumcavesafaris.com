export type PaymentMethod = {
  id: string;
  name: string;
  description: string;
  icon: "card" | "mobile" | "bank" | "international";
  forLocal: boolean;
  forInternational: boolean;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Visa / Mastercard",
    description:
      "Pay securely online with debit or credit card via our payment partner.",
    icon: "card",
    forLocal: true,
    forInternational: true,
  },
  {
    id: "mobile-money",
    name: "Mobile Money",
    description:
      "MTN Mobile Money and Airtel Money for travelers in Uganda and East Africa.",
    icon: "mobile",
    forLocal: true,
    forInternational: false,
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    description:
      "Direct transfer to our business account — details provided on confirmation.",
    icon: "bank",
    forLocal: true,
    forInternational: true,
  },
  {
    id: "international",
    name: "International Payments",
    description:
      "Flutterwave and other international gateways for overseas travelers (USD, EUR).",
    icon: "international",
    forLocal: false,
    forInternational: true,
  },
];

export const bankDetails = {
  bankName: "[BANK NAME — TO BE ADDED]",
  accountName: "Kitum Cave Safaris Limited",
  accountNumber: "[ACCOUNT NUMBER — TO BE ADDED]",
  swift: "[SWIFT — TO BE ADDED]",
  currency: "USD / UGX",
};
