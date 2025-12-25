import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0B111E] text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              
              <span className="text-white font-bold text-lg">
                TEAM <span className="text-cyan-400">AVENTUS</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Professional esports organization competing at the highest level across multiple titles.
            </p>
          </div>

         
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Organization
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-cyan-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cyan-400 transition-colors">
                  Teams
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cyan-400 transition-colors">
                  Players
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cyan-400 transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-cyan-400 transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cyan-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cyan-400 transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Team Aventus. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with passion for esports
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;