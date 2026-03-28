import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import StartupCard from './StartupCard';
import Footer from './Footer';
import { useRecommendedCases, useSortedCases } from '../hooks/useCases';

const sortOptions = [
  { value: 'publishDate', label: '发布时间' },
  { value: 'weeklyViews', label: '周点击量' },
  { value: 'monthlyViews', label: '月点击量' },
  { value: 'totalViews', label: '总点击量' },
  { value: 'weeklyRecommend', label: '周推荐指数' },
  { value: 'monthlyRecommend', label: '月推荐指数' },
  { value: 'totalRecommend', label: '总推荐指数' }
];

export default function NewHome() {
  const [activeSection, setActiveSection] = useState('home');
  const [sortBy, setSortBy] = useState('publishDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const { items: startups, loading: loadingCases } = useSortedCases(sortBy, sortOrder);
  const { items: recommendedStartups, loading: loadingRecommended } = useRecommendedCases();
  const loading = loadingCases || loadingRecommended;

  const filteredStartups = startups.filter(s => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      s.name?.toLowerCase().includes(query) ||
      s.description?.toLowerCase().includes(query) ||
      s.categories?.some(c => c.toLowerCase().includes(query)) ||
      s.causes?.some(c => c.toLowerCase().includes(query))
    );
  });

  const successCases = filteredStartups.filter(s => s.caseType === 'success').slice(0, 10);
  const failureCases = filteredStartups.filter(s => s.caseType === 'failure').slice(0, 10);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono text-lg">加载案例中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="font-black font-mono text-5xl uppercase mb-4">🎓 厦门大学嘉庚学院案例数据库</h1>
          <p className="font-mono text-xl text-gray-600">深入研究最具代表性的创业案例，从成功与失败中汲取经验</p>
        </div>

        <div className="brutal-card bg-white p-6 mb-10">
          {showSearch && (
            <div className="mb-6 pb-6 border-b-4 border-gray-200">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索案例名称、描述、类别或标签..."
                  className="brutal-input flex-1 px-4 py-3 font-mono bg-gray-50"
                />
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearch(false);
                  }}
                  className="brutal-btn bg-gray-200 px-4 py-3 font-mono"
                >
                  清除
                </button>
              </div>
              {searchQuery && (
                <p className="mt-3 font-mono text-sm text-gray-600">
                  🔍 正在搜索: "{searchQuery}" · 找到 {filteredStartups.length} 个匹配案例
                </p>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label className="font-mono text-sm font-bold">排序方式：</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="brutal-input px-4 py-2 font-mono text-sm bg-white cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-mono text-sm font-bold">排序：</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder('desc')}
                  className={`brutal-btn px-4 py-2 text-sm font-mono uppercase ${
                    sortOrder === 'desc' ? 'bg-[#ffeb3b]' : 'bg-white'
                  }`}
                >
                  降序
                </button>
                <button
                  onClick={() => setSortOrder('asc')}
                  className={`brutal-btn px-4 py-2 text-sm font-mono uppercase ${
                    sortOrder === 'asc' ? 'bg-[#ffeb3b]' : 'bg-white'
                  }`}
                >
                  升序
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="brutal-btn bg-[#00b4d8] text-white px-6 py-3 font-mono uppercase"
            >
              🔍 {showSearch ? '隐藏搜索' : '搜索案例'}
            </button>
          </div>
        </div>

        {recommendedStartups.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black font-mono text-2xl uppercase">⭐ 管理员推荐案例</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedStartups.map(startup => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </section>
        )}

        {successCases.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black font-mono text-2xl uppercase">🚀 成功案例</h2>
              <span className="font-mono text-sm text-gray-500">共 {successCases.length} 个案例</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {successCases.map(startup => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </section>
        )}

        {failureCases.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black font-mono text-2xl uppercase">💀 失败案例</h2>
              <span className="font-mono text-sm text-gray-500">共 {failureCases.length} 个案例</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {failureCases.map(startup => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
