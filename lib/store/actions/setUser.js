const setUser = ({ dispatch, commit }, { user }) => {
	commit('USER_WAS_SET', { user })
}

export default setUser
