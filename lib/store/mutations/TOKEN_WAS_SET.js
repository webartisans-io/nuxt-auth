
const TOKEN_WAS_SET = (state, { token, refresh, expiresIn }) => {
  state.token = token
  state.isLoggedIn = true
  state.refresh = refresh
  state.expiresIn = expiresIn
}

export default TOKEN_WAS_SET
