import convertToSlug from './utils/convertToSlug'

const ExternalLinks = ({ originalTitle, title, allocineId }) => {
  return (
    <>
      <a
        href={`https://www.allocine.fr/film/fichefilm_gen_cfilm=${allocineId}.html`}
        target='_blank'
        rel='noreferrer'
      >
        Allocine
      </a>

      <a
        href={`https://letterboxd.com/film/${convertToSlug(
          originalTitle || title
        )}`}
        target='_blank'
        rel='noreferrer'
      >
        Letterboxd
      </a>
    </>
  )
}

export default ExternalLinks
