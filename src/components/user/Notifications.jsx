export default function Notifications() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">消息通知</h1>
        <p className="font-mono text-gray-600">查看系统通知和审核结果</p>
      </div>

      <div className="brutal-card bg-white p-12 text-center">
        <div className="text-6xl mb-4">🔔</div>
        <p className="font-mono text-lg text-gray-600">
          暂无消息通知
        </p>
      </div>
    </div>
  );
}
