import { useState } from "react";
import NumberInput from "../../components/NumberInput";
import ProfitSelect from "../../components/ProfitSelect";
import ResultCard from "../../components/ResultCard";
import { calculate3DPrintPricing } from "./calculator";
import type { ProfitMargin } from "./types";
import PrinterSelect from "../../components/PrinterSelect";
import { PRINTERS } from "./printers";
import type { PrinterProfile } from "./printerTypes";
import TaxToggle from "../../components/TaxToggle.tsx";


export default function Printing3DCalculator() {

    const MAINTENANCE_RATE = 0.1;

    const [selectedPrinter, setSelectedPrinter] = useState<PrinterProfile>(
        PRINTERS[0]
    );

    const annualMaintenanceCost =
        selectedPrinter.price * MAINTENANCE_RATE;

    const [bufferPercent, setBufferPercent] = useState(10);

    // Material
    const [filamentCostPerKg, setFilamentCostPerKg] = useState(6000);
    const [filamentUsedGrams, setFilamentUsedGrams] = useState(100);

    // Print & Labor
    const [printTimeHours, setPrintTimeHours] = useState(2);
    const [laborMinutes, setLaborMinutes] = useState(15);
    const [laborRatePerHour, setLaborRatePerHour] = useState(500);

    // Power
    const [electricityCostPerKwh, setElectricityCostPerKwh] = useState(50);

    // Maintenance
    const [estimatedAnnualPrintHours, setEstimatedAnnualPrintHours] =
        useState(1000);

    // Profit
    const [profitMargin, setProfitMargin] = useState<ProfitMargin>(20);

    const [taxEnabled, setTaxEnabled] = useState(false);
    const [taxRate, setTaxRate] = useState(18);


    const result = calculate3DPrintPricing({
        filamentCostPerKg,
        filamentUsedGrams,
        printTimeHours,
        laborMinutes,
        laborRatePerHour,

        printerPowerW: selectedPrinter.powerW,
        annualMaintenanceCost,

        electricityCostPerKwh,
        estimatedAnnualPrintHours,

        bufferPercent,

        profitMargin,
        taxEnabled,
        taxRate,
    });

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <h1 className="text-2xl font-bold">3D Printing Price Calculator</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ================= INPUTS ================= */}
                <div className="bg-white rounded-lg shadow p-6 space-y-5">
                    <h2 className="text-lg font-semibold">Inputs</h2>

                    <PrinterSelect
                        printers={PRINTERS}
                        selectedId={selectedPrinter.id}
                        onChange={setSelectedPrinter}
                    />


                    {/* Material */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-600">Material</h3>
                        <NumberInput
                            label="Filament Cost"
                            value={filamentCostPerKg}
                            onChange={setFilamentCostPerKg}
                            suffix="LKR / kg"
                        />
                        <NumberInput
                            label="Filament Used"
                            value={filamentUsedGrams}
                            onChange={setFilamentUsedGrams}
                            suffix="grams"
                        />
                    </div>

                    {/* Print & Labor */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-600">
                            Print & Labor
                        </h3>
                        <NumberInput
                            label="Print Time"
                            value={printTimeHours}
                            onChange={setPrintTimeHours}
                            suffix="hours"
                        />
                        <NumberInput
                            label="Labor Time"
                            value={laborMinutes}
                            onChange={setLaborMinutes}
                            suffix="minutes"
                        />
                        <NumberInput
                            label="Labor Rate"
                            value={laborRatePerHour}
                            onChange={setLaborRatePerHour}
                            suffix="LKR / hour"
                        />
                    </div>

                    {/* Power & Maintenance */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-600">
                            Power & Maintenance
                        </h3>
                        <NumberInput
                            label="Electricity Cost"
                            value={electricityCostPerKwh}
                            onChange={setElectricityCostPerKwh}
                            suffix="LKR / kWh"
                        />
                        <NumberInput
                            label="Annual Print Hours"
                            value={estimatedAnnualPrintHours}
                            onChange={setEstimatedAnnualPrintHours}
                            suffix="hours"
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-600">
                            Buffer (Risk Protection)
                        </h3>

                        <select
                            value={bufferPercent}
                            onChange={(e) => setBufferPercent(Number(e.target.value))}
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value={0}>0% (No buffer)</option>
                            <option value={5}>5%</option>
                            <option value={10}>10% (Recommended)</option>
                            <option value={15}>15%</option>
                            <option value={20}>20%</option>
                        </select>
                    </div>


                    {/* Profit */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-600">Profit</h3>
                        <ProfitSelect value={profitMargin} onChange={setProfitMargin} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-600">Tax</h3>

                        <TaxToggle
                            enabled={taxEnabled}
                            rate={taxRate}
                            onToggle={setTaxEnabled}
                            onRateChange={setTaxRate}
                        />
                    </div>


                    <div className="text-sm text-gray-500">
                        Power : {selectedPrinter.powerW} W ·
                        Price : LKR {selectedPrinter.price}
                    </div>

                    <div className="text-xs text-gray-500">
                        Annual maintenance (10%): LKR {annualMaintenanceCost.toFixed(0)}
                    </div>

                </div>

                {/* ================= RESULTS ================= */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <h2 className="text-lg font-semibold">Cost Breakdown</h2>

                    <ResultCard
                        label="Material Cost"
                        value={result.breakdown.materialCost}
                    />
                    <ResultCard
                        label="Labor Cost"
                        value={result.breakdown.laborCost}
                    />
                    <ResultCard
                        label="Electricity Cost"
                        value={result.breakdown.electricityCost}
                    />
                    <ResultCard
                        label="Maintenance Cost"
                        value={result.breakdown.maintenanceCost}
                    />


                    <hr />

                    <ResultCard label="Base Cost" value={result.baseCost} />
                    <ResultCard
                        label="Cost After Buffer"
                        value={result.bufferedCost}
                    />

                    <ResultCard
                        label={`Profit (${profitMargin}%)`}
                        value={result.profit.amount}
                    />
                    <ResultCard
                        label="Selling Price"
                        value={result.sellingPrice}
                        highlight
                    />

                    {result.tax.enabled && (
                        <ResultCard
                            label={`GST (${result.tax.rate}%)`}
                            value={result.tax.amount}
                        />
                    )}

                    <ResultCard
                        label="Final Price (Incl. Tax)"
                        value={result.finalPrice}
                        highlight
                    />

                </div>
            </div>
        </div>
    );
}
