const templates = [
  { id: "classic", label: "Classic", desc: "Formal & rapi" },
  { id: "modern", label: "Modern", desc: "Warna & bold" },
  { id: "minimal", label: "Minimal", desc: "Bersih & simpel" },
];

function TemplateSelector({ active, onChange }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
        textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
        Pilih desain
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer",
              border: active === t.id ? "2px solid #4f46e5" : "1px solid #e0e0dc",
              background: active === t.id ? "#eef2ff" : "#fff",
              fontFamily: "inherit",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600,
              color: active === t.id ? "#4f46e5" : "#333" }}>{t.label}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{t.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;