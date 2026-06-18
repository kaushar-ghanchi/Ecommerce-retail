import { INSTAGRAM_PROFILE_URL } from '../InstagramReels/reelsConfig'

const SHOP_LINKS = [
  'New Arrival',
  'Traditional',
  'Indo-Western',
  'Plus Size Store',
  'Under 1199',
]

const SUPPORT_LINKS = [
  'Privacy policy',
  'Return Policy',
  'Terms of service',
  'Shipping policy',
  'Contact information',
]

const COMPANY_LINKS = [
  'Search',
  'About us',
  'Contact us',
  'Size Guide',
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'Instagram', href: INSTAGRAM_PROFILE_URL, icon: 'instagram' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'Pinterest', href: '#', icon: 'pinterest' },
]

const FEATURES = [
  {
    title: 'Secure Payment',
    desc: 'UPI, Wallet, Debit or Credit Card',
    icon: 'payment',
  },
  {
    title: 'Worldwide Delivery',
    desc: 'International Shipping',
    icon: 'globe',
  },
  {
    title: 'Free Shipping',
    desc: 'All Prepaid Order in India',
    icon: 'shipping',
  },
  {
    title: 'Customer Service',
    desc: 'We are available on all days except tuesday (10 AM - 8 PM)',
    icon: 'support',
  },
  {
    title: 'Whatsapp Support',
    desc: 'One Click Whatsapp Support',
    icon: 'whatsapp',
  },
]

const PAYMENT_BRANDS = [
  { name: 'Visa', className: 'visa' },
  { name: 'Maestro', className: 'maestro' },
  { name: 'Amex', className: 'amex' },
  { name: 'Discover', className: 'discover' },
  { name: 'Mastercard', className: 'mastercard' },
]

function FeatureIcon({ type }) {
  switch (type) {
    case 'payment':
      return (
        <svg viewBox="0 0 48 32" aria-hidden="true" className="feature-svg">
          <rect x="1" y="5" width="46" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="1" y="11" width="46" height="6" fill="currentColor" opacity="0.15" />
          <rect x="6" y="22" width="14" height="3" rx="1" fill="currentColor" />
        </svg>
      )
    case 'globe':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="feature-svg">
          <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M6 24h36M24 6c5 6 5 30 0 36M24 6c-5 6-5 30 0 36" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="30" y="14" width="12" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'shipping':
      return (
        <svg viewBox="0 0 56 40" aria-hidden="true" className="feature-svg">
          <path d="M2 28h32V12H2v16Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M34 18h12l6 8v8H34V18Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="14" cy="30" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="42" cy="30" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="10" y="22" fontSize="7" fontWeight="700" fill="currentColor">FREE</text>
        </svg>
      )
    case 'support':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="feature-svg">
          <path d="M8 22a16 16 0 0 1 32 0v8a4 4 0 0 1-4 4h-2l-4 5v-5h-6a4 4 0 0 1-4-4v-8Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M18 22h12M18 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" className="feature-svg">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M24 8a16 16 0 0 0-13.2 25l-1.8 6.6 6.8-1.8A16 16 0 1 0 24 8Zm-4.2 7.8c.3-.8 1.6-.8 1.9-.8s.5 0 .7.1c.2.1.5.4.5 1s-.2 1-.4 1.2c-.2.2-.4.4-.6.6-.2.2-.4.3-.2.6.2.3.9 1.5 2.1 2.1 1.3.7 1.3.5 1.6.5.3 0 .9-.4 1-.8.1-.4.1-.7.3-.8.2-.1.6-.1 1-.1h.5c.2 0 .5-.1.7.3.2.4.7 1.7.8 2.1.1.4.1.7 0 .9-.1.2-.2.3-.5.5Z"
            fill="currentColor"
          />
        </svg>
      )
    default:
      return null
  }
}

