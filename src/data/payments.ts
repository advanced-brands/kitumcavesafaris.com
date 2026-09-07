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
      "Card payments are arranged with our team. Online checkout is being set up; until then we send a payment link or instructions after you inquire.",
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
      "USD and other currencies as confirmed in writing. We send transfer or card-link instructions after you inquire.",
    icon: "international",
    forLocal: false,
    forInternational: true,
  },
];
