export default (http) => {
	const setToken = (data) => {
		http.setToken(data)
		return Promise.resolve(data)
	}
	
	const unsetToken = (data) => {
		http.setToken(data)
		return Promise.resolve(data)
	}
	
	return {
		auth: {
			register: (data) =>
				http.post('/auth/register', data)
					.then(setToken),
			
			login: (data) =>
				http.post('/auth/login', data)
					.then(setToken),
			
			logout: ( ) =>
				http.post('/auth/logout')
					.then(unsetToken),
			
			fetchUser: () => http.get('/auth/me')
		}
	}
}
