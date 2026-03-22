import { startups } from '../data/startups';

const categoryData = [
  { name: "没有市场需求", count: 42, color: "#ff3b3b" },
  { name: "单位经济失败", count: 32, color: "#ff6b00" },
  { name: "竞争激烈", count: 26, color: "#9b59b6" },
  { name: "时机错误", count: 24, color: "#00b4d8" },
  { name: "领导层失职", count: 20, color: "#2ecc71" },
  { name: "监管/法律", count: 13, color: "#f39c12" },
  { name: "频繁转型", count: 16, color: "#e91e63" },
];

const max = Math.max(...categoryData.map(d => d.count));

export default function Dashboard() {
  return (
    <section className="border-t-4 border-black bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="tag bg-[#00e5ff] text-black text-xs mb-3 inline-block">📊 交互式数据看板</span>
            <h2 className="font-black font-mono text-3xl md:text-4xl uppercase leading-none">
              数据不说谎
            </h2>
          </div>
          <button className="brutal-btn bg-white text-black px-6 py-3 font-mono uppercase text-sm self-start md:self-auto">
            打开完整看板 →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { val: "1,600+", label: "家公司", icon: "💀", color: "bg-white text-black" },
            { val: "501亿+", label: "美元蒸发", icon: "🔥", color: "bg-[#ff3b3b] text-white" },
            { val: "7.2年", label: "平均寿命", icon: "⏱️", color: "bg-[#ffeb3b] text-black" },
            { val: "22", label: "失败类别", icon: "🗂️", color: "bg-[#00e5ff] text-black" },
          ].map((stat) => (
            <div key={stat.label} className={`border-2 border-white/30 p-5 ${stat.color}`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-black font-mono text-2xl md:text-3xl leading-none">{stat.val}</div>
              <div className="font-mono text-xs uppercase tracking-wider mt-1 opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="border-2 border-white/30 p-6">
          <h3 className="font-mono font-bold uppercase text-sm text-gray-400 mb-6">主要失败原因占比（%）</h3>
          <div className="space-y-3">
            {categoryData.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="font-mono text-xs text-gray-400 w-28 flex-shrink-0 truncate">{d.name}</div>
                <div className="flex-1 bg-white/10 h-6 relative">
                  <div
                    className="h-full transition-all duration-700"
                    style={{ width: `${(d.count / max) * 100}%`, background: d.color }}
                  />
                </div>
                <div className="font-mono text-xs text-gray-400 w-8 text-right">{d.count}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-2 border-white/30 p-6">
          <h3 className="font-mono font-bold uppercase text-sm text-gray-400 mb-4">各年死亡数量</h3>
          <div className="flex items-end gap-2 h-24">
            {[18, 24, 31, 45, 67, 89, 72, 54, 38, 42].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-[#ffeb3b] border border-black/30 transition-all duration-500"
                  style={{ height: `${(val / 89) * 100}%` }}
                />
                <span className="font-mono text-xs text-gray-600">{2015 + i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
