import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StartupGrid from './components/StartupGrid';
import LearningFramework from './components/LearningFramework';
import TopLists from './components/TopLists';
import RebuildPlans from './components/RebuildPlans';
import Dashboard from './components/Dashboard';
import AddCorpse from './components/AddCorpse';
import Footer from './components/Footer';
import { startups } from './data/startups';
import './index.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeFilter, setActiveFilter] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedStartups = [...startups].sort((a, b) => {
    if (activeFilter === 'burned') return b.capitalRaw - a.capitalRaw;
    if (activeFilter === 'died') return b.died - a.died;
    return b.id - a.id;
  });

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
