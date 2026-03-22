import { useState } from 'react';

const filterTabs = [
  { label: "✨ 最新收录", key: "newest" },
  { label: "🔥 最烧钱", key: "burned" },
  { label: "📅 死亡时间", key: "died" },
  { label: "📊 数据流", key: "data" },
];

export default function Hero({ onSearch, activeFilter, setActiveFilter }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="bg-[#ffeb3b] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-center mb-6">
          <span className="tag bg-black text-white text-xs">
            💀 已记录 1,600+ 家倒闭创业公司
          </span>
        </div>

        <h1 className="text-center font-black uppercase tracking-tighter leading-none mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontFamily: "'Space Mono', monospace" }}>
          创业公司<br />坟场
        </h1>

        <p className="text-center font-mono text-lg md:text-xl font-bold mb-2 max-w-2xl mx-auto">
          超过 501亿美元 风险投资，化为灰烬，全部存档。
        </p>
        <p className="text-center font-mono text-sm text-gray-700 mb-10">
          每周二、周五更新新案例。
        </p>

        <div className="flex justify-center gap-4 md:gap-8 mb-10">
          {[
            { val: "1,600+", label: "家公司" },
            { val: "501亿+", label: "美元蒸发" },
            { val: "22", label: "失败类别" },
            { val: "1,600+", label: "重建方案" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-black font-mono text-xl md:text-3xl leading-none">{s.val}</div>
              <div className="font-mono text-xs uppercase tracking-widest text-gray-700">{s.label}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索创业公司坟场..."
              className="brutal-input w-full px-6 py-4 text-base md:text-xl bg-white font-mono pr-16"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-5 bg-black text-white border-l-3 border-black font-bold font-mono hover:bg-gray-800 transition-colors"
            >
              🔍
            </button>
          </div>

          <div className="flex gap-0 mt-4 overflow-x-auto scrollbar-hide">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`nav-tab flex-shrink-0 ${activeFilter === tab.key ? 'bg-black text-[#ffeb3b]' : 'bg-white text-black'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
