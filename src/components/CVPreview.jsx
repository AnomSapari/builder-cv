import React from 'react';
import html2pdf from "html2pdf.js";

const CVPreview = ({ data, template = "classic" }) => {

  const getDonationInfo = () => {
    if (template === "classic") return { price: 5000, name: "Classic" };
    if (template === "modern") return { price: 10000, name: "Modern" };
    return { price: 15000, name: "Minimal / Profesional" }; // untuk minimal
  };

  const downloadPDF = () => {
    const { price, name } = getDonationInfo();

    const confirmMessage = 
`🎉 Ingin download CV ${name}?\n\n` +
`• Versi dengan watermark = GRATIS\n` +
`• Versi BERSIH tanpa watermark = Donasi Kopi Rp${price.toLocaleString('id-ID')}\n\n` +
`Klik OK = Download dengan watermark\n` +
`Klik Cancel = Donasi & dapatkan versi bersih`;

    const wantWatermark = window.confirm(confirmMessage);

    if (!wantWatermark) {
      // Arahkan ke Saweria
      window.open("https://saweria.co/sapari", "_blank");
      alert(`Terima kasih! Silakan donasi Rp${price.toLocaleString('id-ID')} untuk mendapatkan CV ${name} tanpa watermark 💙`);
      return;
    }

    // Download dengan watermark
    const element = document.getElementById("cv-output");

    const opt = {
      margin: [15, 12, 18, 12],
      filename: `CV_${data.nama ? data.nama.replace(/ /g, '_') : 'Sapari'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2.2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const skillsArray = data.keahlian 
    ? data.keahlian.split(/[,|\n•]/).map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <button 
          onClick={downloadPDF}
          style={{
            padding: "13px 30px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(37,99,235,0.3)"
          }}
        >
          📥 Download PDF
        </button>
      </div>

      <div id="cv-output" style={{ background: "#fff", boxShadow: "0 15px 40px rgba(0,0,0,0.12)" }}>
        {template === "classic" && <ClassicTemplate data={data} skills={skillsArray} />}
        {template === "modern" && <ModernTemplate data={data} skills={skillsArray} />}
        {template === "minimal" && <MinimalTemplate data={data} skills={skillsArray} />}
      </div>
    </div>
  );
};

//================= TEMPLATES YANG LEBIH CANTIK ==================

function ClassicTemplate({ data, skills }) {
  return (
    <div style={{ padding: "60px 70px", fontFamily: "'Georgia', serif", lineHeight: 1.8, color: "#222" }}>
      <div style={{ textAlign: "center", marginBottom: 45, borderBottom: "4px solid #2563eb", paddingBottom: 25 }}>
        <h1 style={{ fontSize: 38, margin: 0, fontWeight: 700 }}>{data.nama || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 20, color: "#2563eb", margin: "12px 0 0 0", fontStyle: "italic" }}>
          {data.jabatan || "Frontend Developer"}
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: 40, fontSize: 15, color: "#555" }}>
        {data.email} • {data.telepon} • {data.kota}
      </div>

      {data.tentang && <Section title="TENTANG SAYA" content={data.tentang} />}
      {data.pengalaman && <Section title="PENGALAMAN KERJA" content={data.pengalaman} />}
      {data.pendidikan && <Section title="PENDIDIKAN" content={data.pendidikan} />}

      {skills.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 15, letterSpacing: "2px", textTransform: "uppercase", color: "#2563eb", marginBottom: 15 }}>
            KEAHLIAN
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {skills.map((skill, i) => (
              <span key={i} style={{
                padding: "8px 20px",
                background: "#f0f7ff",
                border: "1px solid #bfdbfe",
                borderRadius: "30px",
                fontSize: "14.5px",
                color: "#1e40af"
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
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "1150px" }}>
      {/* Sidebar Kiri - Modern Look */}
      <div style={{ background: "linear-gradient(180deg, #1e3a8a, #1e40af)", color: "#fff", padding: "70px 45px" }}>
        <div style={{ width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.15)", 
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, 
                      fontWeight: 700, marginBottom: 30, border: "4px solid rgba(255,255,255,0.3)" }}>
          {data.nama ? data.nama[0] : "J"}
        </div>

        <h1 style={{ fontSize: 26, margin: 0, lineHeight: 1.2 }}>{data.nama}</h1>
        <p style={{ fontSize: 16, opacity: 0.9, marginTop: 8 }}>{data.jabatan}</p>

        <div style={{ marginTop: 50, fontSize: 14.5, lineHeight: 2.1 }}>
          {data.email && <p>✉️ {data.email}</p>}
          {data.telepon && <p>📱 {data.telepon}</p>}
          {data.kota && <p>📍 {data.kota}</p>}
        </div>

        {skills.length > 0 && (
          <div style={{ marginTop: 55 }}>
            <h3 style={{ fontSize: 13, letterSpacing: "2px", opacity: 0.75, marginBottom: 15 }}>KEAHLIAN</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ padding: "6px 0", fontSize: 14.5, borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Kanan */}
      <div style={{ padding: "70px 55px", background: "#fff" }}>
        {data.tentang && <Section title="TENTANG SAYA" content={data.tentang} accent="#2563eb" />}
        {data.pengalaman && <Section title="PENGALAMAN KERJA" content={data.pengalaman} accent="#2563eb" />}
        {data.pendidikan && <Section title="PENDIDIKAN" content={data.pendidikan} accent="#2563eb" />}
      </div>
    </div>
  );
}

function MinimalTemplate({ data, skills }) {
  return (
    <div style={{ padding: "75px 80px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 42, fontWeight: 500, margin: 0, letterSpacing: "-0.5px" }}>
        {data.nama}
      </h1>
      <p style={{ fontSize: 19, color: "#2563eb", margin: "12px 0 40px 0" }}>{data.jabatan}</p>

      <div style={{ color: "#444", marginBottom: 35 }}>
        {data.email} • {data.telepon} • {data.kota}
      </div>

      {data.tentang && <Section title="Tentang Saya" content={data.tentang} minimal />}
      {data.pengalaman && <Section title="Pengalaman Kerja" content={data.pengalaman} minimal />}
      {data.pendidikan && <Section title="Pendidikan" content={data.pendidikan} minimal />}

      {skills.length > 0 && (
        <div style={{ marginTop: 50 }}>
          <h2 style={{ fontSize: 14, letterSpacing: "3px", textTransform: "uppercase", color: "#666", marginBottom: 18 }}>Keahlian</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            {skills.map((skill, i) => (
              <span key={i} style={{
                padding: "9px 22px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "50px",
                fontSize: "15px",
                color: "#334155"
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

function Section({ title, content, minimal = false, accent }) {
  if (!content) return null;
  return (
    <div style={{ marginBottom: 45 }}>
      <h2 style={{ 
        fontSize: minimal ? 15 : 16.5,
        fontWeight: 700,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: accent || "#1e3a8a",
        marginBottom: 14,
        borderBottom: minimal ? "none" : "2px solid #e2e8f0",
        paddingBottom: 8
      }}>
        {title}
      </h2>
      <div style={{ 
        fontSize: 15.2, 
        lineHeight: 1.85, 
        color: "#444",
        whiteSpace: "pre-line" 
      }}>
        {content}
      </div>
    </div>
  );
}

export default CVPreview;