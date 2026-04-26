import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Globe, Mail, Phone, ExternalLink } from 'lucide-react';

const ContactCard = () => {
  // Placeholder info - User can swap this later
  const contactInfo = {
    name: "Financial Advisor Name",
    title: "Executive Financial Advisor",
    email: "advisor@example.com",
    phone: "555-0123",
    linkedin: "https://linkedin.com/in/username"
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:Strategic Wealth Group
TITLE:${contactInfo.title}
TEL;TYPE=WORK,VOICE:${contactInfo.phone}
EMAIL;TYPE=PREF,INTERNET:${contactInfo.email}
URL:${contactInfo.linkedin}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'advisor_contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '20px', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-gold-primary)', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
        WF
      </div>
      <h3 style={{ margin: '0 0 5px 0' }}>{contactInfo.name}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>{contactInfo.title}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          className="btn-primary" 
          onClick={downloadVCard}
          style={{ width: '100%' }}
        >
          <UserPlus size={18} /> Add to Contacts
        </button>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <a href={`mailto:${contactInfo.email}`} className="poll-option" style={{ margin: 0, padding: '10px', display: 'flex', justifyContent: 'center', color: 'var(--color-brown-primary)' }}>
            <Mail size={20} />
          </a>
          <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="poll-option" style={{ margin: 0, padding: '10px', display: 'flex', justifyContent: 'center', color: 'var(--color-brown-primary)' }}>
            <Globe size={20} />
          </a>
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '20px' }}>
        Scan this app anytime to access the calculators we used today.
      </p>
    </div>
  );
};

export default ContactCard;
