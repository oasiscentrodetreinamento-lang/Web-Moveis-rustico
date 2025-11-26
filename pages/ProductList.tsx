import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../constants';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const ProductList: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by Category
    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerTerm) || 
        p.sku.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="bg-beige-50 min-h-screen py-10 animate-fade-in">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="font-serif font-bold text-4xl text-rust-900 mb-4">Nossa Coleção</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa linha completa de móveis rústicos. Cada peça carrega uma história única.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10 border border-beige-200 sticky top-24 z-20">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            
            {/* Category Pills - Desktop */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-rust-800 text-white shadow-md'
                      : 'bg-beige-100 text-rust-700 hover:bg-beige-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <div className="w-full lg:hidden flex justify-between items-center">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-rust-800 font-bold"
              >
                <SlidersHorizontal size={20} /> Filtros
              </button>
              <span className="text-sm text-gray-500">{filteredProducts.length} produtos</span>
            </div>

            {/* Search & Sort */}
            <div className={`w-full lg:w-auto flex flex-col sm:flex-row gap-4 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
              
              {/* Mobile Categories Dropdown */}
              <div className="lg:hidden">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-beige-300 rounded focus:ring-1 focus:ring-rust-500 outline-none text-sm"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar nome ou código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-beige-300 rounded focus:ring-1 focus:ring-rust-500 outline-none text-sm"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="p-2 border border-beige-300 rounded focus:ring-1 focus:ring-rust-500 outline-none text-sm bg-transparent cursor-pointer"
              >
                <option value="default">Relevância</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-500 mb-2">Nenhum produto encontrado.</h3>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('Todos');}}
              className="text-rust-700 underline hover:text-rust-900"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
