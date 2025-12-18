import EnhancedQuoteWidget from './EnhancedQuoteWidget';

export default function Hero() {
  return (
    <section id="home" className="text-white py-8 sm:py-12 md:py-16 lg:py-20 min-h-[85vh] flex items-center">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        {/* Main Headline - Above Everything */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-1 sm:mb-2 md:mb-3 text-orange-500 px-2 tracking-tight drop-shadow-2xl" style={{ 
            fontFamily: 'var(--font-poppins), sans-serif',
            textShadow: '0 0 40px rgba(249, 115, 22, 0.6), 0 0 80px rgba(249, 115, 22, 0.4), 3px 3px 6px rgba(0, 0, 0, 0.9)',
            fontSize: 'clamp(2rem, 6vw, 8rem)'
          }}>
            Get Free Home Insurance Quotes
          </h1>
        </div>

        {/* Enhanced Quote Widget - Full Featured */}
        <div className="flex justify-center items-center px-2 sm:px-0">
          <div className="w-full max-w-2xl">
            <EnhancedQuoteWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

