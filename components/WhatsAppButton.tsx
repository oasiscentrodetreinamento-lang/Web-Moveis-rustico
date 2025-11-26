import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface WhatsAppButtonProps {
  productName?: string;
  productSku?: string;
  fixed?: boolean;
  className?: string;
  label?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  productName, 
  productSku, 
  fixed = false,
  className = "",
  label = "Falar no WhatsApp"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSend = () => {
    let message = '';
    
    if (productName && productSku) {
      // Product specific message
      message = `Olá! Tenho interesse no produto *${productName}* (código ${productSku}). Meu nome é ${customerName}. Gostaria de saber disponibilidade, prazos e valor final.`;
    } else {
      // Generic message
      message = `Olá! Meu nome é ${customerName}. Gostaria de saber mais sobre os móveis rústicos.`;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
    setIsModalOpen(false);
    setCustomerName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (fixed) {
    return (
      <>
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Contato WhatsApp"
        >
          <MessageCircle size={32} />
          <span className="absolute right-full mr-4 bg-rust-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Fale Conosco
          </span>
        </button>
        {isModalOpen && (
          <ModalContent 
            onClose={handleClose} 
            onSend={handleSend} 
            customerName={customerName} 
            setCustomerName={setCustomerName}
            onKeyDown={handleKeyDown}
          />
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={`bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 ${className}`}
      >
        <MessageCircle size={20} />
        {label}
      </button>
      {isModalOpen && (
        <ModalContent 
          onClose={handleClose} 
          onSend={handleSend} 
          customerName={customerName} 
          setCustomerName={setCustomerName} 
          onKeyDown={handleKeyDown}
        />
      )}
    </>
  );
};

interface ModalProps {
  onClose: () => void;
  onSend: () => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const ModalContent: React.FC<ModalProps> = ({ onClose, onSend, customerName, setCustomerName, onKeyDown }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative border border-rust-100">
      <div className="bg-rust-700 p-4 flex justify-between items-center text-white">
        <h3 className="font-serif font-bold text-lg">Iniciar Conversa</h3>
        <button onClick={onClose} className="hover:bg-rust-600 p-1 rounded transition-colors">
          <X size={24} />
        </button>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 text-sm">
          Por favor, digite seu nome para que possamos atendê-lo melhor no WhatsApp.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-rust-800 mb-1">Seu Nome</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-rust-500 focus:border-rust-500 outline-none transition-all"
            placeholder="Ex: João Silva"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
          />
        </div>
        <button
          onClick={onSend}
          disabled={!customerName.trim()}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <span>Ir para WhatsApp</span>
          <Send size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default WhatsAppButton;