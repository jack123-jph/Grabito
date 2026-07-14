export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  tag?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FranchiseInquiry {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  town: string;
  district: string;
  background: string;
  investmentReady: boolean;
  message?: string;
  status: 'new' | 'contacted' | 'approved';
  createdAt: string;
}
