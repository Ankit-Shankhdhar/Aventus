import React from 'react'
import NavBar from '../components/NavBar.jsx'
import Footer from '../components/Footer'
import styles from '../styles/Apply.module.css'
import {
  Gamepad2,
  Video,
  BriefcaseBusiness,
  CheckCircle2,
} from 'lucide-react';

const OPTIONS = [
  {
    id: 'player',
    label: 'Player',
    description: 'Join our competitive rosters',
    Icon: Gamepad2,
  },
  {
    id: 'creator',
    label: 'Content Creator',
    description: 'Create content with us',
    Icon: Video,
  },
  {
    id: 'staff',
    label: 'Staff',
    description: 'Join our team behind the scenes',
    Icon: BriefcaseBusiness,
  },
];

const formTitleByType = {
  player: 'Player Application',
  creator: 'Content Creator Application',
  staff: 'Staff Application',
};


const Apply = () => {
    const [selected, setSelected] = React.useState('player');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.target);
        const data = {
            applicationType: selected,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            discord: formData.get('discord'),
            country: formData.get('country'),
            primaryGame: formData.get('primaryGame'),
            currentRank: formData.get('currentRank'),
            inGameRole: formData.get('inGameRole'),
            primaryPlatform: formData.get('primaryPlatform'),
            followerCount: formData.get('followerCount'),
            positionInterest: formData.get('positionInterest'),
            portfolioLinks: formData.get('portfolioLinks'),
            experience: formData.get('experience'),
            whyTeamAventus: formData.get('whyTeamAventus'),
        };

        try {
            const response = await fetch('http://localhost:5000/api/emails/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
                e.target.reset();
                setTimeout(() => {
                    setSuccess(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 3000);
            } else {
                setError(result.message || 'Failed to submit application. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to submit application. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };
    const renderFormFields = () => {
        if (selected === 'staff') {
            return (
                <>
                    <div className={styles.formRow}>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                First Name <span className={styles.required}>*</span>
                            </label>
                            <input name="firstName" className={styles.input} placeholder="First name" required />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Last Name <span className={styles.required}>*</span>
                            </label>
                            <input name="lastName" className={styles.input} placeholder="Last name" required />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Email <span className={styles.required}>*</span>
                        </label>
                        <input name="email" type="email" className={styles.input} placeholder="you@example.com" required />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Discord Username <span className={styles.required}>*</span>
                            </label>
                            <input name="discord" className={styles.input} placeholder="username#0000" required />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Country <span className={styles.required}>*</span>
                            </label>
                            <input name="country" className={styles.input} placeholder="e.g., United States" required />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Position Interest <span className={styles.required}>*</span>
                        </label>
                        <input
                            name="positionInterest"
                            className={styles.input}
                            placeholder="e.g., Social Media Manager, Graphic Designer"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Portfolio / Social Links</label>
                        <input
                            name="portfolioLinks"
                            className={styles.input}
                            placeholder="Twitter, Twitch, YouTube, etc."
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Experience &amp; Achievements <span className={styles.required}>*</span>
                        </label>
                        <textarea
                            name="experience"
                            className={`${styles.input} ${styles.textarea}`}
                            placeholder="Tell us about your relevant experience and skills..."
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Why Team Aventus? <span className={styles.required}>*</span>
                        </label>
                        <textarea
                            name="whyTeamAventus"
                            className={`${styles.input} ${styles.textarea}`}
                            placeholder="Tell us why you want to join Team Aventus and what you can bring to the organization..."
                            required
                        />
                    </div>
                </>
            );
        }

        if (selected === 'creator') {
            return (
                <>
                    <div className={styles.formRow}>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                First Name <span className={styles.required}>*</span>
                            </label>
                            <input name="firstName" className={styles.input} placeholder="First name" required />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Last Name <span className={styles.required}>*</span>
                            </label>
                            <input name="lastName" className={styles.input} placeholder="Last name" required />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Email <span className={styles.required}>*</span>
                        </label>
                        <input name="email" type="email" className={styles.input} placeholder="you@example.com" required />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Discord Username <span className={styles.required}>*</span>
                            </label>
                            <input name="discord" className={styles.input} placeholder="username#0000" required />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Country <span className={styles.required}>*</span>
                            </label>
                            <input name="country" className={styles.input} placeholder="e.g., United States" required />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Primary Platform <span className={styles.required}>*</span>
                        </label>
                        <input
                            name="primaryPlatform"
                            className={styles.input}
                            placeholder="e.g., YouTube, Twitch, TikTok"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Follower Count <span className={styles.required}>*</span>
                        </label>
                        <input
                            name="followerCount"
                            className={styles.input}
                            placeholder="e.g., 10K, 50K"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Portfolio / Social Links</label>
                        <input
                            name="portfolioLinks"
                            className={styles.input}
                            placeholder="Twitter, Twitch, YouTube, etc."
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Experience &amp; Achievements <span className={styles.required}>*</span>
                        </label>
                        <textarea
                            name="experience"
                            className={`${styles.input} ${styles.textarea}`}
                            placeholder="Tell us about your content, growth, and what makes your content unique..."
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Why Team Aventus? <span className={styles.required}>*</span>
                        </label>
                        <textarea
                            name="whyTeamAventus"
                            className={`${styles.input} ${styles.textarea}`}
                            placeholder="Tell us why you want to join Team Aventus and what you can bring to the organization..."
                            required
                        />
                    </div>
                </>
            );
        }

        // player
        return (
            <>
                <div className={styles.formRow}>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            First Name <span className={styles.required}>*</span>
                        </label>
                        <input name="firstName" className={styles.input} placeholder="First name" required />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Last Name <span className={styles.required}>*</span>
                        </label>
                        <input name="lastName" className={styles.input} placeholder="Last name" required />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        Email <span className={styles.required}>*</span>
                    </label>
                    <input name="email" type="email" className={styles.input} placeholder="you@example.com" required />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Discord Username <span className={styles.required}>*</span>
                        </label>
                        <input name="discord" className={styles.input} placeholder="username#0000" required />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Country <span className={styles.required}>*</span>
                        </label>
                        <input name="country" className={styles.input} placeholder="e.g., United States" required />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Primary Game <span className={styles.required}>*</span>
                        </label>
                        <input
                            name="primaryGame"
                            className={styles.input}
                            placeholder="e.g., VALORANT, CS2"
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Current Rank <span className={styles.required}>*</span>
                        </label>
                        <input
                            name="currentRank"
                            className={styles.input}
                            placeholder="e.g., Immortal 3, Global Elite"
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        In-Game Role <span className={styles.required}>*</span>
                    </label>
                    <input
                        name="inGameRole"
                        className={styles.input}
                        placeholder="e.g., Duelist, Support, IGL"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Portfolio / Social Links</label>
                    <input
                        name="portfolioLinks"
                        className={styles.input}
                        placeholder="Twitter, Twitch, YouTube, etc."
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        Experience &amp; Achievements <span className={styles.required}>*</span>
                    </label>
                    <textarea
                        name="experience"
                        className={`${styles.input} ${styles.textarea}`}
                        placeholder="Tell us about your competitive experience, previous teams, and notable achievements..."
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        Why Team Aventus? <span className={styles.required}>*</span>
                    </label>
                    <textarea
                        name="whyTeamAventus"
                        className={`${styles.input} ${styles.textarea}`}
                        placeholder="Tell us why you want to join Team Aventus and what you can bring to the organization..."
                        required
                    />
                </div>
            </>
        );
    };
  return (
    <div className={styles.container}>
        <NavBar />
        <div className={styles.heroGlow}/>
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    Apply to <span className={styles.highlight}>Team Aventus</span>
                </h1>
                <p className={styles.subtitle}>
                Ready to take your career to the next level? Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
            </section>
            <section className={styles.applyTypeSection}>
                <h2 className={styles.applyTypeHeading}>What are you applying for?</h2>

                <div className={styles.applyTypeCards}>
                    {OPTIONS.map(({id, label, description, Icon}) => {
                        const isActive = selected === id;
                        return (
                            <button className={`${styles.applyTypeCard} ${isActive ? styles.applyTypeCardActive : ''}`} key={id} type="button" onClick={() => setSelected(id)}>
                                <div className={styles.applyTypeIcon}>
                                    <Icon size={28} className={isActive ? styles.iconActive : styles.icon}/>
                                </div>
                                <h3 className={styles.applyTypeTitle}>{label}</h3>
                                <p className={styles.applyTypeDescription}>{description}</p>
                                {isActive && (
                                    <div className={styles.checkMark}>
                                        <CheckCircle2 size={30} />
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>
            </section>
            <section className={styles.formSection}>
                <div className={styles.formCard}>
                    <h2 className={styles.formTitle}>{formTitleByType[selected]}</h2>

                    <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                    >
                    {renderFormFields()}

                    {error && (
                        <div style={{ color: '#ef4444', padding: '15px', background: '#fee', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{ color: '#10b981', padding: '15px', background: '#d1fae5', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' }}>
                            ✓ Application submitted successfully! We'll review your application and get back to you soon.
                        </div>
                    )}

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>

                    <p className={styles.formDisclaimer}>
                        By submitting this application, you agree to our privacy policy and terms of service.
                    </p>
                    </form>
                </div>
            </section>

        </main>
        <Footer />
    </div>
  )
}

export default Apply
