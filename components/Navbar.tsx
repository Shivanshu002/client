'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

const links = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/trainers', label: 'Trainers' },
  { href: '/contact', label: 'Contact' },
];

const themes = [
  { id: 'light',  label: 'Light',        icon: '☀️', colors: 'bg-white border-gray-200' },
  { id: 'dark',   label: 'Dark',         icon: '🌙', colors: 'bg-gray-900 border-gray-700' },
  { id: 'forest', label: 'Forest Green', icon: '🌿', colors: 'bg-green-800 border-green-600' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close theme dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentTheme = themes.find(t => t.id === theme) ?? themes[0];

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 theme-bg',
        scrolled ? 'shadow-lg' : '',
        'border-b theme-border'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-fg)' }}>
              E
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--primary)' }}>
              EduPro
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 theme-fg nav-hover',
                  pathname === href ? 'nav-active' : ''
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/admin/courses"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md btn-primary"
            >
              Admin
            </Link>

            {/* Theme Switcher */}
            <div className="relative ml-2" ref={themeRef}>
              <button
                onClick={() => setThemeOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium theme-fg border theme-border hover:bg-gray-100 transition-colors"
                aria-label="Switch theme"
              >
                <span>{currentTheme.icon}</span>
                <svg className={cn('w-3 h-3 transition-transform', themeOpen && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {themeOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl shadow-xl border theme-border theme-card overflow-hidden z-50">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id); setThemeOpen(false); }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left nav-hover',
                        theme === t.id ? 'nav-active' : 'theme-fg'
                      )}
                    >
                      <span className="text-base">{t.icon}</span>
                      <span>{t.label}</span>
                      {theme === t.id && (
                        <svg className="w-4 h-4 ml-auto" style={{ color: 'var(--primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: theme icon + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Quick theme cycle on mobile */}
            <button
              onClick={() => {
                const order: typeof theme[] = ['light', 'dark', 'forest'];
                const next = order[(order.indexOf(theme) + 1) % order.length];
                setTheme(next);
              }}
              className="p-2 rounded-lg border theme-border theme-fg text-base"
              aria-label="Cycle theme"
            >
              {currentTheme.icon}
            </button>

            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <div className={cn('w-5 h-0.5 bg-gray-700 transition-all duration-300 mb-1', open && 'rotate-45 translate-y-1.5')} />
              <div className={cn('w-5 h-0.5 bg-gray-700 transition-all duration-300 mb-1', open && 'opacity-0')} />
              <div className={cn('w-5 h-0.5 bg-gray-700 transition-all duration-300', open && '-rotate-45 -translate-y-1.5')} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn('md:hidden overflow-hidden transition-all duration-300', open ? 'max-h-80 pb-4' : 'max-h-0')}>
          <div className="flex flex-col gap-1 pt-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors theme-fg nav-hover',
                  pathname === href ? 'nav-active' : ''
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/admin/courses"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-center mt-1 btn-primary"
            >
              Admin Panel
            </Link>

            {/* Mobile theme options */}
            <div className="mt-2 pt-2 border-t theme-border">
              <p className="px-4 text-xs font-semibold theme-fg-muted uppercase tracking-wide mb-1">Theme</p>
              <div className="flex gap-2 px-4">
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setOpen(false); }}
                    className={cn(
                      'flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-medium border transition-all nav-hover',
                      theme === t.id ? 'nav-active border-primary' : 'theme-border theme-fg'
                    )}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span>{t.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
