type Tab = {
    id: string;
    label: string;
};

type Props = {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
};

export default function Tabs({ tabs, activeTab, onChange }: Props) {
    return (
        <div className="flex border-b mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`px-4 py-2 font-medium ${
                        activeTab === tab.id
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
