import React from 'react';
import { COMPANY_NAME } from '../constants';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-rust-900 text-beige-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">Nossa História</h1>
          <p className="text-xl font-light text-beige-300 max-w-2xl mx-auto">
            Mais do que móveis, construímos heranças.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="font-serif font-bold text-3xl text-rust-900 mb-6">A Tradição de Piranguinho</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Fundada no coração de Minas Gerais, a {COMPANY_NAME} nasceu da paixão pela madeira e pela história que ela carrega. Em uma região conhecida mundialmente pelo "Pé de Moleque", nós decidimos também adoçar a vida das pessoas, mas através do design e do conforto.
              </p>
              <p>
                Cada viga de Peroba Rosa que chega ao nosso ateliê tem um passado. Eram casas antigas, tulhas de café ou estruturas rurais que, após décadas resistindo ao sol e à chuva, ganham uma nova vida nas mãos dos nossos artesãos.
              </p>
              <p>
                Não vendemos apenas mesas ou armários; vendemos a atmosfera acolhedora da fazenda, a robustez que atravessa gerações e a sustentabilidade de reutilizar um material nobre que não precisa mais ser extraído da natureza.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://picsum.photos/seed/workshop/800/600" 
              alt="Artesão trabalhando" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-beige-50 p-8 rounded-lg text-center border border-beige-200">
            <h3 className="font-serif font-bold text-xl text-rust-800 mb-4">Missão</h3>
            <p className="text-sm text-gray-600">
              Levar a autenticidade e o calor da madeira de demolição para lares em todo o Brasil, promovendo sustentabilidade e valorizando o trabalho manual.
            </p>
          </div>
          <div className="bg-beige-50 p-8 rounded-lg text-center border border-beige-200">
            <h3 className="font-serif font-bold text-xl text-rust-800 mb-4">Sustentabilidade</h3>
            <p className="text-sm text-gray-600">
              Nossa matéria-prima é 100% reutilizada. Não derrubamos árvores; resgatamos madeira nobre que seria descartada e a transformamos em arte.
            </p>
          </div>
          <div className="bg-beige-50 p-8 rounded-lg text-center border border-beige-200">
            <h3 className="font-serif font-bold text-xl text-rust-800 mb-4">Qualidade</h3>
            <p className="text-sm text-gray-600">
              Uso exclusivo de Peroba Rosa legítima, técnicas de marcenaria tradicional (espiga e malhete) e acabamentos de alta resistência.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;