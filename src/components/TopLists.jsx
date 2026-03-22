import { topLists } from '../data/startups';
import { startups } from '../data/startups';

const topBurns = [...startups].sort((a, b) => b.capitalRaw - a.capitalRaw).slice(0, 5);

export default function TopLists() {
  return (
    <section className="border-t-4 border-black bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <span className="tag bg-black text-white text-xs mb-4 inline-block">TOP 10 榜单</span>
            <h2 className="font-black font-mono text-2xl uppercase mb-6">精选死亡合集</h2>
            <div className="space-y-3">
              {topLists.map((list, i) => (
                <button
                  key={list.title}
                  className="brutal-card w-full text-left p-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-2xl text-gray-200 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xl">{list.icon}</span>
                    <span className="font-bold font-mono text-sm uppercase">{list.title}</span>
                  </div>
                  <span className="tag bg-[#ffeb3b] text-xs">{list.count} 条</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <span className="tag bg-[#ff3b3b] text-white text-xs mb-4 inline-block">🔥 烧钱名人堂</span>
            <h2 className="font-black font-mono text-2xl uppercase mb-6">史上最烧钱 Top 5</h2>
            <div className="space-y-3">
              {topBurns.map((startup, i) => (
                <div key={startup.id} className="brutal-card p-4 flex items-center gap-4">
                  <div className="font-mono font-black text-3xl text-[#ffeb3b] w-10 text-center leading-none">
                    {i + 1}
                  </div>
                  <div className="text-2xl w-10 h-10 flex items-center justify-center border-2 border-black bg-gray-100">
                    {startup.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black font-mono uppercase text-sm truncate">{startup.name}</div>
                    <div className="font-mono text-xs text-gray-500">{startup.categories[0]}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-black font-mono text-sm text-red-600">{startup.capital}</div>
                    <div className="font-mono text-xs text-gray-400">{startup.lifespan}</div>
                  </div>
                </div>
              ))}

              <button className="brutal-btn bg-[#ff3b3b] text-white w-full py-3 font-mono uppercase text-sm">
                查看完整烧钱名人堂 🔥 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
