import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [
    { title: "Connexion administration — Denis ASSOGBA" },
    { name: "description", content: "Accès sécurisé à l’administration du portfolio de Denis ASSOGBA." },
    { property: "og:title", content: "Connexion administration — Denis ASSOGBA" },
    { property: "og:description", content: "Accès sécurisé à l’administration du portfolio." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [notice, setNotice] = useState("");

  async function enterAdmin() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;
    const { data: role, error: roleError } = await supabase.from("user_roles").select("role").eq("user_id", auth.user.id).eq("role", "admin").maybeSingle();
    if (roleError || !role) {
      setError("Ce compte n’a pas accès à l’administration. Utilisez votre compte Google administrateur.");
      await supabase.auth.signOut();
      return;
    }
    await navigate({ to: "/admin" });
  }

  useEffect(() => { void enterAdmin(); }, []);

  async function googleLogin() {
    setBusy(true); setError(""); setNotice("");
    try {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin/login` });
      if (result.error) { setError("La connexion Google n’a pas abouti. Réessayez."); return; }
      if (result.redirected) return;
      await enterAdmin();
    } catch {
      setError("La connexion Google est momentanément indisponible.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setNotice("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    try {
      if (mode === "signup") {
        const { error: authError } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin/login` } });
        if (authError) { setError(authError.code === "weak_password" ? "Choisissez un mot de passe plus sûr, d’au moins 8 caractères." : "La création du compte n’a pas abouti. Réessayez ou utilisez Google."); return; }
        setNotice("Consultez votre boîte mail et confirmez votre adresse, puis revenez vous connecter. Seul le compte administrateur autorisé pourra accéder au portfolio.");
        setMode("login");
        return;
      }
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setError(authError.code === "email_not_confirmed" ? "Confirmez votre adresse grâce au lien reçu par email avant de vous connecter." : "Email ou mot de passe incorrect. Si vous n’avez pas encore de compte, créez-le ci-dessous."); return; }
      await enterAdmin();
    } catch {
      setError("La connexion est momentanément indisponible. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="admin-auth"><section>
    <a href="/" className="brand"><span>DA</span><strong>Denis.</strong></a>
    <p className="eyebrow">Espace privé</p><h1>Gérer mon <span>portfolio</span></h1>
    <form onSubmit={submit}><label>Email<Input name="email" type="email" required autoComplete="email" /></label><label>Mot de passe<Input name="password" type="password" required minLength={mode === "signup" ? 8 : undefined} autoComplete={mode === "signup" ? "new-password" : "current-password"} /></label><Button variant="ink" disabled={busy}>{busy ? "Veuillez patienter…" : <>{mode === "signup" ? "Créer mon compte" : "Se connecter"} <LogIn /></>}</Button></form>
    {error && <p role="alert">{error}</p>}
    {notice && <p role="status">{notice}</p>}
    <Button variant="link" disabled={busy} onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setNotice(""); }}>{mode === "login" ? "Créer mon compte avec un mot de passe" : "J’ai déjà un compte"}</Button>
    <div className="auth-divider"><span>ou</span></div>
    <Button variant="outline" disabled={busy} onClick={googleLogin}>Continuer avec Google</Button>
  </section></main>;
}