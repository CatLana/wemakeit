import Image from "next/image";

export default function Founder() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="bg-[#0F172A] py-20 lg:py-28"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-10">
          A Message From Our Founder
        </span>

        {/* Opening paragraph */}
        <p className="text-slate-300 leading-relaxed text-lg mb-10">
          I am just like you, an everyday user juggling countless apps and
          tools. And, like many of you, my patience for clunky or confusing
          software is very short. I love intuitive experiences, the kind where
          everything simply makes sense. But the truth is that most apps still
          do not feel that way.
        </p>

        {/* Profile photo + identity */}
        <div className="flex flex-col sm:flex-row items-start gap-7 mb-10">
          <Image
            src="/profile_picture.jpg"
            alt="Lana, founder of We Make IT"
            width={120}
            height={120}
            className="rounded-2xl object-cover shrink-0 border-2 border-[#22D3EE]/30"
            priority
          />
          <div>
            <h2
              id="founder-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white mb-4"
            >
              My name is Lana.
            </h2>
            <p className="text-base leading-loose">
              {/* Highlighted identity statement */}
              <span className="bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-[#22D3EE] font-semibold rounded-lg px-3 py-1 inline">
                A frustrated user who became a creative innovator, a technical
                consultant, and the founder of We Make IT.
              </span>{" "}
              <span className="text-slate-300">
                For more than eight years, I have worked in web development
                across large companies and small teams. My focus has always been
                frontend engineering, Design Systems, and Accessibility. I am
                also a certified UX designer who thrives on creating intuitive
                interfaces and inclusive experiences. I am supported by a team
                of brilliant full-stack engineers with over fifteen years of
                experience. Together, We Make IT Happen.
              </span>
            </p>
          </div>
        </div>

        {/* Passion story */}
        <p className="text-slate-300 leading-relaxed text-base mb-10">
          It took years of reflection to understand this, but solving usability
          problems is my true passion. I care deeply about inclusive and
          accessible software because no one should be left behind. People are
          different. Needs are different. Yet we all deserve to move through our
          digital lives with as little frustration as possible. Applications
          shape our everyday experience, whether we like it or not. My mission
          is to help entrepreneurs like you create products that feel effortless
          for your customers.
        </p>

        {/* What makes us different */}
        <div className="mb-10">
          <p className="text-white font-bold text-lg mb-3">
            So what makes our services different?
          </p>
          <p className="text-slate-300 leading-relaxed text-base">
            {/* Highlighted trait */}
            <span className="inline-flex items-center gap-2 font-bold text-[#22D3EE]">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-[#22D3EE] shrink-0"
              />
              A genuine obsession with problem solving.
            </span>{" "}
            If you have a problem, we will find the solution. Clear, direct, and
            without unnecessary complications.
          </p>
        </div>

        {/* Food for thought — blockquote */}
        <blockquote className="relative pl-6 border-l-4 border-[#22D3EE] mb-10">
          <span
            aria-hidden="true"
            className="absolute -top-4 left-3 text-[#22D3EE]/40 text-7xl leading-none font-serif select-none"
          >
            &ldquo;
          </span>
          <p className="text-white text-xl sm:text-2xl font-semibold leading-snug italic">
            When your business solves a real problem for real people, that is
            where success begins.
          </p>
          <p className="mt-3 text-slate-400 text-base not-italic">
            And we know how to help you reach that point.
          </p>
        </blockquote>

        {/* CTA */}
        <p className="text-slate-300 leading-relaxed text-base mb-6">
          Share your idea in the form below to get a free quote. Your
          frustration-free product starts here.
        </p>
        <a
          href="#quote"
          className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Tell us your idea
        </a>
      </div>
    </section>
  );
}
