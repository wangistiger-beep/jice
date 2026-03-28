import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { label: "案例精选", icon: "🏆" },
  { label: "案例复盘", icon: "🧠" },
  { label: "案例研析", icon: "🔍" },
  { label: "数据洞察", icon: "📊" },
  { label: "优化方案", icon: "🔨" },
  { label: "创新案例", icon: "💡" },
  { label: "平台介绍", icon: "📖" },
];

export default function Navbar({ activeSection, setActiveSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const handleSubmitCase = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/user/submit');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono font-bold text-lg hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🎓</span>
            <span className="tracking-wider text-sm font-black">厦门大学嘉庚学院案例数据库</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.label === "案例精选") {
                return (
                  <Link
                    key={item.label}
                    to="/cases"
                    className={`nav-tab text-xs px-3 py-2 ${activeSection === item.label ? 'bg-[#ffeb3b]' : 'bg-white hover:bg-gray-100'}`}
                  >
                    {item.icon} {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveSection(item.label)}
                  className={`nav-tab text-xs px-3 py-2 ${activeSection === item.label ? 'bg-[#ffeb3b]' : 'bg-white hover:bg-gray-100'}`}
                >
                  {item.icon} {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                {!isAdmin && (
                  <Link
                    to="/user"
                    className="brutal-btn bg-[#ffeb3b] px-4 py-2 text-xs font-mono uppercase tracking-wide hidden sm:block"
                  >
                    👤 个人中心
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="brutal-btn bg-red-500 text-white px-4 py-2 text-xs font-mono uppercase tracking-wide hidden sm:block"
                  >
                    🔧 管理员后台
                  </Link>
                )}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm font-mono bg-gray-600">
                    👤 {user.username}
                    {isAdmin && <span className="ml-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 border border-red-300">管理员</span>}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="brutal-btn bg-gray-200 px-3 py-1.5 text-xs font-mono uppercase"
                  >
                    退出
                  </button>
                </div>
                <button
                  onClick={handleSubmitCase}
                  className="brutal-btn bg-[#ffeb3b] px-4 py-2 text-xs font-mono uppercase tracking-wide hidden sm:block"
                >
                  🪣 提交案例
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="brutal-btn bg-[#ffeb3b] px-4 py-2 text-xs font-mono uppercase tracking-wide hidden sm:block"
              >
                登录/注册
              </Link>
            )}
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
          {navItems.map((item) => {
            if (item.label === "案例精选") {
              return (
                <Link
                  key={item.label}
                  to="/cases"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-left px-4 py-3 border-b-2 border-black font-mono font-bold text-sm hover:bg-[#ffeb3b] transition-colors"
                >
                  {item.icon} {item.label}
                </Link>
              );
            }
            return (
              <button
                key={item.label}
                onClick={() => { setActiveSection(item.label); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 border-b-2 border-black font-mono font-bold text-sm hover:bg-[#ffeb3b] transition-colors"
              >
                {item.icon} {item.label}
              </button>
            );
          })}
          <div className="p-4 space-y-3">
            {user ? (
              <>
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <span className="text-sm font-mono">
                    👤 {user.username}
                    {isAdmin && <span className="ml-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 border border-red-300">管理员</span>}
                  </span>
                </div>
                {!isAdmin && (
                  <Link
                    to="/user"
                    onClick={() => setMobileOpen(false)}
                    className="brutal-btn bg-[#ffeb3b] w-full py-3 text-sm font-mono uppercase block text-center"
                  >
                    👤 个人中心
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="brutal-btn bg-red-500 text-white w-full py-3 text-sm font-mono uppercase block text-center"
                  >
                    🔧 管理员后台
                  </Link>
                )}
                <button
                  onClick={handleSubmitCase}
                  className="brutal-btn bg-[#ffeb3b] w-full py-3 text-sm font-mono uppercase"
                >
                  🪣 提交案例
                </button>
                <button
                  onClick={handleLogout}
                  className="brutal-btn bg-gray-200 w-full py-3 text-sm font-mono uppercase"
                >
                  退出登录
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="brutal-btn bg-[#ffeb3b] w-full py-3 text-sm font-mono uppercase block text-center"
              >
                登录/注册
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
