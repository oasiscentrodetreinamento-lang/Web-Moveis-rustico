import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Trash2, Edit, Plus, Save, X, LogOut, Copy, RefreshCw, LayoutTemplate } from 'lucide-react';

const Admin: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Estado para formulário
  const emptyProduct: Product = {
    id: '',
    name: '',
    sku: '',
    price: 0,
    category: 'Mesas Rústicas',
    description: '',
    images: [''],
    material: 'Peroba Rosa',
    dimensions: '',
    weight: '',
    finishing: '',
    availability: 'Sob Encomenda',
    homeSection: undefined // Default is undefined (none)
  };

  const [formData, setFormData] = useState<Product>(emptyProduct);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'P1r2a3nguinho') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const handleNew = () => {
    setFormData({
      ...emptyProduct,
      id: Date.now().toString(), // ID temporário baseado em timestamp
      sku: `NOV-${Math.floor(Math.random() * 1000)}`
    });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
    } else {
      addProduct(formData);
    }
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const exportData = () => {
    const data = JSON.stringify(products, null, 2);
    navigator.clipboard.writeText(data).then(() => {
      alert('Dados copiados! Você pode colar isso no arquivo constants.ts para tornar as alterações permanentes para todos.');
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-rust-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-serif font-bold text-rust-900 mb-6 text-center">Área Administrativa</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-rust-500 outline-none"
                placeholder="Digite a senha..."
              />
            </div>
            <button type="submit" className="w-full bg-rust-700 text-white font-bold py-3 rounded hover:bg-rust-800 transition-colors">
              Entrar
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">Senha temporária: P1r2a3nguinho</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-50 pb-20 animate-fade-in">
      {/* Admin Header */}
      <div className="bg-rust-800 text-white p-4 shadow-md sticky top-0 z-30">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-serif font-bold text-xl">Painel de Controle</h1>
          <div className="flex gap-4">
            <button onClick={resetToDefaults} className="text-xs flex items-center gap-1 hover:text-red-300" title="Restaurar originais">
              <RefreshCw size={14} /> Resetar
            </button>
            <button onClick={exportData} className="text-xs flex items-center gap-1 hover:text-green-300" title="Copiar JSON">
              <Copy size={14} /> Exportar
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="text-xs flex items-center gap-1 hover:text-beige-300">
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-rust-900">Produtos ({products.length})</h2>
          <button 
            onClick={handleNew}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold shadow-sm"
          >
            <Plus size={20} /> Novo Produto
          </button>
        </div>

        {/* List View */}
        {!isFormOpen ? (
          <div className="bg-white rounded-lg shadow border border-beige-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-rust-50 text-rust-800 text-xs uppercase">
                  <tr>
                    <th className="p-4 border-b">Imagem</th>
                    <th className="p-4 border-b">Nome / SKU</th>
                    <th className="p-4 border-b">Preço</th>
                    <th className="p-4 border-b">Categoria / Home</th>
                    <th className="p-4 border-b text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-beige-50 border-b last:border-0">
                      <td className="p-4 w-20">
                        <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded bg-gray-100" />
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-rust-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.sku}</div>
                      </td>
                      <td className="p-4 font-medium">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs w-fit">{product.category}</span>
                          {product.homeSection && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-[10px] w-fit font-bold uppercase">
                              Home: {product.homeSection === 'dining' ? 'Jantar' : product.homeSection === 'decor' ? 'Decoração' : 'Destaques'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => {
                              if(window.confirm('Tem certeza que deseja excluir?')) deleteProduct(product.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <div className="bg-white rounded-lg shadow-lg border border-beige-200 max-w-4xl mx-auto">
            <div className="bg-beige-100 p-4 border-b border-beige-200 flex justify-between items-center">
              <h3 className="font-bold text-rust-900 text-lg">
                {editingId ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-red-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-bold text-rust-700 border-b pb-1">Informações Básicas</h4>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Produto</label>
                  <input required className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">SKU (Código)</label>
                    <input required className="input-field" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Preço (R$)</label>
                    <input type="number" step="0.01" required className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Categoria (Filtro)</label>
                  <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})}>
                    {CATEGORIES.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                
                {/* NEW HOME SECTION SELECTOR */}
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <label className="block text-xs font-bold text-rust-800 mb-1 flex items-center gap-1">
                    <LayoutTemplate size={14} /> Exibição na Home Page
                  </label>
                  <select 
                    className="input-field border-orange-300" 
                    value={formData.homeSection || ''} 
                    onChange={e => setFormData({...formData, homeSection: e.target.value === '' ? undefined : e.target.value as any})}
                  >
                    <option value="">Apenas na Lista de Produtos</option>
                    <option value="highlights">Seção: Destaques da Oficina (Topo)</option>
                    <option value="dining">Seção: Mesa & Convivência (Mosaico)</option>
                    <option value="decor">Seção: Detalhes & Decoração (Grid)</option>
                  </select>
                  <p className="text-[10px] text-gray-500 mt-1">Escolha onde este item aparece na página inicial.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Disponibilidade</label>
                  <select className="input-field" value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value as any})}>
                    <option value="Em Estoque">Em Estoque</option>
                    <option value="Sob Encomenda">Sob Encomenda</option>
                    <option value="Esgotado">Esgotado</option>
                  </select>
                </div>
              </div>

              {/* Technical Info */}
              <div className="space-y-4">
                <h4 className="font-bold text-rust-700 border-b pb-1">Ficha Técnica</h4>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Descrição Completa</label>
                  <textarea required rows={3} className="input-field" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Material</label>
                    <input className="input-field" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Dimensões</label>
                    <input className="input-field" placeholder="Ex: 2.00m x 1.00m" value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Acabamento</label>
                    <input className="input-field" value={formData.finishing} onChange={e => setFormData({...formData, finishing: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Prazo de Produção</label>
                    <input className="input-field" placeholder="Ex: 20 dias" value={formData.productionTime || ''} onChange={e => setFormData({...formData, productionTime: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="md:col-span-2 space-y-4 border-t pt-4">
                <h4 className="font-bold text-rust-700 border-b pb-1">Imagens (URLs)</h4>
                <p className="text-xs text-gray-500">Cole links diretos de imagens (ex: https://i.imgur.com/foto.jpg). Como não há servidor de upload, use serviços como Imgur ou Google Photos (link direto).</p>
                
                {formData.images.map((img, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <div className="flex-grow">
                      <input 
                        type="text" 
                        placeholder="https://..." 
                        className="input-field" 
                        value={img} 
                        onChange={e => handleImageChange(idx, e.target.value)} 
                      />
                    </div>
                    {img && <img src={img} alt="Preview" className="w-10 h-10 object-cover rounded border" />}
                    <button type="button" onClick={() => removeImageField(idx)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addImageField} className="text-sm text-green-700 font-bold hover:underline flex items-center gap-1">
                  <Plus size={16} /> Adicionar URL de Imagem
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="md:col-span-2 border-t pt-6 flex justify-end gap-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="px-6 py-2 bg-rust-700 text-white rounded font-bold hover:bg-rust-800 shadow-lg flex items-center gap-2">
                  <Save size={18} /> Salvar Produto
                </button>
              </div>

            </form>
          </div>
        )}
      </div>

      <style>{`
        .input-field {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #5d2d2d;
          box-shadow: 0 0 0 2px rgba(93, 45, 45, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Admin;