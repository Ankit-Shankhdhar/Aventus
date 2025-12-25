import React from 'react'
import Navbar from '../components/NavBar.jsx'
import Footer from '../components/Footer.jsx'
import styles from '../styles/Contact.module.css'

import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
} from 'lucide-react';

const Contact = () => {
  const [showToast, setShowToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      discord: e.target.elements.discord.value,
      subject: e.target.elements.subject.value,
      message: e.target.elements.message.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/emails/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowToast(true);
        e.target.reset();
        setTimeout(() => setShowToast(false), 3500);
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to send message. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
        <Navbar />
        <div className={styles.heroGlow} />
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    Get in <span className={styles.highlight}>Touch</span>
                </h1>
                <p className={styles.subtitle}>
                Have a question, partnership inquiry, or just want to say hi? We&apos;d love to hear from you.
                </p>
            </section>

            <div className={styles.wrapper}>
              <div className={styles.grid}>
                <section className={styles.formCard}>
                  <h1 className={styles.formTitle}>Send us a Message</h1>

                  <form action="" className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.rowTwo}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={styles.input}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={styles.input}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Discord Username</label>
                  <input
                    type="text"
                    name="discord"
                    className={styles.input}
                    placeholder="username#0000"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Subject <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className={styles.input}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Message <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    name="message"
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                {error && (
                  <div style={{ color: '#ef4444', padding: '10px', background: '#fee', borderRadius: '5px', marginBottom: '15px' }}>
                    {error}
                  </div>
                )}

                <button type="submit" className={styles.submitButton} disabled={loading}>
                  <Send size={16} className={styles.submitIcon} />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
                  </form>
                </section>

                <section className={styles.sideCol}>
                  <div className={styles.infoCard}>
                    <h2 className={styles.sectionTitle}>Contact Info</h2>

                    <div className={styles.infoItem}>
                      <div className={styles.infoIconWrap} style={{ backgroundColor: '#083a49' }}>
                        <Mail size={25} style={{ color: '#03a7bc' }} />
                      </div>

                      <div>
                        <div className={styles.infoLabel}>Email</div>
                        <div className={styles.infoValue}>contact@teamaventus.gg</div>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoIconWrap} style={{ backgroundColor: '#291d47' }}>
                        <MessageCircle size={25} style={{ color: '#954de0' }} />
                      </div>

                      <div>
                        <div className={styles.infoLabel}>Discord</div>
                        <div className={styles.infoValue}>discord.gg/teamaventus</div>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoIconWrap} style={{ backgroundColor: '#1b2232' }}>
                        <MapPin size={25} style={{ color: '#8f9eb2' }} />
                      </div>

                      <div>
                        <div className={styles.infoLabel}>Headquarters</div>
                        <div className={styles.infoValue}>Los Angeles, CA, USA</div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
        </main>
          {showToast && (
            <div className={styles.toast}>
              <p className={styles.toastTitle}>Message Sent!</p>
              <p className={styles.toastText}>
                Thank you for reaching out. We&apos;ll get back to you soon.
              </p>
            </div>
    )}
        <Footer />
    </div>
  )
}

export default Contact
