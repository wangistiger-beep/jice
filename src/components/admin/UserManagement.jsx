import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiRequest } from '../../lib/api';

function UserStatusBadge({ status }) {
  const statusConfig = {
    pending: { label: '待审核', color: 'bg-yellow-100 border-yellow-500' },
    approved: { label: '已批准', color: 'bg-green-100 border-green-500' },
    rejected: { label: '已拒绝', color: 'bg-red-100 border-red-500' },
  };
  
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <span className={`tag ${config.color}`}>
      {config.label}
    </span>
  );
}

function UserRoleBadge({ role }) {
  return (
    <span className={`tag ${role === 'admin' ? 'bg-red-100 border-red-500' : 'bg-gray-100 border-gray-500'}`}>
      {role === 'admin' ? '管理员' : '用户'}
    </span>
  );
}

function UserRow({ user, onApprove, onReject, loading }) {
  return (
    <div className="brutal-card bg-white p-4 mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-200 border-4 border-black flex items-center justify-center text-2xl flex-shrink-0">
            👤
          </div>
          <div>
            <h3 className="font-black font-mono text-lg mb-1">{user.username}</h3>
            <p className="font-mono text-sm text-gray-600 mb-2">{user.email}</p>
            <div className="flex flex-wrap gap-2">
              <UserStatusBadge status={user.status} />
              <UserRoleBadge role={user.role} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <p className="font-mono text-xs text-gray-400">
            注册于: {new Date(user.createdAt).toLocaleDateString('zh-CN')}
          </p>
          
          {user.status === 'pending' && (
            <div className="flex gap-2">
              <button
                onClick={() => onApprove(user.id)}
                disabled={loading}
                className="brutal-btn bg-green-500 text-white px-4 py-2 text-sm font-mono uppercase disabled:opacity-50"
              >
                ✅ 批准
              </button>
              <button
                onClick={() => onReject(user.id)}
                disabled={loading}
                className="brutal-btn bg-red-500 text-white px-4 py-2 text-sm font-mono uppercase disabled:opacity-50"
              >
                ❌ 拒绝
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const fetchUsers = useCallback(async () => {
    try {
      const token = getToken();
      const data = await apiRequest('/admin/users', { token });
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const handleApprove = async (userId) => {
    setActionLoading(userId);
    try {
      const token = getToken();
      await apiRequest(`/admin/users/${userId}/approve`, { method: 'PUT', token });
      await fetchUsers();
    } catch (error) {
      console.error('Failed to approve user:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId) => {
    setActionLoading(userId);
    try {
      const token = getToken();
      await apiRequest(`/admin/users/${userId}/reject`, { method: 'PUT', token });
      await fetchUsers();
    } catch (error) {
      console.error('Failed to reject user:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(u => u.status === filter);

  const pendingCount = users.filter(u => u.status === 'pending').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono text-lg">加载用户中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">用户管理</h1>
        <p className="font-mono text-gray-600">管理所有用户和审核注册申请</p>
      </div>

      <div className="brutal-card bg-white p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-black font-mono uppercase text-sm">筛选:</span>
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`brutal-btn px-4 py-2 text-sm font-mono uppercase ${
                filter === f ? 'bg-[#ffeb3b]' : 'bg-gray-100'
              }`}
            >
              {f === 'all' ? '全部' : 
               f === 'pending' ? `待审核 (${pendingCount})` :
               f === 'approved' ? '已批准' : '已拒绝'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onApprove={handleApprove}
              onReject={handleReject}
              loading={actionLoading === user.id}
            />
          ))
        ) : (
          <div className="brutal-card bg-white p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="font-mono text-lg text-gray-600">
              {filter === 'pending' ? '暂无待审核用户' : '暂无用户'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
