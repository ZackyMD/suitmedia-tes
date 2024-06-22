import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <Link href="/" className={router.pathname === '/' ? 'active' : ''}>
        <img src="/src/images/logo/site-logo-suitmedia.png" alt="Suitmedia Logo"/>
      </Link>
      <Link href="/work" className={router.pathname === '/work' ? 'active' : ''}>Work</Link>
      <Link href="/about" className={router.pathname === '/about' ? 'active' : ''}>About</Link>
      <Link href="/services" className={router.pathname === '/services' ? 'active' : ''}>Services</Link>
      <Link href="/ideas" className={router.pathname === '/ideas' ? 'active' : ''}>Ideas</Link>
      <Link href="/canvas" className={router.pathname === '/canvas' ? 'active' : ''}>Canvas</Link>
      <Link href="/contact" className={router.pathname === '/contact' ? 'active' : ''}>Contact</Link>
    </header>
  );
}