import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, ArrowLeftRight, HelpCircle } from 'lucide-react';

const RetirementModule = () => {
  const comparisons = [
    { 
      title: 'Traditional vs. Roth', 
      left: { label: 'Traditional', sub: 'Tax Later', desc: 'Deduct now, pay taxes when you withdraw.' },
      right: { label: 'Roth', sub: 'Tax Now', desc: 'Pay now, pull everything out tax-free later.' }
    },
    { 
      title: 'DC vs. DB', 
      left: { label: 'Def. Contribution', sub: '401k/403b', desc: 'You put money in. You take the market risk.' },
      right: { label: 'Def. Benefit', sub: 'Pension', desc: 'Company pays you for life. They take the risk.' }
    },
    { 
      title: 'IRA vs. QRP', 
      left: { label: 'Individual (IRA)', sub: 'Personal', desc: 'You control it. Limits are lower ($7k).' },
      right: { label: 'Qualified (QRP)', sub: 'Employer', desc: 'Company plan. Limits are higher ($23k+).' }
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
        <PiggyBank size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>Retirement Foundations</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {comparisons.map((c, i) => (
          <div key={i} style={{ borderBottom: i !== 2 ? '1px solid rgba(0,0,0,0.05)' : 'none', paddingBottom: i !== 2 ? '20px' : '0' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {c.title}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '15px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{c.left.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-gold-dark)', fontWeight: 'bold' }}>{c.left.sub}</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '5px 0 0 0' }}>{c.left.desc}</p>
              </div>
              
              <div style={{ color: 'rgba(0,0,0,0.1)' }}>
                <ArrowLeftRight size={16} />
              </div>

              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{c.right.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-gold-dark)', fontWeight: 'bold' }}>{c.right.sub}</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '5px 0 0 0' }}>{c.right.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '25px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '15px' }}>
        <HelpCircle size={18} color="var(--color-gold-primary)" style={{ flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <strong>Pro Tip:</strong> Most people need a mix of both. Diversifying your <em>tax</em> buckets is as important as diversifying your assets.
        </p>
      </div>

      <div style={{ background: 'rgba(25, 118, 210, 0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(25, 118, 210, 0.1)' }}>
        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', color: '#1976d2', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} />
          Myth Buster: "I'll be in a lower bracket"
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
          Between Social Security being taxed, RMDs, and the loss of mortgage deductions, many retirees stay in the same or even higher tax bracket. Don't wait for a lower bracket that may never come.
        </p>
      </div>
    </div>
  );
};

export default RetirementModule;
