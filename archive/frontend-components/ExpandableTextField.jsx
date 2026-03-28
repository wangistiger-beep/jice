import { useState } from 'react';

export default function ExpandableTextField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  maxLength = 200
}) {
  const [expanded, setExpanded] = useState(false);
  const showExpand = value.length > maxLength;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <label className="font-black font-mono uppercase text-sm">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {/* AI润色占位 */}}
            className="brutal-btn bg-blue-100 px-3 py-1 text-xs font-mono uppercase hover:bg-blue-200"
            title="AI 润色"
          >
            ✨ AI 润色
          </button>
          {showExpand && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-mono text-gray-600 hover:text-black underline"
            >
              {expanded ? '收起' : '展开'}
            </button>
          )}
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-4 font-sans text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-[#ffeb3b] transition-all ${
          expanded ? 'min-h-[300px]' : 'min-h-[120px]'
        } ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <p className="text-red-500 font-mono text-sm mt-2">⚠️ {error}</p>
      )}
    </div>
  );
}
