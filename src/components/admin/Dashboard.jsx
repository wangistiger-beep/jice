import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiRequest } from '../../lib/api';

function StatCard({ icon, label, value, color, trend }) {
  return (
    <div className={`brutal-card bg-white p-6 ${color}`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{icon}</span>
        {trend && (
          <span className={`text-sm font-mono px-2 py-1 border-2 border-black ${
            trend.positive ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="font-black font-mono text-3xl mb-1">{value}</div>
      <div className="font-mono text-sm text-gray-600 uppercase">{label}</div>
    </div>
  );
}

function QuickAction({ icon, label, to, color }) {
  return (
    <Link
      to={to}
      className={`brutal-card p-4 flex items-center gap-4 hover:translate-x-1 hover:translate-y-1 transition-all ${color}`}
    >
      <span className="text-3xl">{icon}</span>
      <span className="font-black font-mono uppercase text-sm">{label}</span>
    </Link>
  );
}

function RecentLogItem({ log }) {
  return (
    <div className="flex items-start gap-4 p-4 border-b-2 border-black last:border-0">
      <div className="w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center text-xl flex-shrink-0">
        {log.username ? '👤' : '🤖'}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-black font-mono text-sm">
            {log.username || '系统'}
          </span>
          <span className="text-xs font-mono bg-[#ffeb3b] px-2 py-0.5 border border-black">
            {log.action}
          </span>
        </div>
        <p className="text-sm text-gray-600 font-mono mb-1">
          {log.entityType && `${log.entityType} #${log.entityId}`}
        </p>
        <p className="text-xs text-gray-400 font-mono">
          {new Date(log.createdAt).toLocaleString('zh-CN')}
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    try {
      const token = getToken();
      const [statsData, interactionData] = await Promise.all([
        apiRequest('/admin/statistics', { token }),
        apiRequest('/interactions/dashboard/stats', { token })
      ]);

      const combinedStats = {
        ...(statsData || {}),
        ...(interactionData || {})
      };

      setRecentLogs(statsData?.recentLogs || []);
      setStats(combinedStats);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono text-lg">加载数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">仪表板</h1>
        <p className="font-mono text-gray-600">欢迎回来，管理员！</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <StatCard
          icon="👥"
          label="总用户数"
          value={stats?.totalUsers || 0}
          color="bg-blue-50"
        />
        <StatCard
          icon="💼"
          label="总案例数"
          value={stats?.totalCases || 0}
          color="bg-green-50"
        />
        <StatCard
          icon="⏳"
          label="待审核用户"
          value={stats?.pendingUsers || 0}
          color="bg-yellow-50"
          trend={{ positive: false, value: stats?.pendingUsers > 0 ? `${stats.pendingUsers}个` : '0个' }}
        />
        <StatCard
          icon="📝"
          label="待审核案例"
          value={stats?.pendingCases || 0}
          color="bg-red-50"
          trend={{ positive: false, value: stats?.pendingCases > 0 ? `${stats.pendingCases}个` : '0个' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon="👁️"
          label="总点击量"
          value={stats?.totalViews || 0}
          color="bg-purple-50"
        />
        <StatCard
          icon="❤️"
          label="总点赞数"
          value={stats?.totalLikes || 0}
          color="bg-pink-50"
        />
        <StatCard
          icon="💬"
          label="总评论数"
          value={stats?.totalComments || 0}
          color="bg-indigo-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="brutal-card bg-white p-6">
          <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
            快捷操作
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <QuickAction
              icon="👥"
              label="用户管理"
              to="/admin/users"
              color="bg-white"
            />
            <QuickAction
              icon="💼"
              label="案例管理"
              to="/admin/cases"
              color="bg-white"
            />
            <QuickAction
              icon="📝"
              label="审计日志"
              to="/admin/logs"
              color="bg-white"
            />
          </div>
        </div>

        <div className="brutal-card bg-white p-6">
          <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
            最近操作
          </h2>
          <div className="max-h-80 overflow-y-auto">
            {recentLogs.length > 0 ? (
              recentLogs.slice(0, 5).map((log, index) => (
                <RecentLogItem key={log.id || index} log={log} />
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📭</div>
                <p className="font-mono text-gray-500">暂无操作记录</p>
              </div>
            )}
          </div>
          {recentLogs.length > 0 && (
            <div className="pt-4 border-t-4 border-black mt-4">
              <Link
                to="/admin/logs"
                className="font-mono text-sm text-gray-600 hover:text-black underline"
              >
                查看全部日志 →
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="brutal-card bg-white p-6 mb-8">
        <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
          🔥 热门案例TOP10
        </h2>
        <div className="space-y-3">
          {stats?.topCases?.length > 0 ? (
            stats.topCases.map((c, index) => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                <div className="flex items-center gap-3">
                  <span className="font-black font-mono text-lg w-8 text-center">
                    #{index + 1}
                  </span>
                  <span className="text-2xl">{c.logo}</span>
                  <span className="font-mono font-bold">{c.title}</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-sm">
                  <span className="text-gray-600">👁️ {c.viewCount}</span>
                  <span className="text-gray-600">❤️ {c.likeCount}</span>
                  <span className="text-gray-600">💬 {c.commentCount}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📊</div>
              <p className="font-mono text-gray-500">暂无数据</p>
            </div>
          )}
        </div>
      </div>

      <div className="brutal-card bg-[#ffeb3b] p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💡</span>
          <div>
            <h3 className="font-black font-mono uppercase mb-2">系统提示</h3>
            <p className="font-sans text-sm">
              请定期检查待审核的用户和案例，确保系统正常运行。
              所有操作都会被记录在审计日志中。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
