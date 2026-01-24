import { useState } from "react";
import Tabs from "./components/Tabs";
import Printing3DCalculator from "./calculators/printing3d/Printing3DCalculator";
// (placeholder for next step)
const ServiceCalculator = () => (
    <div className="p-6 bg-white rounded shadow">
        Service Calculator (coming next)
    </div>
);

function App() {
    const [activeTab, setActiveTab] = useState("3d");

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <Tabs
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    tabs={[
                        { id: "3d", label: "3D Printing" },
                        { id: "service", label: "Software / Services" },
                    ]}
                />

                {activeTab === "3d" && <Printing3DCalculator />}
                {activeTab === "service" && <ServiceCalculator />}
            </div>
        </div>
    );
}

export default App;
