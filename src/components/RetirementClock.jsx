import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, Clock, ArrowRight, History } from 'lucide-react';

const RetirementClock = () => {
  const [startAge, setStartAge] = useState(22);
  const [monthly, setMonthly] = useState(500);
  const targetAge = 65;
  const annualReturn = 0.08;

  const calculateTotal = (age, monthlyAmount) => {
    const years = targetAge - age;
    if (years <= 0) return 0;
    const months = years * 12;
    const monthlyRate = annualReturn / 12;
    return monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  };

  const currentTotal = calculateTotal(startAge, monthly);
  const totalIfStartedNow = calculateTotal(22, monthly);
  const costOfDelay = totalIfStartedNow - currentTotal;

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Clock size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>The Cost of Waiting</h3>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '10px', color: 'var(--color-text-muted)' }}>
          At what age will you start saving?
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <input 
            type="range" 
            min="20" 
            max="50" 
            value={startAge} 
            onChange={(e) => setStartAge(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--color-gold-primary)' }}
          />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', width: '40px' }}>{startAge}</span>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '10px', color: 'var(--color-text-muted)' }}>
          Monthly Contribution: <strong>${monthly}</strong>
        </label>
        <input 
          type="range" 
          min="100" 
          max="2000" 
          step="100"
          value={monthly} 
          onChange={(e) => setMonthly(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--color-brown-primary)' }}
        />
      </div>

      <div style={{ textAlign: 'center', background: 'var(--color-brown-primary)', color: 'white', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.8, marginBottom: '5px' }}>Estimated Nest Egg at 65</div>
        <motion.div 
          key={currentTotal}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ fontSize: '2.5rem', fontWeight: 'bold' }}
        >
          ${Math.round(currentTotal).toLocaleString()}
        </motion.div>
      </div>

      {startAge > 22 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ border: '2px dashed var(--color-gold-primary)', padding: '15px', borderRadius: '12px', textAlign: 'center' }}
        >
          <div style={{ color: 'var(--color-gold-primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <History size={18} />
            The Procrastination Tax
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0' }}>
            -${Math.round(costOfDelay).toLocaleString()}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            This is how much you "lost" by waiting {startAge - 22} years to start.
          </p>
        </motion.div>
      )}
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
        <PiggyBank size={16} />
        <span>Assumes an 8% average annual return. Past performance does not guarantee future results.</span>
      </div>
    </div>
  );
};

export default RetirementClock;
