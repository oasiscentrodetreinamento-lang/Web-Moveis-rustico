import { Product, Testimonial } from './types';

export const WHATSAPP_NUMBER = "553597418765"; 
export const COMPANY_NAME = "Móveis Rústicos Piranguinho";
export const COMPANY_SLOGAN = "Raro como o tempo, perfeito para sua casa";

export const CATEGORIES = [
  'Todos',
  'Mesas Rústicas',
  'Bancos',
  'Balcões',
  'Armários',
  'Cômodas',
  'Decoração',
  'Personalizados'
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mesa de Jantar Fazenda Real',
    sku: 'MESA-001',
    price: 3450.00,
    category: 'Mesas Rústicas',
    description: 'Mesa robusta feita inteiramente em Peroba Rosa de demolição, com pés torneados e acabamento em cera de carnaúba. Ideal para reunir a família.',
    images: [
      'https://picsum.photos/id/1080/800/800',
      'https://picsum.photos/id/1081/800/800',
      'https://picsum.photos/id/1082/800/800'
    ],
    material: '100% Peroba Rosa de Demolição',
    dimensions: '2.50m x 1.00m x 0.80m',
    weight: '120kg',
    finishing: 'Cera de Carnaúba Fosca',
    availability: 'Sob Encomenda',
    productionTime: '20 dias úteis',
    homeSection: 'dining' // Destaque na seção de Jantar (Mosaico grande)
  },
  {
    id: '2',
    name: 'Banco Caipira Mineiro',
    sku: 'BCO-042',
    price: 890.00,
    category: 'Bancos',
    description: 'Banco tradicional com encosto trabalhado à mão. Conforto e durabilidade para áreas externas ou internas.',
    images: [
      'https://picsum.photos/id/1069/800/800',
      'https://picsum.photos/id/1070/800/800'
    ],
    material: 'Peroba Rosa e Cruzeta',
    dimensions: '1.80m x 0.45m x 0.90m',
    weight: '45kg',
    finishing: 'Verniz Marítimo',
    availability: 'Em Estoque',
    homeSection: 'highlights'
  },
  {
    id: '3',
    name: 'Cristaleira Centenária',
    sku: 'ARM-103',
    price: 4200.00,
    category: 'Armários',
    description: 'Cristaleira com vidros bisotados e madeira maciça. Uma peça que conta história por si só.',
    images: [
      'https://picsum.photos/id/1062/800/800',
      'https://picsum.photos/id/1063/800/800'
    ],
    material: 'Peroba Rosa',
    dimensions: '1.90m x 0.90m x 0.45m',
    weight: '90kg',
    finishing: 'Cera Envelhecida',
    availability: 'Sob Encomenda',
    productionTime: '30 dias úteis',
    homeSection: 'highlights'
  },
  {
    id: '4',
    name: 'Balcão Gourmet Rústico',
    sku: 'BAL-220',
    price: 2100.00,
    category: 'Balcões',
    description: 'Perfeito para áreas de churrasqueira e cozinhas americanas. Possui prateleira interna e gavetas reforçadas.',
    images: [
      'https://picsum.photos/id/1060/800/800',
      'https://picsum.photos/id/1059/800/800'
    ],
    material: 'Peroba Rosa',
    dimensions: '1.50m x 0.50m x 1.00m',
    weight: '70kg',
    finishing: 'Seladora',
    availability: 'Em Estoque',
    homeSection: 'dining'
  },
  {
    id: '5',
    name: 'Espelho com Moldura de Cruzeta',
    sku: 'DEC-550',
    price: 450.00,
    category: 'Decoração',
    description: 'Espelho com moldura feita de cruzetas de poste antigas. Textura única e marcante.',
    images: [
      'https://picsum.photos/id/1040/800/800'
    ],
    material: 'Cruzeta de Madeira',
    dimensions: '1.00m x 0.70m',
    weight: '15kg',
    finishing: 'Natural',
    availability: 'Em Estoque',
    homeSection: 'decor'
  },
  {
    id: '6',
    name: 'Cômoda Barroca',
    sku: 'COM-301',
    price: 2800.00,
    category: 'Cômodas',
    description: 'Cômoda com design inspirado no barroco mineiro, puxadores em ferro fundido.',
    images: [
      'https://picsum.photos/id/1031/800/800'
    ],
    material: 'Peroba Rosa',
    dimensions: '1.20m x 0.50m x 1.00m',
    weight: '60kg',
    finishing: 'Cera',
    availability: 'Sob Encomenda',
    productionTime: '25 dias úteis',
    homeSection: 'highlights'
  },
  {
    id: '7',
    name: 'Banco de Jardim',
    sku: 'JAR-009',
    price: 650.00,
    category: 'Bancos',
    description: 'Pequeno banco para jardim, resistente ao tempo.',
    images: ['https://picsum.photos/id/1020/800/800'],
    material: 'Peroba Rosa',
    dimensions: '1.20m',
    weight: '30kg',
    finishing: 'Verniz',
    availability: 'Em Estoque',
    homeSection: 'decor'
  },
  {
    id: '8',
    name: 'Mesa de Centro Tora',
    sku: 'CEN-112',
    price: 1200.00,
    category: 'Mesas Rústicas',
    description: 'Mesa de centro feita de uma única tora.',
    images: ['https://picsum.photos/id/1024/800/800'],
    material: 'Tora Maciça',
    dimensions: '1.00m x 0.80m',
    weight: '50kg',
    finishing: 'Cera',
    availability: 'Em Estoque',
    homeSection: 'dining'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Cláudia Silva',
    rating: 5,
    comment: 'A mesa ficou perfeita na minha sala! O acabamento é impecável e o atendimento foi excelente.',
    image: 'https://picsum.photos/id/64/100/100'
  },
  {
    id: '2',
    name: 'Roberto Mendes',
    rating: 5,
    comment: 'Móveis para a vida toda. Comprei um banco para o jardim e resiste muito bem ao tempo.',
    image: 'https://picsum.photos/id/91/100/100'
  },
  {
    id: '3',
    name: 'Mariana Costa',
    rating: 4,
    comment: 'Lindo trabalho artesanal. A entrega demorou um pouquinho, mas valeu a pena pela qualidade.',
    image: 'https://picsum.photos/id/129/100/100'
  }
];