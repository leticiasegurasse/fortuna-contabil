// Tipos para o site institucional da Fortuna Contábil

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  image?: string;
  tags: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
