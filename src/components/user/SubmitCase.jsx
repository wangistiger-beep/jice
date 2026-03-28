import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CaseEditor from '../CaseEditor';

export default function SubmitCase() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setShowSuccess(true);
  };

  const handleCancel = () => {
    navigate('/user');
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/user/cases');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black font-mono text-3xl uppercase mb-2">提交新案例</h1>
        <p className="font-mono text-gray-600">分享失败案例，帮助其他创业者学习</p>
      </div>

      <CaseEditor onSave={handleSave} onCancel={handleCancel} />

      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="brutal-card bg-white max-w-md w-full p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="font-black font-mono text-xl uppercase mb-4">提交成功！</h3>
            <p className="font-sans text-gray-700 mb-6">
              你的案例已提交，等待管理员审核。审核通过后将公开发布。
            </p>
            <button
              onClick={handleSuccessClose}
              className="brutal-btn bg-[#ffeb3b] px-6 py-3 text-sm font-mono uppercase"
            >
              查看我的案例
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
