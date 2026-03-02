import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import CtaStrip from "@/components/sections/CtaStrip";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Stats />
        <Services />
        <About />
        <Clients />
        <CaseStudies />
        <Testimonials />
        <CtaStrip />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
