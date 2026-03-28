import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function InputField({ label, type, value, onChange, placeholder, error, icon }) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-5">
      <label className="block font-black font-mono uppercase text-sm mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
            {icon}
          </span>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-4 font-sans text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-[#ffeb3b] ${
            icon ? 'pl-14' : ''
          } ${error ? 'border-red-500' : ''}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl hover:scale-110 transition-transform"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 font-mono text-sm mt-2">⚠️ {error}</p>
      )}
    </div>
  );
}

function Button({ children, type = 'primary', onClick, disabled, loading }) {
  const baseClass = 'brutal-btn font-black font-mono uppercase px-8 py-4 text-lg w-full transition-all';
  const primaryClass = 'bg-[#ffeb3b]';
  const secondaryClass = 'bg-black text-white';

  return (
    <button
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClass} ${type === 'primary' ? primaryClass : secondaryClass} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? '加载中...' : children}
    </button>
  );
}

function SuccessMessage({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="brutal-card bg-white max-w-md w-full p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="font-black font-mono text-xl uppercase mb-4">成功！</h3>
        <p className="font-sans text-gray-700 mb-6">{message}</p>
        <Button onClick={onClose}>确定</Button>
      </div>
    </div>
  );
}

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少3个字符';
    }

    if (mode === 'register') {
      if (!formData.email.trim()) {
        newErrors.email = '请输入邮箱';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '请输入有效的邮箱地址';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = '请确认密码';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let result;
      
      if (mode === 'login') {
        result = await login(formData.username, formData.password, isAdmin);
      } else {
        result = await register(formData.username, formData.email, formData.password);
      }

      if (result.success) {
        if (mode === 'register') {
          setSuccessMessage(result.message || '注册成功，请等待管理员审核');
          setShowSuccess(true);
        } else {
          navigate('/');
        }
      } else {
        setApiError(result.error);
      }
    } catch {
      setApiError('发生错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setApiError('');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4">
      <div className="max-w-md mx-auto">
        <Link to="/" className="block text-center mb-8">
          <div className="text-6xl mb-2">💀</div>
          <h1 className="font-black font-mono text-3xl uppercase">Loot Drop</h1>
        </Link>

        <div className="brutal-card bg-white p-8">
          <div className="flex mb-8 border-b-4 border-black">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-3 font-black font-mono uppercase text-sm transition-all ${
                mode === 'login'
                  ? 'bg-[#ffeb3b] border-b-4 border-black -mb-1'
                  : 'hover:bg-gray-100'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-3 font-black font-mono uppercase text-sm transition-all ${
                mode === 'register'
                  ? 'bg-[#ffeb3b] border-b-4 border-black -mb-1'
                  : 'hover:bg-gray-100'
              }`}
            >
              注册
            </button>
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-center mb-6 gap-4">
              <span className="font-mono text-sm">用户登录</span>
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className={`w-14 h-8 border-4 border-black transition-all ${
                  isAdmin ? 'bg-[#ff3b3b]' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white border-2 border-black transition-all ${
                    isAdmin ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="font-mono text-sm">管理员</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="用户名"
              type="text"
              value={formData.username}
              onChange={(v) => handleInputChange('username', v)}
              placeholder="请输入用户名"
              icon="👤"
              error={errors.username}
            />

            {mode === 'register' && (
              <InputField
                label="邮箱"
                type="email"
                value={formData.email}
                onChange={(v) => handleInputChange('email', v)}
                placeholder="请输入邮箱地址"
                icon="📧"
                error={errors.email}
              />
            )}

            <InputField
              label="密码"
              type="password"
              value={formData.password}
              onChange={(v) => handleInputChange('password', v)}
              placeholder="请输入密码"
              icon="🔒"
              error={errors.password}
            />

            {mode === 'register' && (
              <InputField
                label="确认密码"
                type="password"
                value={formData.confirmPassword}
                onChange={(v) => handleInputChange('confirmPassword', v)}
                placeholder="请再次输入密码"
                icon="🔐"
                error={errors.confirmPassword}
              />
            )}

            {apiError && (
              <div className="bg-red-100 border-4 border-red-500 p-4 mb-6">
                <p className="font-mono text-red-700 text-sm">
                  ❌ {apiError}
                </p>
              </div>
            )}

            <div className="mb-6 text-center">
              <button
                type="button"
                className="font-mono text-sm text-gray-600 hover:text-black underline"
              >
                忘记密码？
              </button>
            </div>

            <Button loading={loading}>
              {mode === 'login' ? (isAdmin ? '管理员登录' : '登录') : '注册新账号'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t-4 border-black text-center">
            {mode === 'login' ? (
              <p className="font-sans text-gray-600">
                还没有账号？{' '}
                <button
                  onClick={() => switchMode('register')}
                  className="font-black font-mono uppercase text-sm underline hover:text-[#ff3b3b]"
                >
                  立即注册
                </button>
              </p>
            ) : (
              <p className="font-sans text-gray-600">
                已有账号？{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="font-black font-mono uppercase text-sm underline hover:text-[#ff3b3b]"
                >
                  立即登录
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-8 font-mono text-xs text-gray-500">
          <p>默认管理员账号：admin / admin123</p>
        </div>
      </div>

      {showSuccess && (
        <SuccessMessage
          message={successMessage}
          onClose={() => {
            setShowSuccess(false);
            switchMode('login');
          }}
        />
      )}
    </div>
  );
}
