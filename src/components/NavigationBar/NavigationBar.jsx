import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { NAV_ITEMS } from '../../config/collections'

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" className="nav-chevron">
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavDropdown({ item, isOpen, onOpen, onClose }) {
  return (
    <li
      className={`has-dropdown${isOpen ? ' is-open' : ''}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onClose()
      }}
    >
      <Link
        to={item.href}
        className="nav-parent"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onMouseDown={(e) => e.preventDefault()}
      >
        {item.label}
        <ChevronIcon />
      </Link>
      <ul className="dropdown" aria-label={`${item.label} submenu`}>
        {item.children.map((child) => (
          <li key={child.href}>
            <Link to={child.href}>{child.label}</Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

function MobileNavItem({ item }) {
  if (!item.children) {
    return (
      <li>
        <Link to={item.href}>{item.label}</Link>
      </li>
    )
  }

  return (
    <Disclosure as="li" className="mobile-has-dropdown">
      <DisclosureButton className="mobile-nav-parent">
        {item.label}
        <ChevronIcon />
      </DisclosureButton>
      <DisclosurePanel as="ul" className="mobile-submenu">
        {item.children.map((child) => (
          <li key={child.href}>
            <Link to={child.href}>{child.label}</Link>
          </li>
        ))}
      </DisclosurePanel>
    </Disclosure>
  )
}

export default function NavigationBar({ mobileOpen = false }) {
  const [openDropdown, setOpenDropdown] = useState(null)

  return (
    <>
      <nav className="main-nav" aria-label="Main navigation">
        <ul>
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                item={item}
                isOpen={openDropdown === item.label}
                onOpen={() => setOpenDropdown(item.label)}
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <li key={item.label}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <ul>
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}
