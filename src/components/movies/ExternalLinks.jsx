import convertToSlug from './utils/convertToSlug'

const ExternalLinks = ({ originalTitle, title, allocineId }) => {
  return (
    <>
      <a
        className='action'
        href={`https://www.allocine.fr/film/fichefilm_gen_cfilm=${allocineId}.html`}
        target='_blank'
        rel='noreferrer'
      >
        Allocine
      </a>

      <a
        className='action'
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
