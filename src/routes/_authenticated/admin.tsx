import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ImagePlus, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"portfolio_profile">;
type Entry = Tables<"portfolio_entries">;
type Message = Tables<"contact_messages">;

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    const { data } = await supabase.from("user_roles").select("role").eq("role", "admin").maybeSingle();
    if (!data) throw redirect({ to: "/admin/login" });
  },
  head: () => ({ meta: [
    { title: "Tableau de bord — Denis ASSOGBA" },
    { name: "description", content: "Gestion privée du portfolio de Denis ASSOGBA." },
    { property: "og:title", content: "Tableau de bord — Denis ASSOGBA" },
    { property: "og:description", content: "Gestion privée du portfolio." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notice, setNotice] = useState("");

  async function load() {
    const [p, e, m] = await Promise.all([
      supabase.from("portfolio_profile").select("*").eq("id", 1).single(),
      supabase.from("portfolio_entries").select("*").order("sort_order"),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    if (p.data) setProfile(p.data); if (e.data) setEntries(e.data); if (m.data) setMessages(m.data);
  }
  useEffect(() => { void load(); }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!profile) return;
    const { error } = await supabase.from("portfolio_profile").update(profile).eq("id", 1);
    setNotice(error ? "La bio n’a pas pu être enregistrée." : "Bio et coordonnées enregistrées.");
  }
  async function upload(file: File, kind: "profile" | "entry", id?: number) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${kind}/${kind === "profile" ? "main" : id}-${Date.now()}.${extension}`;
    const { error } = await supabase.storage.from("portfolio-media").upload(path, file, { upsert: true });
    if (error) { setNotice("La photo n’a pas pu être envoyée."); return; }
    if (kind === "profile") await supabase.from("portfolio_profile").update({ photo_path: path }).eq("id", 1);
    else if (id !== undefined) await supabase.from("portfolio_entries").update({ image_path: path }).eq("id", id);
    setNotice("Photo mise à jour."); await load();
  }
  async function saveEntry(entry: Entry) {
    const { error } = await supabase.from("portfolio_entries").update(entry).eq("id", entry.id);
    setNotice(error ? "Modification non enregistrée." : "Élément enregistré.");
  }
  async function addEntry() {
    const { error } = await supabase.from("portfolio_entries").insert({ type: "project", title: "Nouveau projet", sort_order: entries.length + 1 });
    setNotice(error ? "Ajout impossible." : "Nouveau projet ajouté."); await load();
  }
  async function removeEntry(id: number) {
    if (!window.confirm("Supprimer cet élément ?")) return;
    await supabase.from("portfolio_entries").delete().eq("id", id); await load();
  }
  function patchEntry(id: number, patch: Partial<Entry>) { setEntries((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item)); }

  return <main className="admin-page"><header className="admin-header"><a href="/" className="brand"><span>DA</span><strong>Administration</strong></a><div><Button asChild variant="ghost" size="sm"><a href="/"><ArrowLeft /> Voir le portfolio</a></Button><Button variant="outline" size="sm" onClick={async () => { await supabase.auth.signOut(); await navigate({ to: "/admin/login", replace: true }); }}><LogOut /> Déconnexion</Button></div></header>
    <section className="admin-shell"><div className="admin-intro"><div><p className="eyebrow">Tableau de bord</p><h1>Bonjour Denis.</h1></div><p role="status">{notice}</p></div>
    <Tabs defaultValue="profile"><TabsList><TabsTrigger value="profile">Bio & contact</TabsTrigger><TabsTrigger value="content">Contenus</TabsTrigger><TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger></TabsList>
      <TabsContent value="profile">{profile && <form className="admin-form" onSubmit={saveProfile}><div className="admin-fields"><label>Nom<Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></label><label>Métier<Input value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} /></label><label className="wide">Bio<Textarea rows={4} value={profile.tagline} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} /></label><label>Localisation<Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} /></label><label>Email public<Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></label><label>Disponibilité<Input value={profile.availability} onChange={(e) => setProfile({ ...profile, availability: e.target.value })} /></label><label>LinkedIn<Input value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} /></label><label>GitHub<Input value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} /></label></div><label className="file-control"><ImagePlus /> Remplacer ma photo<Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file, "profile"); }} /></label><Button variant="ink"><Save /> Enregistrer</Button></form>}</TabsContent>
      <TabsContent value="content"><div className="admin-section-head"><h2>Projets, services et parcours</h2><Button variant="ink" onClick={addEntry}><Plus /> Ajouter</Button></div><div className="entry-list">{entries.map((entry) => <article className="entry-editor" key={entry.id}><div className="entry-editor-head"><select value={entry.type} onChange={(e) => patchEntry(entry.id, { type: e.target.value })}><option value="project">Projet</option><option value="skill">Service</option><option value="experience">Expérience</option><option value="education">Formation</option><option value="testimonial">Témoignage</option></select><div><Button size="icon" variant="ghost" aria-label="Enregistrer" onClick={() => saveEntry(entry)}><Save /></Button><Button size="icon" variant="ghost" aria-label="Supprimer" onClick={() => removeEntry(entry.id)}><Trash2 /></Button></div></div><div className="admin-fields"><label>Titre<Input value={entry.title} onChange={(e) => patchEntry(entry.id, { title: e.target.value })} /></label><label>Sous-titre<Input value={entry.subtitle} onChange={(e) => patchEntry(entry.id, { subtitle: e.target.value })} /></label><label>Période<Input value={entry.period} onChange={(e) => patchEntry(entry.id, { period: e.target.value })} /></label><label>Lien<Input value={entry.link} onChange={(e) => patchEntry(entry.id, { link: e.target.value })} /></label><label className="wide">Description<Textarea value={entry.description} onChange={(e) => patchEntry(entry.id, { description: e.target.value })} /></label></div>{entry.type === "project" && <label className="file-control"><ImagePlus /> Photo du projet<Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file, "entry", entry.id); }} /></label>}</article>)}</div></TabsContent>
      <TabsContent value="messages"><div className="message-list">{messages.length === 0 ? <p>Aucun message pour le moment.</p> : messages.map((message) => <article key={message.id}><header><div><strong>{message.name}</strong><a href={`mailto:${message.email}`}>{message.email}</a></div><time>{new Date(message.created_at).toLocaleDateString("fr-FR")}</time></header><h3>{message.subject || "Nouveau projet"}</h3><p>{message.message}</p><Button asChild variant="outline" size="sm"><a href={`mailto:${message.email}`}>Répondre</a></Button></article>)}</div></TabsContent>
    </Tabs></section></main>;
}