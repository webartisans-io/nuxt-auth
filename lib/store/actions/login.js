const login = ({ dispatch, commit }, { token, refresh, expiresIn }) => {
  dispatch({ type: 'setToken', token, refresh, expiresIn })
  commit({ type: 'USER_WAS_LOGGED_IN'})
}

export default login
