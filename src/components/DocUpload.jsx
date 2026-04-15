import React, { useState } from 'react';

const DocUpload = ({ onUpload }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const fileData = uploadedFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file), // Preview URL sementara
      type: file.type
    }));
    
    const newFiles = [...files, ...fileData];
    setFiles(newFiles);
    onUpload(newFiles); // Kirim data ke parent (Builder)
  };

  return (
    <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
      <h3 className="font-bold mb-2">Upload Sertifikat / Dokumen</h3>
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {files.map((file, idx) => (
          <div key={idx} className="text-xs bg-gray-100 p-2 rounded border flex items-center">
            <span className="truncate max-w-[100px]">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocUpload;