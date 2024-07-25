
import Link from 'next/link'
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
<Link href="/meals">Meals</Link>
<Link href="/meals/share">Share meals</Link>
<Link href="/community">CommunityPage</Link>
    </main>
  )
}
