export default function Home() {
  return (
    <div className="container py-8">
      <section className="mx-auto flex max-w-[980px] flex-col items-start gap-2 px-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Welcome to Karpov Portfolio
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground">
          Modern portfolio showcasing projects with liquid glass design system.
          Built with Next.js 15 and TypeScript.
        </p>
      </section>

      <section className="mx-auto flex max-w-[980px] flex-col items-start gap-2 px-4 py-8">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">Project 1</h3>
            <p className="text-sm text-muted-foreground">
              Description of project 1
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">Project 2</h3>
            <p className="text-sm text-muted-foreground">
              Description of project 2
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">Project 3</h3>
            <p className="text-sm text-muted-foreground">
              Description of project 3
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}