import { useState, type FormEvent } from "react";
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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const { error: authError } = await supabase.auth.signInWithPassword({ email: String(form.get("email") ?? ""), password: String(form.get("password") ?? "") });
    setBusy(false);
    if (authError) { setError("Email ou mot de passe incorrect."); return; }
    await navigate({ to: "/admin" });
  }

  return <main className="admin-auth"><section>
    <a href="/" className="brand"><span>DA</span><strong>Denis.</strong></a>
    <p className="eyebrow">Espace privé</p><h1>Gérer mon <span>portfolio</span></h1>
    <form onSubmit={submit}><label>Email<Input name="email" type="email" required autoComplete="email" /></label><label>Mot de passe<Input name="password" type="password" required autoComplete="current-password" /></label><Button variant="ink" disabled={busy}>{busy ? "Connexion…" : <>Se connecter <LogIn /></>}</Button>{error && <p role="alert">{error}</p>}</form>
    <div className="auth-divider"><span>ou</span></div>
    <Button variant="outline" onClick={() => lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin/login` })}>Continuer avec Google</Button>
  </section></main>;
}