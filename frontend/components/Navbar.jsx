'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/regions', label: 'Regions' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/favorites', label: 'Favorites' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
      pathname === '/regions'
        ? 'bg-black/20 dark:bg-black/20 border-none'
        : 'bg-white dark:bg-charcoal-950/90 border-b border-gray-200 dark:border-white/10'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative w-28 h-8">
            <Image
              src="/assets/expo-logo-1.png"
              alt="ExpoGH Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-[#c5932a]'
                  : 'text-gray-700 dark:text-gray-300 hover:text-[#c5932a]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-gray-50 dark:bg-charcoal-900 border-t border-gray-200 dark:border-white/10 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm ${pathname === link.href ? 'text-[#c5932a]' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
