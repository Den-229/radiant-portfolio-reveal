import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisualMark } from "@/components/portfolio/visual-mark";
import { portfolioQuery } from "@/lib/portfolio";
import projectBmb from "@/assets/project-bmb.jpg";
import projectSchool from "@/assets/project-school.jpg";
import projectStock from "@/assets/project-stock.jpg";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioQuery),
  head: () => ({
    meta: [
      { title: "Denis ASSOGBA — Développeur Web & Mobile" },
      { name: "description", content: "Portfolio de Denis ASSOGBA, développeur full-stack spécialisé en applications web, mobiles et solutions métiers." },
      { property: "og:title", content: "Denis ASSOGBA — Développeur Web & Mobile" },
      { property: "og:description", content: "Découvrez mes projets web, mobiles et solutions de gestion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const projectImages = [projectBmb, projectSchool, projectStock];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        node.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function PortfolioPage() {
  const { data } = useSuspenseQuery(portfolioQuery);
  const { profile, entries } = data;
  const projects = entries.filter((item) => item.type === "project");
  const skills = entries.filter((item) => item.type === "skill");
  const experiences = entries.filter((item) => item.type === "experience");
  const education = entries.filter((item) => item.type === "education");
  const testimonials = entries.filter((item) => item.type === "testimonial");
  const initials = profile.name.split(" ").map((word) => word[0]).join("").slice(0, 2);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-6">
        <a href="#accueil" className="flex items-center gap-3" aria-label="Retour à l’accueil">
          <span className="grid size-11 place-items-center rounded-2xl bg-coral font-display text-lg font-black text-coral-foreground shadow-mini">D</span>
          <span className="font-display text-lg font-extrabold">Denis<span className="text-coral">.</span>dev</span>
        </a>
        <nav className="hidden items-center gap-8 font-display text-sm font-bold md:flex" aria-label="Navigation principale">
          <a href="#projets" className="nav-link hover:text-coral">Projets</a>
          <a href="#expertises" className="nav-link hover:text-sky">Expertises</a>
          <a href="#parcours" className="nav-link hover:text-grape">Parcours</a>
        </nav>
        <Button variant="default" asChild className="rounded-full bg-foreground px-5 font-display font-bold text-background hover:-translate-y-1 hover:bg-foreground/90">
          <a href="#contact">Me contacter</a>
        </Button>
      </header>

      <section id="accueil" className="relative mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-6 lg:pt-14">
        <div className="animate-pop inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-sun/60 px-4 py-2 font-display text-xs font-bold uppercase">
          <span className="size-2.5 animate-pulse rounded-full bg-coral" /> {profile.availability}
        </div>
        <div className="mt-10 flex flex-col items-start gap-16 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="animate-rise mb-5 font-mono text-xs font-bold uppercase text-foreground/55">{profile.name} · {profile.location}</p>
            <h1 className="animate-rise font-display text-5xl font-black leading-[0.92] sm:text-7xl lg:text-8xl">
              Je conçois des <span className="relative inline-block text-sky">apps web & mobile<span className="absolute -bottom-2 left-0 h-2 w-full rotate-[-1deg] rounded-full bg-sun" /></span>
              <span className="mt-3 block text-3xl text-foreground/70 sm:text-5xl">qui font la différence.</span>
            </h1>
            <p className="animate-rise mt-7 max-w-xl text-lg font-medium leading-relaxed text-foreground/70">{profile.tagline}</p>
            <div className="animate-rise mt-9 flex flex-wrap gap-4">
              <Button variant="portfolio" asChild><a href="#projets">Voir mes projets <ArrowDown /></a></Button>
              <Button variant="portfolioOutline" asChild><a href={`mailto:${profile.email}`}>Discutons</a></Button>
            </div>
          </div>
          <div className="w-full max-w-sm shrink-0"><VisualMark initials={initials} /></div>
        </div>
      </section>

      <div className="marquee -mx-2 rotate-[-1.5deg] border-y-4 border-foreground bg-foreground py-3 text-background">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-display text-lg font-black uppercase">
          {[0, 1].map((copy) => <div key={copy} className="flex gap-8">{["Laravel", "Flutter", "PHP", "WinDev", "MySQL", "API REST"].map((item, index) => <span key={item} className="flex gap-8"><span>{item}</span><span className={["text-sun", "text-coral", "text-mint", "text-grape", "text-sky"][index % 5]}>✦</span></span>)}</div>)}
        </div>
      </div>

      <section id="apropos" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal><p className="section-index">01 — À propos</p><h2 className="section-title">Le code, oui.<br/><span className="text-coral">Le métier, surtout.</span></h2></Reveal>
        <Reveal className="lg:pt-12"><p className="max-w-2xl text-xl font-medium leading-relaxed text-foreground/70">Je suis <strong className="text-foreground">{profile.name}</strong>, {profile.role.toLowerCase()}. Je relie compréhension du besoin, architecture claire et exécution attentive pour créer des outils utiles et durables.</p><div className="mt-8 flex items-center gap-2 font-display font-bold"><MapPin className="text-mint" /> Basé au {profile.location}</div></Reveal>
      </section>

      <section id="projets" className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
        <Reveal className="flex items-end justify-between"><h2 className="section-title">Projets <span className="text-coral">sélectionnés</span></h2><span className="hidden font-mono text-xs font-bold sm:block">(02 — {String(projects.length).padStart(2, "0")})</span></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => <Reveal key={project.id}><article className="project-card group">
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl border-2 border-foreground bg-muted">
              <img src={projectImages[index % projectImages.length]} alt={`Aperçu graphique du projet ${project.title}`} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 font-display text-xs font-bold">{project.period}</span>
            </div>
            <h3 className="font-display text-2xl font-extrabold">{project.title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-foreground/65">{project.description}</p>
            <div className="mt-5 flex items-center justify-between border-t-2 border-foreground/10 pt-4"><span className="font-mono text-xs font-bold">{project.subtitle}</span>{project.link && <a href={project.link} aria-label={`Voir ${project.title}`}><ArrowUpRight /></a>}</div>
          </article></Reveal>)}
        </div>
      </section>

      <section id="expertises" className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><Reveal><h2 className="section-title">Mes <span className="text-grape">expertises</span></h2></Reveal><div className="mt-12 grid gap-5 sm:grid-cols-3">{skills.map((skill, index) => <Reveal key={skill.id}><article className={`skill-card skill-${(index % 3) + 1}`}><div className="font-display text-5xl font-black">0{index + 1}</div><p className="mt-7 font-mono text-xs font-bold uppercase">{skill.subtitle}</p><h3 className="mt-2 font-display text-2xl font-extrabold">{skill.title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-foreground/70">{skill.description}</p></article></Reveal>)}</div></section>

      <section id="parcours" className="border-y-4 border-foreground bg-foreground py-24 text-background"><div className="mx-auto max-w-7xl px-5 sm:px-6"><Reveal><p className="font-mono text-xs font-bold uppercase text-sun">03 — Parcours</p><h2 className="mt-4 font-display text-5xl font-black sm:text-7xl">Construire.<br/><span className="text-mint">Apprendre.</span> Améliorer.</h2></Reveal><div className="mt-14 divide-y divide-background/20">{experiences.map((item, index) => <Reveal key={item.id}><article className="grid gap-5 py-8 md:grid-cols-[120px_1fr_auto] md:items-center"><span className="font-mono text-xs font-bold text-sun">{item.period}</span><div><h3 className="font-display text-2xl font-extrabold">{item.title}</h3><p className="mt-2 max-w-2xl text-background/65">{item.description}</p></div><span className="font-mono text-xs text-background/55">0{index + 1}</span></article></Reveal>)}</div></div></section>

      {education.length > 0 && <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><Reveal><h2 className="section-title">Formations</h2></Reveal><div className="mt-10 grid gap-5 md:grid-cols-2">{education.map((item) => <article key={item.id} className="project-card"><span className="font-mono text-xs font-bold text-sky">{item.period}</span><h3 className="mt-3 font-display text-2xl font-extrabold">{item.title}</h3><p className="mt-3 text-foreground/65">{item.description}</p></article>)}</div></section>}
      {testimonials.length > 0 && <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><Reveal><h2 className="section-title">Ils en parlent</h2></Reveal><div className="mt-10 grid gap-5 md:grid-cols-2">{testimonials.map((item) => <blockquote key={item.id} className="project-card"><p className="text-xl font-medium">“{item.description}”</p><footer className="mt-6 font-display font-bold">{item.title} · {item.subtitle}</footer></blockquote>)}</div></section>}

      <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><div className="contact-panel"><div className="animate-float absolute -left-12 -top-12 h-40 w-40 rounded-[42px] bg-coral/35"/><div className="animate-float-reverse absolute -bottom-14 -right-10 h-48 w-48 rounded-full bg-grape/40"/><div className="relative"><p className="font-mono text-xs font-bold uppercase text-mint">04 — Contact direct</p><h2 className="mt-5 font-display text-5xl font-black sm:text-7xl">On construit<br/><span className="text-sun">quelque chose</span> ensemble ?</h2><p className="mx-auto mt-6 max-w-md text-lg text-background/70">Une idée, un besoin, un défi ? Échangeons et transformons-le en solution.</p><Button variant="portfolio" asChild className="mt-9 border-background bg-sun text-foreground shadow-sun"><a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight /></a></Button><div className="mt-8 flex justify-center gap-6 text-sm font-bold"><a href={profile.linkedin}>LinkedIn ↗</a>{profile.github && <a href={profile.github}>GitHub ↗</a>}</div></div></div></section>
      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t-2 border-foreground/10 px-5 py-8 font-display text-sm font-bold sm:flex-row sm:px-6"><span>© 2026 {profile.name}</span><span>Conçu avec passion au {profile.location}.</span><Link to="/admin/login" className="text-foreground/45 hover:text-coral">Administration</Link></footer>
    </main>
  );
}