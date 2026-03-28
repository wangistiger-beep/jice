import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3001/api';

function transformCaseToStartup(caseData) {
  let description = caseData.success?.successLessons || caseData.failure?.lessonsLearned || '';
  
  if (!description || description.trim() === '') {
    if (caseData.profile?.companyName && caseData.profile?.vision) {
      description = `${caseData.profile.companyName} - ${caseData.profile.vision}`;
    } else if (caseData.profile?.companyName) {
      description = `${caseData.profile.companyName}案例分析`;
    } else {
      description = '创业案例深度分析';
    }
  }
  
  if (description.length > 200) {
    description = description.substring(0, 197) + '...';
  }
  
  return {
    id: caseData.id,
    name: caseData.title,
    logo: caseData.logo || '📋',
    capital: caseData.profile?.totalFunding || 'N/A',
    profitAmount: caseData.profitAmount || '',
    lossAmount: caseData.lossAmount || '',
    capitalRaw: 0,
    lifespan: caseData.profile?.founded ? 
      (caseData.profile.closed ? 
        `${new Date(caseData.profile.closed).getFullYear() - new Date(caseData.profile.founded).getFullYear()}年` : 
        '进行中') : 'N/A',
    lifespanDays: 0,
    founded: caseData.profile?.founded ? parseInt(caseData.profile.founded) : 0,
    died: caseData.profile?.closed ? parseInt(caseData.profile.closed) : 0,
    country: '🇺🇸',
    categories: [caseData.category || '其他'],
    causes: caseData.tags || [],
    description: description,
    marketPotentialScore: caseData.marketPotentialScore || 3,
    potentialScale: caseData.potentialScale || 3,
    rebuildPotential: caseData.rebuildPotential || 0,
    difficulty: 3,
    scalability: 3,
    caseType: caseData.caseType || 'failure'
  };
}

export default function DebugTest() {
  const [rawData, setRawData] = useState(null);
  const [transformedData, setTransformedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('🔄 DebugTest: 正在获取数据...');
      const res = await fetch(`${API_BASE}/cases`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      console.log('✅ DebugTest: 原始数据获取成功', data.length, '个案例');
      
      setRawData(data);
      
      const transformed = data.map(transformCaseToStartup);
      console.log('✅ DebugTest: 数据转换成功', transformed.length, '个案例');
      setTransformedData(transformed);
      
    } catch (err) {
      console.error('❌ DebugTest: 获取失败', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="font-mono text-lg">调试页面加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-100 p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="font-mono text-lg text-red-700">错误: {error}</p>
          <button 
            onClick={fetchData}
            className="mt-4 brutal-btn bg-black text-white px-4 py-2"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-black font-mono text-3xl uppercase mb-8">🔧 数据调试页面</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* 原始数据 */}
          <div>
            <div className="brutal-card bg-blue-50 p-6 mb-4">
              <h2 className="font-black font-mono text-xl uppercase mb-4">📊 后端原始数据</h2>
              <p className="font-mono text-sm">
                案例总数: <span className="font-black">{rawData?.length || 0}</span>
              </p>
              <div className="mt-4 space-y-2">
                {rawData?.slice(0, 5).map((c, i) => (
                  <div key={c.id} className="bg-white p-3 border-2 border-black">
                    <p className="font-mono text-sm">
                      <span className="font-black">[ID:{c.id}]</span> {c.title}
                    </p>
                    <p className="font-mono text-xs text-gray-600">
                      类型: {c.caseType} | 
                      盈利: {c.profitAmount || '无'} | 
                      亏损: {c.lossAmount || '无'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="brutal-card bg-yellow-50 p-6">
              <h3 className="font-black font-mono text-lg uppercase mb-4">📋 原始数据完整JSON</h3>
              <pre className="bg-black text-green-400 p-4 text-xs overflow-auto max-h-96">
                {JSON.stringify(rawData?.slice(0, 2), null, 2)}
              </pre>
            </div>
          </div>

          {/* 转换后数据 */}
          <div>
            <div className="brutal-card bg-green-50 p-6 mb-4">
              <h2 className="font-black font-mono text-xl uppercase mb-4">🔄 前端转换后数据</h2>
              <p className="font-mono text-sm">
                案例总数: <span className="font-black">{transformedData?.length || 0}</span>
              </p>
              <div className="mt-4 space-y-2">
                {transformedData?.slice(0, 5).map((c, i) => (
                  <div key={c.id} className="bg-white p-3 border-2 border-black">
                    <p className="font-mono text-sm">
                      <span className="font-black">[ID:{c.id}]</span> {c.name}
                    </p>
                    <p className="font-mono text-xs text-gray-600">
                      类型: {c.caseType} | 
                      profitAmount: {c.profitAmount || '无'} | 
                      lossAmount: {c.lossAmount || '无'}
                    </p>
                    <p className="font-mono text-xs text-blue-600">
                      评分: 市场{c.marketPotentialScore}/5, 规模{c.potentialScale}/5
                      {c.caseType === 'failure' ? `, 重建${c.rebuildPotential}/5` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="brutal-card bg-purple-50 p-6">
              <h3 className="font-black font-mono text-lg uppercase mb-4">📋 转换后数据完整JSON</h3>
              <pre className="bg-black text-yellow-400 p-4 text-xs overflow-auto max-h-96">
                {JSON.stringify(transformedData?.slice(0, 2), null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-8 brutal-card bg-white p-6 text-center">
          <button 
            onClick={fetchData}
            className="brutal-btn bg-black text-white px-8 py-4 font-mono uppercase"
          >
            🔄 刷新数据
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="font-mono text-sm text-gray-600">
            💡 提示：请检查浏览器控制台(按F12)查看更多调试日志
          </p>
        </div>
      </div>
    </div>
  );
}
