type Props = {
    label: string;
    value: number;
    onChange: (v: number) => void;
    suffix?: string;
};

export default function NumberInput({ label, value, onChange, suffix }: Props) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
                {label} {suffix && <span className="text-gray-400">({suffix})</span>}
            </label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
