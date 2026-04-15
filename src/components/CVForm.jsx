import React from 'react';
import html2pdf from "html2pdf.js";

const CVPreview = ({ data, template = "classic" }) => {

  const downloadPDF = () => {
    const element = document.getElementById("cv-output");
    const opt = {
  margin: 0,
  filename: `CV_${data.nama ? data.nama.replace(/ /g, '_') : 'Sapari'}.pdf`,
  image: { type: 'jpeg', quality: 1 },
  html2canvas: { 
    scale: 2,
    useCORS: true,
    scrollY: 0
  },
  jsPDF: { 
    unit: 'mm', 
    format: 'a4', 
    orientation: 'portrait' 
  },
  pagebreak: { mode: ['avoid-all'] } // 🔥 ini penting
};

    html2pdf().set(opt).from(element).save();
  };

  // Split keahlian (support koma atau enter)
  const skillsArray = data.keahlian 
    ? data.keahlian.split(/[,|\n•]/).map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <button 
          onClick={downloadPDF}
          style={{
            padding: "12px 26px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          📥 Download PDF
        </button>
      </div>

      <div id="cv-output" style={{ background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
        {template === "classic" && <ClassicTemplate data={data} skills={skillsArray} />}
        {template === "modern" && <ModernTemplate data={data} skills={skillsArray} />}
        {template === "minimal" && <MinimalTemplate data={data} skills={skillsArray} />}
      </div>
    </div>
  );
};

// ================== TEMPLATES ==================

function ClassicTemplate({ data, skills }) {
  return (
    <div style={{ padding: "55px 65px", fontFamily: "Georgia, serif", lineHeight: 1.75 }}>
      <div style={{ borderBottom: "3px solid #222", paddingBottom: 30, marginBottom: 35 }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>{data.nama || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 19, color: "#444", margin: "10px 0 0 0", fontStyle: "italic" }}>
          {data.jabatan || ""}
        </p>
        <p style={{ fontSize: 14.5, color: "#555", marginTop: 15 }}>
          {[data.email, data.telepon, data.kota].filter(Boolean).join(" • ")}
        </p>
      </div>

      {data.tentang && (
        <Section title="Tentang Saya" content={data.tentang} />
      )}
      {data.pengalaman && <Section title="Pengalaman Kerja" content={data.pengalaman} />}
      {data.pendidikan && <Section title="Pendidikan" content={data.pendidikan} />}

      {skills.length > 0 && (
        <div style={{ marginTop: 35 }}>
          <h2 style={{ fontSize: 15, letterSpacing: "1.5px", textTransform: "uppercase", color: "#222", marginBottom: 14 }}>
            Keahlian
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.map((skill, i) => (
              <span key={i} style={{
                padding: "7px 18px",
                background: "#f8f8f8",
                border: "1px solid #eee",
                borderRadius: "30px",
                fontSize: "14px",
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModernTemplate({ data, skills }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "1100px" }}>
      <div style={{ background: "#1e2937", color: "#fff", padding: "60px 40px" }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>{data.nama}</h1>
        <p style={{ fontSize: 15, opacity: 0.85, marginTop: 8 }}>{data.jabatan}</p>

        <div style={{ marginTop: 40, fontSize: 14, lineHeight: 1.8 }}>
          {data.email && <p>✉️ {data.email}</p>}
          {data.telepon && <p>📱 {data.telepon}</p>}
          {data.kota && <p>📍 {data.kota}</p>}
        </div>

        {skills.length > 0 && (
          <div style={{ marginTop: 50 }}>
            <h3 style={{ fontSize: 13, opacity: 0.7, letterSpacing: "1px" }}>KEAHLIAN</h3>
            {skills.map((s, i) => <div key={i} style={{ marginTop: 8, fontSize: 14 }}>{s}</div>)}
          </div>
        )}
      </div>

      <div style={{ padding: "60px 50px" }}>
        {data.tentang && <Section title="Tentang Saya" content={data.tentang} />}
        {data.pengalaman && <Section title="Pengalaman Kerja" content={data.pengalaman} />}
        {data.pendidikan && <Section title="Pendidikan" content={data.pendidikan} />}
      </div>
    </div>
  );
}

function MinimalTemplate({ data, skills }) {
  return (
    <div style={{ padding: "70px 65px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 36, fontWeight: 400 }}>{data.nama}</h1>
      <p style={{ color: "#555", margin: "10px 0 30px 0" }}>{data.jabatan}</p>

      {data.tentang && <Section title="Tentang Saya" content={data.tentang} minimal />}
      {data.pengalaman && <Section title="Pengalaman" content={data.pengalaman} minimal />}
      {data.pendidikan && <Section title="Pendidikan" content={data.pendidikan} minimal />}

      {skills.length > 0 && (
        <div style={{ marginTop: 45 }}>
          <h2 style={{ fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", color: "#777", marginBottom: 12 }}>Keahlian</h2>
          <p style={{ fontSize: 15, lineHeight: 1.9 }}>{skills.join(" • ")}</p>
        </div>
      )}
    </div>
  );
}

function Section({ title, content, minimal = false }) {
  if (!content) return null;
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ 
        fontSize: minimal ? 14 : 16,
        fontWeight: 600,
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#222",
        marginBottom: 12 
      }}>
        {title}
      </h2>
      <div style={{ 
        fontSize: 14.8, 
        lineHeight: 1.78, 
        color: "#444",
        whiteSpace: "pre-line" 
      }}>
        {content}
      </div>
    </div>
  );
}

export default CVPreview;
