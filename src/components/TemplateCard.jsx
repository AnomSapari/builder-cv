const TemplateCard = ({ name, description, image, onSelect }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <img src={image} alt={name} className="w-full h-64 object-cover border-b" />
      <div className="p-4 text-center">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <button 
          onClick={onSelect}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Gunakan Template Ini
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;