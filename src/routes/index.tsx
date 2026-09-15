import { useEffect, useRef, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioQuery, fallbackPortfolio } from "@/lib/portfolio";
import projectBmb from "@/assets/project-bmb.jpg";
import projectSchool from "@/assets/project-school.jpg";
import stockAsset from "@/assets/project-stock-reference.jpg.asset.json";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    try {
      return await context.queryClient.ensureQueryData(portfolioQuery);
    } catch {
      // Le contenu se rechargera côté client ; la page reste affichable.
      return fallbackPortfolio;
    }
  },
  head: () => ({ meta: [
    { title: "Denis ASSOGBA — Développeur Web & Mobile" },
    { name: "description", content: "Portfolio de Denis ASSOGBA, développeur de solutions web, mobiles et métiers." },
    { property: "og:title", content: "Denis ASSOGBA — Développeur Web & Mobile" },
    { property: "og:description", content: "Applications utiles, interfaces fortes et solutions métiers sur mesure." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PortfolioPage,
});

const projectImages = [projectBmb, projectSchool, stockAsset.url];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { node.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function PortfolioPage() {
  const { data } = useQuery(portfolioQuery);
  const { profile, entries } = data ?? fallbackPortfolio;
  const projects = entries.filter((item) => item.type === "project");
  const skills = entries.filter((item) => item.type === "skill");
  const experiences = entries.filter((item) => item.type === "experience");
  const education = entries.filter((item) => item.type === "education");
  const testimonials = entries.filter((item) => item.type === "testimonial");

  return <main className="bg-background text-foreground">
    <header className="site-header">
      <a href="#accueil" className="brand" aria-label="Retour à l’accueil"><span>DA</span><strong>Denis Assogba</strong></a>
      <nav aria-label="Navigation principale"><a href="#projets">Projets</a><a href="#expertises">Expertises</a><a href="#parcours">Parcours</a></nav>
      <Button asChild variant="ink"><a href="#contact">Parlons de votre projet <ArrowUpRight /></a></Button>
    </header>

    <section id="accueil" className="hero-shell">
      <div className="hero-copy">
        <p className="eyebrow"><span /> {profile.name} · {profile.availability}</p>
        <h1>Je crée des<br /><em>expériences digitales</em><br />qui comptent.</h1>
        <div className="hero-bottom"><p>{profile.tagline}</p><a href="#projets" aria-label="Voir les projets"><ArrowDownRight /></a></div>
      </div>
      <div className="hero-showcase">
        <div className="hero-orbit">WEB · MOBILE · PRODUIT ·</div>
        <div className="hero-device"><img src={stockAsset.url} alt="Interface d’une application de gestion conçue par Denis Assogba" /></div>
        <span className="hero-note">Des outils clairs.<br />Des résultats concrets.</span>
      </div>
      <p className="hero-role">DENIS ASSOGBA — {profile.role}<br /><span><MapPin /> {profile.location}</span></p>
    </section>

    <div className="ticker"><div>{[0,1].map((copy) => <span key={copy}>APPLICATIONS WEB <b>✦</b> MOBILE <b>✦</b> API & MÉTIER <b>✦</b> EXPÉRIENCE UTILISATEUR <b>✦</b></span>)}</div></div>

    <section id="apropos" className="editorial-section about-grid">
      <Reveal><p className="section-kicker">01 / À propos</p><h2>Je transforme<br />les besoins en <em>produits.</em></h2></Reveal>
      <Reveal className="about-copy"><p>Je suis <strong>{profile.name}</strong>, {profile.role.toLowerCase()}. Je conçois des solutions qui associent compréhension métier, architecture solide et interfaces simples à utiliser.</p><div className="location"><MapPin /> Basé au {profile.location}</div></Reveal>
    </section>

    <section id="projets" className="projects-band">
      <div className="editorial-section">
        <Reveal className="section-head"><div><p className="section-kicker">02 / Sélection</p><h2>Projets qui<br /><em>parlent d’eux-mêmes.</em></h2></div><p>{String(projects.length).padStart(2,"0")} réalisations choisies</p></Reveal>
        <div className="projects-list">{projects.map((project, index) => <Reveal key={project.id}><article className={`work-card work-${index + 1}`}>
          <div className="work-image"><img src={projectImages[index % projectImages.length]} alt={`Aperçu du projet ${project.title}`} loading={index === 0 ? "eager" : "lazy"} /><span>{project.period}</span></div>
          <div className="work-info"><p>0{index + 1} / {project.subtitle}</p><h3>{project.title}</h3><p>{project.description}</p>{project.link && <a href={project.link} aria-label={`Voir ${project.title}`}><ArrowUpRight /></a>}</div>
        </article></Reveal>)}</div>
      </div>
    </section>

    <section id="expertises" className="editorial-section">
      <Reveal className="section-head"><div><p className="section-kicker">03 / Savoir-faire</p><h2>De l’idée au<br /><em>produit fini.</em></h2></div></Reveal>
      <div className="skills-grid">{skills.map((skill, index) => <Reveal key={skill.id}><article><span>0{index + 1}</span><p>{skill.subtitle}</p><h3>{skill.title}</h3><p>{skill.description}</p></article></Reveal>)}</div>
    </section>

    <section id="parcours" className="journey-band"><div className="editorial-section">
      <Reveal><p className="section-kicker">04 / Parcours</p><h2>Construire.<br /><em>Apprendre.</em> Évoluer.</h2></Reveal>
      <div className="journey-list">{experiences.map((item, index) => <Reveal key={item.id}><article><span>0{index + 1}</span><p>{item.period}</p><div><h3>{item.title}</h3><p>{item.description}</p></div></article></Reveal>)}</div>
    </div></section>

    {education.length > 0 && <section className="editorial-section"><Reveal><p className="section-kicker">05 / Formation</p><h2>Une base solide,<br /><em>toujours en mouvement.</em></h2></Reveal><div className="simple-grid">{education.map((item) => <article key={item.id}><span>{item.period}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>}
    {testimonials.length > 0 && <section className="quotes-band"><div className="editorial-section"><p className="section-kicker">06 / Témoignages</p>{testimonials.map((item) => <blockquote key={item.id}>“{item.description}”<footer>{item.title} — {item.subtitle}</footer></blockquote>)}</div></section>}

    <section id="contact" className="contact-band"><div className="editorial-section contact-inner"><p className="section-kicker">Un projet en tête ?</p><h2>Créons quelque chose<br /><em>d’utile et mémorable.</em></h2><Button asChild variant="coral"><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight /></a></Button><div><a href={profile.linkedin}>LinkedIn ↗</a>{profile.github && <a href={profile.github}>GitHub ↗</a>}</div></div></section>
    <footer className="site-footer"><span>© 2026 {profile.name}</span><span>{profile.location}</span><a href="/admin/login">Administration</a></footer>
  </main>;
}