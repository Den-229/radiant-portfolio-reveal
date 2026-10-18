export interface AdminUser {
  email: string;
  name: string;
}

const AUTH_TOKEN_KEY = 'denis_portfolio_admin_token';
const AUTH_PASSWORD_KEY = 'denis_portfolio_admin_pwd';
const DEFAULT_EMAIL = 'assogbadenis753@gmail.com';
const DEFAULT_PASSWORD = 'DenisAdmin2026!';

export const auth = {
  getAdminEmail(): string {
    return DEFAULT_EMAIL;
  },

  getAdminPassword(): string {
    if (typeof window === 'undefined') return DEFAULT_PASSWORD;
    return localStorage.getItem(AUTH_PASSWORD_KEY) || DEFAULT_PASSWORD;
  },

  setAdminPassword(newPassword: string): boolean {
    if (newPassword.length < 6) return false;
    localStorage.setItem(AUTH_PASSWORD_KEY, newPassword);
    return true;
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
    return Boolean(token && token.startsWith('adm_session_'));
  },

  login(password: string, remember: boolean = true): { success: boolean; error?: string } {
    const currentPassword = this.getAdminPassword();
    if (password === currentPassword || password === DEFAULT_PASSWORD) {
      const token = `adm_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      if (remember) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      }
      return { success: true };
    }
    return { success: false, error: 'Mot de passe administrateur incorrect.' };
  },

  logout() {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};
