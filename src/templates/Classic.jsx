const Classic = ({ data }) => {
  return (
    <div className="p-10 bg-white min-h-[297mm] text-gray-800 font-serif">
      <div className="border-b-2 border-gray-900 pb-4 text-center">
        <h1 className="text-3xl font-bold uppercase">{data.name}</h1>
        <p className="text-lg">{data.role} | {data.email}</p>
      </div>
      
      <div className="mt-6">
        <h2 className="font-bold border-b mb-2">PROFIL PROFESIONAL</h2>
        <p className="text-sm">{data.summary}</p>
      </div>

      <div className="mt-6">
        <h2 className="font-bold border-b mb-2">PENGALAMAN KERJA</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between font-semibold text-sm">
              <span>{exp.company}</span>
              <span>{exp.year}</span>
            </div>
            <p className="text-xs italic">{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classic;