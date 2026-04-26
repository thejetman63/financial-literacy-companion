import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, TrendingUp, ShieldCheck, Landmark, PiggyBank, Zap, BarChart3, ChevronRight, Home, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { db, ref, onValue, set, increment, update } from './firebase';

import HypeSimulator from './components/HypeSimulator';
import CreditSlider from './components/CreditSlider';
import RetirementClock from './components/RetirementClock';
import StrategyModule from './components/StrategyModule';
import InvestmentsModule from './components/InvestmentsModule';
import RetirementModule from './components/RetirementModule';
import PollResults from './components/PollResults';
import ContactCard from './components/ContactCard';
import PresenterConsole from './components/PresenterConsole';

const topics = [
  { id: 'investments', title: 'Investment Vehicles', icon: <TrendingUp size={24} />, description: 'Stocks, Bonds & Funds: The building blocks.' },
  { id: 'retirement-basics', title: 'Retirement Foundations', icon: <PiggyBank size={24} />, description: 'Roth, 401k, and IRA essentials.' },
  { id: 'protection', title: 'Protection & Growth', icon: <ShieldCheck size={24} />, description: 'Annuities & Insurance: The foundation of a secure plan.' },
  { id: 'memes', title: 'Friends, Memes & Hype', icon: <Zap size={24} />, description: 'Navigating the noise of modern finance.' },
];

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [currentView, setCurrentView] = useState('poll'); 
  const [activeTab, setActiveTab] = useState('hype'); 
  const [showResults, setShowResults] = useState(false);
  const [votes, setVotes] = useState({});
  
  // Real-time Presentation State
  const [remoteState, setRemoteState] = useState({
    activeModule: 'none',
    unlockedModules: []
  });

  const isAdminUrl = window.location.search.includes('admin=1') || window.location.search.includes('admin-1');
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const stateRef = ref(db, 'presentation/state');
    const votesRef = ref(db, 'presentation/votes');

    onValue(votesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setVotes(data);
    });

    return onValue(stateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRemoteState(data);
        // Force jump to the active module if it changes and is unlocked
        if (data.activeModule !== 'none' && data.activeModule !== 'closing') {
          setCurrentView('topics');
          setActiveTab(data.activeModule);
        } else if (data.activeModule === 'closing') {
          setCurrentView('closing');
        } else if (data.activeModule === 'none') {
          setCurrentView('poll');
          setHasVoted(false);
        }
      }
    });
  }, []);

  const handleVote = (id) => {
    setSelectedTopic(id);
    setHasVoted(true);
    
    // Sync vote to Firebase using atomic increment
    const updates = {};
    updates[`presentation/votes/${id}`] = increment(1);
    update(ref(db, '/'), updates);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#4B3621', '#FFD700']
    });

    // Wait 1.5 seconds then show results
    setTimeout(() => {
      setShowResults(true);
    }, 1500);
  };

  if (isAdminUrl && !isAdminAuthenticated) {
    return (
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px' }}>
          <Lock size={48} color="var(--color-gold-primary)" style={{ marginBottom: '20px' }} />
          <h2>Presenter Login</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '25px' }}>Enter passcode to access console</p>
          <input 
            type="password" 
            placeholder="Passcode" 
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #ddd', 
              textAlign: 'center',
              fontSize: '1.2rem',
              letterSpacing: '5px',
              marginBottom: '20px'
            }}
          />
          <button 
            className="btn-primary" 
            style={{ width: '100%' }}
            onClick={() => {
              if (adminPass === '7878') setIsAdminAuthenticated(true);
              else alert('Invalid Passcode');
            }}
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  if (isAdminUrl && isAdminAuthenticated) return <PresenterConsole />;

  return (
    <div className="container">
      <header style={{ marginTop: '40px', marginBottom: '40px', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Future Wealth</h1>
          <div className="accent-bar" style={{ margin: '0 auto' }}></div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginTop: '15px' }}>
            Interactive Presentation Companion
          </p>
        </motion.div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          {!hasVoted && remoteState.activeModule === 'none' ? (
            <motion.div
              key="poll"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ marginBottom: '20px' }}>What should we prioritize?</h2>
              <p style={{ marginBottom: '30px', color: 'var(--color-text-muted)' }}>
                Select the topic you are most interested in learning about today.
              </p>
              
              <div className="poll-grid">
                {topics.map((topic, index) => (
                  <motion.button
                    key={topic.id}
                    className="poll-option"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleVote(topic.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ color: 'var(--color-gold-primary)' }}>{topic.icon}</div>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{topic.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>
                          {topic.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : currentView === 'topics' ? (
            <motion.div
              key="topics-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Classroom</h2>
                <div style={{ color: 'var(--color-gold-primary)', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold-primary)', animation: 'pulse 2s infinite' }}></div>
                  LIVE SESSION
                </div>
              </div>

                {['hype', 'credit', 'investments', 'retirement-basics', 'protection'].map((tabId) => {
                  const unlocked = remoteState.unlockedModules || [];
                  const isUnlocked = unlocked.includes(tabId);
                  const labels = { 
                    hype: 'Meme vs Market', 
                    credit: 'Credit Impact', 
                    investments: 'Investments',
                    'retirement-basics': 'Retirement',
                    protection: 'Protection & Growth' 
                  };
                  
                  return (
                    <button 
                      key={tabId}
                      disabled={!isUnlocked}
                      onClick={() => setActiveTab(tabId)} 
                      style={tabStyle(activeTab === tabId, isUnlocked)}
                    >
                      {!isUnlocked && <Lock size={12} style={{ marginRight: '5px' }} />}
                      {labels[tabId]}
                    </button>
                  );
                })}
              </div>

              {activeTab === 'hype' && <HypeSimulator />}
              {activeTab === 'credit' && <CreditSlider />}
              {activeTab === 'investments' && <InvestmentsModule />}
              {activeTab === 'retirement-basics' && <RetirementModule />}
              {activeTab === 'protection' && <StrategyModule remoteState={remoteState} />}
            </motion.div>
          ) : currentView === 'closing' ? (
            <motion.div
              key="closing-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <ShieldCheck size={48} color="var(--color-gold-primary)" style={{ marginBottom: '15px' }} />
                <h2 style={{ marginBottom: '10px' }}>The Holistic Strategy</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Protection, Savings, and Growth working in harmony.
                </p>
              </div>
              <ContactCard />
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ textAlign: 'center', padding: '40px 20px' }}
              className="glass-card"
            >
              <BarChart3 size={64} color="var(--color-gold-primary)" style={{ marginBottom: '20px' }} />
              <h2>Thank You for Voting!</h2>
              <p style={{ marginTop: '15px', color: 'var(--color-text-muted)' }}>
                We'll prioritize <strong>{topics.find(t => t.id === selectedTopic)?.title}</strong> during the presentation.
              </p>
              <div style={{ marginTop: '40px' }}>
                <motion.div 
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-gold-primary)', fontWeight: 'bold' }}>
                    Waiting for speaker to release modules...
                  </div>
                </motion.div>
              </div>

              {/* Reveal Live Results after a delay */}
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '40px' }}
                >
                  <PollResults votes={votes} modules={topics} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ marginTop: '60px', textAlign: 'center', padding: '20px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
        Strategic Strategy Team &copy; 2024<br/>
        For Educational Purposes Only.
      </footer>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @media print {
          .poll-grid, .btn-primary, header p, footer { display: none !important; }
          .container { width: 100% !important; margin: 0 !important; padding: 20px !important; }
          .glass-card { border: 1px solid #ccc !important; box-shadow: none !important; background: white !important; color: black !important; }
          h1, h2, h3 { color: #4B3621 !important; }
          .accent-bar { background: #D4AF37 !important; print-color-adjust: exact; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}

const tabStyle = (isActive, isUnlocked) => ({
  padding: '8px 16px',
  borderRadius: '20px',
  border: 'none',
  background: isActive ? 'var(--color-gold-primary)' : 'rgba(0,0,0,0.05)',
  color: isActive ? 'white' : 'var(--color-text-muted)',
  fontWeight: 'bold',
  cursor: isUnlocked ? 'pointer' : 'not-allowed',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s',
  opacity: isUnlocked ? 1 : 0.4,
  display: 'flex',
  alignItems: 'center'
});

export default App;
