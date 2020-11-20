import request from '../utils/request.js'

// 获取学号
const getStuNo = (data) => {
	return request.baseRequest({
		url:'/public/getwechatuserid',
		method:'POST',
		data
	})
}

// 获取个人信息
const getUserInfo = (data) => {
	return request.baseRequest({
		url:'/myInfo/getUserInfo',
		method:'POST',
		data
	})
}

// 修改个人信息
const setUserInfo = (data) => {
	return request.baseRequest({
		url:'/userInfo/setInfo',
		method:'POST',
		data
	})
}

// 获取主办方信息
const getSponsorInfo = (data) => {
	return request.baseRequest({
		url:'/teamInfo/getTeamInfo',
		method:'POST',
		data
	})
}

// 修改主办方信息
const setSponsorInfo = (data) => {
	return request.baseRequest({
		url:'/teamInfo/setInfo',
		method:'POST',
		data
	})
}

export default {
	getUserInfo,
	setUserInfo,
	getStuNo,
	getSponsorInfo,
	setSponsorInfo
}