function SocialIcon({ type }) {
  switch (type) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M14 8h3V5h-3c-2.8 0-4 1.7-4 4v2H6v3h4v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="7" r="1" fill="currentColor" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <path fill="currentColor" d="M11 9.5v5l4.5-2.5L11 9.5Z" />
        </svg>
      )
    case 'pinterest':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
          <path fill="currentColor" d="M12 6c-2.8 0-5 2-5 4.8 0 2 1 3.4 2.6 3.9-.1-.9-.2-2.3.5-3.3.5-.8 1.6-2.6 1.6-5.2 0-1.1.9-2 2-2 1 0 1.5.7 1.5 1.6 0 1.2-.8 3-1.1 4.7-.3 1.3.7 2.4 2 2.4 2.5 0 4.2-2.6 4.2-6.4C19.8 8.4 16.5 6 12 6Z" />
        </svg>
      )
    default:
      return null
  }
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5 12h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function WhatsAppFloatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.3 16.2L2 22l4-1.7A10 10 0 1 0 12 2Zm-3.5 5.8c.2-.5 1-.5 1.3-.5h.3c.3 0 .7.1.8.4.1.3.8 2 1 2.7.1.3 0 .5-.1.7-.1.2-.2.3-.4.5-.2.2-.8.8-.9 1-.2.2-.1.4 0 .6.1.2.6 1 1.3 1.4.9.5 1.6.6 1.9.7.3.1.5 0 .7-.2.2-.2.6-.8.8-1.1.2-.3.4-.2.7-.1.3.1 1.5.7 1.8.8.3.1.5.1.6.2.1.1.1.4 0 .6-.1.2-.7 1.4-1 1.9-.2.5-.5.5-.8.5-.3 0-.7-.1-1.2-.3-1.6-.7-2.8-2.3-2.9-2.4-.1-.1-1.1-1.4-1.1-3.3 0-1.9 1-2.8 1.4-3.2Z"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-features">
        <div className="footer-features-inner">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="footer-feature">
              <div className="footer-feature-icon-wrap">
                <FeatureIcon type={feature.icon} />
              </div>
              <strong>{feature.title}</strong>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-dark">
        <div className="footer-main">
          <div className="footer-grid">
            <div className="footer-block">
              <h3>Registered Office</h3>
              <p>
                Ground Floor, No. 7/3/25/1, Ghandarva Vas, Ghanchiwad Masjid,
                Kalol- 382721, Dist. Gandhinagar Gujarat, India.
              </p>
              <p className="footer-contact">
                <a href="tel:+917041950089">+91 7041 950 089</a>
                <a href="mailto:contact@shopkabir.com">contact@shopkabir.com</a>
              </p>
            </div>

            <div className="footer-block">
              <h3>Shop Location</h3>
              <p>
                First Floor, Above Khushi Footware, Panch Hatdi Bazar. Opp. Lal
                School, Kalol- 382721, Dist. Gandhinagar Gujarat, India.
              </p>
            </div>

            <div className="footer-block">
              <h3>Shop</h3>
              <ul>
                {SHOP_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-block">
              <h3>Support</h3>
              <ul>
                {SUPPORT_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-block">
              <h3>Company</h3>
              <ul>
                {COMPANY_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-block footer-engage">
              <h3>Subscribe to our emails</h3>
              <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="footer-email" className="visually-hidden">Email</label>
                <input id="footer-email" type="email" placeholder="Email" />
                <button type="submit" aria-label="Subscribe">
                  <ArrowIcon />
                </button>
              </form>

              <h3 className="footer-social-title">Follow us:</h3>
              <ul className="footer-social">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} aria-label={link.label}>
                      <SocialIcon type={link.icon} />
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="footer-payments-title">Secure Payments</h3>
              <div className="payment-logos" aria-label="Accepted payment methods">
                {PAYMENT_BRANDS.map((brand) => (
                  <span key={brand.name} className={`payment-logo ${brand.className}`}>
                    {brand.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()}, Kabir Collection Powered by Shopify
          </p>
        </div>
      </div>

      <a
        href="https://wa.me/917041950089"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppFloatIcon />
      </a>
    </footer>
  )
}
