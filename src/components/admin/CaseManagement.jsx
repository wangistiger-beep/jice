import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiRequest } from '../../lib/api';

function CaseStatusBadge({ status }) {
  const statusConfig = {
    draft: { label: '草稿', color: 'bg-gray-100 border-gray-500' },
    pending: { label: '待审核', color: 'bg-yellow-100 border-yellow-500' },
    published: { label: '已发布', color: 'bg-green-100 border-green-500' },
    rejected: { label: '已拒绝', color: 'bg-red-100 border-red-500' },
  };
  
  const config = statusConfig[status] || statusConfig.draft;
  
  return (
    <span className={`tag ${config.color}`}>
      {config.label}
    </span>
  );
}

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = '确认', cancelText = '取消', type = 'warning' }) {
  if (!isOpen) return null;

  const bgColors = {
    warning: 'bg-yellow-100',
    danger: 'bg-red-100',
    info: 'bg-blue-100'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`brutal-card bg-white p-6 max-w-md w-full mx-4`}>
        <div className={`${bgColors[type]} border-4 border-black p-4 mb-4`}>
          <h3 className="font-black font-mono text-xl uppercase">{title}</h3>
        </div>
        <p className="font-mono text-gray-700 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="brutal-btn bg-gray-200 px-4 py-2 text-sm font-mono uppercase"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`brutal-btn px-4 py-2 text-sm font-mono uppercase text-white ${
              type === 'danger' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`fixed top-4 right-4 brutal-card ${bgColors[type]} text-white p-4 z-50`}>
      <p className="font-mono font-bold">{message}</p>
    </div>
  );
}

