import { useState } from "react";
import InputField from "./components/InputField";
import { calculate3DPrintPrice } from "./calculators/printing3d/calculator";

function App() {
    const [materialCost, setMaterialCost] = useState(0);
    const [machineCost, setMachineCost] = useState(0);
    const [laborCost, setLaborCost] = useState(0);
    const [profitMargin, setProfitMargin] = useState(20);

    const result = calculate3DPrintPrice({
        materialCost,
        machineCost,
        laborCost,
        profitMargin,
    });

    return (
        <div style={{ padding: 20 }}>
            <h1>3D Printing Price Calculator</h1>

            <InputField label="Material Cost" value={materialCost} onChange={setMaterialCost} />
            <InputField label="Machine Cost" value={machineCost} onChange={setMachineCost} />
            <InputField label="Labor Cost" value={laborCost} onChange={setLaborCost} />
            <InputField label="Profit %" value={profitMargin} onChange={setProfitMargin} />

            <hr />

            <p><strong>Base Cost:</strong> {result.baseCost}</p>
            <p><strong>Selling Price:</strong> {result.sellingPrice}</p>
        </div>
    );
}

export default App;
