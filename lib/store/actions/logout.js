const logout = ({commit}) => {
	commit({ type: 'TOKEN_WAS_UNSET'})
}

export default logout
