import request from '../utils/request.js'

// 模拟微信登录
const wxLogin = (data) => {
	return request.baseRequest({
		url:'/user/login',
		method:'POST',
		data
	})
}

// 模拟官方登录
const officialLogin = (data) => {
	return request.baseRequest({
		url:'/sponsor/login',
		method:'POST',
		data
	})
}

export default {
	wxLogin,
	officialLogin
}