export function formatCurrency(
    value: number,
    currency: "LKR" | "USD" = "LKR"
) {
    return new Intl.NumberFormat("en-LK", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(roundMoney(value));
}

// Business-safe rounding (round UP to nearest 5)
export function roundMoney(value: number) {
    return Math.ceil(value / 5) * 5;
}
