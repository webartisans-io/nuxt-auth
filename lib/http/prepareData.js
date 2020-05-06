const prepareData = ({ data }) => {
	data = data.data || data
	return Promise.resolve(data)
}

export default prepareData
