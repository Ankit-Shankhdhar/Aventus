import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from '../styles/Partners.module.css'

const Partners = () => {
  const [sponsors, setSponsors] = React.useState([]);
  const [mainPartners, setMainPartners] = React.useState([]);
  const [officialPartners, setOfficialPartners] = React.useState([]);
  const [supporters, setSupporters] = React.useState([]);

  React.useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sponsors');
        if (!response.ok) {
          throw new Error('Failed to fetch sponsors');
        }
        const data = await response.json();
        
        // Filter active sponsors and separate by tier
        const activeSponsors = data.filter(sponsor => sponsor.isActive);
        setMainPartners(activeSponsors.filter(s => s.tier === 'main'));
        setOfficialPartners(activeSponsors.filter(s => s.tier === 'partner'));
        setSupporters(activeSponsors.filter(s => s.tier === 'supporter'));
        setSponsors(activeSponsors);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.heroGlow}></div>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Our <span className={styles.highlight}>Partners</span>
          </h1>
          <p className={styles.subtitle}>
            We're proud to work with industry-leading brands who share our passion for gaming excellence.
          </p>
        </section>

        <section className={styles.partnersSection}>
          <div className={styles.wrapper}>
            {/* Main Partners */}
            <div className={styles.tierSection}>
              <h2 className={styles.tierTitle}>
                Main <span className={styles.highlight}>Partners</span>
              </h2>
              <p className={styles.tierSubtitle}>Our premier partners and sponsors</p>
              
              <div className={styles.mainPartnersGrid}>
                {mainPartners.length > 0 ? (
                  mainPartners.map((partner) => (
                    <a
                      key={partner._id}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mainPartnerCard}
                    >
                      <div className={styles.partnerLogo}>
                        {partner.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className={styles.partnerName}>{partner.name}</span>
                    </a>
                  ))
                ) : (
                  <div className={styles.emptyState}>No main partners available</div>
                )}
              </div>
            </div>

            {/* Official Partners */}
            <div className={styles.tierSection}>
              <h2 className={styles.tierTitle}>
                Official <span className={styles.highlight}>Partners</span>
              </h2>
              <p className={styles.tierSubtitle}>Valued partners supporting our journey</p>
              
              <div className={styles.officialPartnersGrid}>
                {officialPartners.length > 0 ? (
                  officialPartners.map((partner) => (
                    <a
                      key={partner._id}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.officialPartnerCard}
                    >
                      <div className={styles.officialPartnerIcon}>
                        {partner.name.charAt(0).toUpperCase()}
                      </div>
                      <span className={styles.officialPartnerName}>{partner.name}</span>
                    </a>
                  ))
                ) : (
                  <div className={styles.emptyState}>No official partners available</div>
                )}
              </div>
            </div>

            {/* Supporters */}
            <div className={styles.tierSection}>
              <h2 className={styles.tierTitle}>
                <span className={styles.highlight}>Supporters</span>
              </h2>
              <p className={styles.tierSubtitle}>Thank you to all our supporters</p>
              
              <div className={styles.supportersGrid}>
                {supporters.length > 0 ? (
                  supporters.map((partner) => (
                    <div
                      key={partner._id}
                      className={styles.supporterBadge}
                    >
                      {partner.name}
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyState}>No supporters available</div>
                )}
              </div>
            </div>

            {/* Become a Partner CTA */}
            <div className={styles.ctaSection}>
              <div className={styles.ctaCard}>
                <h2 className={styles.ctaTitle}>
                  Become a <span className={styles.highlight}>Partner</span>
                </h2>
                <p className={styles.ctaText}>
                  Interested in partnering with Team Aventus? We'd love to hear from you.<br />
                  Let's create something amazing together.
                </p>
                <button className={styles.ctaButton}>GET IN TOUCH</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Partners
