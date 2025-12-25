import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from '../styles/PlayerDetails.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Twitter, Twitch } from 'lucide-react'

const PlayerDetails = () => {
  const { slug } = useParams();
  const [player, setPlayer] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/players/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch player details');
        }
        const data = await response.json();
        setPlayer(data);
      } catch (error) {
        console.error('Error fetching player details:', error);
      }
    };

    fetchPlayerDetails();
  }, [slug]);

  if (!player) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.main}>Loading...</div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(player.joinDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.heroGlow} />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <button className={styles.backLink} onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            <span>Back to Players</span>
          </button>

          <div className={styles.contentGrid}>
            <aside className={styles.playerCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {player.name ? player.name.charAt(0) : 'P'}
                </div>
              </div>

              <div className={styles.socials}>
                {player.socialLinks?.twitter && (
                  <a
                    className={styles.socialBtn}
                    href={player.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <Twitter size={16} />
                  </a>
                )}
                {player.socialLinks?.twitch && (
                  <a
                    className={styles.socialBtn}
                    href={player.socialLinks.twitch}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitch"
                  >
                    <Twitch size={16} />
                  </a>
                )}
              </div>
            </aside>

            <section className={styles.rightCol}>
              <div className={styles.tagRow}>
                <span className={`${styles.tag} ${styles.tagPlayer}`}>PLAYER</span>
                <span className={`${styles.tag} ${styles.tagRole}`}>{player.role?.toUpperCase()}</span>
              </div>

              <h1 className={styles.title}>{player.name}</h1>
              <p className={styles.realName}>{player.realName}</p>

              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <MapPin size={16} />
                  {player.country}
                </span>
                <span className={styles.metaItem}>
                  <Calendar size={16} />
                  Joined {formattedDate}
                </span>
              </div>

              {player.teamId && (
                <div className={styles.teamCard}>
                  <div className={styles.teamIcon}>
                    {player.teamId.name ? player.teamId.name.charAt(0) : 'V'}
                  </div>
                  <div className={styles.teamInfo}>
                    <span className={styles.teamLabel}>Current Team</span>
                    <span className={styles.teamName}>{player.teamId.name}</span>
                  </div>
                </div>
              )}

            </section>
          </div>
        </div>

        <div className={styles.sectionsWrapper}>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>
              Career <span className={styles.highlight}>Highlights</span>
            </h2>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>128</div>
              <div className={styles.statLabel}>Matches Played</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>68%</div>
              <div className={styles.statLabel}>Win Rate</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>3</div>
              <div className={styles.statLabel}>Championships</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>12</div>
              <div className={styles.statLabel}>MVPs</div>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>
              <span className={styles.achievementIcon}>🏆</span> Team Achievements
            </h2>
            <div className={styles.achievementsList}>
              <div className={styles.achievementCard}>
                <div className={styles.achievementIconBox}>
                  <span>🏆</span>
                </div>
                <span className={styles.achievementText}>VCT Challengers 2024 - 1st Place</span>
              </div>
              <div className={styles.achievementCard}>
                <div className={styles.achievementIconBox}>
                  <span>🏆</span>
                </div>
                <span className={styles.achievementText}>Regional Finals Champion</span>
              </div>
              <div className={styles.achievementCard}>
                <div className={styles.achievementIconBox}>
                  <span>🏆</span>
                </div>
                <span className={styles.achievementText}>Community Cup Winner</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PlayerDetails
