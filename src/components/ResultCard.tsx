import { formatCurrency } from "../calculators/common/currency";

type Props = {
    label: string;
    value: number;
    highlight?: boolean;
};

export default function ResultCard({ label, value, highlight }: Props) {
    return (
        <div
            className={`flex justify-between rounded p-3 ${
                highlight
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-50"
            }`}
        >
            <span>{label}</span>
            <span>{formatCurrency(value)}</span>
        </div>
    );
}
