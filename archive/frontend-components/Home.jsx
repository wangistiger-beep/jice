import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import StartupGrid from './StartupGrid';
import LearningFramework from './LearningFramework';
import TopLists from './TopLists';
import RebuildPlans from './RebuildPlans';
import Dashboard from './Dashboard';
import AddCorpse from './AddCorpse';
import Footer from './Footer';

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

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeFilter, setActiveFilter] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      console.log('🔄 正在从后端获取案例数据...');
      const res = await fetch(`${API_BASE}/cases`);
      if (res.ok) {
        const data = await res.json();
        console.log('✅ 从后端获取到的原始数据:', data.length, '个案例');
        console.log('📋 前3个案例预览:');
        data.slice(0, 3).forEach((c, i) => {
          const amount = c.caseType === 'success' ? c.profitAmount : c.lossAmount;
          console.log(`  ${i+1}. [ID:${c.id}] ${c.title} - ${c.caseType} - 金额: ${amount}`);
        });
        
        const transformed = data.map(transformCaseToStartup);
        console.log('🔄 转换后的数据:', transformed.length, '个案例');
        console.log('📋 前3个转换后案例:');
        transformed.slice(0, 3).forEach((c, i) => {
          console.log(`  ${i+1}. [ID:${c.id}] ${c.name} - profit: ${c.profitAmount}, loss: ${c.lossAmount}`);
        });
        
        setStartups(transformed);
      }
    } catch (error) {
      console.error('❌ 获取案例失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedStartups = [...startups].sort((a, b) => {
    if (activeFilter === 'burned') return b.capitalRaw - a.capitalRaw;
    if (activeFilter === 'died') return b.died - a.died;
    return b.id - a.id;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono text-lg">加载案例中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero
          onSearch={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <StartupGrid startups={sortedStartups} searchQuery={searchQuery} />
        <LearningFramework />
        <TopLists />
        <RebuildPlans />
        <Dashboard />
        <AddCorpse />
      </main>
      <Footer />
    </div>
  );
}
