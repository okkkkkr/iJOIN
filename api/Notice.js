import request from '../utils/request.js'

// 未处理通知
const getUntreated = (data) => {
	return request.baseRequest({
		url:'/notice/noticeUntreated',
		method:'post',
		data
	})
}

// 已处理通知
const getProcessed = (data) => {
	return request.baseRequest({
		url:`/notice/noticeProcessed`,
		method:'post',
		data
	})
}

// 变更通知状态
const changeState = (data) => {
	return request.baseRequest({
		url:`/notice/updateStatus`,
		method:'post',
		data
	})
}

export default {
	getUntreated,
	getProcessed,
	changeState
}