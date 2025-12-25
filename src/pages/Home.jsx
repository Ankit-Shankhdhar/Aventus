import React, { useState, useEffect } from 'react'
import Navbar from '../components/NavBar.jsx'
import { Gamepad2, Users, Trophy, UserPlus } from 'lucide-react'
import Footer from '../components/Footer'
import { ArrowRight } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { Video } from 'lucide-react'
import { Briefcase } from 'lucide-react'

const API_BASE_URL = 'http://localhost:5000/api'

const Home = () => {
  const [teams, setTeams] = useState([])
  const [newsItems, setNewsItems] = useState([])
  const [sponsors, setSponsors] = useState({ main: [], partner: [], supporter: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const [teamsRes, newsRes, sponsorsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/teams`),
          fetch(`${API_BASE_URL}/news`),
          fetch(`${API_BASE_URL}/sponsors`)
        ])

        const teamsData = await teamsRes.json()
        const newsData = await newsRes.json()
        const sponsorsData = await sponsorsRes.json()

        setTeams(teamsData.map(team => ({
          id: team._id,
          game: team.game,
          category: team.gameCategory,
          description: team.description,
          players: team.roster.length,
          logo: team.game.charAt(0),
          slug: team.slug
        })))

        setNewsItems(newsData.news.map(news => ({
          id: news._id,
          category: news.category.toUpperCase(),
          date: new Date(news.publishedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          title: news.title,
          description: news.excerpt,
          categoryColor: 'bg-purple-500',
          slug: news.slug
        })))

        const groupedSponsors = sponsorsData.reduce((acc, sponsor) => {
          if (!acc[sponsor.tier]) acc[sponsor.tier] = []
          acc[sponsor.tier].push(sponsor)
          return acc
        }, { main: [], partner: [], supporter: [] })

        setSponsors(groupedSponsors)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  
  return (
    <>
      <style>{`
        .gradient-bg {
          background: radial-gradient(ellipse at bottom, #0a1828 0%, #020a13 50%, #010508 100%);
          position: relative;
        }
        
        .gradient-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at 50% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }

        .text-gradient {
          background: linear-gradient(to right, #22d3ee, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-button {
          position: relative;       
          overflow: hidden;
        }

        .glow-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.4);
          transform: translate(-50%, -50%);
          transition: width 0.5s ease, height 0.5s ease;
          z-index: -1;
        }

        .glow-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .stat-card {
          position: relative;
          isolation: isolate;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: -25px;
          left: -25px;
          right: -25px;
          bottom: -25px;
          border-radius: 16px;
          background: radial-gradient(ellipse at center, rgba(34, 211, 238, 0.6) 0%, rgba(34, 211, 238, 0.3) 25%, transparent 65%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
          filter: blur(35px);
          pointer-events: none;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card > * {
          position: relative;
          z-index: 1;
        }

        .partner-card {
          position: relative;
          overflow: visible;
          transition: all 0.3s ease;
        }

        .partner-card::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(34, 211, 238, 0.2) 50%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: width 0.5s ease, height 0.5s ease;
          z-index: -1;
          filter: blur(20px);
        }

        .partner-card:hover::before {
          width: 400px;
          height: 400px;
        }

        .partner-card:hover {
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.6), 0 0 80px rgba(34, 211, 238, 0.3);
        }

        .partner-card span {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .partner-card:hover span {
          color: #22d3ee;
        }
      `}</style>

      
      <div className="gradient-bg text-white montserrat">
        <Navbar />
        
       
        <div className="flex flex-col items-center justify-center px-4 pt-32 pb-20">
          
         
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-400 bg-cyan-400/10 text-cyan-400 text-sm font-medium">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              VCT Challengers 2024 Champions
            </span>
          </div>

         
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight text-center">
            <span className="text-gradient">
              DOMINATE
            </span>
            <br />
            <span className="text-white">THE GAME</span>
          </h1>

         
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl leading-relaxed text-center">
            Professional esports organization competing at the highest level. Join
            the legacy of champions and become part of our winning team.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button className="group px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold rounded-md transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 uppercase text-sm tracking-wide">
              APPLY NOW
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold rounded-md transition-all duration-300 uppercase text-sm tracking-wide">
              VIEW TEAMS
            </button>
          </div>
        
         
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full mt-12">
            
            
            <div className="stat-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-cyan-400/30 hover:bg-slate-900/40 transition-all duration-300 group">
              <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 size={40} strokeWidth={1.5} />
              </div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">4</div>
              <div className="text-gray-400 text-sm font-medium">Active Teams</div>
            </div>

            
            <div className="stat-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-cyan-400/30 hover:bg-slate-900/40 transition-all duration-300 group">
              <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <Users size={40} strokeWidth={1.5} />
              </div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">12</div>
              <div className="text-gray-400 text-sm font-medium">Content Creators</div>
            </div>

           
            <div className="stat-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-cyan-400/30 hover:bg-slate-900/40 transition-all duration-300 group">
              <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <Trophy size={40} strokeWidth={1.5} />
              </div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">23</div>
              <div className="text-gray-400 text-sm font-medium">Tournaments Won</div>
            </div>

           
            <div className="stat-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-cyan-400/30 hover:bg-slate-900/40 transition-all duration-300 group">
              <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <UserPlus size={40} strokeWidth={1.5} />
              </div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">50K+</div>
              <div className="text-gray-400 text-sm font-medium">Community</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 flex-wrap gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-cyan-400">Teams</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Competing at the highest level across multiple titles
            </p>
          </div>
          <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all px-6 py-3 rounded-lg flex items-center gap-2 font-semibold uppercase text-sm tracking-wider">
            View All Teams
            <ArrowRight size={18} />
          </button>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-400">Loading teams...</div>
          ) : teams.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No teams available</div>
          ) : teams.map((team) => (
            <div
              key={team.id}
              className="bg-linear-to-b from-slate-800/50 to-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-400/50 transition-all group"
            >
             
              <div className="relative h-48 bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="absolute top-4 right-4">
                  <span className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/30">
                    {team.category}
                  </span>
                </div>
                <div className="text-8xl font-bold text-slate-700/30 group-hover:text-slate-600/30 transition-colors">
                  {team.logo}
                </div>
              </div>

              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{team.game}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {team.description}
                </p>

                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Users size={16} />
                    <span>{team.players} Players</span>
                  </div>
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-semibold text-sm group">
                    View Team
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-slate-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 flex-wrap gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest <span className="text-cyan-400">News</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Stay updated with our latest announcements and victories
            </p>
          </div>
          <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all px-6 py-3 rounded-lg flex items-center gap-2 font-semibold uppercase text-sm tracking-wider">
            View All News
            <ArrowRight size={18} />
          </button>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-400">Loading news...</div>
          ) : newsItems.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No news available</div>
          ) : newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-linear-to-b from-slate-800/50 to-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-400/50 transition-all group"
            >
             
              <div className="relative h-48 bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="absolute top-4 left-4">
                  <span className={`${news.categoryColor} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase`}>
                    {news.category}
                  </span>
                </div>
                <div className="text-7xl font-bold text-slate-700/20 group-hover:text-slate-600/20 transition-colors">
                  NEWS
                </div>
              </div>

             
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{news.date}</span>
                </div>

               
                <h3 className="text-xl font-bold mb-3 leading-tight">
                  {news.title}
                </h3>

                
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {news.description}
                </p>

               
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-semibold text-sm group">
                  Read More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
       <div className="bg-[#0b111e] min-h-screen py-16 px-4">
      
      <div className="flex flex-col items-center justify-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Our <span className="bg-linear-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent text-6xl">Partners</span>
        </h2>
        <p className="text-gray-400 text-lg">Proudly supported by industry leaders</p>
      </div>

     
      {loading ? (
        <div className="text-center text-gray-400">Loading sponsors...</div>
      ) : (
        <>
          {sponsors.main.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-center text-gray-400 tracking-widest text-sm mb-8">MAIN PARTNERS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {sponsors.main.map((sponsor) => (
                  <a
                    key={sponsor._id}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-card bg-[#151d2e] rounded-lg p-8 flex items-center justify-center border border-gray-800 hover:border-cyan-400 transition-colors duration-300"
                  >
                    <span className="text-gray-300 text-xl font-semibold">{sponsor.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {sponsors.partner.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-center text-gray-400 tracking-widest text-sm mb-8">PARTNERS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {sponsors.partner.map((sponsor) => (
                  <a
                    key={sponsor._id}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-card bg-[#151d2e] rounded-lg p-8 flex items-center justify-center border border-gray-800 hover:border-cyan-400 transition-colors duration-300"
                  >
                    <span className="text-gray-300 text-xl font-semibold">{sponsor.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {sponsors.supporter.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-center text-gray-400 tracking-widest text-sm mb-8">SUPPORTERS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {sponsors.supporter.map((sponsor) => (
                  <a
                    key={sponsor._id}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-card bg-[#151d2e] rounded-lg p-8 flex items-center justify-center border border-gray-800 hover:border-cyan-400 transition-colors duration-300"
                  >
                    <span className="text-gray-300 text-xl font-semibold">{sponsor.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

     
      <div className="flex justify-center">
        <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg flex items-center gap-2 transition-colors duration-300">
          Become a Partner <span>→</span>
        </button>
      </div>
    </div>
    </div>
    <div className="bg-linear-to-b from-[#0a1628] to-[#0f1c2e] py-16 px-4">
      <div className="max-w-5xl mx-auto border border-cyan-500/30 rounded-3xl bg-[#0d1421]/50 backdrop-blur-sm p-8 md:p-12">
       
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Join</span> the Team?
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            We're always looking for talented players, content creators, and staff members. Take your first step towards becoming part of our winning legacy.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         
          <div className="bg-[#0d1421] rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center text-center">
            <div className="mb-4">
              <Gamepad2 className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Players</h3>
            <p className="text-gray-400 text-sm">Compete at the highest level</p>
          </div>

         
          <div className="bg-[#0d1421] rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center text-center">
            <div className="mb-4">
              <Video className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Creators</h3>
            <p className="text-gray-400 text-sm">Build your personal brand</p>
          </div>
    
          
          <div className="bg-[#0d1421] rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center text-center">
            <div className="mb-4">
              <Briefcase className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Staff</h3>
            <p className="text-gray-400 text-sm">Support our operations</p>
          </div>
        </div>

       
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 w-full sm:w-auto shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50">
            APPLY NOW
          </button>
          <button className="border-2 border-cyan-500 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 font-bold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            JOIN DISCORD
          </button>
        </div>
      </div>
    </div>
      </div>
      <Footer />
    </>
  )
}

export default Home