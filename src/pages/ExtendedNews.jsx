import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import { ArrowLeft } from 'lucide-react'

const ExtendedNews = () => {
  const { id: slug } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    fetch(`http://localhost:5000/api/news/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Article not found')
        return res.json()
      })
      .then((data) => {
        if (!mounted) return
        // Parse HTML content and extract text
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = data.content
        const textContent = tempDiv.textContent || tempDiv.innerText || ''
        
        setArticle({
          category: data.category?.toUpperCase() || 'NEWS',
          title: data.title,
          date: new Date(data.publishedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          intro: data.excerpt,
          content: textContent,
          tags: data.tags || [],
          author: data.author,
          categoryColor: 'bg-purple-500'
        })
      })
      .catch((error) => {
        console.error('Error fetching article:', error)
        if (!mounted) return
        setArticle(null)
      })
      .finally(() => mounted && setLoading(false))

    return () => (mounted = false)
  }, [slug])

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

        .tag-badge {
          background: rgba(51, 65, 85, 0.5);
          border: 1px solid rgba(100, 116, 139, 0.3);
          transition: all 0.3s ease;
        }

        .tag-badge:hover {
          border-color: rgba(34, 211, 238, 0.5);
          color: #22d3ee;
        }
      `}</style>

      <div className="gradient-bg text-white min-h-screen">
        <Navbar />
        
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
          <button 
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to News
          </button>

          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading article...</div>
          ) : !article ? (
            <div className="text-center text-gray-400 py-20">Article not found.</div>
          ) : (
            <>
              <div className="relative h-96 bg-linear-to-br from-teal-900/40 via-slate-800/40 to-purple-900/40 rounded-xl flex items-center justify-center mb-12 overflow-hidden">
                <div className="text-8xl font-bold text-slate-600/40 tracking-wider">
                  {article.category}
                </div>
              </div>

              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <span>{article.date}</span>
                  {article.author && (
                    <>
                      <span>•</span>
                      <span>By {article.author}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    {article.intro}
                  </p>

                  <div className="text-gray-400 leading-relaxed mb-6 whitespace-pre-wrap">
                    {article.content}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-32">
                    <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                      <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="tag-badge px-4 py-2 rounded-full text-sm text-gray-400 cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ExtendedNews