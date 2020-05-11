export const state = () => ({
  test: 'one'
})

export const actions = {
  nuxtServerInit: async function ({ dispatch }, {isServer, $cookies }) {
    // let auth = null
    // console.log($cookies.getAll())
    // if (req.headers.cookie) {
    //   const parsed = cookieParser.parse(req.headers.cookie)
    //   try {
    //     auth = JSON.parse(parsed.auth)
    //   } catch (err) {
    //     // No valid cookie found
    //   }
    // }
    // console.log(auth)
    // dispatch('auth/setToken', {  token: '', refresh: '', expiresIn: '' })
  }
}
