import Cookie from 'js-cookie'

const useCookie = (cookieName) => {
  const getCookie = () => {
    const value = Cookie.get(cookieName)
    if (value) {
      return value
    } else {
      console.log(`Cookie ${cookieName} not found`)
      return null
    }
  }

  return {
    getCookie
  }
}

export default useCookie
