import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, RotateCcw, AlertTriangle } from 'lucide-react';

const HypeSimulator = () => {
  const [mode, setMode] = useState(null); // 'meme' or 'market'
  const [data, setData] = useState([{ day: 0, value: 1000 }]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);

  const startSimulation = (selectedMode) => {
    setMode(selectedMode);
    setData([{ day: 0, value: 1000 }]);
    setIsPlaying(true);
    setResult(null);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setData((currentData) => {
        const lastDay = currentData[currentData.length - 1].day;
        const lastValue = currentData[currentData.length - 1].value;
        
        if (lastDay >= 30) {
          setIsPlaying(false);
          setResult(lastValue);
          return currentData;
        }

        let newValue;
        if (mode === 'market') {
          // Steady growth: ~0.5% per "day" (exaggerated for demo)
          newValue = lastValue * (1 + (Math.random() * 0.02 - 0.005));
        } else {
          // Meme Stock: Wild swings
          if (lastDay < 15) {
            // The Pump: Rapid rise
            newValue = lastValue * (1 + (Math.random() * 0.4));
          } else {
            // The Dump: Sharp fall
            newValue = lastValue * (1 - (Math.random() * 0.3));
          }
        }

        return [...currentData, { day: lastDay + 1, value: newValue }];
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, mode]);

  const maxValue = Math.max(...data.map(d => d.value), 2000);

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Zap size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>Hype vs. Reality Simulator</h3>
      </div>

      {!mode ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ marginBottom: '24px', color: 'var(--color-text-muted)' }}>
            You have $1,000. Where do you put it for the next 30 days?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <button className="btn-primary" onClick={() => startSimulation('market')} style={{ background: 'var(--color-brown-primary)' }}>
              <TrendingUp size={18} /> The Market
            </button>
            <button className="btn-primary" onClick={() => startSimulation('meme')}>
              <Zap size={18} /> The Meme Hype
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ height: '200px', width: '100%', position: 'relative', background: '#f9f9f9', borderRadius: '8px', overflow: 'hidden', padding: '10px' }}>
            {/* Simple sparkline chart using SVG */}
            <svg viewBox={`0 0 30 ${maxValue}`} style={{ width: '100%', height: '100%', transform: 'scaleY(-1)' }}>
              <path
                d={`M ${data.map((d, i) => `${i} ${d.value}`).join(' L ')}`}
                fill="none"
                stroke={mode === 'market' ? 'var(--color-brown-primary)' : 'var(--color-gold-primary)'}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-brown-primary)' }}>
              ${data[data.length - 1].value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Day {data[data.length - 1].day} / 30
            </div>
          </div>

          {!isPlaying && result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '20px', textAlign: 'center' }}
            >
              {mode === 'meme' && result < 1000 ? (
                <div style={{ color: '#d32f2f', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <AlertTriangle size={20} />
                  <span>The hype faded. You lost ${(1000 - result).toLocaleString()}</span>
                </div>
              ) : mode === 'market' ? (
                <div style={{ color: '#2e7d32', marginBottom: '15px' }}>
                  Steady growth wins. Your $1,000 grew to ${result.toLocaleString(undefined, { maximumFractionDigits: 0 })}.
                </div>
              ) : (
                <div style={{ color: '#2e7d32', marginBottom: '15px' }}>
                  You got lucky! But can you do it twice?
                </div>
              )}
              <button className="btn-primary" onClick={() => setMode(null)} style={{ width: '100%' }}>
                <RotateCcw size={18} /> Try Again
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default HypeSimulator;
