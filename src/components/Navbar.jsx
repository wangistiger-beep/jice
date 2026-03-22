import { useState } from 'react';

const navItems = [
  { label: "Top 10 榜单", icon: "🏆" },
  { label: "失败框架", icon: "🧠" },
  { label: "深度解析", icon: "🔍" },
  { label: "数据看板", icon: "📊" },
  { label: "重建方案", icon: "🔨" },
  { label: "创意集市", icon: "💡" },
  { label: "关于我们", icon: "📖" },
];

export default function Navbar({ activeSection, setActiveSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2 font-mono font-bold text-lg hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">💀</span>
            <span className="uppercase tracking-wider text-sm font-black">Loot Drop</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveSection(item.label)}
                className={`nav-tab text-xs px-3 py-2 ${activeSection === item.label ? 'bg-[#ffeb3b]' : 'bg-white hover:bg-gray-100'}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="brutal-btn bg-[#ffeb3b] px-4 py-2 text-xs font-mono uppercase tracking-wide hidden sm:block">
              🪣 提交案例
            </button>
            <button
              className="lg:hidden p-2 border-2 border-black"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="block w-5 h-0.5 bg-black mb-1"></span>
              <span className="block w-5 h-0.5 bg-black mb-1"></span>
              <span className="block w-5 h-0.5 bg-black"></span>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t-4 border-black bg-white">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveSection(item.label); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-3 border-b-2 border-black font-mono font-bold text-sm hover:bg-[#ffeb3b] transition-colors"
            >
              {item.icon} {item.label}
            </button>
          ))}
          <div className="p-4">
            <button className="brutal-btn bg-[#ffeb3b] w-full py-3 text-sm font-mono uppercase">
              🪣 提交案例
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
