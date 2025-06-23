import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full bg-neutral-100 border-t border-neutral-200 py-6">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-neutral-600 text-center md:text-left">
            © {new Date().getFullYear()} Sea Catering. All rights reserved.
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-neutral-600 hover:text-pink-500 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-neutral-600 hover:text-blue-500 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12" />
              </svg>
            </a>
            <a
              href="mailto:info@seacatering.com"
              aria-label="Email"
              className="text-neutral-600 hover:text-green-500 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z" />
              </svg>
            </a>
          </div>

          <div className="text-sm text-neutral-600 text-center md:text-right">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <span>Contact us:</span>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:brian@seacatering.com"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                >
                  brian@seacatering.com
                </a>
                <span className="text-neutral-400">|</span>
                <a
                  href="tel:08123456789"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                >
                  08123456789
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
