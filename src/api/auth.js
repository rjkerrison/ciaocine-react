import service from './service'

const TOKEN_NAME = 'authToken'

const getToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}

const storeToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
}
const removeToken = () => {
  localStorage.removeItem(TOKEN_NAME)
}

const getHeadersWithAuth = () => {
  const storedToken = getToken()
  if (!storedToken) {
    throw new Error('No token present')
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${storedToken}`,
  }
}

const verifyToken = async () => {
  try {
    const { data } = await service.request({
      url: `/auth/verify`,
      headers: getHeadersWithAuth(),
    })
    return { isValid: true, user: data }
  } catch (error) {
    console.error(error)
    if (error?.response?.status === 401) {
      removeToken()
    }
    return { isValid: false }
  }
}

export { getHeadersWithAuth, storeToken, removeToken, verifyToken }
