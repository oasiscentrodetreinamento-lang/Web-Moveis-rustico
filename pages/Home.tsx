import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChefHat, Armchair, Sparkles } from 'lucide-react';
import { TESTIMONIALS, COMPANY_SLOGAN } from '../constants';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useProducts();
  
  // Filter products by sections
  const highlights = products.filter(p => p.homeSection === 'highlights');
  const dining = products.filter(p => p.homeSection === 'dining');
  const decor = products.filter(p => p.homeSection === 'decor');

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Atelier de móveis rústicos" 
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rust-950/60 via-rust-900/40 to-rust-900/90"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-sm md:text-base uppercase tracking-[0.4em] text-beige-200 mb-6 animate-slide-up border-b border-white/20 inline-block pb-2">
            Tradição & Autenticidade
          </h2>
          <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight drop-shadow-2xl animate-slide-up delay-100">
            {COMPANY_SLOGAN}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-beige-50 mb-12 font-light animate-slide-up delay-200 drop-shadow-md">
            Peças exclusivas em Peroba Rosa de demolição que trazem a alma do campo para o conforto do seu lar.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up delay-300">
            <Link 
              to="/produtos" 
              className="bg-white text-rust-900 hover:bg-beige-100 px-10 py-4 rounded font-bold uppercase tracking-wide transition-all hover:scale-105 shadow-xl hover:shadow-2xl text-sm md:text-base"
            >
              Ver Coleção Completa
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 1: Destaques da Oficina (Grid Padrão) */}
      {highlights.length > 0 && (
        <section className="py-20 bg-beige-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-rust-200 pb-4 gap-4">
              <div>
                <span className="text-rust-500 font-bold uppercase tracking-widest text-xs mb-2 block">Novidades</span>
                <h2 className="font-serif font-bold text-4xl text-rust-900">Destaques da Oficina</h2>
              </div>
              <Link to="/produtos" className="group flex items-center gap-2 text-rust-700 hover:text-rust-900 font-medium transition-colors">
                Ver todos os produtos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.slice(0, 3).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEÇÃO 2: Sala de Jantar & Convivência (Mosaico / Bento Grid) */}
      {dining.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-rust-50 rounded-full mb-4 text-rust-700">
                <ChefHat size={32} />
              </div>
              <h2 className="font-serif font-bold text-4xl text-rust-900 mb-4">Mesa & Convivência</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Onde as melhores histórias são contadas. Mesas robustas e bancos acolhedores para reunir quem você ama.
              </p>
            </div>

            {/* Layout Mosaico: Primeiro item é destaque (grande), os outros menores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
              {dining.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`relative group overflow-hidden rounded-xl shadow-lg cursor-pointer ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
                  }`}
                >
                  <Link to={`/produtos/${product.id}`} className="block w-full h-full">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                    
                    {/* Conteúdo sobre a imagem */}
                    <div className="absolute bottom-0 left-0 p-8 text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-beige-300 text-xs font-bold uppercase tracking-widest mb-2">{product.category}</p>
                      <h3 className={`font-serif font-bold ${index === 0 ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'} mb-2`}>
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="font-bold text-lg">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-sm border-b border-white pb-0.5">Ver Detalhes</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner Institucional */}
      <section className="py-24 bg-rust-900 text-beige-100 relative overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-rust-700">
            <div className="p-6">
              <h3 className="font-serif font-bold text-2xl mb-3 text-white">100% Peroba Rosa</h3>
              <p className="text-beige-300 leading-relaxed">
                Utilizamos apenas madeira de demolição legítima, garantindo durabilidade secular e sustentabilidade.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-serif font-bold text-2xl mb-3 text-white">Acabamento Artesanal</h3>
              <p className="text-beige-300 leading-relaxed">
                Cada peça é lixada e encerada à mão por nossos mestres artesãos, preservando os veios naturais.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-serif font-bold text-2xl mb-3 text-white">Sob Medida</h3>
              <p className="text-beige-300 leading-relaxed">
                Personalizamos dimensões e acabamentos para que o móvel se encaixe perfeitamente no seu espaço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: Detalhes que Encantam (Grid Simples) */}
      {decor.length > 0 && (
        <section className="py-20 bg-beige-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2 bg-rust-800 text-white rounded">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="font-serif font-bold text-3xl text-rust-900">Detalhes & Decoração</h2>
                <p className="text-rust-600 text-sm">Peças menores que fazem toda a diferença.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {decor.map(product => (
                <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all group">
                  <div className="aspect-square overflow-hidden rounded mb-4 bg-gray-100">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold text-rust-900 text-sm mb-1 truncate">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-rust-700 font-serif font-bold">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <Link to={`/produtos/${product.id}`} className="text-xs bg-beige-100 hover:bg-beige-200 text-rust-800 px-2 py-1 rounded transition-colors">
                      Ver
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl text-rust-900 mb-2">Histórias de quem comprou</h2>
            <div className="w-24 h-1 bg-rust-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-beige-50 p-8 rounded-xl relative hover:bg-beige-100 transition-colors">
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 text-sm leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <span className="font-bold text-rust-800 text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;