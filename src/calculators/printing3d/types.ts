export type ProfitMargin = 20 | 50 | 70;

export type Printing3DInput = {
    // Material
    filamentCostPerKg: number;
    filamentUsedGrams: number;

    // Print & Labor
    printTimeHours: number;
    laborMinutes: number;
    laborRatePerHour: number;

    // Power
    printerPowerW: number;
    electricityCostPerKwh: number;

    // Maintenance
    annualMaintenanceCost: number;
    estimatedAnnualPrintHours: number;

    // Buffer
    bufferPercent: number; // %

    // Profit
    profitMargin: ProfitMargin;

    // Tax
    taxEnabled: boolean;
    taxRate: number; // %
};
