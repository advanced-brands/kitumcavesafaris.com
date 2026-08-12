export type SupportedCurrency = "USD" | "UGX" | "KES" | "EUR";

/** Approximate display rates — update with live rates or API when available */
export const exchangeRates: Record<SupportedCurrency, number> = {
  USD: 1,
  UGX: 3800,
  KES: 129,
  EUR: 0.92,
};

export const currencyLabels: Record<
  SupportedCurrency,
  { code: SupportedCurrency; label: string; locale: string }
> = {
  USD: { code: "USD", label: "US Dollar", locale: "en-US" },
  UGX: { code: "UGX", label: "Uganda Shilling", locale: "en-UG" },
  KES: { code: "KES", label: "Kenyan Shilling", locale: "en-KE" },
  EUR: { code: "EUR", label: "Euro", locale: "de-DE" },
};

export function convertFromUsd(
  amountUsd: number,
  target: SupportedCurrency
): number {
  return Math.round(amountUsd * exchangeRates[target]);
}

export function formatMoney(
  amount: number,
  currency: SupportedCurrency
): string {
  const { locale, code } = currencyLabels[currency];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceInAllCurrencies(amountUsd: number) {
  return (Object.keys(exchangeRates) as SupportedCurrency[]).map((code) => ({
    code,
    label: currencyLabels[code].label,
    formatted: formatMoney(convertFromUsd(amountUsd, code), code),
  }));
}
