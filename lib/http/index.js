import prepareData from './prepareData'
import hasErrors from './hasErrors'

export default (http) => {
	return {
		
		setToken ({ token }) {
			http.setHeader('Authorization', `Bearer ${token}`)
		},
		
		unsetToken () {
			delete http.defaults.headers.common["Authorization"]
		},
		
		post (url, data) {
			return this.request('post', url, data)
		},
	
		get (url, data) {
			return this.request('get', url, data)
		},
	
		update (url, data) {
			return this.request('update', url, data)
		},
		
		delete (url, data) {
			return this.request('delete', url, data)
		},
		
		request (method, url, data) {
			if( !http ) {
				console.log('Axios is not installed, could you provide it please')
				return
			}
			return http.request({
				method,
				url,
				data
			})
			.then(prepareData)
			.catch(hasErrors)
		}
	}
}
