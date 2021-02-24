import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import gql from 'graphql-tag';
import { initializeApollo } from '../lib/apollo';

export default function Home({characters}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Rick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Rick and Morty
        </h1>

        <p className={styles.description}>
          
        </p>

        <div className={styles.grid}>
          {characters.results.map(character => (
              <Link href={character.name.replace(/\s+/g, '-')} key={character.id}>
                <a className={styles.card}>
                  <img
                    src={character.image}
                    alt={character.name}
                    width={120}
                    height={120}
                  />
                  <h3>{ character.name }</h3>
                </a>
              </Link>
            )
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query GetCharacters{
        characters {
          results{
            id
            name
            image
          }
        }
      }
    `
  });
  return {
    props: {
      characters: data.characters
    }
  }
}