export default function Settings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">系统设置</h1>
        <p className="font-mono text-gray-600">配置系统参数和选项</p>
      </div>

      <div className="brutal-card bg-white p-6 mb-6">
        <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
          基本设置
        </h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚙️</div>
          <p className="font-mono text-lg text-gray-600">系统设置功能开发中...</p>
        </div>
      </div>

      <div className="brutal-card bg-white p-6">
        <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
          安全设置
        </h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔒</div>
          <p className="font-mono text-lg text-gray-600">安全设置功能开发中...</p>
        </div>
      </div>
    </div>
  );
}
