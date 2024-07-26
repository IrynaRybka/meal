
import NewsLogo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from "./header.module.css"
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

export default function Header() {
  
  return (
    <>
    <MainHeaderBackground/>
      <header className={styles.header}>
        <Link className={styles.logo} href='/'>
          <Image src={NewsLogo} alt='food and drinks' priority/>
          Next Level Food 
        </Link>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink href="/meals"> Browse Meals</NavLink>
                </li>
                <li>
                <NavLink href="/community"> Food Community</NavLink>
                    
                </li>
            </ul>
        </nav>
      </header>
    </>
  );
}
