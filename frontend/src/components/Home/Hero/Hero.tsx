import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';
import heroBg from '../../../assets/hero-bg.jpg';

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        "#hero-main-title, #hero-subtitle, #enroll-button",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2, delay: 0.5 }
      );
      tl.fromTo(
        ".feature-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power3.out" },
        "-=0.5"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-black">
      {/* Hero Section with Background Image */}
      <section
        className="relative w-full h-[80vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div> {/* Dark overlay */}

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1
            id="hero-main-title"
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0"
          >
            Master Forex Trading with Us
          </h1>
          <p
            id="hero-subtitle"
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 opacity-0"
          >
            Join our comprehensive courses for practical trading success today.
          </p>
          <div id="enroll-button" className="mt-10 opacity-0">
            <Button asChild size="lg" className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-10 py-3 text-base rounded-full transition-colors duration-300">
              <Link to="/batches">
                Enroll
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-gray-900/50 p-8 rounded-lg text-center shadow-lg opacity-0 border border-white/10">
              <h3 className="text-xl font-semibold mb-2 text-white">Online Trading Courses</h3>
              <p className="text-gray-400">Learn at your own pace with recorded classes.</p>
            </div>
            <div className="feature-card bg-gray-900/50 p-8 rounded-lg text-center shadow-lg opacity-0 border border-white/10">
              <h3 className="text-xl font-semibold mb-2 text-white">Offline Batches</h3>
              <p className="text-gray-400">Join our live sessions for real-time learning.</p>
            </div>
            <div className="feature-card bg-gray-900/50 p-8 rounded-lg text-center shadow-lg opacity-0 border border-white/10">
              <h3 className="text-xl font-semibold mb-2 text-white">Expert Guidance</h3>
              <p className="text-gray-400">Practical results based on stock market analysis.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;