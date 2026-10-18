import { PORTFOLIO_DATA, Project, SkillCategory, Experience, Testimonial, BlogPost } from '@/data/portfolioData';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface PortfolioStoreData {
  profile: typeof PORTFOLIO_DATA.profile;
  projects: Project[];
  skills: SkillCategory[];
  services: typeof PORTFOLIO_DATA.services;
  experiences: Experience[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  counters: typeof PORTFOLIO_DATA.counters;
  messages: ContactMessage[];
}

const STORAGE_KEY = 'denis_portfolio_data_v2';

const initialMessages: ContactMessage[] = [
  {
    id: 'msg-demo-1',
    name: 'Koffi Mensah',
    email: 'koffi.mensah@techbenin.bj',
    subject: 'Application Mobile de Livraison',
    message: 'Bonjour Denis, nous cherchons un développeur Flutter expérimenté pour concevoir notre application mobile de livraison géolocalisée à Cotonou. Êtes-vous disponible ce mois-ci ?',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    read: true,
  },
  {
    id: 'msg-demo-2',
    name: 'Aïssatou Diallo',
    email: 'adiallo@groupeeduc.org',
    subject: 'Refonte logiciel de gestion scolaire',
    message: 'Bonjour M. ASSOGBA, nous avons vu votre projet EduGest et nous souhaitons moderniser le système de notation et de bulletins de nos 3 lycées. Pouvons-nous échanger par WhatsApp ou appel ?',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    read: false,
  },
];

export function getInitialStoreData(): PortfolioStoreData {
  if (typeof window === 'undefined') {
    return {
      ...PORTFOLIO_DATA,
      messages: initialMessages,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure all arrays are defined
      return {
        profile: { ...PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
        projects: parsed.projects || PORTFOLIO_DATA.projects,
        skills: parsed.skills || PORTFOLIO_DATA.skills,
        services: parsed.services || PORTFOLIO_DATA.services,
        experiences: parsed.experiences || PORTFOLIO_DATA.experiences,
        testimonials: parsed.testimonials || PORTFOLIO_DATA.testimonials,
        blogPosts: parsed.blogPosts || PORTFOLIO_DATA.blogPosts,
        counters: parsed.counters || PORTFOLIO_DATA.counters,
        messages: parsed.messages || initialMessages,
      };
    }
  } catch (err) {
    console.error('Failed to parse portfolio store from localStorage', err);
  }

  const initial = {
    ...PORTFOLIO_DATA,
    messages: initialMessages,
  };
  saveStoreData(initial);
  return initial;
}

export function saveStoreData(data: PortfolioStoreData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('portfolio-data-changed'));
  } catch (err) {
    console.error('Failed to save portfolio data to localStorage', err);
  }
}

export function addContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) {
  const current = getInitialStoreData();
  const newMessage: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  current.messages = [newMessage, ...current.messages];
  saveStoreData(current);
  return newMessage;
}

export function resetToDefaults() {
  const defaults: PortfolioStoreData = {
    ...PORTFOLIO_DATA,
    messages: initialMessages,
  };
  saveStoreData(defaults);
  return defaults;
}
