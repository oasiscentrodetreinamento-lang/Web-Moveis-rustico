import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { COMPANY_NAME, WHATSAPP_NUMBER } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Produtos', path: '/produtos' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full bg-rust-900 text-beige-100 shadow-md sticky top-0 z-40 border-b-4 border-rust-700">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center py-2 px-6 bg-rust-950 text-xs tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone size={14} className="text-green-500" />
            (35) 99741-8765
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-beige-300" />
            Seg - Sex: 08h às 18h | Sáb: 08h às 13h
          </span>
        </div>
        <div className="text-beige-300 italic">
          Entregamos para todo o Brasil
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col z-50 group">
          <span className="font-serif font-bold text-2xl md:text-3xl tracking-tight leading-none text-beige-50 group-hover:text-beige-200 transition-colors uppercase">
            Móveis Rústicos
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-rust-300 group-hover:text-rust-200 transition-colors font-medium">
            Piranguinho
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-white ${
                isActive(link.path) ? 'text-white border-b-2 border-green-600' : 'text-beige-200'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors flex items-center gap-2"
          >
            <Phone size={16} />
            Orçamento
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2 text-beige-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Overlay Menu */}
        <div
          className={`fixed inset-0 bg-rust-900 bg-opacity-95 z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-serif font-bold ${
                isActive(link.path) ? 'text-white' : 'text-beige-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="mt-4 bg-green-700 text-white px-8 py-3 rounded-full text-lg font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;