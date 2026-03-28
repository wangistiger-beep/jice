import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { apiRequest } from '../lib/api';

function SectionHeader({ number, title, icon, color = "bg-[#ffeb3b]" }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-14 h-14 ${color} border-4 border-black font-black font-mono text-2xl flex items-center justify-center flex-shrink-0`}>
        {number}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <h2 className="font-black font-mono text-2xl uppercase">{title}</h2>
      </div>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 border-4 border-black font-mono uppercase z-50 animate-pulse`}>
      {message}
    </div>
  );
}

function CommentsSection({ caseId, comments, onCommentAdded, stats, user, getToken }) {
  const [commentText, setCommentText] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      setToast({ message: '请先登录', type: 'error' });
      return;
    }
    if (!commentText.trim()) {
      setToast({ message: '评论内容不能为空', type: 'error' });
      return;
    }

    setActionLoading(true);
    try {
      const token = getToken?.();
      const newComment = await apiRequest(`/interactions/cases/${caseId}/comments`, {
        method: 'POST',
        token,
        body: { content: commentText.trim() },
      });
      const userComment = { ...newComment, username: user.username };
      onCommentAdded(userComment);
      setCommentText('');
      setToast({ message: '评论发表成功', type: 'success' });
    } catch (err) {
      console.error('发表评论失败:', err);
      setToast({ message: '评论发表失败', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="brutal-card bg-gradient-to-br from-blue-50 to-white p-8 border-4 border-blue-200">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b-4 border-blue-200">
        <span className="text-4xl">💬</span>
        <div>
          <h2 className="font-black font-mono text-2xl uppercase">用户评论与互动</h2>
          <p className="font-mono text-sm text-gray-600 mt-1">
            共 {stats.commentCount} 条评论 · 欢迎分享你的看法
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmitComment} className="mb-10 bg-white p-6 border-4 border-black">
        <h3 className="font-black font-mono uppercase text-sm mb-4">发表你的评论</h3>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={user ? "分享你的想法..." : "请先登录后再评论"}
          disabled={!user}
          className="brutal-input w-full px-4 py-3 text-lg font-mono mb-4 bg-gray-50"
          rows={4}
        />
        <div className="flex items-center justify-between">
          <div className="font-mono text-sm text-gray-500">
            {user ? `以 ${user.username} 身份发表` : '需要登录才能评论'}
          </div>
          <button
            type="submit"
            disabled={!user || actionLoading || !commentText.trim()}
            className="brutal-btn bg-[#00b4d8] text-white px-8 py-3 font-mono uppercase disabled:opacity-50"
          >
            {actionLoading ? '发布中...' : '✓ 发表评论'}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-3 border-black p-5 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ffeb3b] border-2 border-black flex items-center justify-center font-black font-mono text-lg">
                    {comment.username?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <span className="font-black font-mono text-lg">👤 {comment.username || '匿名用户'}</span>
                </div>
                <span className="font-mono text-sm text-gray-500 bg-gray-100 px-3 py-1 border border-gray-300">
                  {new Date(comment.createdAt).toLocaleString('zh-CN')}
                </span>
              </div>
              <div className="border-l-4 border-[#00b4d8] pl-4">
                <p className="font-mono text-lg leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-gray-50 border-4 border-dashed border-gray-300">
            <div className="text-6xl mb-6">💭</div>
            <h3 className="font-black font-mono text-xl uppercase mb-3">暂无评论</h3>
            <p className="font-mono text-gray-500 text-lg">成为第一个评论者吧！分享你的见解和思考</p>
          </div>
        )}
      </div>

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

