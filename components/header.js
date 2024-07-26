import NewsLogo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from "./header.module.css"
export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <Link className={styles.logo} href='/'>
          <Image src={NewsLogo} alt='food and drinks' priority/>
          Next Level Food 
        </Link>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href="/meals">Browse Meals</Link>
                </li>
                <li>
                    <Link href="/community">Food Community</Link>
                </li>
            </ul>
        </nav>
      </header>
    </>
  );
}
