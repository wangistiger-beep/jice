import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CaseEditor from '../CaseEditor';
import { apiRequest } from '../../lib/api';

function CaseStatusBadge({ status }) {
  const statusConfig = {
    draft: { label: '草稿', color: 'bg-gray-100 border-gray-500' },
    pending: { label: '审核中', color: 'bg-yellow-100 border-yellow-500' },
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

const formatDate = (dateStr) => {
  const date = dateStr ? new Date(dateStr) : new Date();
  return date.toLocaleDateString('zh-CN');
};

function CaseRow({ caseItem, onEdit, onDelete, onView }) {
  return (
    <div className="brutal-card bg-white p-4 mb-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#ffeb3b] border-4 border-black flex items-center justify-center text-2xl flex-shrink-0">
            {caseItem.logo || '📋'}
          </div>
          <div className="flex-1">
            <h3 className="font-black font-mono text-lg mb-1">{caseItem.title}</h3>
            <p className="font-mono text-sm text-gray-600 mb-2">
              {caseItem.category}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <CaseStatusBadge status={caseItem.status} />
            </div>
            {caseItem.tags && caseItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {caseItem.tags.map(tag => (
                  <span key={tag} className="tag bg-gray-100 text-xs px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-gray-400 mt-2">
              提交于: {formatDate(caseItem.createdAt)}
            </p>
            {caseItem.status === 'rejected' && caseItem.reviewNotes && (
              <div className="mt-3 p-3 bg-red-50 border-2 border-red-300">
                <p className="font-mono text-sm text-red-700">
                  <span className="font-black">审核意见：</span>
                  {caseItem.reviewNotes}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {caseItem.status !== 'published' && (
            <button
              onClick={() => onEdit(caseItem)}
              className="brutal-btn bg-[#ffeb3b] px-4 py-2 text-sm font-mono uppercase"
            >
              ✏️ 编辑
            </button>
          )}
          {caseItem.status === 'published' && (
            <button
              onClick={() => onView(caseItem)}
              className="brutal-btn bg-blue-500 text-white px-4 py-2 text-sm font-mono uppercase"
            >
              👁️ 查看
            </button>
          )}
          {caseItem.status === 'rejected' && (
            <button
              onClick={() => onEdit(caseItem)}
              className="brutal-btn bg-green-500 text-white px-4 py-2 text-sm font-mono uppercase"
            >
              🔄 重新提交
            </button>
          )}
          {caseItem.status !== 'published' && (
            <button
              onClick={() => onDelete(caseItem)}
              className="brutal-btn bg-red-500 text-white px-4 py-2 text-sm font-mono uppercase"
            >
              🗑️ 删除
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState(null);
  const [filter, setFilter] = useState('all');
  const { getToken } = useAuth();

  const fetchMyCases = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiRequest('/cases/my/submissions', { token });
      setCases(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch cases:', error);
      setCases([]);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchMyCases();
  }, [fetchMyCases]);

  const handleEdit = (caseItem) => {
    setEditingCase(caseItem);
  };

  const handleDelete = async (caseItem) => {
    if (!confirm('确定要删除这个案例吗？此操作不可撤销。')) {
      return;
    }

    try {
      const token = getToken();
      await apiRequest(`/cases/${caseItem.id}`, { method: 'DELETE', token });
      await fetchMyCases();
    } catch (error) {
      alert('删除失败: ' + error.message);
    }
  };

  const handleView = (caseItem) => {
    window.open(`/startup/${caseItem.id}`, '_blank');
  };

  const handleSave = () => {
    setEditingCase(null);
    fetchMyCases();
  };

  const handleCancel = () => {
    setEditingCase(null);
  };

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(c => c.status === filter);

  if (editingCase) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-black font-mono text-3xl uppercase mb-2">编辑案例</h1>
          <p className="font-mono text-gray-600">修改你的案例内容</p>
        </div>
        <CaseEditor
          caseData={editingCase}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

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
        <h1 className="font-black font-mono text-3xl uppercase mb-2">我的案例</h1>
        <p className="font-mono text-gray-600">查看和管理你提交的所有案例</p>
      </div>

      <div className="brutal-card bg-white p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-black font-mono uppercase text-sm">筛选:</span>
          {['all', 'draft', 'pending', 'published', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`brutal-btn px-4 py-2 text-sm font-mono uppercase ${
                filter === f ? 'bg-[#ffeb3b]' : 'bg-gray-100'
              }`}
            >
              {f === 'all' ? '全部' :
               f === 'draft' ? '草稿' :
               f === 'pending' ? '审核中' :
               f === 'published' ? '已发布' : '已拒绝'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredCases.length > 0 ? (
          filteredCases.map((c) => (
            <CaseRow
              key={c.id}
              caseItem={c}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))
        ) : (
          <div className="brutal-card bg-white p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="font-mono text-lg text-gray-600 mb-6">
              {filter === 'all' ? '你还没有提交任何案例' :
               filter === 'pending' ? '暂无待审核案例' :
               filter === 'published' ? '暂无已发布案例' :
               filter === 'rejected' ? '暂无已拒绝案例' : '暂无草稿'}
            </p>
            {filter === 'all' && (
              <a
                href="/user/submit"
                className="brutal-btn bg-[#ffeb3b] px-6 py-3 text-sm font-mono uppercase"
              >
                ✏️ 提交第一个案例
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
