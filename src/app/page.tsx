import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';

export default function Page() {
  return (
    <main className={styles.main}>
      <Image alt='Logo Start' src={'/logo-1.png'} width={600} height={300} />
      <Image alt='Pokeball' src={'/pokeball-1.png'} width={100} height={100} />
      <h1 className={styles.title}>¡Comienza tu aventura!</h1>
      <Link className='btn' href={'/home'}>
        INGRESAR
      </Link>
    </main>
  );
}
