import { useEffect, useRef, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Github,
  Linkedin,
  MapPin,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { portfolioQuery, fallbackPortfolio } from "@/lib/portfolio";
import projectBmb from "@/assets/project-bmb.jpg";
import projectSchool from "@/assets/project-school.jpg";
import stockAsset from "@/assets/project-stock-reference.jpg.asset.json";
import portraitAsset from "@/assets/denis-portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    try {
      return await context.queryClient.ensureQueryData(portfolioQuery);
    } catch {
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
const serviceIcons = [Code2, Smartphone, Database];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        node.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return <div className="section-title"><p>{eyebrow}</p><h2>{children}</h2></div>;
}

function PortfolioPage() {
  const loaderData = Route.useLoaderData();
  const { data } = useQuery({ ...portfolioQuery, initialData: loaderData });
  const { profile, entries } = data ?? fallbackPortfolio;
  const projects = entries.filter((item) => item.type === "project");
  const skills = entries.filter((item) => item.type === "skill");
  const experiences = entries.filter((item) => item.type === "experience");
  const education = entries.filter((item) => item.type === "education");
  const testimonials = entries.filter((item) => item.type === "testimonial");
  const portrait = profile.photo_path || portraitAsset.url;

  return <main className="portfolio-page">
    <header className="site-header">
      <a href="#accueil" className="brand" aria-label="Retour à l’accueil"><span>DA</span><strong>Denis.</strong></a>
      <nav aria-label="Navigation principale"><a href="#accueil">Accueil</a><a href="#apropos">À propos</a><a href="#projets">Projets</a><a href="#services">Services</a><a href="#contact">Contact</a></nav>
       <Button asChild variant="ink"><a href="#contact">Écrivez-moi <ArrowUpRight /></a></Button>
    </header>

    <section id="accueil" className="hero-shell">
      <div className="hero-copy">
        <p className="eyebrow">{profile.name}</p>
        <h1>Salut ! Je suis Denis.<span>Développeur Full Stack</span></h1>
        <p className="hero-text">{profile.tagline}</p>
        <div className="hero-actions">
          <Button asChild variant="ink"><a href="#contact">Me contacter <ArrowRight /></a></Button>
          <a className="social-link" href={profile.linkedin} aria-label="LinkedIn"><Linkedin /></a>
          {profile.github && <a className="social-link" href={profile.github} aria-label="GitHub"><Github /></a>}
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-lines" aria-hidden="true" />
        <div className="glow-sphere sphere-one" aria-hidden="true" />
        <div className="glow-sphere sphere-two" aria-hidden="true" />
         <img src={portrait} alt={`Portrait de ${profile.name}`} width={748} height={1600} />
      </div>
    </section>

    <div className="tech-strip" aria-label="Domaines d’expertise">
      <span><Code2 /> WEB FULL STACK</span><span><Smartphone /> APPLICATIONS MOBILES</span><span><Database /> SOLUTIONS MÉTIERS</span><span><Code2 /> API & INTÉGRATIONS</span>
    </div>

    <section id="apropos" className="about-section content-shell">
      <Reveal className="about-portrait">
        <div className="portrait-rings" aria-hidden="true" />
         <img src={portrait} alt={`${profile.name}, développeur web et mobile`} loading="lazy" />
      </Reveal>
      <Reveal className="about-content">
        <SectionTitle eyebrow="À propos">Je suis disponible pour vos <span>projets digitaux</span></SectionTitle>
        <p>Je conçois des applications utiles en associant compréhension métier, architecture solide et interfaces simples à prendre en main.</p>
        <div className="stats-row">
          <div><strong>{String(projects.length).padStart(2, "0")}+</strong><span>Projets présentés</span></div>
          <div><strong>{String(skills.length).padStart(2, "0")}+</strong><span>Expertises</span></div>
          <div><strong>100%</strong><span>Engagement</span></div>
        </div>
        <Button asChild variant="ink"><a href="#contact">Travaillons ensemble <ArrowRight /></a></Button>
      </Reveal>
    </section>

    <section id="projets" className="projects-section">
      <div className="content-shell">
        <Reveal><SectionTitle eyebrow="Mes réalisations">Projets <span>récents</span></SectionTitle></Reveal>
        <div className="project-grid">
          {projects.map((project, index) => <Reveal key={project.id}>
            <article className="project-card">
               <div className="project-image"><img src={project.image_path || projectImages[index % projectImages.length]} alt={`Aperçu du projet ${project.title}`} loading={index === 0 ? "eager" : "lazy"} /></div>
              <div className="project-meta"><div><p>{project.subtitle}</p><h3>{project.title}</h3></div>{project.link ? <a href={project.link} aria-label={`Voir ${project.title}`}><ArrowUpRight /></a> : <span><ArrowUpRight /></span>}</div>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section id="services" className="services-section content-shell">
      <Reveal><SectionTitle eyebrow="Services">Les solutions que <span>je propose</span></SectionTitle></Reveal>
      <div className="services-grid">
        {skills.map((skill, index) => {
          const Icon = serviceIcons[index % serviceIcons.length] ?? Code2;
          return <Reveal key={skill.id}><article><Icon /><span>0{index + 1}</span><h3>{skill.title}</h3><p>{skill.description}</p></article></Reveal>;
        })}
      </div>
    </section>

    <section id="parcours" className="journey-section">
      <div className="content-shell journey-layout">
        <Reveal><SectionTitle eyebrow="Mon parcours">Construire, apprendre, <span>évoluer</span></SectionTitle></Reveal>
        <div className="journey-list">
          {experiences.map((item) => <Reveal key={item.id}><article><p>{item.period}</p><div><h3>{item.title}</h3><span>{item.subtitle}</span><p>{item.description}</p></div></article></Reveal>)}
          {education.map((item) => <Reveal key={item.id}><article><p>{item.period}</p><div><h3>{item.title}</h3><span>{item.subtitle}</span><p>{item.description}</p></div></article></Reveal>)}
        </div>
      </div>
    </section>

    {testimonials.length > 0 && <section className="testimonials-section content-shell"><SectionTitle eyebrow="Témoignages">Ils parlent de <span>mon travail</span></SectionTitle>{testimonials.map((item) => <blockquote key={item.id}>“{item.description}”<footer>{item.title} — {item.subtitle}</footer></blockquote>)}</section>}

     <section id="contact" className="contact-section">
       <div className="content-shell contact-layout"><div><p>Vous avez un projet ?</p><h2>Créons quelque chose de <span>remarquable.</span></h2><p className="contact-location"><MapPin /> {profile.location} · {profile.availability}</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight /></a></div><ContactForm /></div>
    </section>

    <footer className="site-footer"><a href="#accueil" className="brand"><span>DA</span><strong>Denis.</strong></a><p>© 2026 {profile.name}</p><a href="/admin/login">Administration</a></footer>
  </main>;
}