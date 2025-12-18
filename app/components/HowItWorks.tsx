export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Enter Your Info',
      description: 'Tell us about your home and coverage needs in just 2 minutes.',
      icon: '📝'
    },
    {
      number: 2,
      title: 'Compare Quotes',
      description: 'We instantly compare rates from all major Florida carriers for you.',
      icon: '🔍'
    },
    {
      number: 3,
      title: 'Save Money',
      description: 'Choose the best coverage at the best price. Average savings: $450/year.',
      icon: '💰'
    }
  ];

  return (
    <section id="how-it-works" className="py-8 sm:py-10 md:py-12 lg:py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 px-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light px-4">
            Three simple steps to better coverage
          </p>
        </div>
        
        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line (hidden on mobile, shown on desktop between cards) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-20 left-full w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 -z-10"
                  style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 1rem)' }}
                />
              )}
              
              {/* Step Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl text-center hover:scale-105 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                
                {/* Number Badge */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg border-4 border-white/20">
                  <span className="text-xl sm:text-2xl font-black text-white">{step.number}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

