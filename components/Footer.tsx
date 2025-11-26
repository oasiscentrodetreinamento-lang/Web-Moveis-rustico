import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone, Lock } from 'lucide-react';
import { COMPANY_NAME, COMPANY_SLOGAN } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rust-950 text-beige-200 pt-16 pb-8 border-t border-rust-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="font-serif font-bold text-2xl text-beige-50 uppercase">MÓVEIS RÚSTICOS</span>
            <span className="text-xs uppercase tracking-widest text-rust-400">PIRANGUINHO</span>
          </div>
          <p className="text-sm italic text-beige-300 font-serif">
            "{COMPANY_SLOGAN}"
          </p>
          <div className="flex gap-4 pt-4">
            <a 
              href="https://www.instagram.com/moveisrusticospiranguinho?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Navegação</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
            <li><Link to="/produtos" className="hover:text-white transition-colors">Nossos Produtos</Link></li>
            <li><Link to="/sobre" className="hover:text-white transition-colors">A Loja</Link></li>
            <li><Link to="/contato" className="hover:text-white transition-colors">Contato e Localização</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Atendimento</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-rust-400 mt-0.5" />
              <span>Rod. MG-290, Km 42<br />Piranguinho - MG</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-rust-400" />
              <span>(35) 99741-8765</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-rust-400" />
              <span>contato@moveispiranguinho.com.br</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Novidades</h3>
          <p className="text-xs mb-4">Cadastre seu e-mail para receber ofertas exclusivas e novidades.</p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="bg-rust-900 border border-rust-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-beige-300 text-beige-100"
            />
            <button className="bg-rust-700 hover:bg-rust-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
              Inscrever
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-rust-900 flex flex-col md:flex-row justify-between items-center text-xs text-rust-500 gap-4">
        <div>
            <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados.</p>
            <p className="mt-1">Desenvolvido com React e Tailwind.</p>
        </div>
        <Link to="/admin" className="flex items-center gap-1 hover:text-rust-300 transition-colors opacity-50 hover:opacity-100">
            <Lock size={12} />
            <span>Área Restrita</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;