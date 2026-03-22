import { useState } from 'react';
import StartupCard from './StartupCard';
import { categories } from '../data/startups';

export default function StartupGrid({ startups, searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedStartup, setSelectedStartup] = useState(null);

  const filtered = startups.filter((s) => {
    const matchesQuery = !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.causes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === '全部' ||
      s.categories.includes(activeCategory);

    return matchesQuery && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-black font-mono text-2xl uppercase">
            {searchQuery ? `"${searchQuery}" 的搜索结果` : '创业公司坟场'}
          </h2>
          <p className="font-mono text-sm text-gray-500">
            共找到 {filtered.length} 家公司
          </p>
        </div>
        <select className="brutal-input px-3 py-2 text-sm font-mono bg-white cursor-pointer">
          <option>排序：最新收录</option>
          <option>排序：最烧钱</option>
          <option>排序：最短命</option>
          <option>排序：按字母</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`brutal-btn flex-shrink-0 px-4 py-2 text-xs font-mono uppercase ${
              activeCategory === cat ? 'bg-[#ffeb3b]' : 'bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 border-4 border-black bg-white">
          <div className="text-6xl mb-4">💀</div>
          <h3 className="font-black font-mono text-xl uppercase">未找到相关案例</h3>
          <p className="font-mono text-sm text-gray-500 mt-2">换个关键词或分类试试</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((startup) => (
            <StartupCard
              key={startup.id}
              startup={startup}
              onClick={setSelectedStartup}
            />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="text-center mt-10">
          <button className="brutal-btn bg-black text-white px-8 py-4 font-mono uppercase text-sm">
            加载更多案例 💀
          </button>
        </div>
      )}

      {selectedStartup && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStartup(null)}
        >
          <div
            className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#ffeb3b] border-b-4 border-black p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedStartup.logo}</span>
                <div>
                  <h2 className="font-black font-mono text-2xl uppercase">{selectedStartup.name}</h2>
                  <p className="font-mono text-sm">{selectedStartup.country} · {selectedStartup.founded}–{selectedStartup.died}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStartup(null)}
                className="brutal-btn bg-black text-white w-10 h-10 flex items-center justify-center text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="border-4 border-black p-3 text-center bg-red-50">
                  <div className="font-mono text-xs uppercase text-gray-500">已烧金额</div>
                  <div className="font-black font-mono text-xl">{selectedStartup.capital}</div>
                </div>
                <div className="border-4 border-black p-3 text-center bg-blue-50">
                  <div className="font-mono text-xs uppercase text-gray-500">存活时长</div>
                  <div className="font-black font-mono text-xl">{selectedStartup.lifespan}</div>
                </div>
                <div className="border-4 border-black p-3 text-center bg-yellow-50">
                  <div className="font-mono text-xs uppercase text-gray-500">所属赛道</div>
                  <div className="font-black font-mono text-sm">{selectedStartup.categories[0]}</div>
                </div>
              </div>

              <div>
                <h4 className="font-black font-mono uppercase text-sm mb-2 border-b-2 border-black pb-1">死亡原因</h4>
                <p className="font-sans text-gray-700 leading-relaxed">{selectedStartup.description}</p>
              </div>

              <div>
                <h4 className="font-black font-mono uppercase text-sm mb-2 border-b-2 border-black pb-1">失败模式</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStartup.causes.map((cause) => (
                    <span key={cause} className="tag bg-red-100 border-red-400 text-sm">☠️ {cause}</span>
                  ))}
                </div>
              </div>

              <div className="bg-black text-white p-5 border-4 border-black">
                <h4 className="font-black font-mono uppercase text-sm mb-3">🔨 重建方案已生成</h4>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {['建什么', '市场分析', '实施步骤', '技术选型', '盈利模型'].map((step, i) => (
                    <div key={step} className="text-center">
                      <div className="w-8 h-8 bg-[#ffeb3b] text-black border-2 border-[#ffeb3b] font-black font-mono flex items-center justify-center mx-auto mb-1">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="font-mono text-xs text-gray-300 leading-tight">{step}</div>
                    </div>
                  ))}
                </div>
                <button className="brutal-btn bg-[#ffeb3b] text-black w-full py-3 font-mono uppercase text-sm">
                  查看完整重建方案 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
