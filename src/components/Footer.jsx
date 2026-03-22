export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💀</span>
              <span className="font-black font-mono uppercase tracking-wider">Loot Drop</span>
            </div>
            <p className="font-mono text-xs text-gray-400 leading-relaxed mb-4">
              创业公司坟场。记录超过 325 亿美元的风险投资灰烬，让你不重蹈覆辙。
            </p>
            <div className="tag bg-[#ffeb3b] text-black text-xs inline-block">
              每周二、周五更新
            </div>
          </div>

          <div>
            <h4 className="font-mono font-bold uppercase text-xs mb-4 text-gray-400">探索</h4>
            <ul className="space-y-2">
              {["创业公司坟场", "Top 10 榜单", "深度解析", "数据看板", "全部类别"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono text-xs text-gray-400 hover:text-[#ffeb3b] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-bold uppercase text-xs mb-4 text-gray-400">学习</h4>
            <ul className="space-y-2">
              {["失败框架", "7种反模式", "重建方案", "案例研究", "常见问题"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono text-xs text-gray-400 hover:text-[#ffeb3b] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-bold uppercase text-xs mb-4 text-gray-400">社区</h4>
            <ul className="space-y-2">
              {["提交案例", "创意与路线图", "关于我们", "邮件订阅", "Twitter/X"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono text-xs text-gray-400 hover:text-[#ffeb3b] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-gray-500">
            © 2026 Loot Drop. 保留所有权利。创业失败案例仅供学习参考。
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-mono text-xs text-gray-500 hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="font-mono text-xs text-gray-500 hover:text-white transition-colors">服务条款</a>
            <a href="#" className="font-mono text-xs text-gray-500 hover:text-white transition-colors">联系我们</a>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="brutal-btn bg-[#ffeb3b] text-black w-14 h-14 flex items-center justify-center text-2xl rounded-none">
          🪣
        </button>
        <div className="font-mono text-xs text-center mt-1 font-bold text-black">提交</div>
      </div>
    </footer>
  );
}
