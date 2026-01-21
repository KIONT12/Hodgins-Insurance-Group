import Image from 'next/image';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

export default function Home() {
  return (
    <div className="min-h-screen relative florida-background">
      {/* Gradient Overlay - Lightened to show Florida silhouette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black/40 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-2xl">
          <div className="w-full px-2 sm:px-3 md:px-4">
            <div className="flex justify-between items-center py-2 sm:py-2.5 md:py-3 gap-2 sm:gap-3">
              {/* Logo - HODGINS INSURANCE GROUP */}
              <div className="flex items-center flex-shrink-0 min-w-0 flex-1">
                <a href="#home" className="block group">
                  <div className="bg-black/95 backdrop-blur-sm px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-orange-500/30 group-hover:border-orange-500/50">
                    <div className="relative h-10 sm:h-14 md:h-20 lg:h-28 xl:h-32 w-[120px] sm:w-[180px] md:w-[240px] lg:w-[320px] xl:w-[400px]">
                      <Image
                        src="/jpeg.jpg"
                        alt="HODGINS Insurance Group"
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 640px) 120px, (max-width: 768px) 180px, (max-width: 1024px) 240px, (max-width: 1280px) 320px, 400px"
                      />
                    </div>
                  </div>
                </a>
              </div>

              {/* Navigation - Desktop */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-white font-semibold">
                <a href="#home" className="text-base xl:text-lg hover:text-orange-400 transition-colors duration-200 scroll-smooth">
                  Home
                </a>
                <a href="#faq" className="text-base xl:text-lg hover:text-orange-400 transition-colors duration-200 scroll-smooth">
                  FAQ
                </a>
                <a href="#contact" className="text-base xl:text-lg hover:text-orange-400 transition-colors duration-200 scroll-smooth">
                  Contact
                </a>
              </nav>

              {/* CTA Button */}
              <div className="flex items-center flex-shrink-0">
                <a
                  href="tel:7722444350"
                  className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-2.5 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-1.5 shadow-lg hover:shadow-xl hover:scale-105 text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap"
                >
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hidden sm:inline">Call Now</span>
                  <span className="sm:hidden">Call</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <Hero />
          <FAQ />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating CTA (Mobile Only) */}
        <FloatingCTA />
      </div>
    </div>
  );
}
