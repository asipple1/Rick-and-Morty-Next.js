import styles from '../styles/Home.module.css'
import Link from 'next/link';
import gql from 'graphql-tag';
import { initializeApollo } from '../lib/apollo';

const launch = ({character}) => {
  return (
    <div className={styles.container}>
        <Link href='/'>Back</Link>
        <main className={styles.main}>
          <h1 className={styles.title}>{character.name}</h1>
          <img
            src={character.image}
            alt={character.name}
            width={500}
            height={500}
          />
        </main>
    </div>
  )
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      {
        characters {
          results{
            name
          }
        }
      }
    `
  });
  return {
    paths: data.characters.results.map(character => {
      return {
        params: {
          name: character.name.replace(/\s+/g, '-'),
        },
      }
    }),
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const characterName = params.name.replace(/-/g, ' ');
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
       query GetCharacter($name: String!) {
        characters(filter: {name: $name}) {
          results {
            id
            name
            gender
            species
            image
            episode {
              name
              air_date
            }
          }
        }
      }
    `,
    variables: { name: String(characterName) },
  });
  return {
    props: {
      character: data.characters.results[0]
    }
  }
}


export default launch;