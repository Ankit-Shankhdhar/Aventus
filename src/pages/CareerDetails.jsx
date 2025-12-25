import React from 'react'
import styles from '../styles/CareerDetails.module.css'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer.jsx'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BriefcaseBusiness, CheckCircle, Clock3, MapPin } from 'lucide-react';

const typeLabelMap = {
  staff: 'Staff',
  player: 'Player',
  creator: 'Creator',
  freelance: 'Freelance'
}

const CareerDetails = () => {
    const { slug } = useParams();
    const [job, setJob] = React.useState(null);
    const navigate = useNavigate();
    
    React.useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/jobs/${slug}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [slug]); 
    
    if (!job) {
        return (
            <div className={styles.container}>
                <Navbar />
                <div className={styles.main}>Loading...</div>
                <Footer />
            </div>
        );
    }

    const formattedDate = new Date(job.postedAt).toLocaleDateString('en-US');
    const typeLable = typeLabelMap[job.type] || 'Position';

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.heroGlow} />
            <main className={styles.main}>
                <div className={styles.wrapper}>
                  <button className={styles.backLink} onClick={() => navigate(-1)}><ArrowLeft size={16}/><span>Back to Career</span></button>
                  <div className={styles.tagRow}>
                    <span className={`${styles.tag} ${styles.tagType}`}>{typeLable.toUpperCase()}</span>
                    {job.isRemote && (<span className={`${styles.tag} ${styles.tagRemote}`}>Remote</span>)}
                  </div>
                  <h1 className={styles.title}>{job.title}</h1>
                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}><BriefcaseBusiness size={16} />{job.department}</span>
                    <span className={styles.metaItem}><MapPin size={16} />{job.location}</span>
                    <span className={styles.metaItem}><Clock3 size={16} />Posted {formattedDate}</span>
                  </div>
                  <button className={styles.primaryButton}>Apply Now</button>

                  <div className={styles.contentGrid}>
                    <section className={styles.leftCol}>
                      <div className={styles.block}>
                        <h2 className={styles.blockTitle}>About This Role</h2>
                        <p className={styles.blockText}>{job.description}</p>
                      </div>

                      <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Responsibilities</h2>
                        <ul className={styles.list}>
                          {job.responsibilities.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                              <CheckCircle className={styles.listIcon} size={18} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Requirements</h2>
                        <ul className={styles.list}>
                          {job.requirements.map((item, idx) => (
                            <li key={idx} className={styles.listItem}>
                              <CheckCircle className={`${styles.listIcon} ${styles.listIcon2}`} size={18} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>

                    <aside className={styles.applyCard}>
                      <h3 className={styles.applyTitle}>Apply for this position</h3>

                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Position Type</span>
                        <span className={styles.infoValue}>{typeLable}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Department</span>
                        <span className={styles.infoValue}>{job.department}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Location</span>
                        <span className={styles.infoValue}>{job.location}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Remote</span>
                        <span className={styles.infoValue}>{(job.isRemote) ? "Yes" : "No"}</span>
                      </div>

                      <button className={styles.applyButton}>Apply Now</button>

                      <p className={styles.applyNote}>
                        Or email us at careers@teamaventus.gg.
                      </p>
                    </aside>
                  </div>
                </div>
            </main>
      <Footer />
    </div>
  )
}

export default CareerDetails
