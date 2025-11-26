import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Admin from './pages/Admin';
import { ProductProvider } from './context/ProductContext';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Placeholder for Contact Page
const ContactPlaceholder = () => (
  <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
    <h1 className="font-serif font-bold text-4xl text-rust-900 mb-6">Fale Conosco</h1>
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-beige-200">
      <p className="mb-8 text-gray-600">
        Estamos à disposição para realizar seu projeto sob medida ou tirar dúvidas.
      </p>
      <div className="space-y-4">
        <p className="font-bold text-lg">📍 Piranguinho - MG</p>
        <p className="text-lg">📞 (35) 99741-8765</p>
        <p className="text-lg">✉️ contato@moveispiranguinho.com.br</p>
      </div>
      <div className="mt-8">
        <WhatsAppButton label="Abrir WhatsApp Agora" className="w-full justify-center" />
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ProductProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-rust-900 bg-beige-50">
          <Header />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<ProductList />} />
              <Route path="/produtos/:id" element={<ProductDetail />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contato" element={<ContactPlaceholder />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppButton fixed />
        </div>
      </Router>
    </ProductProvider>
  );
};

export default App;