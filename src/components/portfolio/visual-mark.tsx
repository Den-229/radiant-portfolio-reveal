export function VisualMark({ initials }: { initials: string }) {
  return (
    <div className="relative mx-auto h-[300px] w-[300px] sm:h-[340px] sm:w-[340px]">
      <div className="animate-float absolute -left-6 top-8 h-24 w-24 rotate-6 rounded-[28px] border-2 border-foreground bg-sun" />
      <div className="animate-float-reverse absolute -right-4 bottom-7 h-16 w-16 -rotate-12 rounded-full border-2 border-foreground bg-mint" />
      <div className="animate-wave absolute right-9 -top-4 h-10 w-10 rounded-xl border-2 border-foreground bg-grape" />
      <div className="animate-pop relative flex h-full w-full rotate-2 items-center justify-center rounded-[42px] border-4 border-foreground bg-grape shadow-brutal">
        <span className="font-display text-8xl font-black text-grape-foreground">{initials}</span>
        <div className="absolute -right-5 top-8 rotate-12 rounded-2xl border-2 border-foreground bg-background px-4 py-2 font-display text-sm font-bold shadow-mini">
          Code
        </div>
        <div className="absolute -left-6 bottom-14 -rotate-6 rounded-2xl border-2 border-foreground bg-sun px-4 py-2 font-display text-sm font-bold shadow-mini">
          Produit
        </div>
      </div>
    </div>
  );
}