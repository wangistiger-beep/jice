import { useState } from 'react';

export default function ImageUploader({ images = [], onChange, maxImages = 3 }) {
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files) => {
    const newImages = Array.from(files).slice(0, maxImages - images.length);
    
    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange([...images, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeImage = (id) => {
    onChange(images.filter(img => img.id !== id));
  };

  const reorderImage = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    onChange(newImages);
  };

  return (
    <div className="mb-5">
      <label className="block font-black font-mono uppercase text-sm mb-2">
        案例图片
        <span className="text-gray-500 ml-1">(最多 {maxImages} 张)</span>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {images.map((img, index) => (
          <div key={img.id} className="relative group">
            <img
              src={img.url}
              alt={`案例图片 ${index + 1}`}
              className="w-full h-40 object-cover border-4 border-black"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => reorderImage(index, index - 1)}
                  className="brutal-btn bg-white px-2 py-1 text-sm"
                >
                  ←
                </button>
              )}
              {index < images.length - 1 && (
                <button
                  type="button"
                  onClick={() => reorderImage(index, index + 1)}
                  className="brutal-btn bg-white px-2 py-1 text-sm"
                >
                  →
                </button>
              )}
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="brutal-btn bg-red-500 text-white px-2 py-1 text-sm"
              >
                ✕
              </button>
            </div>
            <div className="absolute top-2 left-2 bg-[#ffeb3b] border-2 border-black px-2 py-0.5 font-mono text-xs font-black">
              {index + 1}
            </div>
          </div>
        ))}

        {images.length < maxImages && (
          <div
            className={`border-4 border-dashed border-black p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              dragOver ? 'bg-[#ffeb3b]' : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById('image-input').click()}
          >
            <div className="text-4xl mb-2">📷</div>
            <p className="font-mono text-sm text-center">
              点击或拖拽上传
            </p>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
