import login from './login'
import setToken from './setToken'
import setUser from './setUser'
import logout from './logout'
import nuxtServerInit from './nuxtServerInit'

const actions = {
  setToken,
  setUser,
  login,
  logout,
  nuxtServerInit,
}

export default actions
