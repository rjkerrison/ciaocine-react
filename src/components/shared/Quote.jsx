import './Quote.scss'

export const quotes = {
  lebowski: {
    quote: 'This is a private residence, man.',
    cite: 'The Big Lebowski',
  },
  dieHard: {
    quote: 'Welcome to the party, pal.',
    cite: 'Die Hard',
  },
}

const Quote = ({ quote, cite }) => {
  return (
    <blockquote>
      <span>{quote}</span>
      <cite>{cite}</cite>
    </blockquote>
  )
}

export default Quote
