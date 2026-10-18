import portraitCutout from '@/assets/denis-portrait-cutout.png';
import projectBmb from '@/assets/project-bmb.jpg';
import projectSchool from '@/assets/project-school.jpg';
import projectStock from '@/assets/project-stock.jpg';

export interface Project {
  id: string;
  title: string;
  category: 'mobile' | 'web' | 'erp' | 'all';
  categoryLabel: { fr: string; en: string };
  badge: string;
  subtitle: string;
  description: {
    fr: string;
    en: string;
  };
  features: {
    fr: string[];
    en: string[];
  };
  technologies: string[];
  image: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: { fr: string; en: string };
  icon: string;
  skills: { name: string; level: number; note: string; highlight?: boolean }[];
}

export interface Experience {
  id: string;
  period: string;
  role: { fr: string; en: string };
  company: string;
  location: string;
  description: { fr: string; en: string };
  bullets: { fr: string[]; en: string[] };
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: { fr: string; en: string };
  rating: number;
}

export interface BlogPost {
  id: string;
  title: { fr: string; en: string };
  category: string;
  date: string;
  author: string;
  readTime: string;
  commentsCount: number;
  image: string;
  excerpt: { fr: string; en: string };
  content: {
    fr: string[];
    en: string[];
  };
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Denis ASSOGBA',
    role: {
      fr: 'Développeur Web & Mobile Full Stack',
      en: 'Full Stack Web & Mobile Developer',
    },
    subRole: {
      fr: 'Spécialiste Laravel · Flutter · React · WinDev & ERP',
      en: 'Specialist Laravel · Flutter · React · WinDev & ERP',
    },
    tagline: {
      fr: 'Je conçois des applications web modernes, des apps mobiles performantes et des logiciels de gestion robustes qui propulsent votre activité.',
      en: 'I build modern web apps, high-performance mobile solutions and robust enterprise ERP systems that drive business growth.',
    },
    location: 'Cotonou, Bénin',
    remoteStatus: {
      fr: 'Disponible en Freelance & CDI (Sur site & Télétravail)',
      en: 'Available for Freelance & Full-time (Remote & On-site)',
    },
    email: 'assogbadenis753@gmail.com',
    secondaryEmail: 'contact@denisassogba.dev',
    phone: '+229 01 96 00 00 00',
    whatsapp: 'https://wa.me/2290196000000?text=Bonjour%20Denis,%20j%27ai%20vu%20votre%20portfolio%20et%20je%20souhaite%20discuter%20d%27un%20projet',
    linkedin: 'https://bj.linkedin.com/in/d%C3%A9veloppeurweb-mobile-full-stack',
    github: 'https://github.com/Den-229',
    portrait: portraitCutout,
    stats: [
      { value: '4+', label: { fr: "Années d'expérience", en: 'Years Experience' } },
      { value: '15+', label: { fr: 'Projets livrés avec succès', en: 'Projects Delivered' } },
      { value: '10k+', label: { fr: 'Utilisateurs finaux actifs', en: 'Active End Users' } },
      { value: '100%', label: { fr: 'Dévouement & Rigueur', en: 'Client Dedication' } },
    ],
  },

  projects: [
    {
      id: 'project-bmb',
      title: 'Application Mobile BMB',
      category: 'mobile',
      categoryLabel: { fr: 'Application Mobile', en: 'Mobile App' },
      badge: 'En Production · Stores',
      subtitle: 'Flutter · Dart · Firebase · API REST',
      description: {
        fr: 'Application mobile d’entreprise tout-en-un assurant la digitalisation intégrale des flux de services, la gestion des requêtes clients et la synchronisation sécurisée avec le back-office.',
        en: 'All-in-one enterprise mobile application ensuring complete digitalization of customer workflows, transaction tracking, and secure back-office synchronization.',
      },
      features: {
        fr: [
          'Interface réactive native Android & iOS développée avec Flutter',
          'Gestion d’état avancée avec synchronisation temps réel & mode hors-ligne',
          'Authentification sécurisée avec biométrie et gestion fine des sessions',
          'Intégration d’APIs REST sécurisées et notifications push Firebase',
          'Préparation, signature cryptographique et déploiement Google Play & App Store',
        ],
        en: [
          'Native fluid UI for Android & iOS built with Flutter & Dart',
          'Advanced state management with real-time sync and offline-first capabilities',
          'Biometric authentication and multi-factor session security',
          'REST API integration with Firebase Cloud Messaging push notifications',
          'Store deployment, cryptographic signing, and compliance auditing',
        ],
      },
      technologies: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Android', 'iOS', 'Clean Architecture'],
      image: projectBmb,
      featured: true,
      metrics: [
        { label: 'Plateformes', value: 'iOS & Android' },
        { label: 'Fluidité', value: '60 FPS' },
        { label: 'Disponibilité', value: '99.9%' },
      ],
      demoUrl: 'https://github.com/Den-229',
      githubUrl: 'https://github.com/Den-229',
    },
    {
      id: 'project-school',
      title: 'EduGest — Plateforme de Gestion Scolaire',
      category: 'web',
      categoryLabel: { fr: 'Application Métier Web & Mobile', en: 'Web & Mobile EdTech' },
      badge: 'Multi-Établissements',
      subtitle: 'Flutter · Laravel 10 · MySQL · REST API',
      description: {
        fr: 'Système complet de saisie, calcul automatisé des moyennes pondérées, génération de bulletins officiels infalsifiables avec QR Code et portail dédié pour administration, enseignants, élèves et parents.',
        en: 'Comprehensive school ERP enabling weighted grade calculation, automated tamper-proof PDF report cards with QR codes, and multi-user portal for staff, students, and parents.',
      },
      features: {
        fr: [
          'Calcul instantané des moyennes, rangs et appréciations selon les coefficients officiels',
          'Édition et génération de bulletins scolaires PDF en masse en un clic',
          'Gestion des emplois du temps, assiduité, absences et retards',
          'Portail d’accès sécurisé avec rôles stricts (Direction, Enseignant, Comptable, Parent)',
          'Module d’alertes SMS et WhatsApp pour les communications urgentes',
        ],
        en: [
          'Instant computation of weighted grades and class ranks according to curriculum standards',
          'Bulk PDF report card generation with anti-counterfeit QR code stamps',
          'Attendance tracking, disciplinary records, and teacher timetable schedules',
          'Role-based access control (Admin, Teacher, Bursar, Guardian/Parent)',
          'SMS and WhatsApp alerts for instant parent communication',
        ],
      },
      technologies: ['Laravel 10', 'PHP 8', 'Flutter', 'MySQL', 'Tailwind CSS', 'FPDF / DomPDF'],
      image: projectSchool,
      featured: true,
      metrics: [
        { label: 'Gain de temps', value: '-85%' },
        { label: 'Bulletins générés', value: '5 000+' },
        { label: 'Établissements', value: 'Multi-sites' },
      ],
      demoUrl: 'https://github.com/Den-229',
      githubUrl: 'https://github.com/Den-229',
    },
    {
      id: 'project-stock',
      title: 'StockFlow — ERP & Gestion Multi-Dépôts',
      category: 'erp',
      categoryLabel: { fr: 'ERP & Gestion de Stock', en: 'Enterprise Stock & Inventory' },
      badge: 'Temps Réel · Traçabilité',
      subtitle: 'Laravel · MySQL · Chart.js · REST API',
      description: {
        fr: 'Plateforme ERP industrielle centralisant les stocks, réapprovisionnements, achats fournisseurs, factures, bons de livraison et mouvements de stocks entre multiples entrepôts.',
        en: 'Industrial-grade ERP centralizing inventory across multiple warehouses, automated replenishment alerts, supplier invoicing, and batch barcode tracking.',
      },
      features: {
        fr: [
          'Contrôle des stocks en temps réel et alertes automatiques de seuil critique',
          'Gestion multi-magasins avec bons de transferts inter-dépôts sécurisés',
          'Cycle complet de vente : devis, bon de commande, bon de livraison et facture certifiée',
          'Tableau de bord prédictif avec visualisations des rotations de stocks et marges',
          'Support lecteur code-barres et exports comptables Excel/PDF',
        ],
        en: [
          'Real-time inventory levels with automated minimum stock alerts',
          'Multi-warehouse support with tracked inter-depot transfers',
          'End-to-end sales pipeline: quotations, purchase orders, delivery notes, and tax invoices',
          'Interactive dashboards illustrating profit margins, turnover rate, and revenue trends',
          'Barcode scanning integration and CSV/PDF financial export tools',
        ],
      },
      technologies: ['Laravel', 'PHP 8.2', 'MySQL', 'ApexCharts', 'Bootstrap & Tailwind', 'REST API'],
      image: projectStock,
      featured: true,
      metrics: [
        { label: 'Entrepôts', value: 'Multi-dépôts' },
        { label: 'Articles gérés', value: '25 000+' },
        { label: 'Précision stock', value: '99.9%' },
      ],
      demoUrl: 'https://github.com/Den-229',
      githubUrl: 'https://github.com/Den-229',
    },
    {
      id: 'project-windev',
      title: 'WinGestion — Caisse POS & Logiciel Métier',
      category: 'erp',
      categoryLabel: { fr: 'Logiciel Desktop & Caisse', en: 'Desktop POS & ERP' },
      badge: 'Haute Disponibilité',
      subtitle: 'WinDev · HFSQL Client/Serveur · Procédures',
      description: {
        fr: 'Application de point de vente et gestion commerciale haute cadence conçue sous WinDev pour le commerce de détail et les grossistes, résiliente aux pannes réseau.',
        en: 'High-throughput point of sale and commercial inventory desktop software built on WinDev & HFSQL, built for extreme network resilience and offline sales.',
      },
      features: {
        fr: [
          'Encaissement rapide au scanner avec support multi-modes (Espèces, MoMo, Carte)',
          'Impression thermique directe sur tickets de caisse et tiroirs-caisses automatiques',
          'Gestion des droits de caissiers avec clôture Z journalière infalsifiable',
          'Synchronisation asynchrone HFSQL Client/Serveur sur réseau local et distant',
        ],
        en: [
          'High-speed barcode checkout with multi-payment methods (Cash, Mobile Money, Card)',
          'Direct thermal receipt printing and automated cash drawer triggers',
          'Cashier privilege levels and tamper-evident end-of-day Z-reports',
          'Asynchronous HFSQL Client/Server synchronization across local and WAN networks',
        ],
      },
      technologies: ['WinDev 28', 'HFSQL', 'WLanguage', 'SQL', 'Impression Thermique'],
      image: projectStock,
      featured: false,
      metrics: [
        { label: 'Vitesse ticket', value: '< 1 sec' },
        { label: 'Mode hors-ligne', value: '100% natif' },
      ],
      demoUrl: 'https://github.com/Den-229',
      githubUrl: 'https://github.com/Den-229',
    },
    {
      id: 'project-fintech-momo',
      title: 'PayConnect — Passerelle Mobile Money & API',
      category: 'web',
      categoryLabel: { fr: 'Fintech & Intégration API', en: 'Fintech & Payment Gateway' },
      badge: 'API & Sécurité',
      subtitle: 'Node.js · Laravel · MTN MoMo · Moov Money',
      description: {
        fr: 'Module et microservice d’agrégation de paiements mobiles d’Afrique de l’Ouest avec gestion des webhooks, réconciliations bancaires automatiques et sécurité HMAC.',
        en: 'Payment aggregation microservice for West African Mobile Money operators featuring secure webhooks, automated transaction reconciliation, and cryptographic signature verification.',
      },
      features: {
        fr: [
          'Paiements instantanés MTN MoMo, Moov Money et cartes Visa/Mastercard',
          'Système anti-fraude avec idempotence des requêtes et webhooks signés',
          'Rapports financiers automatisés et notifications en direct',
        ],
        en: [
          'Instant settlements for MTN Mobile Money, Moov Money and bank cards',
          'Anti-fraud idempotent request handling and cryptographically signed webhooks',
          'Automated daily settlement logs and real-time merchant alerts',
        ],
      },
      technologies: ['Laravel', 'Node.js', 'REST API', 'Webhooks', 'Security HMAC', 'Docker'],
      image: projectBmb,
      featured: false,
      metrics: [
        { label: 'Temps validation', value: '< 2.5s' },
        { label: 'Taux succès', value: '99.4%' },
      ],
      demoUrl: 'https://github.com/Den-229',
      githubUrl: 'https://github.com/Den-229',
    },
  ] as Project[],

  skills: [
    {
      title: { fr: 'Backend & Architecture API', en: 'Backend & API Architecture' },
      icon: 'Server',
      skills: [
        { name: 'Laravel (PHP 8+)', level: 95, note: 'API RESTful, Eloquent, Sanctum, Queues, Jobs, Cache', highlight: true },
        { name: 'Architecture REST & Microservices', level: 90, note: 'Endpoints documentés, pagination, versioning, throttling', highlight: true },
        { name: 'Node.js & Express', level: 82, note: 'APIs asynchrones, webhooks, microservices temps réel' },
        { name: 'Sécurité & Authentification', level: 90, note: 'JWT, RBAC (rôles & permissions), CORS, CSRF, validation' },
      ],
    },
    {
      title: { fr: 'Développement Mobile', en: 'Mobile Development' },
      icon: 'Smartphone',
      skills: [
        { name: 'Flutter & Dart', level: 92, note: 'Applications iOS/Android cross-platform, fluidité 60fps', highlight: true },
        { name: 'State Management', level: 90, note: 'Provider, Riverpod, BLoC, séparation propre UI/Business logic', highlight: true },
        { name: 'Intégration Firebase', level: 88, note: 'Auth, Firestore, Cloud Messaging, Push notifications, Analytics' },
        { name: 'Déploiement Stores', level: 85, note: 'Google Play Console, App Store Connect, bundles signés' },
      ],
    },
    {
      title: { fr: 'Frontend Moderne', en: 'Modern Frontend' },
      icon: 'Layout',
      skills: [
        { name: 'React & TypeScript', level: 88, note: 'Composants réutilisables, hooks sur mesure, typage strict', highlight: true },
        { name: 'Tailwind CSS', level: 95, note: 'Design systems modernes, responsive mobile-first, dark mode', highlight: true },
        { name: 'HTML5 / CSS3 / JavaScript ESNext', level: 92, note: 'DOM moderne, accessibilité, performances et animations' },
        { name: 'UI / UX Design & Figma', level: 80, note: 'Prototypage d’écrans, wireframes et cohérence visuelle' },
      ],
    },
    {
      title: { fr: 'Bases de Données & Métier', en: 'Databases & Enterprise Logic' },
      icon: 'Database',
      skills: [
        { name: 'MySQL & PostgreSQL', level: 90, note: 'Conception relationnelle, indexation, triggers, transactions ACID', highlight: true },
        { name: 'WinDev & HFSQL (Client/Serveur)', level: 88, note: 'Applications de gestion lourde, caisses POS, maintenance', highlight: true },
        { name: 'Modélisation Conceptuelle (MCD/MLD)', level: 90, note: 'Schémas normalisés, cardinalités, intégrité des données' },
        { name: 'Docker & Environnements Linux', level: 80, note: 'Conteneurs, déploiement VPS, configuration Nginx/Apache' },
      ],
    },
  ] as SkillCategory[],

  services: [
    {
      id: 'srv-mobile',
      number: '01',
      title: { fr: 'Développement Mobile iOS & Android', en: 'iOS & Android Mobile Development' },
      icon: 'Smartphone',
      description: {
        fr: 'Conception d’applications mobiles ultra-fluides avec Flutter. Une seule base de code pour Google Play et l’App Store, avec une expérience utilisateur native, mode hors-ligne et notifications temps réel.',
        en: 'Engineering ultra-responsive mobile applications using Flutter. A single optimized codebase for Android and iOS with native feel, offline storage, and push notifications.',
      },
      tags: ['Flutter', 'Dart', 'Firebase', 'Play Store', 'App Store'],
    },
    {
      id: 'srv-web',
      number: '02',
      title: { fr: 'Applications Web & Plateformes SaaS', en: 'Modern Web Apps & SaaS Platforms' },
      icon: 'Globe',
      description: {
        fr: 'Création de plateformes web sur mesure avec Laravel et React. Tableaux de bord intuitifs, portails clients, interfaces réactives et performances de chargement de premier ordre.',
        en: 'Building custom web platforms and portals powered by Laravel and React. Intuitive administration dashboards, secure portals, and blazing-fast loading speeds.',
      },
      tags: ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'Next/Vite'],
    },
    {
      id: 'srv-erp',
      number: '03',
      title: { fr: 'Solutions Métiers & ERP sur Mesure', en: 'Custom Business Software & ERP' },
      icon: 'Cpu',
      description: {
        fr: 'Digitalisation sur mesure de vos opérations d’entreprise : gestion scolaire, suivi de stock multi-dépôts, facturation, points de vente (POS) avec WinDev ou architectures web modernes.',
        en: 'Bespoke automation of internal company workflows: school management, multi-warehouse inventory, invoicing, and POS cashier systems using WinDev or web stacks.',
      },
      tags: ['ERP', 'Stock', 'Gestion Scolaire', 'WinDev', 'HFSQL'],
    },
    {
      id: 'srv-api',
      number: '04',
      title: { fr: 'APIs REST, Webhooks & Paiements', en: 'REST APIs, Webhooks & Payments' },
      icon: 'Zap',
      description: {
        fr: 'Développement d’APIs robustes, sécurisées et documentées. Intégration de passerelles de paiement locales (MTN Mobile Money, Moov Money) et internationales (Stripe).',
        en: 'Designing scalable and securely authenticated REST APIs. Seamless integration of local payment methods (MTN MoMo, Moov) and international gateways (Stripe).',
      },
      tags: ['REST API', 'MTN MoMo', 'Moov Money', 'Stripe', 'JWT / OAuth'],
    },
  ],

  experiences: [
    {
      id: 'exp-1',
      period: '2023 — Présent',
      role: { fr: 'Développeur Web & Mobile Full Stack Indépendant', en: 'Lead Full Stack Web & Mobile Developer' },
      company: 'Freelance & Consultance Technologique',
      location: 'Bénin · International (Remote)',
      description: {
        fr: 'Conception et déploiement de solutions logicielles complètes pour entreprises, PME et porteurs de projets innovants.',
        en: 'Architecting and deploying end-to-end software solutions for enterprise clients, SMEs, and tech entrepreneurs.',
      },
      bullets: {
        fr: [
          'Développement de l’application mobile BMB (Flutter) et coordination avec les équipes backend',
          'Architecture et livraison de la plateforme scolaire EduGest (Laravel + Flutter + MySQL)',
          'Déploiement d’ERP de gestion de stock avec intégration lecteur codes-barres et reporting',
          'Accompagnement technique, maintenance corrective et évolution des architectures logicielles',
        ],
        en: [
          'Engineered the BMB enterprise mobile application with Flutter and real-time backend sync',
          'Architected and rolled out the EduGest multi-school platform (Laravel + Flutter + MySQL)',
          'Implemented multi-depot inventory ERP with barcode scanners and automated analytics',
          'Provided technical consulting, DevOps support, and continuous feature enhancements',
        ],
      },
      technologies: ['Flutter', 'Laravel', 'React', 'MySQL', 'Firebase', 'Mobile Money'],
    },
    {
      id: 'exp-2',
      period: '2021 — 2023',
      role: { fr: 'Développeur Backend & Solutions de Gestion', en: 'Backend & Enterprise Systems Developer' },
      company: 'Projets d’Entreprises & PME',
      location: 'Cotonou, Bénin',
      description: {
        fr: 'Développement d’applications de gestion commerciale, modules comptables et interfaces de caisse.',
        en: 'Development of commercial management software, accounting tools, and retail cashier systems.',
      },
      bullets: {
        fr: [
          'Création de logiciels de point de vente et gestion commerciale sous WinDev & HFSQL',
          'Conception d’APIs PHP/Laravel avec authentification sécurisée par tokens JWT',
          'Modélisation de bases de données relationnelles optimisées pour les gros volumes de données',
        ],
        en: [
          'Created high-speed point of sale systems using WinDev & HFSQL client/server',
          'Developed PHP/Laravel RESTful backends with secure token authentication',
          'Modeled relational database schemas optimized for large transactional volumes',
        ],
      },
      technologies: ['WinDev', 'HFSQL', 'PHP', 'Laravel', 'MySQL', 'WLanguage'],
    },
  ] as Experience[],

  testimonials: [
    {
      id: 'test-1',
      name: 'Directeur d’Établissement',
      role: 'Administration Scolaire',
      company: 'Complexe Scolaire Privé',
      content: {
        fr: 'Denis a conçu pour notre établissement un système de gestion des notes et de bulletins d’une efficacité redoutable. Ce qui nous prenait 2 semaines à chaque fin de trimestre se fait aujourd’hui en moins de 2 heures. C’est un développeur consciencieux et toujours à l’écoute.',
        en: 'Denis engineered a grade computation and report card platform that revolutionized our school operations. What used to take two stressful weeks at the end of every term is now done in under two hours. He is exceptionally reliable and proactive.',
      },
      rating: 5,
    },
    {
      id: 'test-2',
      name: 'Responsable Opérations & Logistique',
      role: 'Gérant d’Entrepôts',
      company: 'Distribution & Commerce de Gros',
      content: {
        fr: 'Grâce à l’ERP de gestion de stock développé par Denis, nous avons éliminé les écarts d’inventaire et automatisé nos réapprovisionnements. Sa maîtrise technique et son sens du détail font de lui un partenaire de premier plan.',
        en: 'Thanks to the inventory ERP engineered by Denis, we eliminated inventory discrepancies and automated warehouse restocking. His technical mastery and attention to detail make him an outstanding partner.',
      },
      rating: 5,
    },
    {
      id: 'test-3',
      name: 'Chef de Projet Digital',
      role: 'Startup Tech',
      company: 'Fintech & Solutions Mobiles',
      content: {
        fr: 'La qualité du code Flutter produit sur notre application mobile est exemplaire. L’interface est fluide, les APIs sont parfaitement synchronisées et le travail a été livré dans les délais convenus.',
        en: 'The Flutter codebase produced for our mobile application is spotless. The UI is fluid, APIs are synchronized seamlessly, and delivery was right on schedule.',
      },
      rating: 5,
    },
  ] as Testimonial[],

  counters: [
    { value: '15', suffix: '+', label: { fr: 'Projets menés à terme', en: 'Projects Completed' } },
    { value: '10', suffix: 'k+', label: { fr: 'Utilisateurs finaux servis', en: 'Active Users Reached' } },
    { value: '4', suffix: '+', label: { fr: "Années d'expérience", en: 'Years of Experience' } },
    { value: '100', suffix: '%', label: { fr: 'Clients satisfaits', en: 'Client Satisfaction' } },
  ],

  blogPosts: [
    {
      id: 'post-1',
      title: {
        fr: 'Pourquoi Flutter est le meilleur choix pour vos applications mobiles en 2026',
        en: 'Why Flutter is the optimal cross-platform framework for mobile apps in 2026',
      },
      category: 'Mobile / Flutter',
      date: '12 Octobre 2026',
      author: 'Denis ASSOGBA',
      readTime: '5 min de lecture',
      commentsCount: 3,
      image: projectBmb,
      excerpt: {
        fr: 'Performance à 60 FPS, base de code unique iOS & Android, gestion hors-ligne et réduction des coûts de développement de 50%.',
        en: 'Buttery 60 FPS performance, unified codebase for iOS & Android, robust offline storage, and 50% lower maintenance overhead.',
      },
      content: {
        fr: [
          'Le développement mobile a connu une mutation profonde ces dernières années. Alors que les entreprises devaient autrefois investir dans deux équipes séparées (Swift pour iOS et Kotlin pour Android), des technologies comme Flutter ont rebattu les cartes.',
          'Avec Flutter, le moteur graphique Skia/Impeller compile directement le code en assembleur natif ARM. Résultat : une fluidité irréprochable et un rendu identique au pixel près sur tous les téléphones.',
          'Dans le contexte africain et international, la prise en charge du mode hors-ligne avec synchronisation périodique via SQLite ou Hive est un avantage compétitif décisif pour les utilisateurs confrontés à des connexions instables.',
        ],
        en: [
          'Mobile engineering has shifted drastically. While organizations previously maintained separate Swift and Kotlin teams, Flutter has redefined developer velocity.',
          'With Flutter, the Impeller rendering engine compiles directly to native ARM code, delivering 60 FPS interfaces with zero webview friction.',
          'Crucially, its offline-first persistence capabilities (via SQLite or Hive) ensure resilient user experiences regardless of network drops.',
        ],
      },
    },
    {
      id: 'post-2',
      title: {
        fr: 'Concevoir une architecture ERP robuste et scalable avec Laravel 10 & MySQL',
        en: 'Architecting scalable enterprise ERP platforms with Laravel 10 and MySQL',
      },
      category: 'Backend / Architecture',
      date: '28 Septembre 2026',
      author: 'Denis ASSOGBA',
      readTime: '7 min de lecture',
      commentsCount: 6,
      image: projectStock,
      excerpt: {
        fr: 'Comment structurer les stocks multi-entrepôts, garantir la cohérence des transactions financières ACID et automatiser les rapports.',
        en: 'Structuring multi-warehouse inventory, ensuring ACID financial transactions, and automating mission-critical reporting.',
      },
      content: {
        fr: [
          'Un ERP de gestion commerciale ne tolère aucune perte de données ni incohérence de stock. L’utilisation de transactions strictes dans Laravel avec verrouillage pessimiste ou optimiste (`DB::transaction`) est impérative lors des mouvements d’inventaire.',
          'Pour les grandes entreprises, nous isolons les traitements lourds (génération de rapports PDF de fin de mois, calculs des moyennes d’élèves, exports comptables) dans des files d’attente asynchrones (Laravel Queues & Redis).',
          'L’indexation judicieuse des tables relationnelles MySQL permet de maintenir des temps de réponse sous les 150ms même avec des millions de lignes d’écritures.',
        ],
        en: [
          'Enterprise ERPs cannot tolerate stock inconsistencies. Enforcing strict database transactions (`DB::transaction`) with appropriate locking is critical.',
          'Heavy computational tasks like bulk PDF generation or accounting summaries are offloaded to background queues via Redis.',
          'Proper relational index design maintains sub-150ms query response times even across millions of transactional records.',
        ],
      },
    },
    {
      id: 'post-3',
      title: {
        fr: 'Sécuriser l’intégration des paiements Mobile Money (MTN MoMo & Moov) dans vos applications',
        en: 'Securing West African Mobile Money payment gateways (MTN MoMo & Moov)',
      },
      category: 'Fintech / APIs',
      date: '15 Août 2026',
      author: 'Denis ASSOGBA',
      readTime: '6 min de lecture',
      commentsCount: 4,
      image: projectSchool,
      excerpt: {
        fr: 'Bonnes pratiques pour fiabiliser les webhooks, prévenir la double dépense et assurer des réconciliations bancaires automatiques.',
        en: 'Best practices for verifying cryptographic webhook signatures, preventing double-spending, and automating ledger reconciliations.',
      },
      content: {
        fr: [
          'En Afrique de l’Ouest, le Mobile Money est le roi incontesté des transactions digitales. Pourtant, de nombreux développeurs négligent la gestion des erreurs réseau et la vérification des signatures cryptographiques.',
          'L’implémentation d’une clé d’idempotence sur chaque tentative de débit garantit qu’un client ne sera jamais prélevé deux fois en cas de délai de transmission.',
          'Les webhooks entrants doivent obligatoirement être vérifiés par signature HMAC et enregistrés dans un journal d’audit inaltérable avant toute validation de commande.',
        ],
        en: [
          'Mobile Money is the cornerstone of digital commerce in West Africa. Robust integration requires strict cryptographic verification and network resiliency.',
          'Idempotency keys prevent double-charging during mobile network latency.',
          'Incoming provider webhooks must be verified using HMAC signatures and logged into an immutable audit trail before confirming user orders.',
        ],
      },
    },
  ] as BlogPost[],
};

