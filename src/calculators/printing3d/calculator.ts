import type { Printing3DInput } from "./types";

export function calculate3DPrintPricing(input: Printing3DInput) {
    // 1️⃣ Material cost
    const materialCost =
        (input.filamentUsedGrams / 1000) *
        input.filamentCostPerKg;

    // 2️⃣ Labor cost
    const laborCost =
        (input.laborMinutes / 60) *
        input.laborRatePerHour;

    // 3️⃣ Electricity cost
    const electricityCost =
        (input.printerPowerW / 1000) *
        input.printTimeHours *
        input.electricityCostPerKwh;

    // 4️⃣ Maintenance cost allocation
    const maintenanceCostPerHour =
        input.annualMaintenanceCost /
        input.estimatedAnnualPrintHours;

    const maintenanceCost =
        maintenanceCostPerHour *
        input.printTimeHours;

    // 5️⃣ Base cost
    const baseCost =
        materialCost +
        laborCost +
        electricityCost +
        maintenanceCost+
        input.partsCost;

    const bufferAmount =
        baseCost * (input.bufferPercent / 100);

    const bufferedCost =
        baseCost + bufferAmount;

    // 6️⃣ Profit
    const profitAmount =
        bufferedCost * (input.profitMargin / 100);

    const sellingPrice =
        bufferedCost + profitAmount;

    // 7️⃣ Tax
    const taxAmount = input.taxEnabled
        ? sellingPrice * (input.taxRate / 100)
        : 0;

    const finalPrice =
        sellingPrice + taxAmount;

    return {
        breakdown: {
            materialCost,
            laborCost,
            electricityCost,
            maintenanceCost,
        },
        baseCost,
        bufferedCost,
        profit: {
            margin: input.profitMargin,
            amount: profitAmount,
        },
        tax: {
            enabled: input.taxEnabled,
            rate: input.taxRate,
            amount: taxAmount,
        },
        sellingPrice,
        finalPrice,
    };
}