export default function CaseManagement() {
  const [cases, setCases] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: 'warning', title: '', message: '', onConfirm: null });
  const [toast, setToast] = useState(null);
  const { getToken } = useAuth();

  const fetchCases = useCallback(async () => {
    try {
      const token = getToken();

      const endpoint = filter === 'pending' 
        ? '/admin/cases/pending'
        : '/cases';

      const data = await apiRequest(endpoint, { token });
      setCases(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch cases:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, getToken]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const handleApprove = async (caseId) => {
    setActionLoading(caseId);
    try {
      const token = getToken();
      await apiRequest(`/admin/cases/${caseId}/approve`, {
        method: 'PUT',
        token,
        body: { reviewNotes: '审核通过' },
      });
      setToast({ message: '案例已批准', type: 'success' });
      await fetchCases();
    } catch (error) {
      console.error('Failed to approve case:', error);
      setToast({ message: '批准失败', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (caseId) => {
    setActionLoading(caseId);
    try {
      const token = getToken();
      await apiRequest(`/admin/cases/${caseId}/reject`, {
        method: 'PUT',
        token,
        body: { reviewNotes: '审核未通过' },
      });
      setToast({ message: '案例已拒绝', type: 'success' });
      await fetchCases();
    } catch (error) {
      console.error('Failed to reject case:', error);
      setToast({ message: '拒绝失败', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReturnToPending = async (caseId) => {
    setConfirmDialog({
      isOpen: true,
      type: 'warning',
      title: '退回待审核',
      message: '确定要将此案例退回待审核吗？退回后案例将不再在首页显示。',
      confirmText: '确定退回',
      cancelText: '取消',
      onConfirm: async () => {
        setActionLoading(caseId);
        setConfirmDialog({ isOpen: false, onConfirm: null });
        try {
          const token = getToken();
          await apiRequest(`/admin/cases/${caseId}/return-to-pending`, {
            method: 'PUT',
            token,
            body: { reviewNotes: '管理员退回待审核' },
          });
          setToast({ message: '案例已退回待审核', type: 'success' });
          await fetchCases();
        } catch (error) {
          console.error('Failed to return case:', error);
          setToast({ message: '退回失败', type: 'error' });
        } finally {
          setActionLoading(null);
        }
      }
    });
  };

  const handleDelete = async (caseId) => {
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: '删除案例',
      message: '确定要删除此案例吗？此操作不可恢复！',
      confirmText: '确定删除',
      cancelText: '取消',
      onConfirm: async () => {
        setActionLoading(caseId);
        setConfirmDialog({ isOpen: false, onConfirm: null });
        try {
          const token = getToken();
          await apiRequest(`/admin/cases/${caseId}`, { method: 'DELETE', token });
          setToast({ message: '案例已删除', type: 'success' });
          await fetchCases();
        } catch (error) {
          console.error('Failed to delete case:', error);
          setToast({ message: '删除失败', type: 'error' });
        } finally {
          setActionLoading(null);
        }
      }
    });
  };

  const handleRecommend = async (caseId) => {
    setActionLoading(caseId);
    try {
      const token = getToken();
      await apiRequest(`/admin/cases/${caseId}/recommend`, { method: 'PUT', token });
      setToast({ message: '案例已推荐到首页', type: 'success' });
      await fetchCases();
    } catch (error) {
      console.error('Failed to recommend case:', error);
      setToast({ message: '推荐失败', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnrecommend = async (caseId) => {
    setActionLoading(caseId);
    try {
      const token = getToken();
      await apiRequest(`/admin/cases/${caseId}/unrecommend`, { method: 'PUT', token });
      setToast({ message: '案例已取消推荐', type: 'success' });
      await fetchCases();
    } catch (error) {
      console.error('Failed to unrecommend case:', error);
      setToast({ message: '取消推荐失败', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono text-lg">加载案例中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">案例管理</h1>
        <p className="font-mono text-gray-600">管理所有案例和审核发布</p>
      </div>

      <div className="brutal-card bg-white p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-black font-mono uppercase text-sm">筛选:</span>
          {['pending', 'published', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`brutal-btn px-4 py-2 text-sm font-mono uppercase ${
                filter === f ? 'bg-[#ffeb3b]' : 'bg-gray-100'
              }`}
            >
              {f === 'pending' ? '待审核' :
               f === 'published' ? '已发布' : '已拒绝'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {cases.length > 0 ? (
          cases.map((c) => (
            <div key={c.id} className="brutal-card bg-white p-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ffeb3b] border-4 border-black flex items-center justify-center text-2xl flex-shrink-0">
                    {c.logo || '📋'}
                  </div>
                  <div>
                    <h3 className="font-black font-mono text-lg mb-1">{c.title}</h3>
                    <p className="font-mono text-sm text-gray-600 mb-2">
                      作者: {c.authorName || '未知'}
                    </p>
                    <CaseStatusBadge status={c.status} />
                  </div>
                </div>
                
                {c.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(c.id)}
                      disabled={actionLoading === c.id}
                      className="brutal-btn bg-green-500 text-white px-4 py-2 text-sm font-mono uppercase disabled:opacity-50"
                    >
                      ✅ 批准
                    </button>
                    <button
                      onClick={() => handleReject(c.id)}
                      disabled={actionLoading === c.id}
                      className="brutal-btn bg-red-500 text-white px-4 py-2 text-sm font-mono uppercase disabled:opacity-50"
                    >
                      ❌ 拒绝
                    </button>
                  </div>
                )}
                {c.status === 'published' && (
                  <div className="flex flex-wrap gap-2">
                    {c.isRecommended ? (
                      <button
                        onClick={() => handleUnrecommend(c.id)}
                        disabled={actionLoading === c.id}
                        className="brutal-btn bg-purple-600 text-white px-4 py-2 text-sm font-mono uppercase disabled:opacity-50"
                      >
                        ⭐ 已推荐
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRecommend(c.id)}
                        disabled={actionLoading === c.id}
                        className="brutal-btn bg-purple-500 text-white px-4 py-2 text-sm font-mono uppercase disabled:opacity-50"
                      >
                        ⭐ 推荐
                      </button>
                    )}
                    <button
                      onClick={() => handleReturnToPending(c.id)}
                      disabled={actionLoading === c.id}
                      className="brutal-btn bg-yellow-500 text-white px-4 py-2 text-sm font-mono uppercase disabled:opacity-50"
                    >
                      ↩️ 退回待审核
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={actionLoading === c.id}
                      className="brutal-btn bg-red-600 text-white px-4 py-2 text-sm font-mono uppercase disabled:opacity-50"
                    >
                      🗑️ 删除
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="brutal-card bg-white p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="font-mono text-lg text-gray-600">
              {filter === 'pending' ? '暂无待审核案例' : '暂无案例'}
            </p>
          </div>
        )}
      </div>
      
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        type={confirmDialog.type}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, onConfirm: null })}
      />
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
