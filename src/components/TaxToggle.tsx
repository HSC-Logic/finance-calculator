type Props = {
    enabled: boolean;
    rate: number;
    onToggle: (v: boolean) => void;
    onRateChange: (v: number) => void;
};

export default function TaxToggle({
                                      enabled,
                                      rate,
                                      onToggle,
                                      onRateChange,
                                  }: Props) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => onToggle(e.target.checked)}
                />
                Apply GST / Tax
            </label>

            {enabled && (
                <input
                    type="number"
                    value={rate}
                    onChange={(e) => onRateChange(Number(e.target.value))}
                    className="w-full rounded border px-3 py-2"
                    placeholder="Tax %"
                />
            )}
        </div>
    );
}
