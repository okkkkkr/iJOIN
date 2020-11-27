import request from '../utils/request.js'

// 未处理通知
const getSearch = (data) => {
	return request.baseRequest({
		url:'/active/search',
		method:'post',
		data
	})
}

export default {
	getSearch
}