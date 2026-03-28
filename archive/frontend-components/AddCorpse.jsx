import { useState } from 'react';

export default function AddCorpse() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', capital: '', year: '', category: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="border-t-4 border-black bg-[#ffeb3b]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="tag bg-black text-white text-xs mb-4 inline-block">🪣 社区投稿</span>
            <h2 className="font-black font-mono text-3xl md:text-4xl uppercase leading-none mb-4">
              知道哪家公司倒闭了？
            </h2>
            <p className="font-mono text-sm text-gray-800 leading-relaxed mb-6">
              提交给坟场。我们的团队会人工审核每一条投稿，并通过 AI 框架补充失败分析，随后发布。每周二、周五更新。
            </p>
            <div className="space-y-3">
              {[
                "所有投稿均经人工审核",
                "AI 自动补充失败分析",
                "贡献者将获得署名",
                "已收录 1,200+ 家公司",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ffeb3b] text-xs font-black">✓</span>
                  </div>
                  <span className="font-mono text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">💀</div>
                <h3 className="font-black font-mono text-xl uppercase mb-2">案例已提交！</h3>
                <p className="font-mono text-sm text-gray-600">我们将在 2 个工作日内审核并发布。</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="brutal-btn bg-[#ffeb3b] px-6 py-2 font-mono uppercase text-sm mt-6"
                >
                  再提交一个 →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-black font-mono text-lg uppercase border-b-2 border-black pb-2 mb-4">
                  提交案例 🪣
                </h3>
                {[
                  { field: 'name', label: '公司名称', placeholder: '如：Webvan' },
                  { field: 'capital', label: '融资金额', placeholder: '如：3.75亿美元' },
                  { field: 'year', label: '倒闭年份', placeholder: '如：2001' },
                  { field: 'category', label: '所属赛道', placeholder: '如：物流、电商' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="font-mono text-xs uppercase font-bold block mb-1">{label}</label>
                    <input
                      className="brutal-input w-full px-4 py-3 text-sm font-mono"
                      placeholder={placeholder}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      required
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-xs uppercase font-bold block mb-1">为什么失败（简述）</label>
                  <textarea
                    className="brutal-input w-full px-4 py-3 text-sm font-mono resize-none"
                    rows={3}
                    placeholder="用一句话说清楚为什么倒闭"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="brutal-btn bg-black text-white w-full py-4 font-mono uppercase text-sm">
                  提交案例 💀 →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
