import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-beige-200 flex flex-col h-full hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {product.availability !== 'Em Estoque' && (
          <div className="absolute top-3 left-3 bg-rust-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded">
            {product.availability}
          </div>
        )}
        {product.featured && product.availability === 'Em Estoque' && (
          <div className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded">
            Destaque
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-bold text-rust-500 uppercase tracking-widest">{product.category}</span>
        </div>
        
        <Link to={`/produtos/${product.id}`} className="block">
          <h3 className="font-serif font-bold text-lg text-rust-900 mb-1 group-hover:text-rust-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="text-xs text-gray-500 mb-4">Cód: {product.sku}</div>
        
        <div className="mt-auto pt-4 border-t border-beige-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">A partir de</span>
            <span className="font-serif font-bold text-xl text-rust-800">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <Link 
            to={`/produtos/${product.id}`}
            className="w-10 h-10 rounded-full bg-beige-100 text-rust-700 flex items-center justify-center hover:bg-rust-700 hover:text-white transition-colors"
            title="Ver detalhes"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
        
        {/* Quick generic WhatsApp trigger for card could be added here, but prompt requested Contact Button for specific product details inside detail page */}
      </div>
    </div>
  );
};

export default ProductCard;