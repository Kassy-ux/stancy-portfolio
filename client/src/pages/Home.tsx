import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DotNavigation from '../components/layout/DotNavigation';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Certification from '../components/sections/Certification';
import Skills from '../components/sections/Skills';
import Portfolio from '../components/sections/Portfolio';
import Education from '../components/sections/Education';
import Community from '../components/sections/Community';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import PageLoader from '../components/ui/PageLoader';
import { useDynamicHead } from '../hooks/useDynamicHead';
import { usePortfolioDataGate } from '../hooks/usePortfolioDataGate';

const Home = () => {
  useDynamicHead();
  const { showInitialLoader, showWakeLoader } = usePortfolioDataGate();

  if (showInitialLoader) {
    return <PageLoader />;
  }

  return (
    <>
      <main className="relative animate-fadeIn">
        <Navbar />
        <DotNavigation />
        <Hero />
        <About />
        <Certification />
        <Skills />
        <Portfolio />
        <Education />
        <Community />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
      {showWakeLoader && <PageLoader />}
    </>
  );
};

export default Home;
