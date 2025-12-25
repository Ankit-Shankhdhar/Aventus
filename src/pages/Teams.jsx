import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Filter, Users, Trophy, ArrowRight } from 'lucide-react'

const Teams = () => {
  const [gameFilter, setGameFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const gameFilters = ['ALL', 'FPS', 'MOBA', 'SPORTS']
  const statusFilters = ['ALL', 'ACTIVE', 'INACTIVE']

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/teams')
        if (!response.ok) throw new Error('Failed to fetch teams')
        const data = await response.json()
        setTeams(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  const filteredTeams = teams.filter(team => {
    const matchesGame = gameFilter === 'ALL' || team.gameCategory === gameFilter
    const matchesStatus = statusFilter === 'ALL' || 
      (statusFilter === 'ACTIVE' && team.isActive) || 
      (statusFilter === 'INACTIVE' && !team.isActive)
    return matchesGame && matchesStatus
  })

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

        .filter-button {
          position: relative;
          background: rgba(30, 41, 59, 0.5);
          color: #9ca3af;
          border: 1px solid transparent;
          transition: all 0.3s ease;
          overflow: visible;
        }

        .filter-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 150%;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, transparent 70%);
          border-radius: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          filter: blur(12px);
        }

        .filter-button:not(.active):hover {
          color: #22d3ee;
          border-color: rgba(34, 211, 238, 0.4);
        }

        .filter-button:not(.active):hover::before {
          opacity: 1;
        }

        .filter-button.active {
          background: #22d3ee;
          color: #0f172a;
          border-color: #22d3ee;
        }

        .filter-button.purple.active {
          background: #a855f7;
          color: #fff;
          border-color: #a855f7;
        }

        .team-card {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%);
          border: 1px solid rgba(71, 85, 105, 0.3);
          transition: all 0.3s ease;
          position: relative;
        }

        .team-card:hover {
          border-color: rgba(6, 182, 212, 0.5);
          transform: translateY(-4px);
        }

        .team-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          pointer-events: none;
        }

        .team-card:hover::before {
          opacity: 1;
        }
      `}</style>

      <div className="gradient-bg text-white min-h-screen">
        <NavBar />
        
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Teams</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl">
              Competing across multiple titles with world-class rosters. Each team represents the pinnacle of competitive excellence.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 bg-slate-900/30 border border-slate-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <Filter size={20} className="text-gray-400" />
              <span className="text-gray-400 text-sm font-medium">Filter by:</span>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <div className="flex gap-3">
                {gameFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setGameFilter(filter)}
                    className={`filter-button px-5 py-2 rounded text-sm font-bold uppercase ${
                      gameFilter === filter ? 'active' : ''
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`filter-button purple px-5 py-2 rounded text-sm font-bold uppercase ${
                      statusFilter === filter ? 'active' : ''
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="text-gray-400 text-lg">Loading teams...</div>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-20">
                <div className="text-red-400 text-lg">{error}</div>
              </div>
            ) : filteredTeams.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="text-gray-400 text-lg">No teams found matching your filters.</div>
              </div>
            ) : filteredTeams.map((team) => (
              <div key={team._id} className="team-card rounded-xl overflow-hidden p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-3">
                    <span className={`${team.isActive ? 'bg-green-500' : 'bg-gray-500'} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                      {team.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {team.gameCategory}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="h-48 bg-gradient-to-br from-teal-900/30 via-slate-800/30 to-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                    {team.logo && team.logo !== '/placeholder.svg' ? (
                      <img src={team.logo} alt={team.game} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-6xl font-bold text-slate-600/40">
                        {team.game.split(' ').map(word => word[0]).join('')}
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    {team.game}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {team.description}
                  </p>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Users size={18} />
                      <span className="text-sm font-semibold">{team.roster.length} Players</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400">
                      <Trophy size={18} />
                      <span className="text-sm font-semibold">{team.achievements.length} Achievements</span>
                    </div>
                  </div>

                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 font-semibold group">
                    View Details
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Teams