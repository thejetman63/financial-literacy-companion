import React from 'react';
import { motion } from 'framer-motion';

const PollResults = ({ votes, modules }) => {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <div className="glass-card" style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>Group Priorities ({totalVotes} votes)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {modules.filter(m => m.id !== 'closing').map(mod => {
          const count = votes[mod.id] || 0;
          const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
          
          return (
            <div key={mod.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '1rem' }}>
                <span style={{ fontWeight: '500' }}>{mod.label || mod.title}</span>
                <span style={{ fontWeight: 'bold', color: 'var(--color-gold-primary)' }}>{count}</span>
              </div>
              <div style={{ height: '32px', background: 'rgba(0,0,0,0.05)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                  style={{ 
                    height: '100%', 
                    background: 'linear-gradient(90deg, var(--color-brown-primary), var(--color-gold-primary))',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        Real-time results from your devices
      </div>
    </div>
  );
};

export default PollResults;
