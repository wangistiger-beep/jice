import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const adminNavItems = [
  { label: '仪表板', icon: '📊', path: '/admin' },
  { label: '用户管理', icon: '👥', path: '/admin/users' },
  { label: '案例管理', icon: '💼', path: '/admin/cases' },
  { label: '审计日志', icon: '📝', path: '/admin/logs' },
  { label: '系统设置', icon: '⚙️', path: '/admin/settings' },
];

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (!isAdmin) {
      navigate('/');
    } else {
      setTimeout(() => setLoading(false), 0);
    }
  }, [user, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar activeSection="数据看板" setActiveSection={() => {}} />
      
      <div className="flex">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-6 right-6 z-50 lg:hidden brutal-btn bg-[#ff3b3b] w-14 h-14 flex items-center justify-center text-2xl"
        >
          ☰
        </button>

        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r-4 border-black transform transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6 border-b-4 border-black">
            <Link
              to="/admin"
              className="flex items-center gap-2 font-mono font-bold text-lg"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-2xl">🔧</span>
              <span className="uppercase tracking-wider text-sm font-black">管理员</span>
            </Link>
          </div>

          <nav className="p-4">
            {adminNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`block w-full text-left px-4 py-3 mb-2 border-4 border-black font-mono font-bold text-sm transition-all ${
                  isActive(item.path)
                    ? 'bg-[#ffeb3b] translate-x-1 translate-y-1 shadow-none'
                    : 'bg-white hover:bg-gray-100 brutal-card'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t-4 border-black">
            <Link
              to="/"
              className="block w-full text-left px-4 py-3 border-4 border-black font-mono font-bold text-sm bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              ← 返回首页
            </Link>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
