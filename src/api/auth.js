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
    if (error?.response?.status === 401) {
      removeToken()
    }
    return { isValid: false }
  }
}

const login = async (body) => {
  try {
    const {
      data: { authToken, errorMessage },
    } = await service.request({
      url: `/auth/login`,
      data: body,
      method: 'post',
    })
    if (authToken) {
      storeToken(authToken)
      return { isLoggedIn: true }
    }
    return { isLoggedIn: false, errorMessage }
  } catch (error) {
    console.error(error)
    return { isLoggedIn: false, errorMessage: error.message }
  }
}

const signup = async (body) => {
  try {
    const {
      data: { errorMessage },
    } = await service.request({
      url: `/auth/signup`,
      data: body,
      method: 'post',
    })
    if (!errorMessage) {
      return { isSignedUp: true }
    }
    return {}
  } catch (error) {
    console.error(error)
    return { isSignedUp: false, errorMessage: error.message }
  }
}

export {
  getHeadersWithAuth,
  storeToken,
  removeToken,
  verifyToken,
  login,
  signup,
}
