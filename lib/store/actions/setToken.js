const setToken = ({dispatch, commit}, { token }) => {
	commit({ type: 'TOKEN_WAS_SET', token })
}

export default setToken
