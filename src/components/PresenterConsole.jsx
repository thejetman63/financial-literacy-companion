import React, { useState, useEffect } from 'react';
import { db, ref, onValue, set } from '../firebase';
import { motion } from 'framer-motion';
import { Unlock, Lock, Power, RefreshCw, Eye, EyeOff } from 'lucide-react';

const modules = [
  { id: 'hype', label: 'Meme vs Market' },
  { id: 'credit', label: 'Credit Impact' },
  { id: 'retirement', label: 'Time is Money' },
  { id: 'annuity', label: 'Deferred Annuities' },
  { id: 'insurance', label: 'Protection Asset' },
  { id: 'closing', label: 'Final Summary & Contact' }
];

const PresenterConsole = () => {
  const [sessionState, setSessionState] = useState({
    activeModule: 'none',
    unlockedModules: []
  });
  const [votes, setVotes] = useState({});

  useEffect(() => {
    const stateRef = ref(db, 'presentation/state');
    const votesRef = ref(db, 'presentation/votes');

    const unsubState = onValue(stateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setSessionState(data);
    });

    const unsubVotes = onValue(votesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setVotes(data);
    });

    return () => {
      unsubState();
      unsubVotes();
    };
  }, []);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const toggleModule = (id) => {
    const isUnlocked = sessionState.unlockedModules.includes(id);
    const newUnlocked = isUnlocked 
      ? sessionState.unlockedModules.filter(m => m !== id)
      : [...sessionState.unlockedModules, id];
    
    const newState = {
      ...sessionState,
      unlockedModules: newUnlocked,
      activeModule: id
    };

    // Update local state immediately for Demo Mode
    setSessionState(newState);

    // Attempt to sync to Firebase
    set(ref(db, 'presentation/state'), newState);
  };

  const setActiveModule = (id) => {
    const isUnlocked = sessionState.unlockedModules.includes(id);
    const newUnlocked = isUnlocked 
      ? sessionState.unlockedModules 
      : [...sessionState.unlockedModules, id];

    const newState = {
      ...sessionState,
      unlockedModules: newUnlocked,
      activeModule: id
    };

    // Update local state immediately
    setSessionState(newState);

    // Sync to Firebase
    set(ref(db, 'presentation/state'), newState);
  };

  const resetSession = () => {
    if (window.confirm("Reset entire session? All attendee phones will return to the poll.")) {
      set(ref(db, 'presentation'), {
        state: {
          activeModule: 'none',
          unlockedModules: []
        },
        votes: {}
      });
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Left: Results Chart */}
      <div className="glass-card" style={{ padding: '30px' }}>
        <h2 style={{ marginBottom: '20px' }}>Live Poll Results ({totalVotes} votes)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {modules.filter(m => m.id !== 'closing').map(mod => {
            const count = votes[mod.id] || 0;
            const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
            
            return (
              <div key={mod.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                  <span>{mod.label}</span>
                  <span style={{ fontWeight: 'bold' }}>{count}</span>
                </div>
                <div style={{ height: '24px', background: 'rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    style={{ height: '100%', background: 'var(--color-gold-primary)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Controls */}
      <div className="glass-card" style={{ padding: '30px', border: '2px solid var(--color-brown-primary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Power size={24} color="var(--color-gold-primary)" />
          <h2 style={{ margin: 0 }}>Presenter Console</h2>
        </div>
        <button onClick={resetSession} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}>
          <RefreshCw size={20} />
        </button>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
        Click a module to "release" it to the audience. The active module will automatically jump to their screens.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {modules.map((mod) => {
          const isUnlocked = sessionState.unlockedModules.includes(mod.id);
          const isActive = sessionState.activeModule === mod.id;

          return (
            <div 
              key={mod.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px',
                borderRadius: '8px',
                background: isActive ? 'var(--color-gold-primary)15' : 'white',
                border: `1px solid ${isActive ? 'var(--color-gold-primary)' : 'rgba(0,0,0,0.1)'}`,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: 'bold', color: isActive ? 'var(--color-brown-primary)' : 'inherit' }}>
                {mod.label}
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => toggleModule(mod.id)}
                  style={{
                    background: isUnlocked ? 'var(--color-gold-primary)' : 'rgba(0,0,0,0.05)',
                    color: isUnlocked ? 'white' : 'var(--color-text-muted)',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.8rem'
                  }}
                >
                  {isUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
                  {isUnlocked ? 'Unlocked' : 'Locked'}
                </button>
                
                <button
                  onClick={() => setActiveModule(mod.id)}
                  style={{
                    background: isActive ? 'var(--color-brown-primary)' : 'none',
                    color: isActive ? 'white' : 'var(--color-text-muted)',
                    border: isActive ? 'none' : '1px solid rgba(0,0,0,0.1)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    opacity: 1
                  }}
                >
                  {isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
        <strong>Current Live Signal:</strong><br/>
        {sessionState.activeModule === 'none' ? 'Waiting to start...' : `Audience is viewing: ${modules.find(m => m.id === sessionState.activeModule)?.label}`}
      </div>
      </div>
    </div>
  );
};

export default PresenterConsole;
