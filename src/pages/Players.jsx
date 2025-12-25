import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Players.module.css";
import {
  Search,
  Filter,
  Twitter,
  Twitch,
  MapPin,
  User as UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

/* fallback mock data so you can preview without API */
const MOCK_PLAYERS = [
  {
    _id: "1",
    slug: "phoenix",
    name: "Phoenix",
    role: "Duelist",
    team: "Team Aventus",
    country: "USA",
    initial: "P",
    socials: { twitter: "#", twitch: "#" },
    featured: false,
  },
  {
    _id: "2",
    slug: "sage",
    name: "Sage",
    role: "Sentinel",
    team: "Team Aventus",
    country: "Canada",
    initial: "S",
    socials: { twitter: "#", twitch: "#" },
    featured: false,
  },
  {
    _id: "3",
    slug: "jett",
    name: "Jett",
    role: "Duelist",
    team: "Team Aventus",
    country: "UK",
    initial: "J",
    socials: { twitter: "#", twitch: "#" },
    featured: false,
  },
  {
    _id: "4",
    slug: "omen",
    name: "Omen",
    role: "Controller",
    team: "Team Aventus",
    country: "Germany",
    initial: "O",
    socials: { twitter: "#", twitch: "#" },
    featured: false,
  },
];

export default function Players() {
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  React.useEffect(() => {
    let mounted = true;
    fetch("http://localhost:5000/api/players")
      .then((res) => {
        if (!res.ok) throw new Error("no-api");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        // Adapt API response to component structure
        const adaptedData = Array.isArray(data) ? data.map(player => ({
          _id: player._id,
          slug: player.slug,
          name: player.name,
          realName: player.realName,
          role: player.role,
          team: player.teamId?.name || "Team Aventus",
          country: player.country,
          initial: player.name ? player.name.charAt(0) : "",
          socials: player.socialLinks || { twitter: "#", twitch: "#" },
          type: player.type,
          featured: false,
          game: "VALORANT"
        })) : [];
        setPlayers(adaptedData);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
        // fallback to mock
        if (!mounted) return;
        setPlayers(MOCK_PLAYERS);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const filtered = players.filter((p) => {
    const q = query.trim().toLowerCase();
    if (q && !p.name.toLowerCase().includes(q) && !p.realName?.toLowerCase().includes(q)) return false;
    if (filter === "player") return p.type === "player" || p.role?.toLowerCase().includes("duelist") || p.role?.toLowerCase().includes("controller") || p.role?.toLowerCase().includes("sentinel") || p.role?.toLowerCase().includes("initiator");
    if (filter === "creator") return p.type === "creator";
    if (filter === "staff") return p.type === "staff";
    return true;
  });

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.heroGlow} />
      <div className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Our <span className={styles.highlight}>Players</span>
          </h1>
          <p className={styles.subtitle}>
            Meet the talented individuals who represent Team Aventus across all
            divisions.
          </p>
        </section>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterWrap}>
          <Filter size={18} className={styles.filterIcon} />
          <button
            className={`${styles.pill} ${filter === "all" ? styles.pillActive : ""}`}
            onClick={() => setFilter("all")}
            type="button"
          >
            All
          </button>
          <button
            className={`${styles.pill} ${filter === "player" ? styles.pillActive : ""}`}
            onClick={() => setFilter("player")}
            type="button"
          >
            Player
          </button>
          <button
            className={`${styles.pill} ${filter === "creator" ? styles.pillActive : ""}`}
            onClick={() => setFilter("creator")}
            type="button"
          >
            Creator
          </button>
          <button
            className={`${styles.pill} ${filter === "staff" ? styles.pillActive : ""}`}
            onClick={() => setFilter("staff")}
            type="button"
          >
            Staff
          </button>
        </div>
      </div>

          <section className={styles.gridSection}>
            {loading ? (
              <div className={styles.loading}>Loading players...</div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((p) => (
                  <article
                    key={p._id || p.slug}
                    className={`${styles.card} ${p.featured ? styles.cardFeatured : ""}`}
                    aria-label={p.name}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.initial}>{p.initial || (p.name ? p.name.charAt(0) : "")}</div>
                      <span className={styles.typeBadge}>PLAYER</span>
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.name}>{p.name}</h3>
                      <p className={styles.metaName}>
                        <UserIcon size={14} /> {p.realName || p.team || "N/A"}
                      </p>

                      <div className={styles.roleWrap}>
                        <span className={styles.role}>{p.role}</span>
                      </div>

                      <div className={styles.location}>
                        <MapPin size={12} />
                        <span>{p.country || "—"}</span>
                        <span className={styles.dot}>•</span>
                        <span>{p.game || "VALORANT"}</span>
                      </div>

                      <div className={styles.socials}>
                        <a className={styles.socialBtn} href={p.socials?.twitter || "#"} title="Twitter">
                          <Twitter size={14} />
                        </a>
                        <a className={styles.socialBtn} href={p.socials?.twitch || "#"} title="Twitch">
                          <Twitch size={14} />
                        </a>
                      </div>

                      <Link to={`/players/${p.slug}`} className={styles.cardLink}>
                        View profile
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

      <Footer />
    </div>
  );
}
