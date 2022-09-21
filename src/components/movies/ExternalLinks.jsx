import convertToSlug from './utils/convertToSlug'

const ExternalLinks = ({
  originalTitle,
  title,
  allocineId,
  externalIdentifiers,
}) => {
  const slug = externalIdentifiers?.letterboxd?.slug

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
        href={`https://letterboxd.com/film/${
          slug || convertToSlug(originalTitle || title)
        }`}
        target='_blank'
        rel='noreferrer'
      >
        Letterboxd
      </a>
    </>
  )
}

export default ExternalLinks
