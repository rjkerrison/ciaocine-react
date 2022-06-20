import './ExternalLinks.scss'

const convertToSlug = (text) => {
  return text
    .toString() // Cast to string
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .replace(/[^-\w\s]+/g, '') // Remove all non-word chars
    .trim() // Remove whitespace from both sides of a string
    .replace(/[-\s]+/g, '-') // Replace spaces with -
}

const ExternalLinks = ({ originalTitle, title, allocineId }) => {
  return (
    <ul className='external-links'>
      <li>
        <a
          href={`https://www.allocine.fr/film/fichefilm_gen_cfilm=${allocineId}.html`}
          target='_blank'
          rel='noreferrer'
        >
          Allocine
        </a>
      </li>
      <li>
        <a
          href={`https://letterboxd.com/film/${convertToSlug(
            originalTitle || title
          )}`}
          target='_blank'
          rel='noreferrer'
        >
          Letterboxd
        </a>
      </li>
    </ul>
  )
}

export default ExternalLinks
