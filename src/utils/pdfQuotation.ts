import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Part } from "../calculators/common/partTypes";

// ---------- helpers ----------
function money(value: number) {
    return value.toFixed(2);
}

// ---------- types ----------
type QuotationData = {
    quotationNo: string;
    date: string;
    productName: string;
    printerName: string;

    breakdown: {
        materialCost: number;
        laborCost: number;
        electricityCost: number;
        maintenanceCost: number;
        partsCost: number;
        bufferAmount: number;
        profitAmount: number;
        taxAmount: number;
    };

    totals: {
        baseCost: number;
        finalPrice: number;
    };

    parts: Part[];
};

// ---------- generator ----------
export function generateQuotationPDF(data: QuotationData) {
    const doc = new jsPDF();

    let currentY = 15;

    // ===== HEADER =====
    doc.setFontSize(16);
    doc.text("HSC Logic", 14, currentY);
    currentY += 8;

    doc.setFontSize(10);
    doc.text(`Quotation No: ${data.quotationNo}`, 14, currentY);
    currentY += 6;
    doc.text(`Date: ${data.date}`, 14, currentY);
    currentY += 8;

    doc.setFontSize(12);
    doc.text(`Product: ${data.productName}`, 14, currentY);
    currentY += 6;
    doc.text(`Printer: ${data.printerName}`, 14, currentY);
    currentY += 10;

    // ===== COST BREAKDOWN =====
    autoTable(doc, {
        startY: currentY,
        head: [["Cost Item", "Amount (LKR)"]],
        body: [
            ["Material Cost", money(data.breakdown.materialCost)],
            ["Labor Cost", money(data.breakdown.laborCost)],
            ["Electricity Cost", money(data.breakdown.electricityCost)],
            ["Maintenance Cost", money(data.breakdown.maintenanceCost)],
            ["Parts Cost", money(data.breakdown.partsCost)],
            ["Buffer", money(data.breakdown.bufferAmount)],
            ["Profit", money(data.breakdown.profitAmount)],
            ["Tax", money(data.breakdown.taxAmount)],
        ],
    });

    // Move Y below the table safely
    if (doc.lastAutoTable) {
        currentY = doc.lastAutoTable.finalY + 10;
    }

    // ===== PARTS / BOM =====
    if (data.parts.length > 0) {
        autoTable(doc, {
            startY: currentY,
            head: [["Part", "Unit Cost", "Qty", "Total"]],
            body: data.parts.map((p) => [
                p.name,
                money(p.unitCost),
                String(p.quantity),
                money(p.unitCost * p.quantity),
            ]),
        });

        if (doc.lastAutoTable) {
            currentY = doc.lastAutoTable.finalY + 10;
        }

    }

    // ===== FINAL PRICE =====
    doc.setFontSize(14);
    doc.text(
        `Final Price: LKR ${money(data.totals.finalPrice)}`,
        14,
        currentY
    );

    doc.save(`Quotation-${data.quotationNo}.pdf`);
}
