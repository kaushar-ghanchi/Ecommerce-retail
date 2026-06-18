import { useState } from 'react'
import logo from '../../assets/Final_Logo_Website.png'
import NavigationBar from '../NavigationBar/NavigationBar'
import { INSTAGRAM_PROFILE_URL } from '../InstagramReels/reelsConfig'

const ANNOUNCEMENTS = [
  'FREE SHIPPING ON ALL PREPAID ORDER',
  'COD AVAILABLE',
  'SUMMER COLLECTION IS LIVE',
  'FOR INTERNATIONAL ORDER DM ON WHATSAPP',
  '10K+ HAPPY CUSTOMERS',
  'FLAT UPTO 20% OFF ON ALL PRODUCTS',
]

const TOP_LINKS = [
  { label: 'Blog', href: '#' },
  { label: 'Store Locator', href: '#' },
  { label: 'About us', href: '#' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: INSTAGRAM_PROFILE_URL },
  { label: 'YouTube', href: '#' },
  { label: 'Pinterest', href: '#' },
]

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6h15l-1.5 9h-12L6 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <div className="announcement-track">
          {ANNOUNCEMENTS.map((text) => (
            <span key={text} className="announcement-item">{text}</span>
          ))}
          {ANNOUNCEMENTS.map((text) => (
            <span key={`${text}-dup`} className="announcement-item">{text}</span>
          ))}
        </div>
      </div>

      <div className="header-top">
        <div className="header-top-inner">
          <ul className="social-links" aria-label="Social media">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <ul className="top-links">
            <li>
              <button type="button" className="icon-btn search-btn" aria-label="Search">
                <SearchIcon />
              </button>
            </li>
            {TOP_LINKS.map((link, index) => (
              <li key={link.label}>
                {index > 0 && <span className="top-divider">|</span>}
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="header-main">
        <div className="header-main-inner">
          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <MenuIcon />
          </button>

          <a href="/" className="site-logo">
            <img src={logo} alt="Kabir Collection" className="site-logo-img" />
          </a>

          <NavigationBar mobileOpen={mobileMenuOpen} />

          <div className="header-actions">
            <a href="#" className="header-action">
              <UserIcon />
              <span>Log in</span>
            </a>
            <a href="#" className="header-action cart-action">
              <CartIcon />
              <span>Cart</span>
              <span className="cart-count">0</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
