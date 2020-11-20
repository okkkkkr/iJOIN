import request from '../utils/request.js'

// 获取团队近期活动
const getActiveInfo = (data) => {
	return request.baseRequest({
		url:'/teamInfo/getActive/',
		method:'POST',
		data
	})
}
export default {
	getActiveInfo
}