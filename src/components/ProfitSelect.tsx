import type {ProfitMargin} from "../calculators/printing3d/types";

type Props = {
    value: ProfitMargin;
    onChange: (v: ProfitMargin) => void;
};

export default function ProfitSelect({ value, onChange }: Props) {
    return (
        <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 500 }}>Profit Margin</label>
            <select
                value={value}
                onChange={(e) => onChange(Number(e.target.value) as ProfitMargin)}
                style={{ width: "100%", padding: 6, marginTop: 4 }}
            >
                <option value={20}>20%</option>
                <option value={50}>50%</option>
                <option value={70}>70%</option>
            </select>
        </div>
    );
}
