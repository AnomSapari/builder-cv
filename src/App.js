import { useState } from "react";
import { dummyCVData } from "./data/dummyData";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import TemplateSelector from "./components/TemplateSelector";
import "./App.css";

function App() {
  const [template, setTemplate] = useState("classic");
  const [cvData, setCvData] = useState(dummyCVData);   // Mulai dengan dummy data

  const resetToDummy = () => {
    setCvData(dummyCVData);
  };

  return (
    <div className="app-layout">
      <div className="panel-left">
        <TemplateSelector active={template} onChange={setTemplate} />

        <button 
          onClick={resetToDummy}
          style={{
            margin: "15px 0",
            padding: "10px 20px",
            background: "#eab308",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          🔄 Reset ke Contoh CV
        </button>

        <CVForm data={cvData} onChange={setCvData} />
      </div>

      <div className="panel-right">
        <CVPreview data={cvData} template={template} />
      </div>
    </div>
  );
}

export default App;