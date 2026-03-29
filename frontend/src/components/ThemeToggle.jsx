
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem',
        borderRadius: '9999px',
        transition: 'all 300ms',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#374151' : '#e5e7eb'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} style={{ color: '#facc15' }} />
      ) : (
        <Moon size={20} style={{ color: '#374151' }} />
      )}
    </button>
  )
}
