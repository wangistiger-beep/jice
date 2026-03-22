import { antipatterns } from '../data/startups';

export default function LearningFramework() {
  return (
    <section className="border-t-4 border-black bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="tag bg-[#ffeb3b] text-black text-xs mb-3 inline-block">失败框架</span>
            <h2 className="font-black font-mono text-3xl md:text-4xl uppercase leading-none">
              创业公司的 7 种死法
            </h2>
            <p className="font-mono text-gray-400 text-sm mt-2">
              每一次失败，至少对应以下一种反模式
            </p>
          </div>
          <button className="brutal-btn bg-[#ffeb3b] text-black px-6 py-3 font-mono uppercase text-sm self-start md:self-auto">
            探索全部反模式 →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {antipatterns.map((ap, i) => (
            <div
              key={ap.id}
              className="border-2 border-white/20 p-5 hover:border-[#ffeb3b] hover:bg-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{ap.icon}</span>
                <span className="font-mono text-xs text-gray-500">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-black font-mono uppercase text-sm mb-2 group-hover:text-[#ffeb3b] transition-colors">
                {ap.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                {ap.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-500">{ap.count} 家公司</span>
                <div
                  className="w-3 h-3 border-2 border-current"
                  style={{ color: ap.color, background: ap.color }}
                />
              </div>
            </div>
          ))}

          <div className="border-2 border-[#ffeb3b] bg-[#ffeb3b] text-black p-5 flex flex-col justify-between">
            <div>
              <span className="text-3xl">📚</span>
              <h3 className="font-black font-mono uppercase text-sm mt-3 mb-2">
                深入每一种反模式
              </h3>
              <p className="text-xs text-gray-800 leading-relaxed">
                22 个失败类别，配套案例分析、数据图表与规律总结，全部来自 1,200+ 条真实记录。
              </p>
            </div>
            <button className="brutal-btn bg-black text-white w-full py-2 font-mono uppercase text-xs mt-4">
              开始学习 →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
