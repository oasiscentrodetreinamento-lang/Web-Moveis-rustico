import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import WhatsAppButton from '../components/WhatsAppButton';
import { CheckCircle, Truck, ShieldCheck, Ruler, Clock } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-serif text-rust-900">Produto não encontrado</h2>
        <Link to="/produtos" className="text-green-700 underline">Voltar para a loja</Link>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in">
      {/* Breadcrumb */}
      <div className="bg-beige-50 border-b border-beige-200 py-4">
        <div className="container mx-auto px-4 text-xs text-gray-500 uppercase tracking-wide">
          <Link to="/" className="hover:text-rust-700">Home</Link> / 
          <Link to="/produtos" className="hover:text-rust-700 mx-1">Produtos</Link> / 
          <span className="text-rust-900 font-bold mx-1">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Gallery Section */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square rounded-xl overflow-hidden bg-beige-100 border border-beige-200 cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              style={{
                backgroundImage: isZoomed ? `url(${product.images[activeImage]})` : 'none',
                backgroundSize: '200%'
              }}
            >
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
              />
              <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-xs font-bold text-rust-900">Zoom</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-rust-700 ring-2 ring-rust-200' : 'border-transparent hover:border-rust-300'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="mb-6 border-b border-beige-200 pb-6">
              <span className="text-rust-500 text-sm font-bold uppercase tracking-widest">{product.category}</span>
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-rust-900 mt-2 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>Cód: {product.sku}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                  product.availability === 'Em Estoque' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {product.availability}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <div className="text-3xl font-serif font-bold text-rust-800 mb-2">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-gray-500">Valor referente à unidade. Frete sob consulta.</p>
            </div>

            <div className="mb-8">
              <WhatsAppButton 
                productName={product.name} 
                productSku={product.sku} 
                className="w-full md:w-auto text-lg py-4 px-8"
              />
              {product.productionTime && (
                 <p className="mt-3 text-xs text-orange-700 flex items-center gap-1">
                   <Clock size={14} /> Prazo estimado de produção: {product.productionTime}
                 </p>
              )}
            </div>

            {/* Technical Specs */}
            <div className="bg-beige-50 rounded-xl p-6 border border-beige-200">
              <h3 className="font-serif font-bold text-lg text-rust-900 mb-4 flex items-center gap-2">
                <Ruler size={20} className="text-rust-600" /> Ficha Técnica
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <span className="block text-gray-500 text-xs uppercase">Material</span>
                  <span className="font-medium text-rust-900">{product.material}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs uppercase">Dimensões</span>
                  <span className="font-medium text-rust-900">{product.dimensions}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs uppercase">Peso Estimado</span>
                  <span className="font-medium text-rust-900">{product.weight}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs uppercase">Acabamento</span>
                  <span className="font-medium text-rust-900">{product.finishing}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border border-beige-200 rounded-lg">
                <ShieldCheck className="text-green-600" size={24} />
                <div className="text-xs">
                  <span className="block font-bold text-rust-900">Garantia Vitalícia</span>
                  <span className="text-gray-500">Na estrutura da madeira</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-beige-200 rounded-lg">
                <Truck className="text-rust-600" size={24} />
                <div className="text-xs">
                  <span className="block font-bold text-rust-900">Entrega Especializada</span>
                  <span className="text-gray-500">Todo o Brasil</span>
                </div>
              </div>
            </div>

            {/* Artisan Note */}
            <div className="mt-8 border-t border-beige-200 pt-6">
              <div className="flex gap-4 items-start">
                <img 
                  src="https://picsum.photos/id/1/100/100" 
                  alt="Artesão" 
                  className="w-12 h-12 rounded-full object-cover grayscale"
                />
                <div>
                  <h4 className="font-serif font-bold text-rust-900 text-sm">Nota do Artesão</h4>
                  <p className="text-xs text-gray-500 italic mt-1 leading-relaxed">
                    "Esta peça carrega marcas do tempo que não consideramos defeitos, mas sim a identidade da madeira de demolição. Tonalidades podem variar levemente."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
