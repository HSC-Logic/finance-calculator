import type { Part } from "../calculators/common/partTypes";
import { formatCurrency } from "../calculators/common/currency";

type Props = {
    parts: Part[];
    onChange: (parts: Part[]) => void;
};

export default function PartsEditor({ parts, onChange }: Props) {
    const updatePart = (id: string, field: keyof Part, value: string | number) => {
        onChange(
            parts.map((p) =>
                p.id === id ? { ...p, [field]: value } : p
            )
        );
    };

    const addPart = () => {
        onChange([
            ...parts,
            {
                id: crypto.randomUUID(),
                name: "",
                unitCost: 0,
                quantity: 1,
            },
        ]);
    };

    const removePart = (id: string) => {
        onChange(parts.filter((p) => p.id !== id));
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-600">
                    Parts / BOM
                </h3>
                <button
                    onClick={addPart}
                    className="text-sm px-3 py-1 rounded bg-blue-600 text-white"
                >
                    + Add Part
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-1 text-left">Part</th>
                        <th className="border px-2 py-1 text-right">Unit Cost</th>
                        <th className="border px-2 py-1 text-right">Qty</th>
                        <th className="border px-2 py-1 text-right">Total</th>
                        <th className="border px-2 py-1"></th>
                    </tr>
                    </thead>

                    <tbody>
                    {parts.map((part) => (
                        <tr key={part.id}>
                            <td className="border px-2 py-1">
                                <input
                                    value={part.name}
                                    onChange={(e) =>
                                        updatePart(part.id, "name", e.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                    placeholder="Motor, Gear, Wire..."
                                />
                            </td>

                            <td className="border px-2 py-1">
                                <input
                                    type="number"
                                    value={part.unitCost}
                                    onChange={(e) =>
                                        updatePart(
                                            part.id,
                                            "unitCost",
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-full border rounded px-2 py-1 text-right"
                                />
                            </td>

                            <td className="border px-2 py-1">
                                <input
                                    type="number"
                                    value={part.quantity}
                                    onChange={(e) =>
                                        updatePart(
                                            part.id,
                                            "quantity",
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-full border rounded px-2 py-1 text-right"
                                />
                            </td>

                            <td className="border px-2 py-1 text-right font-medium">
                                {formatCurrency(part.unitCost * part.quantity)}
                            </td>

                            <td className="border px-2 py-1 text-center">
                                <button
                                    onClick={() => removePart(part.id)}
                                    className="text-red-500"
                                >
                                    ✕
                                </button>
                            </td>
                        </tr>
                    ))}

                    {parts.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="text-center text-gray-400 py-3"
                            >
                                No parts added
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
