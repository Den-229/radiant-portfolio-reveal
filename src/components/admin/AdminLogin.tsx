import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';
import { auth } from '@/lib/auth';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToPortfolio: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToPortfolio }) => {
  const [email, setEmail] = useState(auth.getAdminEmail());
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = auth.login(password, remember);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Identifiants incorrects.');
        setLoading(false);
      }
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setPassword(auth.getAdminPassword());
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center px-4 py-12">
      {/* Background ambient lighting */}
      <div className="w-full max-w-md">
        
        {/* Back Link */}
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au portfolio public</span>
        </button>

        {/* Login Box */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-800/80 text-sky-400 flex items-center justify-center mx-auto mb-3 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-white">
              Espace Administrateur
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Gestion dynamique du portfolio de Denis ASSOGBA
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                Identifiant Administrateur
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase text-slate-400">
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Remplir (DenisAdmin2026!)</span>
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-700 text-sky-500 focus:ring-0 bg-slate-900"
                />
                <span>Mémoriser ma session</span>
              </label>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-2"
            >
              {loading ? 'Connexion en cours...' : 'Accéder au Tableau de Bord'}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500">
              Accès protégé par jeton de session chiffré. Réservé à Denis ASSOGBA.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
