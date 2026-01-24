type Props = {
    label: string;
    value: number;
    onChange: (v: number) => void;
};

export default function InputField({ label, value, onChange }: Props) {
    return (
        <div style={{ marginBottom: 10 }}>
            <label>{label}</label>
            <br />
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </div>
    );
}
