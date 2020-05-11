const logout = ({ commit }) => {
  commit({ type: 'TOKEN_WAS_UNSET' })
  commit({ type: 'USER_WAS_LOGGED_OUT' })
}

export default logout
