import { Link } from 'react-router-dom';

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`brutal-card bg-white p-6 ${color}`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{icon}</span>
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

export default function UserDashboard() {
  const stats = [
    { icon: '💼', label: '已提交案例', value: '0', color: 'bg-blue-50' },
    { icon: '⏳', label: '审核中', value: '0', color: 'bg-yellow-50' },
    { icon: '✅', label: '已发布', value: '0', color: 'bg-green-50' },
    { icon: '🔔', label: '未读消息', value: '0', color: 'bg-red-50' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">仪表板</h1>
        <p className="font-mono text-gray-600">欢迎回来！这是你的个人数据概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="brutal-card bg-white p-6">
          <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
            快捷操作
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <QuickAction
              icon="✏️"
              label="提交新案例"
              to="/user/submit"
              color="bg-white"
            />
            <QuickAction
              icon="💼"
              label="查看我的案例"
              to="/user/cases"
              color="bg-white"
            />
            <QuickAction
              icon="🔔"
              label="查看消息"
              to="/user/notifications"
              color="bg-white"
            />
          </div>
        </div>

        <div className="brutal-card bg-white p-6">
          <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
            最近动态
          </h2>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📭</div>
            <p className="font-mono text-lg text-gray-600">暂无活动记录</p>
          </div>
        </div>
      </div>

      <div className="brutal-card bg-[#ffeb3b] p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💡</span>
          <div>
            <h3 className="font-black font-mono uppercase mb-2">提示</h3>
            <p className="font-sans text-sm">
              你可以通过提交失败案例来帮助其他创业者学习。
              提交的案例会经过管理员审核后发布。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
