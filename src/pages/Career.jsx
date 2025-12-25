import React from 'react'
import Navbar from '../components/NavBar.jsx'
import styles from '../styles/Career.module.css'
import Footer from '../components/Footer.jsx'

import { MapPin, Clock, ArrowRight, Filter, Briefcase, Users, Gamepad2, Video, Wrench } from 'lucide-react';

const Career = () => {
    const [selectedFilter, setSelectedFilter] = React.useState('all');
    const [jobs, setJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/jobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();
                setJobs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);
    const filteredJobs = selectedFilter == 'all' ? jobs : jobs.filter(job => job.type.toLowerCase() === selectedFilter);

return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.heroGlow}></div>
      <main className={styles.main}>
        <section className={styles.hero}>
            <h1 className={styles.title}>
                Join the <span className={styles.highlight}>Team</span>
            </h1>
            <p className={styles.subtitle}>
            Be part of a winning organization. We&apos;re always looking for talented players,
            creators, and professionals to join our family.
            </p>
        </section>

        <section className={styles.statsBar}>
            <div className={styles.statsItem}>
                <div className={styles.statsNumber}>{jobs.length}</div>
                <div className={styles.statsLabel}>Open Positions</div>
            </div>
            <div className={styles.statsItem}>
                <div className={styles.statsNumber}>4</div>
                <div className={styles.statsLabel}>Active Team</div>
            </div>
            <div className={styles.statsItem}>
                <div className={styles.statsNumber}>Remote</div>
                <div className={styles.statsLabel}>Work Culture</div>
            </div>
            <div className={styles.statsItem}>
                <div className={styles.statsNumber}>Global</div>
                <div className={styles.statsLabel}>Team</div>
            </div>
        </section>

        <section className={styles.jobsSection}>
            <div className={styles.filterRow}>
                <button className={styles.filterIconBtn}>
                    <Filter size={16} />
                </button>

                <div className={styles.filterButtons}>
                    {[
                {
                  key: 'all',
                  label: 'All Positions',
                  icon: <Briefcase size={16} />,
                },
                {
                  key: 'staff',
                  label: 'Staff',
                  icon: <Users size={16} />,
                },
                {
                  key: 'player',
                  label: 'Players',
                  icon: <Gamepad2 size={16} />,
                },
                {
                  key: 'creator',
                  label: 'Creators',
                  icon: <Video size={16} />,
                },
                {
                  key: 'freelance',
                  label: 'Freelance',
                  icon: <Wrench size={16} />,
                },
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setSelectedFilter(btn.key)}
                  className={`${styles.filterBtn} ${selectedFilter == btn.key ? styles.filterBtnActive : ''}`}
                  >{btn.icon} <span>{btn.label}</span></button>
              ))}
                </div>
            </div>

            <div className={styles.jobsList}>
                {filteredJobs.map((job) => {
                    const iconMap = {
                        'all': <Briefcase size={22} />,
                        'staff': <Users size={22} />,
                        'player': <Gamepad2 size={22} />,
                        'creator': <Video size={22} />,
                        'freelance': <Wrench size={22} />
                    };

                    return (
                        <article key={job.id} className={styles.jobCard} onClick={() => window.location.href = `/careers/${job.slug}`}>
                            <div className={styles.jobHeader}>
                                <div className={`${styles.jobIcon} ${job.type === 'staff' ? styles.staffIcon : job.type === 'player' ? styles.playerIcon : job.type === 'creator' ? styles.creatorIcon : job.type === 'freelance' ? styles.freelanceIcon : job.type === 'all' ? styles.allIcon : ''}`}>
                                    {iconMap[job.type] || <Briefcase size={22} />}
                                </div>

                                <div>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <p className={styles.jobDept}>{job.department}</p>

                                    <div className={styles.jobMetaRow}>
                                        <span className={styles.metaItem}>
                                            <MapPin size={14} /> 
                                            {job.location}
                                        </span>

                                        {job.isRemote && (
                                            <span className={`${styles.metaItem} ${styles.badge}`}>Remote</span>
                                        )}

                                        <span className={styles.metaItem}>
                                            <Clock size={14} /> {new Date(job.postedAt).toLocaleDateString("en-US")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.jobLink}>
                                View Details <ArrowRight size={16} />
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>

        <section className={styles.ctaSection}>
            <div className={styles.ctaInner}>
                <h2 className={styles.ctaTitle}>Don&apos;t see the right fit?</h2>
                <p className={styles.ctaText}>We&apos;re always interested in meeting talented individuals.
                Send us a general application and we&apos;ll keep you in mind for
                future opportunities.
                </p>
                <button className={styles.ctaButton}>General Application</button>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Career
