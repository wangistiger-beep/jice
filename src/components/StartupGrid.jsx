import { useState, useMemo } from 'react';
import StartupCard from './StartupCard';
import { useTags } from '../hooks/useTags';

const completeCategories = [
  "全部",
  "软件",
  "设计",
  "AI",
  "人工智能",
  "社交",
  "社交平台",
  "硬件",
  "智能硬件",
  "医疗",
  "医疗科技",
  "出行",
  "娱乐",
  "媒体",
  "金融",
  "金融科技",
  "互联网",
  "电商",
  "电子商务",
  "本地生活",
  "企业服务",
  "清洁科技",
  "加密货币",
  "生物科技",
  "物流",
  "汽车",
  "共享经济",
  "房地产",
  "内容",
  "消费",
  "SaaS",
  "食品科技",
  "其他"
];

const caseTypes = [
  { value: 'all', label: '全部类型' },
  { value: 'success', label: '成功案例' },
  { value: 'failure', label: '失败案例' }
];

export default function StartupGrid({ startups, searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeCaseType, setActiveCaseType] = useState('all');
  const [activeTag, setActiveTag] = useState(null);
  const { tags, loading: tagsLoading } = useTags();

  const dynamicCategories = useMemo(() => {
    const categorySet = new Set();
    startups.forEach(startup => {
      if (startup.categories && Array.isArray(startup.categories)) {
        startup.categories.forEach(cat => {
          if (cat && cat.trim()) {
            categorySet.add(cat.trim());
          }
        });
      }
    });
    
    const sortedCategories = ["全部", ...Array.from(categorySet).sort()];
    
    const mergedSet = new Set(sortedCategories);
    completeCategories.forEach(cat => mergedSet.add(cat));
    
    return ["全部", ...Array.from(mergedSet).filter(cat => cat !== "全部").sort()];
  }, [startups]);

  const filtered = startups.filter((s) => {
    const matchesQuery = !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.causes && s.causes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = activeCategory === '全部' ||
      (s.categories && s.categories.includes(activeCategory));

    const matchesCaseType = activeCaseType === 'all' ||
      s.caseType === activeCaseType;

    const matchesTag = !activeTag ||
      (s.causes && s.causes.includes(activeTag));

    return matchesQuery && matchesCategory && matchesCaseType && matchesTag;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-black font-mono text-2xl uppercase">
            {searchQuery ? `"${searchQuery}" 的搜索结果` : '创业案例库'}
          </h2>
          <p className="font-mono text-sm text-gray-500">
            共找到 {filtered.length} 个案例
          </p>
        </div>
        <select className="brutal-input px-3 py-2 text-sm font-mono bg-white cursor-pointer">
          <option>排序：最新收录</option>
          <option>排序：最烧钱</option>
          <option>排序：最短命</option>
          <option>排序：按字母</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {caseTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setActiveCaseType(type.value)}
            className={`brutal-btn px-4 py-2 text-xs font-mono uppercase ${
              activeCaseType === type.value ? 'bg-[#ffeb3b]' : 'bg-white'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {tags.length > 0 && (
        <div className="mb-8">
          <h4 className="font-black font-mono text-sm uppercase mb-3">🏷️ 标签筛选</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`brutal-btn px-3 py-1.5 text-xs font-mono uppercase ${
                !activeTag ? 'bg-[#00b4d8] text-white' : 'bg-white'
              }`}
            >
              全部标签
            </button>
            {tagsLoading ? (
              <div className="brutal-btn bg-gray-100 px-3 py-1.5 text-xs font-mono uppercase">
                加载中...
              </div>
            ) : (
              tags.slice(0, 20).map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(activeTag === tag.name ? null : tag.name)}
                  className={`brutal-btn px-3 py-1.5 text-xs font-mono uppercase ${
                    activeTag === tag.name ? 'bg-[#00b4d8] text-white' : 'bg-white'
                  }`}
                >
                  {tag.name} ({tag.caseCount})
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`brutal-btn px-4 py-2 text-xs font-mono uppercase ${
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
    </section>
  );
}
