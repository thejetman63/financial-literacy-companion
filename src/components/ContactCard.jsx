import { UserPlus, Mail } from 'lucide-react';

const ContactCard = () => {
  // Placeholder info - User can swap this later
  const contactInfo = {
    name: "Brian Jetton",
    title: "Senior Financial Advisor",
    email: "brian.jetton@wellsfargo.com",
    phone: "972-341-8819"
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:Financial Strategy
TITLE:${contactInfo.title}
TEL;TYPE=WORK,VOICE:${contactInfo.phone}
EMAIL;TYPE=PREF,INTERNET:${contactInfo.email}
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
      <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem', color: 'var(--color-brown-primary)' }}>{contactInfo.name}</h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-gold-primary)', fontWeight: 'bold', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>{contactInfo.title}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          className="btn-primary" 
          onClick={downloadVCard}
          style={{ width: '100%' }}
        >
          <UserPlus size={18} /> Add to Contacts
        </button>
        
        <a href={`mailto:${contactInfo.email}`} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'white', color: 'var(--color-brown-primary)', border: '1px solid var(--color-brown-primary)', textDecoration: 'none' }}>
          <Mail size={18} /> Send Email
        </a>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '20px' }}>
        Scan this app anytime to access the calculators we used today.
      </p>
    </div>
  );
};

export default ContactCard;
