import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import { Calendar, ArrowRight, Filter } from 'lucide-react'

const News = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [newsArticles, setNewsArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredArticle, setFeaturedArticle] = useState(null)

  React.useEffect(() => {
    let mounted = true
    fetch('http://localhost:5000/api/news')
      .then((res) => {
        if (!res.ok) throw new Error('no-api')
        return res.json()
      })
      .then((data) => {
        if (!mounted) return
        const adaptedData = data.news ? data.news.map(article => ({
          id: article._id,
          slug: article.slug,
          category: article.category.toUpperCase(),
          title: article.title,
          description: article.excerpt,
          date: new Date(article.publishedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          categoryColor: 'bg-purple-500',
          tags: article.tags || []
        })) : []
        setNewsArticles(adaptedData)
        if (adaptedData.length > 0) {
          setFeaturedArticle(adaptedData[0])
        }
      })
      .catch((error) => {
        console.error('Error fetching news:', error)
        if (!mounted) return
        setNewsArticles([])
      })
      .finally(() => mounted && setLoading(false))

    return () => (mounted = false)
  }, [])

  const filters = ['ALL', 'TOURNAMENT', 'ANNOUNCEMENT', 'ROSTER']

  const filteredNews = activeFilter === 'ALL' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeFilter)

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

        .news-card {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%);
          border: 1px solid rgba(71, 85, 105, 0.3);
          transition: all 0.3s ease;
        }

        .news-card:hover {
          border-color: rgba(6, 182, 212, 0.5);
          transform: translateY(-4px);
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
      `}</style>

      <div className="gradient-bg text-white min-h-screen">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest <span className="text-gradient">News</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Stay updated with announcements, match results, and team updates.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading news...</div>
          ) : featuredArticle ? (
            <div className="flex flex-col lg:flex-row gap-8 items-center bg-linear-to-b from-slate-800/30 to-slate-900/30 rounded-xl overflow-hidden border border-slate-800 p-8 mb-20">
              <div className="flex-1 relative h-80 bg-linear-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
                <div className="text-9xl font-bold text-slate-600/30">
                  AVENTUS
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-4">
                  <span className="bg-cyan-400 text-slate-900 px-4 py-1.5 rounded text-xs font-bold uppercase">
                    {featuredArticle.category}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-gray-400 text-base mb-6 leading-relaxed">
                  {featuredArticle.description}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={16} />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/news/${featuredArticle.slug}`)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 font-semibold group cursor-pointer"
                  >
                    Read More
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-4 mb-12 border-b border-slate-800 pb-6">
            <Filter size={20} className="text-gray-400" />
            <div className="flex gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-button px-5 py-2 rounded text-sm font-bold uppercase ${
                    activeFilter === filter ? 'active' : ''
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-gray-400 py-10">Loading...</div>
            ) : filteredNews.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-10">No news articles found.</div>
            ) : (
              filteredNews.map((article) => (
              <div key={article.id} className="news-card rounded-xl overflow-hidden">
                <div className="relative h-64 bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <div className="text-7xl font-bold text-slate-600/30">
                    NEWS
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`${article.categoryColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {article.description}
                  </p>

                  <button 
                    onClick={() => navigate(`/news/${article.slug}`)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 font-semibold text-sm group cursor-pointer"
                  >
                    Read More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default News