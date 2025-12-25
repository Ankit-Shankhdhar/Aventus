import React, { useState, useEffect } from 'react'
import AdminLayout from '../../layout/AdminLayout'
import {
  Trophy,
  Users,
  Newspaper,
  CalendarDays,
  Briefcase,
  Package,
  Handshake,
  UserCircle2,
} from 'lucide-react';
import styles from '../../styles/AdminDashboard.module.css';
const cards = [
  { label: 'Teams', value: 1, icon: Trophy, accent: '#3b82f6' },
  { label: 'Players', value: 5, icon: Users, accent: '#22c55e' },
  { label: 'News Articles', value: 0, icon: Newspaper, accent: '#a855f7' },
  { label: 'Matches', value: 2, icon: CalendarDays, accent: '#ef4444' },
  { label: 'Job Postings', value: 2, icon: Briefcase, accent: '#facc15' },
  { label: 'Products', value: 0, icon: Package, accent: '#ec4899' },
  { label: 'Sponsors', value: 4, icon: Handshake, accent: '#6366f1' },
  { label: 'Management', value: 2, icon: UserCircle2, accent: '#22c55e' },
];

const Dashboard = () => {
    const [teams, setTeams] = React.useState([]);
    const [players, setPlayers] = React.useState([]);
    const [matches, setMatches] = React.useState([]);
    const [news, setNews] = React.useState([]);
    const [jobs, setJobs] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [sponsors, setSponsors] = React.useState([]);
    const [management, setManagement] = React.useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/teams').then(res => res.json()).then(data => setTeams(data));
        fetch('http://localhost:5000/api/players').then(res => res.json()).then(data => setPlayers(data));
        fetch('http://localhost:5000/api/matches').then(res => res.json()).then(data => setMatches(data));
        fetch('http://localhost:5000/api/news').then(res => res.json()).then(data => setNews(data.news || []));
        fetch('http://localhost:5000/api/jobs').then(res => res.json()).then(data => setJobs(data));
        fetch('http://localhost:5000/api/products').then(res => res.json()).then(data => setProducts(data.products || []));
        fetch('http://localhost:5000/api/sponsors').then(res => res.json()).then(data => setSponsors(data));
        fetch('http://localhost:5000/api/management').then(res => res.json()).then(data => setManagement(data));

    }, []);

    const cards = [
        { label: 'Teams', value: teams.length, icon: Trophy, accent: '#3b82f6' },
        { label: 'Players', value: players.length, icon: Users, accent: '#22c55e' },
        { label: 'News Articles', value: news.length, icon: Newspaper, accent: '#a855f7' },
        { label: 'Matches', value: matches.length, icon: CalendarDays, accent: '#ef4444' },
        { label: 'Job Postings', value: jobs.length, icon: Briefcase, accent: '#facc15' },
        { label: 'Products', value: products.length, icon: Package, accent: '#ec4899' },
        { label: 'Sponsors', value: sponsors.length, icon: Handshake, accent: '#6366f1' },
        { label: 'Management', value: management.length, icon: UserCircle2, accent: '#22c55e' },
    ];

  return (
    <AdminLayout>
        <div className={styles.page}>
            <div className={styles.pageBar}>
                <span>Dashboard</span>
            </div>

            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard Overview</h1>
                <p className={styles.subtitle}>Welcome to admin panel</p>
            </header>

            <section className={styles.grid}>
                {cards.map(({label, value, icon: Icon, accent}) => (
                    <article key={label} className={styles.card}>
                        <div className={styles.cardTop}>
                            <span className={styles.cardLabel}>{label}</span>
                            <Icon className={styles.cardIcon} style={{ color: accent }} size={24}></Icon>
                        </div>
                        <div className={styles.cardValue}>{value}</div>
                    </article>
                ))}
            </section>
        </div>
    </AdminLayout>
  )
}

export default Dashboard
