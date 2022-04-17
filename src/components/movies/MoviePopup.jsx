import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/consts'

const getData = async (movieId) => {
  const {
    data: { movie },
  } = await axios({
    baseURL: API_URL,
    url: `/movies/${movieId}/`,
  })
  return movie
}

const MoviePopup = ({ movieId, active, close }) => {
  const [movieInfo, setMovieInfo] = useState(null)

  useEffect(() => {
    if (!movieId || !active) {
      return
    }
    const getMovie = async () => {
      const movieInfo = await getData(movieId)
      setMovieInfo(movieInfo)
    }
    getMovie()
  }, [movieId])

  if (!active || !movieInfo) {
    return <></>
  }

  return <p onClick={close}>{JSON.stringify(movieInfo, null, 2)}</p>
}

export default MoviePopup
