import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, AlertCircle, TrendingDown, DollarSign } from 'lucide-react';

const events = [
  { id: 'perfect', label: 'Perfect History', impact: 0, color: '#2e7d32', description: 'No missed payments, low utilization.' },
  { id: 'late', label: '30-Day Late Payment', impact: -80, color: '#d32f2f', description: 'A single missed credit card or loan payment.' },
  { id: 'maxed', label: 'Maxed Out Card', impact: -45, color: '#f57c00', description: 'Using 90%+ of your available credit limit.' },
  { id: 'new', label: '3 New Accounts', impact: -25, color: '#1976d2', description: 'Opening multiple store cards or loans quickly.' },
];

const CreditSlider = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const baseScore = 780;
  const currentScore = baseScore + selectedEvent.impact;

  // Rough estimation of interest rate impact
  const getInterestRate = (score) => {
    if (score >= 760) return 6.5;
    if (score >= 700) return 7.2;
    if (score >= 640) return 8.5;
    return 10.5;
  };

  const rate = getInterestRate(currentScore);
  const baseRate = getInterestRate(780);
  
  // Calculate monthly payment on a $400,000 mortgage (30yr fixed)
  const calculatePayment = (r) => {
    const p = 400000;
    const monthlyRate = (r / 100) / 12;
    const n = 360;
    return (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  };

  const monthlyPayment = calculatePayment(rate);
  const basePayment = calculatePayment(baseRate);
  const monthlyDifference = monthlyPayment - basePayment;

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <CreditCard size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>Credit Impact Simulator</h3>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Estimated Score</div>
        <motion.div 
          key={currentScore}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ fontSize: '3.5rem', fontWeight: 'bold', color: selectedEvent.color }}
        >
          {currentScore}
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: `2px solid ${selectedEvent.id === event.id ? event.color : 'rgba(0,0,0,0.05)'}`,
              background: selectedEvent.id === event.id ? `${event.color}10` : 'white',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ fontWeight: 'bold', color: event.color }}>{event.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{event.description}</div>
          </button>
        ))}
      </div>

      {selectedEvent.impact < 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(211, 47, 47, 0.05)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(211, 47, 47, 0.1)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d32f2f', fontWeight: 'bold', marginBottom: '10px' }}>
            <TrendingDown size={18} />
            The Financial Penalty
          </div>
          <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
            On a $400k home, your mortgage interest rate would jump from <strong>{baseRate}%</strong> to <strong>{rate}%</strong>.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem' }}>Extra Monthly Cost:</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#d32f2f' }}>+${Math.round(monthlyDifference).toLocaleString()}</span>
          </div>
          <div style={{ fontSize: '0.75rem', marginTop: '5px', textAlign: 'right', color: 'var(--color-text-muted)' }}>
            That's <strong>${Math.round(monthlyDifference * 360).toLocaleString()}</strong> over the life of the loan.
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CreditSlider;
