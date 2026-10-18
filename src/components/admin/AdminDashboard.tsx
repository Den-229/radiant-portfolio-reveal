import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  LogOut, 
  User, 
  Briefcase, 
  Layers, 
  BookOpen, 
  Mail, 
  Settings, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Shield,
  Eye,
  KeyRound,
  Download,
  RotateCcw,
  Quote,
  Star
} from 'lucide-react';
import { 
  getInitialStoreData, 
  saveStoreData, 
  resetToDefaults, 
  PortfolioStoreData, 
  ContactMessage 
} from '@/lib/storage';
import { auth } from '@/lib/auth';
import { Project, BlogPost, Testimonial } from '@/data/portfolioData';

interface AdminDashboardProps {
  onBackToPortfolio: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToPortfolio, onLogout }) => {
  const [data, setData] = useState<PortfolioStoreData>(getInitialStoreData());
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'services' | 'blog' | 'testimonials' | 'messages' | 'settings'>('profile');
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Project editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Blog editing state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  // Testimonial editing state
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState(false);

  // Security password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const handleDataChange = () => {
      setData(getInitialStoreData());
    };
    window.addEventListener('portfolio-data-changed', handleDataChange);
    return () => window.removeEventListener('portfolio-data-changed', handleDataChange);
  }, []);

  const showNotice = (text: string, type: 'success' | 'error' = 'success') => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoreData(data);
    showNotice('Profil et coordonnées mis à jour avec succès !');
  };

  // Projects CRUD
  const handleOpenAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'Nouveau Projet',
      category: 'mobile',
      categoryLabel: { fr: 'Application Mobile', en: 'Mobile App' },
      badge: 'En cours',
      subtitle: 'Flutter · API REST',
      description: {
        fr: 'Description du nouveau projet...',
        en: 'New project description...',
      },
      features: {
        fr: ['Fonctionnalité 1', 'Fonctionnalité 2'],
        en: ['Feature 1', 'Feature 2'],
      },
      technologies: ['Flutter', 'Dart', 'REST API'],
      image: data.projects[0]?.image || '',
      featured: true,
      metrics: [
        { label: 'Performances', value: '60 FPS' },
        { label: 'Utilisateurs', value: '1 000+' },
      ],
      demoUrl: 'https://github.com/Den-229',
      githubUrl: 'https://github.com/Den-229',
    };
    setEditingProject(newProj);
    setIsNewProject(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    let updatedProjects = [...data.projects];
    if (isNewProject) {
      updatedProjects = [editingProject, ...updatedProjects];
    } else {
      updatedProjects = updatedProjects.map((p) => (p.id === editingProject.id ? editingProject : p));
    }
    const updated = { ...data, projects: updatedProjects };
    setData(updated);
    saveStoreData(updated);
    setEditingProject(null);
    showNotice(isNewProject ? 'Nouveau projet ajouté au portfolio !' : 'Projet mis à jour !');
  };

  const handleDeleteProject = (id: string) => {
    if (!window.confirm('Supprimer définitivement ce projet ?')) return;
    const updatedProjects = data.projects.filter((p) => p.id !== id);
    const updated = { ...data, projects: updatedProjects };
    setData(updated);
    saveStoreData(updated);
    showNotice('Projet supprimé du portfolio.');
  };

  // Blog CRUD
  const handleOpenAddPost = () => {
    const newArticle: BlogPost = {
      id: `post-${Date.now()}`,
      title: {
        fr: 'Nouvel article technique',
        en: 'New technical article',
      },
      category: 'Développement Web',
      date: new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
      author: data.profile.name,
      readTime: '4 min',
      commentsCount: 0,
      image: data.blogPosts[0]?.image || '',
      excerpt: {
        fr: 'Résumé de l’article...',
        en: 'Summary of the article...',
      },
      content: {
        fr: ['Premier paragraphe du contenu...'],
        en: ['First paragraph of the article...'],
      },
    };
    setEditingPost(newArticle);
    setIsNewPost(true);
  };

  const handleSavePost = () => {
    if (!editingPost) return;
    let updatedPosts = [...data.blogPosts];
    if (isNewPost) {
      updatedPosts = [editingPost, ...updatedPosts];
    } else {
      updatedPosts = updatedPosts.map((p) => (p.id === editingPost.id ? editingPost : p));
    }
    const updated = { ...data, blogPosts: updatedPosts };
    setData(updated);
    saveStoreData(updated);
    setEditingPost(null);
    showNotice(isNewPost ? 'Nouvel article publié sur le blog !' : 'Article mis à jour !');
  };

  const handleDeletePost = (id: string) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    const updatedPosts = data.blogPosts.filter((p) => p.id !== id);
    const updated = { ...data, blogPosts: updatedPosts };
    setData(updated);
    saveStoreData(updated);
    showNotice('Article supprimé du blog.');
  };

  // Messages Actions
  const handleToggleMessageRead = (id: string) => {
    const updatedMessages = data.messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m));
    const updated = { ...data, messages: updatedMessages };
    setData(updated);
    saveStoreData(updated);
  };

  const handleDeleteMessage = (id: string) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    const updatedMessages = data.messages.filter((m) => m.id !== id);
    const updated = { ...data, messages: updatedMessages };
    setData(updated);
    saveStoreData(updated);
    showNotice('Message supprimé.');
  };

  // Testimonials CRUD
  const handleOpenAddTestimonial = () => {
    const newTest: Testimonial = {
      id: `test-${Date.now()}`,
      name: '',
      role: '',
      company: '',
      rating: 5,
      content: {
        fr: '',
        en: '',
      },
    };
    setEditingTestimonial(newTest);
    setIsNewTestimonial(true);
  };

  const handleSaveTestimonial = () => {
    if (!editingTestimonial) return;
    if (!editingTestimonial.name.trim()) {
      showNotice('Veuillez renseigner le nom du client.', 'error');
      return;
    }
    const frText = editingTestimonial.content?.fr?.trim() || '';
    const enText = editingTestimonial.content?.en?.trim() || '';
    if (!frText && !enText) {
      showNotice('Veuillez renseigner le texte du témoignage.', 'error');
      return;
    }

    const preparedTestimonial: Testimonial = {
      ...editingTestimonial,
      name: editingTestimonial.name.trim(),
      role: editingTestimonial.role.trim() || 'Client',
      company: editingTestimonial.company.trim(),
      rating: Math.max(1, Math.min(5, editingTestimonial.rating || 5)),
      content: {
        fr: frText || enText,
        en: enText || frText,
      },
    };

    let updatedList = [...(data.testimonials || [])];
    if (isNewTestimonial) {
      updatedList = [preparedTestimonial, ...updatedList];
    } else {
      updatedList = updatedList.map((t) => (t.id === preparedTestimonial.id ? preparedTestimonial : t));
    }

    const updated = { ...data, testimonials: updatedList };
    setData(updated);
    saveStoreData(updated);
    setEditingTestimonial(null);
    showNotice(isNewTestimonial ? 'Nouveau témoignage ajouté au portfolio !' : 'Témoignage mis à jour !');
  };

  const handleDeleteTestimonial = (id: string) => {
    const updatedList = (data.testimonials || []).filter((t) => t.id !== id);
    const updated = { ...data, testimonials: updatedList };
    setData(updated);
    saveStoreData(updated);
    showNotice('Témoignage supprimé du portfolio.');
  };

  // Password update
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showNotice('Le mot de passe doit comporter au moins 6 caractères.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotice('Les mots de passe ne correspondent pas.', 'error');
      return;
    }
    auth.setAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    showNotice('Mot de passe administrateur modifié avec succès !');
  };

  // Backup Export
  const handleExportBackup = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `portfolio_backup_denis_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotice('Sauvegarde JSON téléchargée.');
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Voulez-vous vraiment réinitialiser toutes les données aux valeurs d’origine ?')) return;
    const res = resetToDefaults();
    setData(res);
    showNotice('Données réinitialisées aux valeurs initiales.');
  };

  const unreadMessagesCount = data.messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-20">
      
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#0f172a] border-b border-slate-800 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold font-heading text-white">
              Denis<span className="text-sky-400">.</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 text-[11px] font-bold uppercase tracking-wider">
              Administration
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortfolio}
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>Voir le portfolio</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 text-xs font-semibold text-red-300 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* Toast Notice */}
        {notice && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold shadow-lg ${
              notice.type === 'success'
                ? 'bg-emerald-950/90 border border-emerald-500/80 text-emerald-300'
                : 'bg-red-950/90 border border-red-500/80 text-red-300'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{notice.text}</span>
          </div>
        )}

        {/* Welcome & Stats Row */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Gérez en temps réel vos projets, compétences, services, articles et messages reçus.
            </p>
          </div>

          {/* Quick counters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xl font-bold text-sky-400">{data.projects.length}</span>
              <span className="text-[11px] text-slate-400 block font-medium">Projets</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xl font-bold text-emerald-400">{data.messages.length}</span>
              <span className="text-[11px] text-slate-400 block font-medium">
                Messages {unreadMessagesCount > 0 && `(${unreadMessagesCount} non lus)`}
              </span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xl font-bold text-amber-400">{(data.testimonials || []).length}</span>
              <span className="text-[11px] text-slate-400 block font-medium">Témoignages</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xl font-bold text-indigo-400">{data.blogPosts.length}</span>
              <span className="text-[11px] text-slate-400 block font-medium">Articles</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-3">
          {[
            { id: 'profile', label: 'Profil & Bio', icon: User },
            { id: 'projects', label: `Projets (${data.projects.length})`, icon: Briefcase },
            { id: 'services', label: 'Compétences & Services', icon: Layers },
            { id: 'testimonials', label: `Témoignages (${(data.testimonials || []).length})`, icon: Quote },
            { id: 'blog', label: `Blog (${data.blogPosts.length})`, icon: BookOpen },
            { id: 'messages', label: `Messages (${data.messages.length})`, icon: Mail, badge: unreadMessagesCount },
            { id: 'settings', label: 'Sécurité & Sauvegarde', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 relative ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile & Bio */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Informations du profil & Coordonnées
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Nom Complet
                </label>
                <input
                  type="text"
                  value={data.profile.name}
                  onChange={(e) => setData({ ...data, profile: { ...data.profile, name: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Métier / Rôle Principal
                </label>
                <input
                  type="text"
                  value={data.profile.role.fr}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, role: { ...data.profile.role, fr: e.target.value } },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Bio / Tagline de présentation
                </label>
                <textarea
                  rows={3}
                  value={data.profile.tagline.fr}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, tagline: { ...data.profile.tagline, fr: e.target.value } },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Localisation
                </label>
                <input
                  type="text"
                  value={data.profile.location}
                  onChange={(e) => setData({ ...data, profile: { ...data.profile, location: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Statut de disponibilité
                </label>
                <input
                  type="text"
                  value={data.profile.remoteStatus.fr}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: {
                        ...data.profile,
                        remoteStatus: { ...data.profile.remoteStatus, fr: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Email Public
                </label>
                <input
                  type="email"
                  value={data.profile.email}
                  onChange={(e) => setData({ ...data, profile: { ...data.profile, email: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Lien WhatsApp Direct
                </label>
                <input
                  type="text"
                  value={data.profile.whatsapp}
                  onChange={(e) => setData({ ...data, profile: { ...data.profile, whatsapp: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Lien LinkedIn
                </label>
                <input
                  type="text"
                  value={data.profile.linkedin}
                  onChange={(e) => setData({ ...data, profile: { ...data.profile, linkedin: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Lien GitHub
                </label>
                <input
                  type="text"
                  value={data.profile.github}
                  onChange={(e) => setData({ ...data, profile: { ...data.profile, github: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Projects Management */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Gestion des Projets</h2>
                <p className="text-xs text-slate-400">Ajoutez, modifiez ou supprimez des réalisations du portfolio.</p>
              </div>

              <button
                onClick={handleOpenAddProject}
                className="px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un projet</span>
              </button>
            </div>

            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#111827] border border-slate-800 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-sky-400 text-xs font-semibold">
                        {project.categoryLabel.fr}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setIsNewProject(false);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-400"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-xs text-slate-400 font-medium mb-3">{project.subtitle}</p>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {project.description.fr}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Project Editor Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5">
                  <h3 className="text-xl font-bold text-white pb-3 border-b border-slate-800">
                    {isNewProject ? 'Nouveau Projet' : `Modifier "${editingProject.title}"`}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Titre du projet
                      </label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Catégorie
                      </label>
                      <select
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            category: e.target.value as 'mobile' | 'web' | 'erp',
                            categoryLabel: {
                              fr: e.target.value === 'mobile' ? 'Application Mobile' : e.target.value === 'web' ? 'Application Web' : 'ERP & Métier',
                              en: e.target.value === 'mobile' ? 'Mobile App' : e.target.value === 'web' ? 'Web Application' : 'Enterprise ERP',
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                      >
                        <option value="mobile">Application Mobile (Flutter)</option>
                        <option value="web">Application Web & API (Laravel)</option>
                        <option value="erp">ERP & Logiciel Métier (WinDev/Stock)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Sous-titre / Technologies clés
                      </label>
                      <input
                        type="text"
                        value={editingProject.subtitle}
                        onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Description détaillée
                      </label>
                      <textarea
                        rows={3}
                        value={editingProject.description.fr}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            description: { ...editingProject.description, fr: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Technologies (séparées par une virgule)
                      </label>
                      <input
                        type="text"
                        value={editingProject.technologies.join(', ')}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProject}
                      className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase"
                    >
                      Sauvegarder le projet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Skills & Services */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            {/* Services Editor */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 mb-6">
                Services Proposés ({data.services.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.services.map((srv, idx) => (
                  <div key={srv.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-400 uppercase">Service {srv.number}</span>
                    </div>

                    <input
                      type="text"
                      value={srv.title.fr}
                      onChange={(e) => {
                        const updatedSrv = [...data.services];
                        updatedSrv[idx] = { ...srv, title: { ...srv.title, fr: e.target.value } };
                        setData({ ...data, services: updatedSrv });
                      }}
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm font-semibold"
                    />

                    <textarea
                      rows={3}
                      value={srv.description.fr}
                      onChange={(e) => {
                        const updatedSrv = [...data.services];
                        updatedSrv[idx] = { ...srv, description: { ...srv.description, fr: e.target.value } };
                        setData({ ...data, services: updatedSrv });
                      }}
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs resize-none"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    saveStoreData(data);
                    showNotice('Services enregistrés !');
                  }}
                  className="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer les services</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Blog Articles Management */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Articles de Blog</h2>
                <p className="text-xs text-slate-400">Rédigez et publiez des articles techniques sur votre portfolio.</p>
              </div>

              <button
                onClick={handleOpenAddPost}
                className="px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Rédiger un article</span>
              </button>
            </div>

            {/* Blog Post List */}
            <div className="space-y-4">
              {data.blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#111827] border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 text-[10px] font-bold uppercase">
                      {post.category}
                    </span>
                    <h3 className="text-base font-bold text-white">{post.title.fr}</h3>
                    <p className="text-xs text-slate-400">
                      {post.date} • {post.readTime}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setIsNewPost(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Post Editor Modal */}
            {editingPost && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl font-bold text-white pb-3 border-b border-slate-800">
                    {isNewPost ? 'Nouvel Article' : 'Modifier l’article'}
                  </h3>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Titre de l’article
                    </label>
                    <input
                      type="text"
                      value={editingPost.title.fr}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, title: { ...editingPost.title, fr: e.target.value } })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Catégorie
                      </label>
                      <input
                        type="text"
                        value={editingPost.category}
                        onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                        Temps de lecture
                      </label>
                      <input
                        type="text"
                        value={editingPost.readTime}
                        onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Extrait
                    </label>
                    <textarea
                      rows={2}
                      value={editingPost.excerpt.fr}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, excerpt: { ...editingPost.excerpt, fr: e.target.value } })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Contenu de l’article
                    </label>
                    <textarea
                      rows={6}
                      value={editingPost.content.fr.join('\n\n')}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          content: { ...editingPost.content, fr: e.target.value.split('\n\n') },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePost}
                      className="px-5 py-2 rounded-lg bg-sky-500 text-slate-950 font-bold text-xs uppercase"
                    >
                      Sauvegarder l’article
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Testimonials Management */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Quote className="w-5 h-5 text-amber-400" />
                  <span>Témoignages & Avis Clients</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Gérez les retours d’expérience et recommandations affichés sur votre portfolio.
                </p>
              </div>

              <button
                onClick={handleOpenAddTestimonial}
                className="px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un témoignage</span>
              </button>
            </div>

            {/* Testimonials List */}
            {(!data.testimonials || data.testimonials.length === 0) ? (
              <div className="p-12 text-center bg-[#111827] border border-slate-800 rounded-2xl">
                <Quote className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">Aucun témoignage enregistré</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Ajoutez votre premier retour client pour inspirer confiance à vos futurs partenaires.
                </p>
                <button
                  onClick={handleOpenAddTestimonial}
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Ajouter un témoignage
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.testimonials.map((test) => (
                  <div
                    key={test.id}
                    className="bg-[#111827] border border-slate-800 hover:border-slate-700 transition-colors rounded-2xl p-6 flex flex-col justify-between shadow-md"
                  >
                    <div>
                      {/* Top rating & actions */}
                      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
                        <div className="flex items-center gap-1">
                          {[...Array(Math.max(1, Math.min(5, test.rating || 5)))].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-[11px] font-bold text-amber-400/90 ml-1">
                            {test.rating || 5}/5
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingTestimonial(test);
                              setIsNewTestimonial(false);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            title="Modifier ce témoignage"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(test.id)}
                            className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-400 transition-colors"
                            title="Supprimer ce témoignage"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* French Quote */}
                      <div className="space-y-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded">
                          Français
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/70">
                          &ldquo;{test.content?.fr || test.content?.en || ''}&rdquo;
                        </p>
                      </div>

                      {/* English Quote (if different) */}
                      {Boolean(test.content?.en && test.content.en !== test.content.fr) && (
                        <div className="space-y-1 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                            English
                          </span>
                          <p className="text-xs text-slate-400 italic leading-relaxed p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/50">
                            &ldquo;{test.content.en}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Author details */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3 mt-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow">
                        {(test.name || 'C').trim().charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-sm font-bold text-white truncate">
                          {test.name}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">
                          {test.role} {test.company ? `· ${test.company}` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonial Editor Modal */}
            {editingTestimonial && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <Quote className="w-5 h-5 text-sky-400" />
                      <span>{isNewTestimonial ? 'Nouveau Témoignage' : 'Modifier le Témoignage'}</span>
                    </h3>
                    <button
                      onClick={() => setEditingTestimonial(null)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Client Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Nom complet du client / signataire *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Paul Agbossou, Directeur Général"
                      value={editingTestimonial.name}
                      onChange={(e) =>
                        setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  {/* Role & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                        Poste / Fonction
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Administration Scolaire"
                        value={editingTestimonial.role}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                        Entreprise / Institution
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Complexe Scolaire Privé"
                        value={editingTestimonial.company}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Rating selection (Interactive stars) */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                      Note attribuée (1 à 5 étoiles)
                    </label>
                    <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((starValue) => {
                          const isFilled = (editingTestimonial.rating || 5) >= starValue;
                          return (
                            <button
                              key={starValue}
                              type="button"
                              onClick={() =>
                                setEditingTestimonial({ ...editingTestimonial, rating: starValue })
                              }
                              className="p-1 hover:scale-110 transition-transform"
                              title={`Attribuer ${starValue} étoile(s)`}
                            >
                              <Star
                                className={`w-6 h-6 transition-colors ${
                                  isFilled
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-600 hover:text-amber-300'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-xs font-bold text-amber-400 ml-2">
                        {editingTestimonial.rating || 5} / 5 étoiles
                      </span>
                    </div>
                  </div>

                  {/* French Content */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Texte du Témoignage (Français) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Ex: Denis a conçu pour notre établissement un système de gestion des notes et bulletins d'une efficacité redoutable..."
                      value={editingTestimonial.content?.fr || ''}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          content: {
                            ...editingTestimonial.content,
                            fr: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  {/* English Content */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase text-slate-400">
                        Texte du Témoignage (Anglais - Optionnel)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingTestimonial.content?.fr) {
                            setEditingTestimonial({
                              ...editingTestimonial,
                              content: {
                                ...editingTestimonial.content,
                                en: editingTestimonial.content.fr,
                              },
                            });
                          }
                        }}
                        className="text-[11px] text-sky-400 hover:text-sky-300 underline"
                      >
                        Copier depuis le français
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Ex: Denis engineered a grade computation and report card platform that revolutionized our school operations..."
                      value={editingTestimonial.content?.en || ''}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          content: {
                            ...editingTestimonial.content,
                            en: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="pt-4 border-t border-slate-800 flex justify-end items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveTestimonial}
                      className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      Enregistrer le témoignage
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Contact Messages Inbox */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Boîte de Réception</h2>
                <p className="text-xs text-slate-400">
                  Messages reçus via le formulaire de contact du portfolio.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                {data.messages.length} message(s)
              </span>
            </div>

            {data.messages.length === 0 ? (
              <div className="p-12 text-center bg-[#111827] border border-slate-800 rounded-2xl">
                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">Aucun message pour le moment</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Les messages envoyés depuis le portfolio s’afficheront directement ici.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      msg.read
                        ? 'bg-[#111827] border-slate-800'
                        : 'bg-slate-900 border-sky-500/50 shadow-md'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{msg.name}</h4>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full bg-sky-500 text-slate-950 text-[10px] font-bold uppercase">
                              Nouveau
                            </span>
                          )}
                        </div>
                        <a href={`mailto:${msg.email}`} className="text-xs text-sky-400 hover:underline">
                          {msg.email}
                        </a>
                      </div>

                      <span className="text-xs text-slate-500 font-mono">
                        {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-300">
                        Sujet : <span className="text-white">{msg.subject || 'Projet digital'}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        {msg.message}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject || 'Votre projet')}`}
                          className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Répondre par email</span>
                        </a>

                        <button
                          onClick={() => handleToggleMessageRead(msg.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium"
                        >
                          {msg.read ? 'Marquer non lu' : 'Marquer comme lu'}
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                        title="Supprimer le message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Security & Settings */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Password change */}
            <form onSubmit={handleUpdatePassword} className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 mb-2 pb-3 border-b border-slate-800">
                <KeyRound className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Changer le mot de passe</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmer à l'identique"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Mettre à jour le mot de passe
              </button>
            </form>

            {/* Backup & Reset */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <Shield className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Sauvegarde & Restauration</h3>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-300 mb-1">
                  Exporter les données (Backup JSON)
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Téléchargez l’intégralité de vos projets, bio, messages et articles en un fichier JSON.
                </p>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Exporter la sauvegarde</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase text-red-400 mb-1">
                  Réinitialiser aux valeurs d’origine
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Restaure les projets et contenus initiaux de Denis ASSOGBA.
                </p>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-4 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-xs font-semibold text-red-300 flex items-center gap-2 border border-red-800/60"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Réinitialiser les données</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
