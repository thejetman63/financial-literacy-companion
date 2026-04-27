import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Info, ShieldCheck } from 'lucide-react';

const CreditSlider = () => {
  const [utilization, setUtilization] = useState(15); // Percentage
  const [age, setAge] = useState(7); // Years
  const [inquiries, setInquiries] = useState(1); // Count

  // Asset-based scoring logic
  // Utilization: Lower is better, but >0 is good. 30% of score.
  // Age: Longer is better. 15% of score.
  // Inquiries: 1-2 is fine. 10% of score.
  // Payment History (Assumed perfect for this "Asset" view)
  
  const calculateScore = () => {
    let score = 650; // Starting strong base
    
    // Utilization Impact (up to +100 points)
    if (utilization <= 10) score += 100;
    else if (utilization <= 30) score += 70;
    else if (utilization <= 50) score += 30;
    else if (utilization <= 80) score -= 20;
    else score -= 60;

    // Age Impact (up to +70 points)
    score += Math.min(age * 10, 70);

    // Inquiry Impact (Misunderstood)
    // 0-2 inquiries: No penalty (Normal behavior)
    // 3-5 inquiries: Minor dip
    if (inquiries > 2 && inquiries <= 5) score -= 15;
    else if (inquiries > 5) score -= 40;
    
    return Math.min(Math.max(score, 350), 850);
  };

  const currentScore = calculateScore();

  const getAssetStatus = (score) => {
    if (score >= 800) return { label: 'Elite Asset', color: '#D4AF37', desc: 'Maximum leverage. Lowest cost of capital.' };
    if (score >= 740) return { label: 'Strong Asset', color: '#2e7d32', desc: 'Highly efficient. Most doors are open.' };
    if (score >= 670) return { label: 'Solid Core', color: '#1976d2', desc: 'Good standing. Useful for standard leverage.' };
    return { label: 'Rebuilding Phase', color: '#d32f2f', desc: 'Cost of capital is currently high.' };
  };

  const status = getAssetStatus(currentScore);

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
        <TrendingUp size={24} color="var(--color-gold-primary)" />
        <h3 style={{ margin: 0 }}>Credit as a Strategic Asset</h3>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '1px' }}>Borrowing Power Score</div>
        <motion.div 
          key={currentScore}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ fontSize: '4rem', fontWeight: 'bold', color: status.color, lineHeight: 1 }}
        >
          {currentScore}
        </motion.div>
        <div style={{ marginTop: '5px', fontWeight: 'bold', color: status.color, textTransform: 'uppercase', fontSize: '0.9rem' }}>
          {status.label}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '35px' }}>
        {/* Utilization Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Credit Utilization</span>
            <span style={{ color: utilization <= 30 ? '#2e7d32' : '#d32f2f', fontWeight: 'bold' }}>{utilization}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={utilization}
            onChange={(e) => setUtilization(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-gold-primary)' }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '5px' }}>
            {utilization <= 30 ? 'High strategic value. Low risk profile.' : 'Capital is tight. Utilization is dragging score.'}
          </div>
        </div>

        {/* Age Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Average Account Age</span>
            <span style={{ color: 'var(--color-brown-primary)', fontWeight: 'bold' }}>{age} Years</span>
          </div>
          <input 
            type="range" min="0" max="25" value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-brown-primary)' }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '5px' }}>
            Your "Anchor." Longer history builds institutional trust.
          </div>
        </div>

        {/* Inquiries Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Recent Inquiries</span>
            <span style={{ color: inquiries <= 2 ? '#2e7d32' : '#f57c00', fontWeight: 'bold' }}>{inquiries}</span>
          </div>
          <input 
            type="range" min="0" max="12" value={inquiries}
            onChange={(e) => setInquiries(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-gold-primary)' }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '5px', display: 'flex', gap: '5px' }}>
            <Info size={14} style={{ flexShrink: 0 }} />
            <span>{inquiries <= 3 ? "Normal activity. Shopping for best rates is healthy." : "Elevated activity. Lenders may see caution flags."}</span>
          </div>
        </div>
      </div>

      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '12px', borderLeft: '4px solid var(--color-gold-primary)', marginBottom: '15px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="var(--color-gold-primary)" />
          The Strategy
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
          Your credit score isn't a grade—it's the <strong>price of admission</strong> to low-cost capital. High scores allow you to use "Other People's Money" to build your own wealth.
        </p>
      </div>

      <div style={{ background: 'rgba(25, 118, 210, 0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(25, 118, 210, 0.1)' }}>
        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', color: '#1976d2', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={18} />
          Myth Buster: The Rate Shopping Rule
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
          Shopping for a mortgage or auto loan? FICO counts multiple inquiries of the same type within a <strong>14-45 day window</strong> as a <strong>single inquiry</strong>. You can shop for the best rate without damaging your asset.
        </p>
      </div>
    </div>
  );
};

export default CreditSlider;
