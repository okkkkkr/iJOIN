import request from '../utils/request.js'

// 获取所有微信信息
const getAllWXuser = () => {
	return request.baseRequest({
		url:'/getAllWXuser',
		method:'get'
	})
}

// 获取单个微信用户信息
const getWXuser = (data) => {
	return request.baseRequest({
		url:'/self/getWXInfo',
		method:'post',
		data
	})
}


export default {
	getAllWXuser,
	getWXuser
}