'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface DemoScenario {
  id: number;
  title: string;
  description: string;
  link: string;
}

export default function Navigation() {
  const [scenarios, setScenarios] = useState<DemoScenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState('/ambetter-logo.png');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch scenarios from API
    fetch('/api/scenarios')
      .then((res) => res.json())
      .then((data) => {
        setScenarios(data.scenarios);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch logo URL
    fetch('/api/config/logo')
      .then((res) => res.json())
      .then((data) => setLogoUrl(data.url))
      .catch(() => {});
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center">
              <img src={logoUrl} alt="Ambetter" className="w-8 sm:w-10 h-8 sm:h-10 object-contain" />
            </div>
            <span className="font-bold text-sm sm:text-lg lg:text-xl hidden xs:inline">Ambetter Health</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2 lg:gap-6 items-center">
            {!loading && (
              <>
                {scenarios.map((scenario) => (
                  <Link
                    key={scenario.id}
                    href={scenario.link}
                    className="hover:bg-blue-600 px-2 sm:px-3 py-2 rounded transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
                  >
                    {scenario.title}
                  </Link>
                ))}
              </>
            )}
            <Link
              href="/settings"
              className="hover:bg-blue-600 px-2 sm:px-3 py-2 rounded transition-colors text-sm"
            >
              ⚙️
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded hover:bg-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {!loading && (
              <>
                {scenarios.map((scenario) => (
                  <Link
                    key={scenario.id}
                    href={scenario.link}
                    className="block hover:bg-blue-600 px-3 py-2 rounded transition-colors text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {scenario.title}
                  </Link>
                ))}
              </>
            )}
            <Link
              href="/settings"
              className="block hover:bg-blue-600 px-3 py-2 rounded transition-colors text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              ⚙️ Settings
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
