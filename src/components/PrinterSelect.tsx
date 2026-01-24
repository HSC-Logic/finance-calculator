import type { PrinterProfile } from "../calculators/printing3d/printerTypes";

type Props = {
    printers: PrinterProfile[];
    selectedId: string;
    onChange: (printer: PrinterProfile) => void;
};

export default function PrinterSelect({
                                          printers,
                                          selectedId,
                                          onChange,
                                      }: Props) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
                Printer Profile
            </label>
            <select
                value={selectedId}
                onChange={(e) => {
                    const printer = printers.find(p => p.id === e.target.value);
                    if (printer) onChange(printer);
                }}
                className="w-full rounded border border-gray-300 px-3 py-2"
            >
                {printers.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
