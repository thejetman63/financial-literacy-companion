import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, ShieldCheck, TrendingUp, ArrowRight, Info } from 'lucide-react';

const annuityTypes = [
  { 
    id: 'fixed', 
    label: 'Fixed Deferred', 
    description: 'Guaranteed interest rate. No market risk.',
    upside: 'Steady', 
    protection: '100% Guaranteed',
    details: 'Best for those who want a specific, predictable result.'
  },
  { 
    id: 'fia', 
    label: 'Fixed Indexed (FIA)', 
    description: 'Market-linked growth with a 0% floor.',
    upside: 'Moderate', 
    protection: '100% Principal Protection',
    details: 'When the market is up, you gain. When it’s down, you stay at zero.'
  },
  { 
    id: 'rila', 
    label: 'RILA (Buffered)', 
    description: 'Higher upside with a "buffer" against losses.',
    upside: 'High', 
    protection: '10-20% Downside Buffer',
    details: 'Best for growth-seekers who want to limit (but not eliminate) risk.'
  },
  { 
    id: 'spia', 
    label: 'Immediate (SPIA)', 
    description: 'Convert a lump sum into immediate life income.',
    upside: 'Low', 
    protection: 'Income Guaranteed',
    details: 'The traditional "pension" model. Less focus today.'
  },
];

const AnnuityTool = ({ remoteState }) => {
  const [amount, setAmount] = useState(100000);
  
  // Use remote state if available, otherwise fallback to local FIA
  const activeId = remoteState?.annuitySubTab || 'fia';
  const selectedType = annuityTypes.find(t => t.id === activeId) || annuityTypes[1];

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Landmark size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>Deferred Annuity Strategies</h3>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
        Annuities aren't just for retirement income; they are powerful tools for <strong>protected accumulation</strong>.
      </p>

      {/* Sub-tabs removed for audience - Presenter controls this via live sync */}

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ background: '#f9f9f9', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-brown-primary)', marginBottom: '5px' }}>
            {selectedType.label}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '15px' }}>
            {selectedType.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            <div style={{ background: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Upside Potential</div>
              <div style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>{selectedType.upside}</div>
            </div>
            <div style={{ background: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Downside Protection</div>
              <div style={{ fontWeight: 'bold', color: '#2e7d32' }}>{selectedType.protection}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{selectedType.details}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', color: 'var(--color-brown-primary)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Accumulation</div>
            <TrendingUp size={24} style={{ margin: '5px 0' }} />
          </div>
          <ArrowRight size={20} style={{ opacity: 0.3 }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Distribution</div>
            <ShieldCheck size={24} style={{ margin: '5px 0' }} />
          </div>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '10px' }}>
          Deferred annuities grow tax-deferred today, providing a guaranteed floor for tomorrow.
        </p>
      </div>
    </div>
  );
};

export default AnnuityTool;
