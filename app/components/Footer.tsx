export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black/50 backdrop-blur-xl text-gray-300 py-12 sm:py-16 md:py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
          {/* Company Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl sm:col-span-2 md:col-span-1">
            <div className="bg-black/80 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl inline-block mb-4 sm:mb-5 border border-orange-500/30 hover:border-orange-500/50 transition-all">
              <img
                src="/jpeg.jpg"
                alt="HODGINS Insurance Group"
                className="h-14 sm:h-16 md:h-20 w-auto"
              />
            </div>
            <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 text-gray-200">
              Florida&apos;s trusted partner for home insurance. Licensed, reliable, and dedicated to saving you money.
            </p>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Licensed in Florida
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="bg-orange-500 p-2 rounded-lg flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-lg sm:text-xl">Quick Links</h4>
            </div>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a href="#benefits" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Benefits
                </a>
              </li>
              <li>
                <a href="#testimonials" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacy" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="bg-orange-500 p-2 rounded-lg flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-lg sm:text-xl">Contact</h4>
            </div>
            <div className="space-y-4 text-sm sm:text-base">
              {/* Chris Hodgins Contact */}
              <div>
                <p className="text-white font-semibold mb-2">Chris Hodgins</p>
                <ul className="space-y-1.5">
                  <li>
                    <a href="tel:7722444184" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                      Phone/Text: 772.244.4184
                    </a>
                  </li>
                  <li>
                    <a href="tel:7722444350" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                      Office: 772.244.4350
                    </a>
                  </li>
                  <li>
                    <a href="mailto:chris@hodgins.insure" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                      chris@hodgins.insure
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Customer Service */}
              <div className="pt-3 border-t border-white/10">
                <p className="text-white font-semibold mb-2">Customer Service</p>
                <ul className="space-y-1.5">
                  <li>
                    <a href="mailto:customerservice@hodgins.insure" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                      customerservice@hodgins.insure
                    </a>
                  </li>
                  <li>
                    <a href="tel:7722444350" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                      772.244.4350 x 102
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 border-t border-white/10 pt-4 sm:pt-5 md:pt-6">
          <p>&copy; {currentYear} Hodgins.insure. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

