export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="glass-surface w-full max-w-2xl rounded-3xl p-8 text-center shadow-glow sm:p-14">
        <h1 className="font-sans text-4xl font-semibold tracking-tight sm:text-6xl">
          Yusuph Salimu
        </h1>
        <p className="mt-4 font-mono text-base text-muted-foreground sm:text-lg">
          Software Engineer &amp; Full-Stack Developer
        </p>
        <div
          aria-hidden="true"
          className="mx-auto mt-10 h-1 w-32 rounded-full bg-accent-gradient"
        />
      </section>
    </main>
  );
}
