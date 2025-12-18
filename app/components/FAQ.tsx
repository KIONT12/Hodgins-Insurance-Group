'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How much does homeowners insurance cost in Florida?',
      answer: 'Florida homeowners pay between $1,400-$2,500 annually on average. We compare quotes from all major carriers to help you find the best rate for your situation. Our customers save an average of $3,300 per year (53% savings).'
    },
    {
      question: 'How quickly can I get a quote?',
      answer: 'Our platform provides quotes in minutes. Simply fill out the form above and we\'ll compare rates from all major Florida carriers instantly. No waiting, no delays - get your personalized quote in under 2 minutes.'
    },
    {
      question: 'Is there any obligation to buy?',
      answer: 'Absolutely not! Getting quotes is 100% free with no obligation to purchase. Compare rates and make your decision on your own timeline. No credit check required, no spam, no pressure.'
    },
    {
      question: 'What does homeowners insurance cover?',
      answer: 'Typically covers your dwelling, personal property, liability protection, and additional living expenses. We\'ll help you understand exactly what\'s covered and ensure you have the right protection for your Florida home.'
    },
    {
      question: 'Can I manage my policy online?',
      answer: 'Yes! Our 24/7 customer portal allows you to view policy details, make payments, file claims, and access documents anytime. Everything you need is available online, with licensed agent support when you need it.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use 256-bit SSL encryption to protect all your data. Your information is never sold to third parties, and we comply with all GDPR and privacy regulations. We only use your information to provide you with insurance quotes.'
    },
    {
      question: 'Which insurance carriers do you compare?',
      answer: 'We compare quotes from all major Florida carriers including State Farm, Allstate, Progressive, GEICO, USAA, Travelers, Nationwide, Farmers, and many more. One form, multiple quotes, best rates.'
    },
    {
      question: 'Do I need to provide my email or phone number?',
      answer: 'While we ask for contact information to deliver your quotes and have a licensed agent reach out, you can get started with just your zip code. We respect your privacy and won\'t spam you.'
    }
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 px-4">
            Common Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light px-4">
            Everything you need to know
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 hover:border-orange-500/50"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left flex justify-between items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 focus:outline-none group touch-manipulation"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-orange-400 transition-colors pr-2">
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openFaq === index
                      ? 'bg-orange-500 rotate-180'
                      : 'bg-white/10 group-hover:bg-orange-500/20'
                  }`}
                >
                  <span className="text-white text-xl sm:text-2xl font-bold">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </div>
              </button>
              {openFaq === index && (
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 animate-fadeIn">
                  <div className="pt-3 sm:pt-4 border-t border-white/10">
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 text-center border-2 border-orange-400">
          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 sm:mb-3 px-4">
            Still have questions?
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-5 px-4">
            Call us now and speak with a licensed agent
          </p>
          <a
            href="tel:7722444350"
            className="inline-flex items-center gap-2 sm:gap-3 bg-white hover:bg-gray-100 active:scale-95 text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all shadow-xl hover:scale-105 hover:shadow-2xl touch-manipulation min-h-[48px]"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="whitespace-nowrap">Call 772.244.4350</span>
          </a>
        </div>
      </div>
    </section>
  );
}

