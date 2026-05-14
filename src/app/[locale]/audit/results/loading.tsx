export default function AuditResultsLoading() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
      {/* Dark header skeleton */}
      <section className="bg-[#0F172A] pt-16 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-40 rounded-full bg-white/10 animate-pulse" />
          <div className="mt-5 h-12 w-2/3 rounded-xl bg-white/10 animate-pulse" />
          <div className="mt-4 h-5 w-full max-w-2xl rounded-lg bg-white/10 animate-pulse" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/10 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Section skeletons */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 rounded-3xl border border-slate-200 bg-white animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
