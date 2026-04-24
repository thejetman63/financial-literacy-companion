import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, TrendingUp, Wallet } from 'lucide-react';

const InsuranceTool = () => {
  const [premium, setPremium] = useState(250);
  const [years, setYears] = useState(20);

  // Simplified Cash Value accumulation (very rough estimation for demo)
  const calculateCashValue = (p, y) => {
    const totalPaid = p * 12 * y;
    const growthRate = 0.045; // Assumed dividend/growth rate
    const accumulation = (p * 0.8) * 12 * ((Math.pow(1 + growthRate, y) - 1) / growthRate);
    return {
      paid: totalPaid,
      cashValue: accumulation,
      deathBenefit: p * 1000 // Very rough death benefit multiplier
    };
  };

  const results = calculateCashValue(premium, years);

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <ShieldCheck size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>The "Living Benefit" Asset</h3>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '10px', color: 'var(--color-text-muted)' }}>
          Monthly Premium: <strong>${premium}</strong>
        </label>
        <input 
          type="range" 
          min="100" 
          max="2000" 
          step="50"
          value={premium} 
          onChange={(e) => setPremium(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--color-gold-primary)' }}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '10px', color: 'var(--color-text-muted)' }}>
          Years of Accumulation: <strong>{years} Years</strong>
        </label>
        <input 
          type="range" 
          min="5" 
          max="40" 
          value={years} 
          onChange={(e) => setYears(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--color-brown-primary)' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Death Benefit</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-brown-primary)' }}>
            ${Math.round(results.deathBenefit / 1000) * 1000 >= 1000000 ? (results.deathBenefit / 1000000).toFixed(1) + 'M' : (results.deathBenefit / 1000).toFixed(0) + 'K'}
          </div>
          <Heart size={16} style={{ marginTop: '5px', color: '#d32f2f' }} />
        </div>
        <div style={{ background: 'var(--color-gold-primary)', padding: '15px', borderRadius: '8px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.9 }}>Cash Value (Asset)</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            ${Math.round(results.cashValue).toLocaleString()}
          </div>
          <Wallet size={16} style={{ marginTop: '5px' }} />
        </div>
      </div>

      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--color-gold-primary)' }}>
        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <TrendingUp size={16} color="var(--color-gold-primary)" />
          Tax-Advantage Growth
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
          Unlike a standard brokerage account, this cash value grows tax-deferred and can be accessed tax-free through policy loans. It acts as your private bank.
        </p>
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.7rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        Guarantees are based on the claims-paying ability of the issuing company. Not a bank deposit.
      </div>
    </div>
  );
};

export default InsuranceTool;
