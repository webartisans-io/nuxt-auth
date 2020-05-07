const setToken = ({ dispatch, commit }, { token, refresh, expiresIn }) => {
  commit({ type: 'TOKEN_WAS_SET', token, refresh, expiresIn })
}

export default setToken
