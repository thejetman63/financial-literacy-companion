import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Landmark, Heart, Wallet, Users, Zap } from 'lucide-react';

const StrategyModule = ({ remoteState }) => {
  // Use remote state to control which part of the strategy we are showing
  // Default to annuities if not specified
  const activeSub = remoteState?.strategySubTab || 'annuities';

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
        <ShieldCheck size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>Protection & Growth Strategy</h3>
      </div>

      <AnimatePresence mode="wait">
        {activeSub === 'annuities' ? (
          <motion.div
            key="annuities"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <Landmark size={20} color="var(--color-brown-primary)" />
              <h4 style={{ margin: 0, color: 'var(--color-brown-primary)' }}>The Income Floor (Annuities)</h4>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Immediate</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Convert a lump sum into a guaranteed paycheck <strong>starting today</strong>.
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.7rem', color: 'var(--color-gold-dark)', fontWeight: 'bold' }}>INCOME NOW</div>
              </div>
              <div style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Deferred</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Let your money grow tax-deferred with a <strong>guaranteed floor</strong> for later.
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.7rem', color: 'var(--color-gold-dark)', fontWeight: 'bold' }}>GROWTH FOR LATER</div>
              </div>
            </div>
            
            <div style={{ background: 'var(--color-gold-primary)10', padding: '15px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <strong>The Goal:</strong> Create a "Personal Pension" that you can never outlive, regardless of what the market does.
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="insurance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <Heart size={20} color="#d32f2f" />
              <h4 style={{ margin: 0, color: 'var(--color-brown-primary)' }}>The Multi-Tool (Life Insurance)</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: <Users size={18} />, title: 'Legacy Planning', desc: 'Transfer wealth to the next generation tax-free and efficiently.' },
                { icon: <ShieldCheck size={18} />, title: 'Income Protection', desc: 'Ensure your family stays in their world if you are no longer in yours.' },
                { icon: <Zap size={18} />, title: 'Tax-Free Retirement', desc: 'Access your cash value for retirement income without a tax bill.' }
              ].map((pill, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px', background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ color: 'var(--color-gold-primary)', marginTop: '2px' }}>{pill.icon}</div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{pill.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{pill.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: '20px', fontSize: '0.7rem', color: 'var(--color-text-muted)', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px', marginBottom: '15px' }}>
        Strategies are customized based on individual goals and risk tolerance. 
        Guarantees are subject to the claims-paying ability of the insurer.
      </div>

      <div style={{ background: 'rgba(25, 118, 210, 0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(25, 118, 210, 0.1)' }}>
        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', color: '#1976d2', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} />
          Myth Buster: "Insurance is for when I die"
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
          Modern policies are "Swiss Army Knives." Living benefits allow you to access the death benefit for chronic illness or pull out cash value as a private, tax-free retirement bank.
        </p>
      </div>
    </div>
  );
};

export default StrategyModule;
