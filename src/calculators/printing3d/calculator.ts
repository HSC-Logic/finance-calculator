export type Printing3DInput = {
    materialCost: number;
    machineCost: number;
    laborCost: number;
    profitMargin: number;
};

export function calculate3DPrintPrice(input: Printing3DInput) {
    const baseCost =
        input.materialCost +
        input.machineCost +
        input.laborCost;

    const sellingPrice =
        baseCost * (1 + input.profitMargin / 100);

    return {
        baseCost,
        sellingPrice,
    };
}