export default function StartupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, getToken } = useAuth();
  const [caseData, setCaseData] = useState(null);
  const [stats, setStats] = useState({ likeCount: 0, commentCount: 0, views: { total: 0 } });
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/interactions/cases/${id}`);
        setCaseData(data);
        setStats({
          likeCount: data.likeCount || 0,
          commentCount: data.commentCount || 0,
          views: data.views || { total: 0 }
        });
        
        await apiRequest(`/interactions/cases/${id}/view`, { method: 'POST' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const data = await apiRequest(`/interactions/cases/${id}/comments`);
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('获取评论失败:', err);
      }
    };

    const checkLikeStatus = async () => {
      if (user) {
        try {
          const token = getToken();
          const data = await apiRequest(`/interactions/cases/${id}/likes`, { token });
          setIsLiked(Boolean(data?.liked));
        } catch (err) {
          console.error('检查点赞状态失败:', err);
        }
      }
    };

    if (id) {
      fetchCase();
      fetchComments();
      checkLikeStatus();
    }
  }, [id, user, getToken]);

  const handleLike = async () => {
    if (!user) {
      setToast({ message: '请先登录', type: 'error' });
      return;
    }
    
    setActionLoading(true);
    try {
      const token = getToken();
      const data = await apiRequest(`/interactions/cases/${id}/like`, { method: 'POST', token });

      setIsLiked(Boolean(data?.liked));
      setStats(prev => ({
        ...prev,
        likeCount: prev.likeCount + (data?.liked ? 1 : -1)
      }));
      setToast({
        message: data?.liked ? '点赞成功' : '取消点赞成功',
        type: 'success'
      });
    } catch (err) {
      console.error('点赞失败:', err);
      setToast({ message: '操作失败', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments(prev => [newComment, ...prev]);
    setStats(prev => ({ ...prev, commentCount: prev.commentCount + 1 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4 animate-pulse">📋</div>
          <h2 className="font-black font-mono text-2xl uppercase mb-4">加载中...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">💀</div>
          <h2 className="font-black font-mono text-2xl uppercase mb-4">{error || '案例未找到'}</h2>
          <Link to="/" className="brutal-btn bg-[#ffeb3b] px-6 py-3 font-mono uppercase">
            返回首页
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isSuccessCase = caseData.caseType === 'success';
  const hasFullData = caseData.profile && (caseData.success || caseData.failure);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="brutal-btn bg-white px-4 py-2 font-mono text-sm mb-6"
        >
          ← 返回
        </button>

        <div className="brutal-card bg-white p-8 mb-8 border-4 border-black shadow-xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl w-24 h-24 flex items-center justify-center border-4 border-black bg-[#ffeb3b] flex-shrink-0 shadow-lg">
              {caseData.logo}
            </div>
            <div className="flex-1">
              <h1 className="font-black font-mono text-4xl uppercase mb-2">{caseData.title}</h1>
              <div className="flex flex-wrap gap-4 font-mono text-sm text-gray-600 mb-4">
                {caseData.profile?.location && <span>📍 {caseData.profile.location}</span>}
                {caseData.profile?.founded && <span>📅 {caseData.profile.founded}</span>}
                {caseData.profile?.totalFunding && <span>💸 {caseData.profile.totalFunding}</span>}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 border-2 border-black">
                  <span className="text-xl">👁️</span>
                  <span className="font-mono font-bold">{stats.views?.total || 0} 阅读</span>
                </div>
                <button
                  onClick={handleLike}
                  disabled={actionLoading}
                  className={`flex items-center gap-2 px-4 py-2 border-2 border-black font-mono font-bold transition-all ${
                    isLiked ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-100'
                  } disabled:opacity-50`}
                >
                  <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
                  <span>{stats.likeCount} 点赞</span>
                </button>
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 border-2 border-blue-400">
                  <span className="text-xl">💬</span>
                  <span className="font-mono font-bold">{stats.commentCount} 评论</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className={`tag ${isSuccessCase ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} text-sm px-4 py-2 border-2`}>
              {isSuccessCase ? '✨ 成功案例' : '💀 失败案例'}
            </span>
            <span className="tag bg-white text-sm px-4 py-2 border-2 border-gray-300">
              📂 {caseData.category}
            </span>
            {caseData.productType && (
              <span className="tag bg-white text-sm px-4 py-2 border-2 border-gray-300">
                🏭 {caseData.productType}
              </span>
            )}
          </div>

          {caseData.tags && caseData.tags.length > 0 && (
            <div className="border-t-4 border-gray-200 pt-6">
              <h3 className="font-black font-mono uppercase text-sm mb-3">🏷️ 相关标签</h3>
              <div className="flex flex-wrap gap-2">
                {caseData.tags.map((tag) => (
                  <span key={tag} className="tag bg-yellow-100 border-2 border-yellow-400 text-sm px-4 py-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {hasFullData ? (
          <div className="space-y-10 mb-16">
            <div className="brutal-card bg-white p-8 border-4 border-black">
              <SectionHeader number="01" title="档案背景" icon="📋" />
              
              <div className="space-y-6">
                <div className="border-l-4 border-black pl-4">
                  <h4 className="font-black font-mono uppercase text-sm mb-2">公司名称与所属地</h4>
                  <p className="text-gray-700">{caseData.profile?.companyName} - {caseData.profile?.location}</p>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h4 className="font-black font-mono uppercase text-sm mb-2">核心技术/定位</h4>
                  <p className="text-gray-700">{caseData.profile?.coreTech}</p>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h4 className="font-black font-mono uppercase text-sm mb-2">融资与背书</h4>
                  <p className="text-gray-700">
                    {caseData.profile?.totalFunding && `融资金额: ${caseData.profile.totalFunding}`}
                    {caseData.profile?.investors && ` | 投资方: ${caseData.profile.investors}`}
                  </p>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h4 className="font-black font-mono uppercase text-sm mb-2">愿景与价值主张</h4>
                  <p className="text-gray-700">{caseData.profile?.vision}</p>
                </div>

                <div className="bg-gray-50 border-4 border-black p-4">
                  <h4 className="font-black font-mono uppercase text-sm mb-3">关键数据</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="font-mono text-xs uppercase text-gray-500">成立时间</div>
                      <div className="font-black font-mono text-xl">{caseData.profile?.founded || 'N/A'}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-xs uppercase text-gray-500">当前状态</div>
                      <div className="font-black font-mono text-xl">{caseData.profile?.closed ? '已关闭' : '运营中'}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-xs uppercase text-gray-500">烧钱总额</div>
                      <div className="font-black font-mono text-xl">{caseData.profile?.cashBurned || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="brutal-card bg-white p-8 border-4 border-black">
              <SectionHeader 
                number="02" 
                title={isSuccessCase ? "成功深度剖析" : "失败深度剖析"} 
                icon={isSuccessCase ? "✨" : "💀"} 
                color={isSuccessCase ? "bg-[#2ecc71]" : "bg-[#ff3b3b]"} 
              />
              
              <div className="space-y-6">
                <div className={`p-5 border-4 ${isSuccessCase ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                  <h4 className={`font-black font-mono uppercase text-sm mb-2 ${isSuccessCase ? 'text-green-700' : 'text-red-700'}`}>
                    {isSuccessCase ? '核心成功因素' : '核心死因'}
                  </h4>
                  <p className="text-lg font-semibold whitespace-pre-line">
                    {caseData.success?.successFactor || caseData.failure?.failureFactor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="brutal-card bg-gradient-to-br from-gray-800 to-black text-white p-8 mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔨</span>
              <h3 className="font-black font-mono text-xl uppercase">详情开发中</h3>
            </div>
            <p className="text-gray-300 mb-6">
              该案例的完整 5 部分详情页正在开发中。
            </p>
            <div className="grid grid-cols-5 gap-3">
              {['档案背景', '深度剖析', '转型策略', '执行规划', '盈利模型'].map((step, i) => (
                <div key={step} className="text-center">
                  <div className="w-10 h-10 bg-[#ffeb3b] text-black border-2 border-[#ffeb3b] font-black font-mono flex items-center justify-center mx-auto mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-mono text-xs text-gray-400">{step}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t-8 border-dashed border-gray-300 my-16"></div>

        <CommentsSection 
          caseId={id}
          comments={comments}
          onCommentAdded={handleCommentAdded}
          stats={stats}
          user={user}
          getToken={getToken}
        />
      </main>
      <Footer />
      
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
