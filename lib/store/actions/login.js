const login = ({ dispatch, commit }, { token, refresh, expiresIn }) => {
  dispatch({ type: 'setToken', token, refresh, expiresIn })
}

export default login
