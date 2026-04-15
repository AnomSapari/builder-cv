import { useState } from "react";
import { dummyCVData } from "./data/dummyData";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import TemplateSelector from "./components/TemplateSelector";
import "./App.css";

function App() {
  const [template, setTemplate] = useState("classic");
  
  // Mulai dengan data dummy
  const [cvData, setCvData] = useState(dummyCVData);

  const resetToDummy = () => {
    setCvData({ ...dummyCVData });     // Pakai spread supaya re-render
  };

  const resetToEmpty = () => {
    setCvData({
      nama: "",
      jabatan: "",
      email: "",
      telepon: "",
      kota: "",
      tentang: "",
      pengalaman: "",
      pendidikan: "",
      keahlian: "",
    });
  };

  return (
    <div className="app-layout">
      <div className="panel-left">
        <TemplateSelector active={template} onChange={setTemplate} />

        <div style={{ margin: "15px 0", display: "flex", gap: "10px" }}>
          <button 
            onClick={resetToDummy}
            style={{
              padding: "11px 20px",
              background: "#eab308",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              flex: 1
            }}
          >
            🔄 Reset ke Contoh CV
          </button>

          <button 
            onClick={resetToEmpty}
            style={{
              padding: "11px 20px",
              background: "#64748b",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              flex: 1
            }}
          >
            🗑️ Form Kosong
          </button>
        </div>

        <CVForm data={cvData} onChange={setCvData} />
      </div>

      <div className="panel-right">
        <CVPreview data={cvData} template={template} />
      </div>
    </div>
  );
}

export default App;