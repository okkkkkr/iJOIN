import request from '../utils/request.js'

// 获取团队近期活动
const Baoming = (data) => {
	return request.baseRequest({
		url:'/user/apply',
		method:'POST',
		data
	})
}
export default {
	Baoming
}