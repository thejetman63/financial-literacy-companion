import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Landmark, Layers, ArrowRight } from 'lucide-react';

const InvestmentsModule = () => {
  const vehicles = [
    { 
      title: 'Stocks', 
      icon: <TrendingUp size={20} />, 
      type: 'Ownership', 
      desc: 'Buying a piece of a company. Highest growth potential, highest risk.' 
    },
    { 
      title: 'Bonds', 
      icon: <Landmark size={20} />, 
      type: 'Lending', 
      desc: 'Loaning money to a govt or corp. Lower risk, steady interest income.' 
    },
    { 
      title: 'Funds (ETF/Mutual)', 
      icon: <Layers size={20} />, 
      type: 'Diversity', 
      desc: 'A basket of stocks and bonds. Instant diversification in one click.' 
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <TrendingUp size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>Investment Vehicles</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {vehicles.map((v, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ 
              display: 'flex', 
              gap: '15px', 
              background: 'white', 
              padding: '15px', 
              borderRadius: '12px', 
              border: '1px solid rgba(0,0,0,0.05)' 
            }}
          >
            <div style={{ color: 'var(--color-gold-primary)', marginTop: '2px' }}>{v.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>{v.title}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--color-brown-primary)', opacity: 0.7 }}>{v.type}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: 'var(--color-brown-primary)', color: 'white', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem' }}>
        The key is finding the right <strong>mix</strong> for your specific timeline.
      </div>
    </div>
  );
};

export default InvestmentsModule;
