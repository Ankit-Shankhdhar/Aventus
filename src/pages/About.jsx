import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Target, Trophy, Users, Heart } from 'lucide-react'

const About = () => {
  const [managementTeam, setManagementTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchManagement = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/management')
        if (!response.ok) throw new Error('Failed to fetch management data')
        const data = await response.json()
        setManagementTeam(data.sort((a, b) => a.order - b.order))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchManagement()
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

        .mission-card {
          position: relative;
          isolation: isolate;
        }

        .mission-card::before {
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

        .mission-card:hover::before {
          opacity: 1;
        }

        .mission-card > * {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div className="gradient-bg text-white min-h-screen">
        <Navbar />
        
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            About <span className="text-gradient">Team Aventus</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Founded with a vision to dominate esports globally, Team Aventus has grown into
            a premier organization competing across multiple titles with world-class talent.
          </p>
        </div>

        <div className="bg-slate-950/50 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16">
              Our <span className="text-cyan-400">Mission</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  Team Aventus was founded with a singular goal: to build a legacy in
                  competitive gaming. We believe in nurturing talent, fostering a positive
                  community, and competing with integrity at the highest levels of esports.
                </p>
                <p className="text-gray-400 text-base leading-relaxed mb-8">
                  Our organization provides professional infrastructure, coaching, and support
                  to help our players reach their full potential while creating content that
                  inspires the next generation of gamers.
                </p>
                <button className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 uppercase text-sm tracking-wide">
                  JOIN OUR TEAM
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="mission-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 flex flex-col items-center text-center hover:border-cyan-400/30 transition-all duration-300">
                  <Target className="w-12 h-12 text-cyan-400 mb-4" strokeWidth={1.5} />
                  <h3 className="text-white text-lg font-bold mb-2">Excellence</h3>
                  <p className="text-gray-400 text-sm">Striving for the top</p>
                </div>

                <div className="mission-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 flex flex-col items-center text-center hover:border-cyan-400/30 transition-all duration-300">
                  <Trophy className="w-12 h-12 text-cyan-400 mb-4" strokeWidth={1.5} />
                  <h3 className="text-white text-lg font-bold mb-2">Competition</h3>
                  <p className="text-gray-400 text-sm">Born to compete</p>
                </div>

                <div className="mission-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 flex flex-col items-center text-center hover:border-cyan-400/30 transition-all duration-300">
                  <Users className="w-12 h-12 text-cyan-400 mb-4" strokeWidth={1.5} />
                  <h3 className="text-white text-lg font-bold mb-2">Community</h3>
                  <p className="text-gray-400 text-sm">Stronger together</p>
                </div>

                <div className="mission-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 flex flex-col items-center text-center hover:border-cyan-400/30 transition-all duration-300">
                  <Heart className="w-12 h-12 text-cyan-400 mb-4" strokeWidth={1.5} />
                  <h3 className="text-white text-lg font-bold mb-2">Passion</h3>
                  <p className="text-gray-400 text-sm">Gaming in our DNA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
              Our <span className="text-cyan-400">Journey</span>
            </h2>

            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-slate-900 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">2020</span>
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-white text-xl font-bold mb-2">Founded</h3>
                  <p className="text-gray-400">Team Aventus was established with a VALORANT roster.</p>
                </div>
              </div>

             
              <div className="flex gap-6">
                <div className="shrink-0 w-16 flex justify-center">
                  <div className="w-0.5 h-12 bg-cyan-400/30"></div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-slate-900 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">2021</span>
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-white text-xl font-bold mb-2">First Championship</h3>
                  <p className="text-gray-400">Won our first regional tournament and expanded to League of Legends.</p>
                </div>
              </div>

              
              <div className="flex gap-6">
                <div className="shrink-0 w-16 flex justify-center">
                  <div className="w-0.5 h-12 bg-cyan-400/30"></div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-slate-900 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">2022</span>
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-white text-xl font-bold mb-2">International Debut</h3>
                  <p className="text-gray-400">Competed in international tournaments, placing top 8.</p>
                </div>
              </div>

             
              <div className="flex gap-6">
                <div className="shrink-0 w-16 flex justify-center">
                  <div className="w-0.5 h-12 bg-cyan-400/30"></div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-slate-900 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">2023</span>
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-white text-xl font-bold mb-2">Major Expansion</h3>
                  <p className="text-gray-400">Added Counter-Strike and content creator division.</p>
                </div>
              </div>

              
              <div className="flex gap-6">
                <div className="shrink-0 w-16 flex justify-center">
                  <div className="w-0.5 h-12 bg-cyan-400/30"></div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-slate-900 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">2024</span>
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-white text-xl font-bold mb-2">VCT Champions</h3>
                  <p className="text-gray-400">Our VALORANT team wins VCT Challengers championship.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/50 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Leadership <span className="text-cyan-400">Team</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Meet the people behind Team Aventus who work tirelessly to ensure our success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                <div className="col-span-full text-center text-gray-400">
                  Loading management team...
                </div>
              ) : error ? (
                <div className="col-span-full text-center text-red-400">
                  {error}
                </div>
              ) : managementTeam.length === 0 ? (
                <div className="col-span-full text-center text-gray-400">
                  No management team members found.
                </div>
              ) : (
                managementTeam.filter(member => member.isActive).map((member) => (
                  <div key={member._id} className="mission-card bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 flex flex-col items-center text-center hover:border-cyan-400/30 transition-all duration-300">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-4 overflow-hidden">
                      {member.photo && member.photo !== '/placeholder.svg' ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-3xl font-bold">{member.name.charAt(0)}</span>
                      )}
                    </div>
                    <h3 className="text-white text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm">
                      {member.bio}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default About