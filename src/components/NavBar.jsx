import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {project_logo} from '../assets'
import {User} from 'lucide-react'
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className='bg-[#060A13] px-4 md:px-8 py-4 border-b border-[#020617] fixed top-0 left-0 right-0 z-50'>
      <style>{`
        .nav-item {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -12px;
          right: -12px;
          bottom: -8px;
          background: rgba(0, 230, 255, 0.2);
          border: 1px solid rgba(0, 230, 255, 0.5);
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.3s ease;
          box-shadow: 0 0 20px rgba(0, 230, 255, 0.3);
          pointer-events: none;
        }
        
        .nav-item:hover::before {
          opacity: 1;
        }
        
        .nav-item:hover {
          color: #00e6ff;
        }
        
        .nav-item a {
          position: relative;
          z-index: 1;
          display: block;
        }
        
        .cart-item {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .cart-item::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          background: rgba(0, 230, 255, 0.2);
          border: 1px solid rgba(0, 230, 255, 0.5);
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.3s ease;
          box-shadow: 0 0 20px rgba(0, 230, 255, 0.3);
        }
        
        .cart-item:hover::before {
          opacity: 1;
        }
        
        .login-btn {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .login-btn::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -12px;
          right: -12px;
          bottom: -8px;
          background: rgba(0, 230, 255, 0.1);
          border: 1px solid rgba(0, 230, 255, 0.3);
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.3s ease;
          box-shadow: 0 0 20px rgba(0, 230, 255, 0.3);
        }
        
        .login-btn:hover::before {
          opacity: 1;
        }
        
        .login-btn:hover {
          color: #00e6ff;
        }
        
        .join-btn {
          transition: all 0.3s ease;
        }
        
        .join-btn:hover {
          box-shadow: 0 0 25px rgba(0, 230, 255, 0.6), 0 0 50px rgba(0, 230, 255, 0.3);
          transform: translateY(-2px);
        }

        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .mobile-menu.open {
          max-height: 600px;
        }

        @media (max-width: 768px) {
          .nav-item::before {
            display: none;
          }
        }
      `}</style>
      
      <div className='flex items-center justify-between max-w-[1400px] mx-auto'>
        
        <div className='flex items-center gap-2 md:gap-3'>
          <img src={project_logo} alt="Project Logo" className='w-8 h-8 md:w-10 md:h-10'/>
          <span className='text-white text-base md:text-xl font-bold tracking-wide'>
            TEAM <span className='text-[#00e6ff]'>AVENTUS</span>
          </span>
        </div>

       
        <button 
          className='lg:hidden text-white z-20'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            {isMenuOpen ? (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>

        
        <ul className='hidden lg:flex items-center gap-8 list-none m-0 p-0 text-sm font-medium'>
          <li className={`nav-item ${location.pathname === '/' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/">HOME</Link></li>
          <li className={`nav-item ${location.pathname === '/about' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/about">ABOUT</Link></li>
          <li className={`nav-item ${location.pathname === '/teams' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/teams">TEAMS</Link></li>
          <li className={`nav-item ${location.pathname === '/players' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/players">PLAYERS</Link></li>
          <li className={`nav-item ${location.pathname.startsWith('/news') ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/news">NEWS</Link></li>
          <li className={`nav-item ${location.pathname === '/partners' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/partners">PARTNERS</Link></li>
          <li className={`nav-item ${location.pathname === '/products' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/products">SHOP</Link></li>
          <li className={`nav-item ${location.pathname === '/careers' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/careers">CAREERS</Link></li>
          <li className={`nav-item ${location.pathname === '/contact' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer relative z-10`}><Link to="/contact">CONTACT</Link></li>
        </ul>

       
        <div className='hidden lg:flex items-center gap-6'>
          <Link to="/login" className='login-btn text-gray-400 text-sm font-medium relative z-10'>
            <User size={20} className='inline-block mr-2'/>LOGIN
          </Link>
          <Link to="/apply" className='join-btn bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 text-[#060a13] px-6 py-2 rounded font-bold text-sm'>
            JOIN US
          </Link>
        </div>
      </div>

      
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''} lg:hidden bg-[#0a0f1a] mt-4`}>
        <ul className='flex flex-col gap-4 p-4 text-sm font-medium'>
          <li className={`${location.pathname === '/' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/">HOME</Link></li>
          <li className={`${location.pathname === '/about' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/about">ABOUT</Link></li>
          <li className={`${location.pathname === '/teams' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/teams">TEAMS</Link></li>
          <li className={`${location.pathname === '/players' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/players">PLAYERS</Link></li>
          <li className={`${location.pathname.startsWith('/news') ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/news">NEWS</Link></li>
          <li className={`${location.pathname === '/partners' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/partners">PARTNERS</Link></li>
          <li className={`${location.pathname === '/products' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/products">SHOP</Link></li>
          <li className={`${location.pathname === '/careers' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/careers">CAREERS</Link></li>
          <li className={`${location.pathname === '/contact' ? 'text-[#00e6ff]' : 'text-gray-400'} cursor-pointer py-2 border-b border-gray-800 hover:text-white`}><Link to="/contact">CONTACT</Link></li>
        </ul>
        <div className='flex flex-col gap-3 p-4'>
          <Link to="/login" className='text-gray-400 text-sm font-medium hover:text-white py-2 border border-gray-700 rounded text-center'>
            LOGIN
          </Link>
          <Link to="/apply" className='bg-[#00e6ff] text-[#060a13] px-6 py-2 rounded font-bold text-sm text-center'>
            JOIN US
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar