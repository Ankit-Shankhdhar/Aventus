import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Teams from './pages/Teams.jsx'
import Home from './pages/Home.jsx'
import Career from './pages/Career.jsx'
import CareerDetails from './pages/CareerDetails.jsx'
import Contact from './pages/Contact.jsx'
import Apply from './pages/Apply.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import AdminTeams from './pages/admin/Teams.jsx';
import AdminPlayers from './pages/admin/Players.jsx';
import AdminMatches from './pages/admin/Matches.jsx';
import AdminNews from './pages/admin/News.jsx';
import AdminJobs from './pages/admin/Jobs.jsx';
import AdminProducts from './pages/admin/Products.jsx';
import AdminSponsors from './pages/admin/Sponsors.jsx';
import AdminManagement from './pages/admin/Management.jsx';
import AdminUsers from './pages/admin/Users.jsx';
import Players from './pages/Players.jsx';
import PlayerDetails from './pages/PlayerDetails.jsx';
import About from './pages/About.jsx';
import Partners from './pages/Partners.jsx';
import Shop from './pages/Shop.jsx';
import News from './pages/News.jsx';
import ExtendedNews from './pages/ExtendedNews.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/careers/:slug" element={<CareerDetails />} />
        <Route path="/players/:slug" element={<PlayerDetails/>} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<ExtendedNews />} />
        <Route path="/players" element={<Players />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/teams" element={<AdminTeams />} />
        <Route path="/admin/players" element={<AdminPlayers />} />  
        <Route path="/admin/matches" element={<AdminMatches />} />
        <Route path="/admin/news" element={<AdminNews />} />  
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/sponsors" element={<AdminSponsors />} />
        <Route path="/admin/management" element={<AdminManagement />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
