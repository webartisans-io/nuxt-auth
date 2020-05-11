
const TOKEN_WAS_UNSET = (state) => {
  state.token = null
  state.refresh = null
  state.expiresIn = null
}

export default TOKEN_WAS_UNSET
