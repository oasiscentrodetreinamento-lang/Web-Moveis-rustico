export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  material: string;
  dimensions: string;
  weight: string;
  finishing: string;
  availability: 'Em Estoque' | 'Sob Encomenda' | 'Esgotado';
  // Define onde o produto aparece na Home. Se undefined, aparece apenas na lista geral.
  homeSection?: 'highlights' | 'dining' | 'decor'; 
  productionTime?: string;
}

export type Category = 
  | 'Mesas Rústicas'
  | 'Bancos'
  | 'Balcões'
  | 'Decoração'
  | 'Armários'
  | 'Cômodas'
  | 'Molduras'
  | 'Personalizados';

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  image?: string;
}

export interface Breadcrumb {
  label: string;
  path: string;
}