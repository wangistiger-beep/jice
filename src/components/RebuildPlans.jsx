const plans = [
  {
    name: "B2B 日程管理 SaaS",
    based_on: "Quibi 内容定位失败",
    tags: ["SaaS", "B2B", "日历"],
    difficulty: 3,
    scalability: 5,
    mrr_potential: "5万–50万美元",
  },
  {
    name: "P2P 服务平台",
    based_on: "Homejoy 法律崩溃",
    tags: ["平台", "服务", "B2C"],
    difficulty: 4,
    scalability: 4,
    mrr_potential: "2万–20万美元",
  },
  {
    name: "音频社区平台",
    based_on: "Clubhouse 留存问题",
    tags: ["社交", "音频", "社区"],
    difficulty: 3,
    scalability: 5,
    mrr_potential: "3万–30万美元",
  },
];

const steps = [
  { num: "01", label: "建什么", icon: "🏗️" },
  { num: "02", label: "市场分析", icon: "📊" },
  { num: "03", label: "实施步骤", icon: "🔨" },
  { num: "04", label: "技术选型", icon: "⚙️" },
  { num: "05", label: "盈利模型", icon: "💰" },
];

export default function RebuildPlans() {
  return (
    <section className="border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="tag bg-black text-white text-xs mb-4 inline-block">🔨 重建方案</span>
          <h2 className="font-black font-mono text-3xl md:text-4xl uppercase mb-4">
            1,600+ 可落地商业方案
          </h2>
          <p className="font-mono text-gray-600 max-w-2xl mx-auto text-sm">
            每一个失败案例都变成一份蓝图。AI 生成的重建方案，包含市场分析、技术栈建议与盈利模型。
          </p>
        </div>

        <div className="flex items-center justify-center gap-0 mb-12 overflow-x-auto scrollbar-hide">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center text-center w-28">
                <div className="w-14 h-14 bg-[#ffeb3b] border-4 border-black flex items-center justify-center mb-2">
                  <span className="text-xl">{step.icon}</span>
                </div>
                <div className="font-mono font-black text-xs">{step.num}</div>
                <div className="font-mono text-xs text-gray-600 leading-tight">{step.label}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-black mx-1 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <div key={plan.name} className="brutal-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex flex-wrap gap-1">
                  {plan.tags.map((tag) => (
                    <span key={tag} className="tag text-xs">{tag}</span>
                  ))}
                </div>
              </div>
              <h3 className="font-black font-mono text-base uppercase mb-2">{plan.name}</h3>
              <p className="font-mono text-xs text-gray-500 mb-4">参考案例：{plan.based_on}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-gray-500">月收入潜力</span>
                  <span className="font-mono font-bold text-xs text-green-600">{plan.mrr_potential}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-gray-500">执行难度</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-3 h-3 border border-black ${i <= plan.difficulty ? 'bg-black' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-gray-500">扩展潜力</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-3 h-3 border border-black ${i <= plan.scalability ? 'bg-[#ffeb3b]' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
              </div>

              <button className="brutal-btn bg-[#ffeb3b] w-full py-2 font-mono uppercase text-xs">
                查看重建方案 →
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="brutal-btn bg-black text-white px-10 py-4 font-mono uppercase">
            浏览全部 1,600+ 重建方案 →
          </button>
        </div>
      </div>
    </section>
  );
}
