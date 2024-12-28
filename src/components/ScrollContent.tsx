import { useEffect, useState, useRef } from "react";
import { CrashLogo } from "./CrashLogo";

export function ScrollContent() {
  const [textVisible, setTextVisible] = useState(false);
  const [shake, setShake] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show text first
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 100);

    // Start shake effect when crash happens
    const shakeTimer = setTimeout(() => {
      setShake(true);
    }, 1400); // Logo starts at 1000ms and takes 400ms to land

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight * 4;
      const progress = Math.min(Math.max(scrollPosition / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.section !== undefined) {
        const targetScroll = window.innerHeight * 4 * (event.state.section / 4);
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePopState);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(shakeTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavClick = (section: number) => {
    const maxScroll = window.innerHeight * 4; // 4 transitions total
    const targetScroll = maxScroll * (section / 4); // Convert section to proportion of max scroll
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    // Push state to history
    window.history.pushState({ section }, '', `#${getSectionName(section)}`);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    window.history.pushState({ section: 0 }, '', '/');
  };

  const getSectionName = (section: number) => {
    switch(section) {
      case 1: return 'bands';
      case 2: return 'events';
      case 3: return 'online';
      case 4: return 'contact';
      default: return '';
    }
  };

  const BackToTopButton = () => (
    <button 
      onClick={handleBackToTop}
      className="absolute top-8 right-8 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm transition-colors"
    >
      Back to Top
    </button>
  );

  // Calculate transforms based on scroll progress
  const progress = scrollProgress * 8; // 8 steps (2 steps per transition)
  
  // Home section slides out at step 0-1
  const homeTransform = progress <= 1 ? progress * -100 : -100;
  
  // Bands section slides in at step 0-1, stays until step 2-3, then slides out at step 3-4
  const bandsInProgress = Math.max(0, Math.min(1, progress));
  const bandsOutProgress = Math.max(0, Math.min(1, progress - 3));
  const bandsTransform = `translateX(${100 - bandsInProgress * 100 + bandsOutProgress * 100}%)`;
  
  // Events section slides in at step 3-4, stays until step 4-5, then slides out at step 5-6
  const eventsInProgress = Math.max(0, Math.min(1, progress - 3));
  const eventsOutProgress = Math.max(0, Math.min(1, progress - 5));
  const eventsTransform = `translate(${-100 + eventsInProgress * 100}%, ${-eventsOutProgress * 100}%)`;
  
  // Online section slides in at step 5-6, stays until step 6-7, then slides out at step 7-8
  const onlineInProgress = Math.max(0, Math.min(1, progress - 5));
  const onlineOutProgress = Math.max(0, Math.min(1, progress - 7));
  const onlineTransform = `translateY(${100 - onlineInProgress * 100 - onlineOutProgress * 100}%)`;

  // Contact section slides in at step 7-8
  const contactProgress = Math.max(0, Math.min(1, progress - 7));
  const contactTransform = `translateY(${100 - contactProgress * 100}%)`;

  return (
    <div ref={containerRef} className="h-[900vh]"> {/* Extra height for more steps */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Home section */}
        <section 
          className="absolute inset-0 transition-transform duration-100"
          style={{ transform: `translateX(${homeTransform}%)` }}
        >
          <div className="min-h-screen flex flex-col items-center">
            <div className={`flex flex-col items-center mt-[20vh] ${shake ? 'animate-shake' : ''}`}>
              <div className="h-[320px] flex items-center justify-center">
                <CrashLogo />
              </div>
              
              <div className={`
                max-w-2xl mx-auto text-center space-y-8
                transition-opacity duration-500
                ${textVisible ? 'opacity-100' : 'opacity-0'}
              `}>
                <h1 className="text-4xl md:text-6xl font-bold">Third Planet Studios</h1>
                <nav className="flex items-center justify-center gap-8 text-xl">
                  <button onClick={() => handleNavClick(1)} className="hover:text-primary-foreground transition-colors">
                    Bands
                  </button>
                  <button onClick={() => handleNavClick(2)} className="hover:text-primary-foreground transition-colors">
                    Events
                  </button>
                  <button onClick={() => handleNavClick(3)} className="hover:text-primary-foreground transition-colors">
                    Online
                  </button>
                  <button onClick={() => handleNavClick(4)} className="hover:text-primary-foreground transition-colors">
                    Contact
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Bands section - slides from right, gets pushed right */}
        <section 
          className="absolute inset-0 transition-transform duration-100"
          style={{ transform: bandsTransform }}
        >
          <div className="min-h-screen bg-[#7d6eb2] relative">
            <BackToTopButton />
            <div className="container mx-auto px-4 py-16 text-white">
              <h1 className="text-5xl font-bold mb-8">Featured Bands</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">The Sonic Waves</h2>
                  <p className="text-white/80">Alternative rock band known for their dynamic performances and powerful lyrics.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Electric Storm</h2>
                  <p className="text-white/80">Electronic rock fusion bringing high-energy beats and innovative sound design.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Midnight Echo</h2>
                  <p className="text-white/80">Indie rock collective with haunting melodies and atmospheric soundscapes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events section (formerly Studio) */}
        <section 
          className="absolute inset-0 transition-transform duration-100"
          style={{ transform: eventsTransform }}
        >
          <div className="min-h-screen bg-[#b05498] relative">
            <BackToTopButton />
            <div className="container mx-auto px-4 py-16 text-white">
              <h1 className="text-5xl font-bold mb-8">Events</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Live Shows</h2>
                  <p className="text-white/80">Regular live performances from our featured bands and special guests.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Recording Sessions</h2>
                  <p className="text-white/80">Watch bands record live and interact with the creative process.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Online section (formerly Equipment) */}
        <section 
          className="absolute inset-0 transition-transform duration-100"
          style={{ transform: onlineTransform }}
        >
          <div className="min-h-screen bg-[#ddaa72] relative">
            <BackToTopButton />
            <div className="container mx-auto px-4 py-16 text-white">
              <h1 className="text-5xl font-bold mb-8">Online</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Live Streams</h2>
                  <p className="text-white/80">Watch live recording sessions and performances from anywhere in the world.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Virtual Tours</h2>
                  <p className="text-white/80">Explore our studio spaces and equipment through interactive 3D tours.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Digital Content</h2>
                  <p className="text-white/80">Access exclusive behind-the-scenes content and artist interviews.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section 
          className="absolute inset-0 transition-transform duration-100"
          style={{ transform: contactTransform }}
        >
          <div className="min-h-screen bg-[#231f20] relative">
            <BackToTopButton />
            <div className="container mx-auto px-4 py-16 text-white">
              <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Get in Touch</h2>
                  <p className="text-white/80">Ready to start your project? Have questions? We'd love to hear from you.</p>
                  <button className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    Send Message
                  </button>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-3">Visit Us</h2>
                  <p className="text-white/80">123 Music Avenue<br/>Soundtown, ST 12345<br/>contact@thirdplanetstudios.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}