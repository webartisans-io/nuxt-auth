
const TOKEN_WAS_SET = (state, { token }) => {
	state.token = token
	state.isLoggedIn = true
}

export default TOKEN_WAS_SET
