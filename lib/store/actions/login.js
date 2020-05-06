const login = ({dispatch, commit}, { token }) => {
	commit({ type: 'TOKEN_WAS_SET', token })
}

export default login
