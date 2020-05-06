const hasErrors = (error) => {
	if (error.isAxiosError) {
		return Promise.reject(error.response)
	}
	
	return Promise.reject(error)
}

export default hasErrors
