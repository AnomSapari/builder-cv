import React from 'react';
import html2pdf from "html2pdf.js";

const CVPreview = ({ data, template = "classic" }) => {

  const getDonation = () => {
    if (template === "classic") return { price: 5000, name: "Classic" };
    if (template === "modern") return { price: 10000, name: "Modern" };
    return { price: 15000, name: "Minimal Profesional" };
  };

      const downloadPDF = () => {
    const { price, name } = getDonation();

    const result = window.confirm(
`🎉 Ingin mendownload CV ${name}?\n\n` +
`✅ OK  → Download GRATIS dengan watermark kecil\n` +
`❌ Cancel → Donasi Saweria Rp${price.toLocaleString('id-ID')} untuk versi BERSIH tanpa watermark`
    );

    if (!result) {
      // ================== LINK SAWERIA ==================
      window.open("https://saweria.co/widgets/alert?streamKey=394aa5418806d2a3825de7270007c013", "_blank");   // ← GANTI DI SINI
      
      alert(`Terima kasih! Silakan donasi Rp${price.toLocaleString('id-ID')} untuk CV ${name} tanpa watermark 💙`);
      return;
    }

    // Download dengan watermark
    const element = document.getElementById("cv-output");

    const opt = {
      margin: [15, 15, 20, 15],
      filename: `CV_${data.nama ? data.nama.replace(/ /g, '_') : 'Sapari'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2.1,
        useCORS: true,
        letterRendering: true 
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
      html2pdf().set(opt).from(element).save();
    }, 400);
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
            padding: "14px 32px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(37,99,235,0.35)"
          }}
        >
          📥 Download PDF
        </button>
      </div>

      <div 
        id="cv-output" 
        style={{ 
          background: "#fff", 
          boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
          margin: "0 auto",
          maxWidth: "850px"
        }}
      >
        {template === "classic" && <ClassicTemplate data={data} skills={skillsArray} />}
        {template === "modern" && <ModernTemplate data={data} skills={skillsArray} />}
        {template === "minimal" && <MinimalTemplate data={data} skills={skillsArray} />}
      </div>
    </div>
  );
};

// === TEMPLATES (sama seperti sebelumnya) ===
function ClassicTemplate({ data, skills }) {
  return (
    <div style={{ padding: "60px 70px", fontFamily: "Georgia, serif", lineHeight: 1.8 }}>
      <div style={{ textAlign: "center", marginBottom: 50, borderBottom: "4px solid #2563eb", paddingBottom: 30 }}>
        <h1 style={{ fontSize: 40, margin: 0, fontWeight: 700 }}>{data.nama || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 21, color: "#2563eb", marginTop: 12, fontStyle: "italic" }}>
          {data.jabatan || "Frontend Developer"}
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: 45, fontSize: 15.5, color: "#444" }}>
        {data.email} • {data.telepon} • {data.kota}
      </div>

      {data.tentang && <Section title="TENTANG SAYA" content={data.tentang} />}
      {data.pengalaman && <Section title="PENGALAMAN KERJA" content={data.pengalaman} />}
      {data.pendidikan && <Section title="PENDIDIKAN" content={data.pendidikan} />}

      {skills.length > 0 && (
        <div style={{ marginTop: 45 }}>
          <h2 style={{ fontSize: 16, letterSpacing: "2px", textTransform: "uppercase", color: "#2563eb", marginBottom: 18 }}>KEAHLIAN</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {skills.map((skill, i) => (
              <span key={i} style={{
                padding: "9px 22px",
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

// ModernTemplate, MinimalTemplate, dan Section function tetap sama seperti kode sebelumnya.
// Copy dari pesan saya yang terakhir jika belum ada.

function ModernTemplate({ data, skills }) { /* paste kode ModernTemplate sebelumnya */ }
function MinimalTemplate({ data, skills }) { /* paste kode MinimalTemplate sebelumnya */ }
function Section({ title, content, minimal = false, accent }) { /* paste kode Section sebelumnya */ }

export default CVPreview;