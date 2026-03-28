import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import StartupGrid from './StartupGrid';
import Footer from './Footer';
import { useSortedCases } from '../hooks/useCases';

const sortOptions = [
  { value: 'publishDate', label: '发布时间' },
  { value: 'weeklyViews', label: '周点击量' },
  { value: 'monthlyViews', label: '月点击量' },
  { value: 'totalViews', label: '总点击量' },
  { value: 'weeklyRecommend', label: '周推荐指数' },
  { value: 'monthlyRecommend', label: '月推荐指数' },
  { value: 'totalRecommend', label: '总推荐指数' }
];

export default function CaseSelection() {
  const [activeSection, setActiveSection] = useState('cases');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('publishDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const { items: startups, loading } = useSortedCases(sortBy, sortOrder);

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-black font-mono text-3xl uppercase">🏆 案例精选</h1>
            <p className="font-mono text-sm text-gray-500 mt-2">深入研究最具代表性的创业案例</p>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="brutal-btn bg-[#ffeb3b] px-6 py-3 font-mono uppercase">
              🏠 回到首页
            </Link>
          </div>
        </div>

        <div className="brutal-card bg-white p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
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
          </div>
        </div>

        <div className="mb-6">
          <div className="brutal-card bg-white p-4">
            <input
              type="text"
              placeholder="搜索创业案例数据库..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="brutal-input w-full px-4 py-3 text-lg font-mono"
            />
          </div>
        </div>

        <StartupGrid startups={startups} searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}
