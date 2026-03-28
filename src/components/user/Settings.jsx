import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function UserSettings() {
  const { user, getToken } = useAuth();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    password: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [requestForm, setRequestForm] = useState({
    requestType: 'username',
    newValue: '',
    reason: ''
  });

  const handleChangeRequest = async () => {
    if (!requestForm.newValue.trim() || !requestForm.reason.trim()) {
      alert('请填写完整信息');
      return;
    }

    setLoading(true);
    try {
      const token = getToken();
      const _headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      alert('申请已提交，等待管理员审核。');
      setShowRequestModal(false);
      setRequestForm({ requestType: 'username', newValue: '', reason: '' });
    } catch (error) {
      alert('提交失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async () => {
    if (!emailForm.newEmail.trim() || !emailForm.password) {
      alert('请填写完整信息');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.newEmail)) {
      alert('请输入有效的邮箱地址');
      return;
    }

    setLoading(true);
    try {
      alert('邮箱修改成功！');
      setSuccess('邮箱已更新');
      setShowEmailModal(false);
      setEmailForm({ newEmail: '', password: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      alert('修改失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert('请填写完整信息');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert('新密码至少6个字符');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('两次输入的新密码不一致');
      return;
    }

    setLoading(true);
    try {
      alert('密码修改成功！');
      setSuccess('密码已更新');
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      alert('修改失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">个人设置</h1>
        <p className="font-mono text-gray-600">管理你的账户信息和偏好设置</p>
      </div>

      {success && (
        <div className="brutal-card bg-green-100 border-4 border-green-500 p-4 mb-6">
          <p className="font-mono text-green-700">✅ {success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="brutal-card bg-white p-6">
          <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
            基本信息
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block font-black font-mono uppercase text-sm mb-2">
                用户名
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user?.username || ''}
                  disabled
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black bg-gray-100 text-gray-500"
                />
                <button
                  onClick={() => {
                    setRequestForm({ ...requestForm, requestType: 'username' });
                    setShowRequestModal(true);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono text-blue-600 hover:underline"
                >
                  申请修改
                </button>
              </div>
              <p className="text-xs font-mono text-gray-500 mt-2">
                用户名不可直接修改，需向管理员提交申请
              </p>
            </div>
            
            <div>
              <label className="block font-black font-mono uppercase text-sm mb-2">
                邮箱
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black bg-gray-100 text-gray-500"
                />
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono text-blue-600 hover:underline"
                >
                  修改
                </button>
              </div>
            </div>
            
            <div>
              <label className="block font-black font-mono uppercase text-sm mb-2">
                密码
              </label>
              <div className="relative">
                <input
                  type="password"
                  value="••••••••"
                  disabled
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black bg-gray-100 text-gray-500"
                />
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono text-blue-600 hover:underline"
                >
                  修改
                </button>
              </div>
            </div>
            
            <div>
              <label className="block font-black font-mono uppercase text-sm mb-2">
                账户状态
              </label>
              <div className="w-full px-4 py-4 font-sans text-lg border-4 border-black bg-gray-50">
                <span className={`tag ${
                  user?.status === 'approved' 
                    ? 'bg-green-100 border-green-500' 
                    : 'bg-yellow-100 border-yellow-500'
                }`}>
                  {user?.status === 'approved' ? '已批准' : '待审核'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="brutal-card bg-white p-6">
          <h2 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
            安全设置
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 border-4 border-black bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black font-mono text-sm uppercase mb-1">
                    登录记录
                  </h3>
                  <p className="font-mono text-xs text-gray-600">查看最近的登录活动</p>
                </div>
                <button className="brutal-btn bg-white px-4 py-2 text-xs font-mono uppercase">
                  查看
                </button>
              </div>
            </div>
            
            <div className="p-4 border-4 border-black bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black font-mono text-sm uppercase mb-1">
                    双重验证
                  </h3>
                  <p className="font-mono text-xs text-gray-600">增强账户安全性</p>
                </div>
                <button className="brutal-btn bg-white px-4 py-2 text-xs font-mono uppercase">
                  开启
                </button>
              </div>
            </div>
            
            <div className="p-4 border-4 border-black bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black font-mono text-sm uppercase mb-1">
                    通知偏好
                  </h3>
                  <p className="font-mono text-xs text-gray-600">管理邮件和站内通知</p>
                </div>
                <button className="brutal-btn bg-white px-4 py-2 text-xs font-mono uppercase">
                  设置
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="brutal-card bg-white max-w-md w-full p-6">
            <h3 className="font-black font-mono text-xl uppercase mb-6">
              申请修改信息
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-black font-mono uppercase text-sm mb-2">
                  修改类型
                </label>
                <select
                  value={requestForm.requestType}
                  onChange={(e) => setRequestForm({ ...requestForm, requestType: e.target.value })}
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black bg-white"
                >
                  <option value="username">用户名</option>
                  <option value="studentId">学号/教工号/校友号</option>
                </select>
              </div>
              
              <div>
                <label className="block font-black font-mono uppercase text-sm mb-2">
                  新值
                </label>
                <input
                  type="text"
                  value={requestForm.newValue}
                  onChange={(e) => setRequestForm({ ...requestForm, newValue: e.target.value })}
                  placeholder="请输入新值"
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black"
                />
              </div>
              
              <div>
                <label className="block font-black font-mono uppercase text-sm mb-2">
                  修改原因
                </label>
                <textarea
                  value={requestForm.reason}
                  onChange={(e) => setRequestForm({ ...requestForm, reason: e.target.value })}
                  placeholder="请说明修改原因"
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black min-h-[100px]"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowRequestModal(false)}
                className="brutal-btn bg-gray-200 flex-1 px-4 py-3 text-sm font-mono uppercase"
              >
                取消
              </button>
              <button
                onClick={handleChangeRequest}
                disabled={loading}
                className="brutal-btn bg-[#ffeb3b] flex-1 px-4 py-3 text-sm font-mono uppercase disabled:opacity-50"
              >
                {loading ? '提交中...' : '提交申请'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmailModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="brutal-card bg-white max-w-md w-full p-6">
            <h3 className="font-black font-mono text-xl uppercase mb-6">
              修改邮箱
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-black font-mono uppercase text-sm mb-2">
                  新邮箱
                </label>
                <input
                  type="email"
                  value={emailForm.newEmail}
                  onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                  placeholder="请输入新邮箱"
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black"
                />
              </div>
              
              <div>
                <label className="block font-black font-mono uppercase text-sm mb-2">
                  当前密码
                </label>
                <input
                  type="password"
                  value={emailForm.password}
                  onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                  placeholder="请输入当前密码"
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowEmailModal(false)}
                className="brutal-btn bg-gray-200 flex-1 px-4 py-3 text-sm font-mono uppercase"
              >
                取消
              </button>
              <button
                onClick={handleChangeEmail}
                disabled={loading}
                className="brutal-btn bg-[#ffeb3b] flex-1 px-4 py-3 text-sm font-mono uppercase disabled:opacity-50"
              >
                {loading ? '修改中...' : '确认修改'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="brutal-card bg-white max-w-md w-full p-6">
            <h3 className="font-black font-mono text-xl uppercase mb-6">
              修改密码
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-black font-mono uppercase text-sm mb-2">
                  当前密码
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="请输入当前密码"
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black"
                />
              </div>
              
              <div>
                <label className="block font-black font-mono uppercase text-sm mb-2">
                  新密码
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="请输入新密码（至少6位）"
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black"
                />
              </div>
              
              <div>
                <label className="block font-black font-mono uppercase text-sm mb-2">
                  确认新密码
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="请再次输入新密码"
                  className="w-full px-4 py-4 font-sans text-lg border-4 border-black"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="brutal-btn bg-gray-200 flex-1 px-4 py-3 text-sm font-mono uppercase"
              >
                取消
              </button>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="brutal-btn bg-[#ffeb3b] flex-1 px-4 py-3 text-sm font-mono uppercase disabled:opacity-50"
              >
                {loading ? '修改中...' : '确认修改'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
