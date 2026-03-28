import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiRequest } from '../../lib/api';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const fetchLogs = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiRequest('/admin/audit-logs', { token });
      setLogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono text-lg">加载日志中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">审计日志</h1>
        <p className="font-mono text-gray-600">查看所有系统操作记录</p>
      </div>

      <div className="brutal-card bg-white p-6">
        {logs.length > 0 ? (
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div key={log.id || index} className="flex items-start gap-4 p-4 border-b-2 border-black last:border-0">
                <div className="w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center text-xl flex-shrink-0">
                  {log.username ? '👤' : '🤖'}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-black font-mono text-sm">
                      {log.username || '系统'}
                    </span>
                    <span className="text-xs font-mono bg-[#ffeb3b] px-2 py-0.5 border border-black">
                      {log.action}
                    </span>
                    {log.entityType && (
                      <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 border border-black">
                        {log.entityType} #{log.entityId}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    {new Date(log.createdAt).toLocaleString('zh-CN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="font-mono text-lg text-gray-600">暂无审计日志</p>
          </div>
        )}
      </div>
    </div>
  );
}
