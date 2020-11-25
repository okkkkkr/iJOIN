import request from '../utils/request.js'

// 举办活动
const holdActivity = (data) => {
	return request.baseRequest({
		url:'/teamInfo/conductActive',
		method:'POST',
		data
	})
}

export default {
	holdActivity
}