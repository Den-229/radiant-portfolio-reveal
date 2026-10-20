import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Globe,
  ArrowRight
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { addContactMessage } from '@/lib/storage';

interface ContactSectionProps {
  lang: 'fr' | 'en';
  prefilledSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, prefilledSubject = '' }) => {
  const { profile } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: prefilledSubject,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    addContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Projet digital',
      message: formData.message,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Bonjour Denis ASSOGBA,\n\nJe vous contacte depuis votre portfolio :\nNom : ${formData.name || 'Visiteur'}\nEmail : ${formData.email || ''}\nSujet : ${formData.subject || 'Projet digital'}\nMessage : ${formData.message}`
    );
    window.open(`https://wa.me/2290196000000?text=${text}`, '_blank');
  };

  const contactBoxes = [
    {
      icon: MapPin,
      title: { fr: 'Adresse / Localisation', en: 'Address' },
      value: profile.location,
      sub: 'Disponible en Remote',
    },
    {
      icon: Phone,
      title: { fr: 'Téléphone / WhatsApp', en: 'Contact Number' },
      value: '+229 01 96 00 00 00',
      isLink: true,
      href: profile.whatsapp,
    },
    {
      icon: Mail,
      title: { fr: 'Adresse Email', en: 'Email Address' },
      value: profile.email,
      isEmail: true,
    },
    {
      icon: Globe,
      title: { fr: 'Profil LinkedIn & Code', en: 'Professional Network' },
      value: 'linkedin.com/in/denisassogba',
      isLink: true,
      href: profile.linkedin,
    },
  ];

  return (
    <section id="contact-section" className="py-24 bg-slate-50 dark:bg-[#0b1120] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Clyde Heading Section */}
        <div className="heading-section text-center mb-16">
          <span className="subheading">{lang === 'fr' ? 'Me Contacter' : 'Contact us'}</span>
          <h2>{lang === 'fr' ? 'Vous Avez un Projet ?' : 'Have a Project?'}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Discutons ensemble de vos besoins, de vos délais et concevons la solution idéale.'
              : 'Let’s discuss your requirements, milestones, and build the right software solution.'}
          </p>
        </div>

        {/* 4 Clyde Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactBoxes.map((box, idx) => {
            const Icon = box.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-md dark:shadow-none"
              >
                <div className="w-14 h-14 rounded-full bg-sky-50 dark:bg-slate-900 border border-sky-100 dark:border-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  {box.title[lang]}
                </h4>
                {box.isLink ? (
                  <a
                    href={box.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate max-w-[200px]"
                  >
                    {box.value}
                  </a>
                ) : box.isEmail ? (
                  <a
                    href={`mailto:${box.value}`}
                    className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate max-w-[200px]"
                  >
                    {box.value}
                  </a>
                ) : (
                  <span className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">
                    {box.value}
                  </span>
                )}
                {box.sub && (
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 block">{box.sub}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* 2-Column: Portrait on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Clyde Portrait Frame (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-hidden shadow-md dark:shadow-none">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-1 block">
                {lang === 'fr' ? 'Échange Direct' : 'Direct Conversation'}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {lang === 'fr' ? 'Prêt à démarrer ?' : 'Ready to build?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === 'fr'
                  ? 'Pour une estimation rapide ou convenir d’un appel téléphonique, vous pouvez également me joindre directement sur WhatsApp.'
                  : 'For a quick evaluation or to schedule a direct call, feel free to reach me on WhatsApp.'}
              </p>
            </div>

            <div className="my-6 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 aspect-[4/3] flex items-end justify-center border border-slate-200 dark:border-slate-800">
              <img
                src={profile.portrait}
                alt={profile.name}
                className="h-full object-contain object-bottom filter contrast-105"
              />
            </div>

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Discuter sur WhatsApp' : 'Chat on WhatsApp'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111827] p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center shadow-md dark:shadow-none">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {lang === 'fr' ? 'Message envoyé avec succès !' : 'Message Sent!'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  {lang === 'fr'
                    ? 'Merci de m’avoir contacté. Je prends connaissance de votre message et je vous réponds rapidement.'
                    : 'Thank you for reaching out. I will review your message and get back to you shortly.'}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {lang === 'fr' ? 'Envoyer un autre message' : 'Send another note'}
                  </button>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    {lang === 'fr' ? 'Votre Nom *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Jean Martin"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    {lang === 'fr' ? 'Votre Email *' : 'Your Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vous@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    {lang === 'fr' ? 'Sujet du Projet' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Ex: Application mobile BMB, Gestion scolaire..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    {lang === 'fr' ? 'Message *' : 'Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'fr' ? 'Décrivez votre besoin, vos objectifs ou vos délais...' : 'Describe your project, objectives, or timeline...'}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-sky-500 focus:outline-none resize-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? (lang === 'fr' ? 'Envoi...' : 'Sending...') : (lang === 'fr' ? 'Envoyer le message' : 'Send Message')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
