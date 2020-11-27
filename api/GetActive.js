import request from '../utils/request.js'

// 获取所有i组织活动
const getAllOrganize = () => {
	return request.baseRequest({
		url: '/public/getAnyContent/A1',
		method: 'get'
	})
}

// 获取所有i活动活动
const getAllActive = () => {
	return request.baseRequest({
		url: '/public/getAnyContent/A2',
		method: 'get'
	})
}

// 获取子类活动信息
const getSonActive = (data) => {
	return request.baseRequest({
		url: '/public/gettypeactiinfo/' + data,
		method: 'get'
	})
}

// 获取团队尚未开始活动
const getActiveInfo = (data) => {
	return request.baseRequest({
		url: '/teamInfo/getActive',
		method: 'POST',
		data
	})
}

// 获取团队发布的所有活动
const getAllActiveInfo = (data) => {
	return request.baseRequest({
		url: '/activityinfo/teamactivity',
		method: 'POST',
		data
	})
}

// 获取正在进行的活动(主办方)
const getHoldingInfo = (data) => {
	return request.baseRequest({
		url: '/activityinfo/teamNowactivity',
		method: 'POST',
		data
	})
}


// 获取用户参与过的活动
const getUserActiveInfo = (data) => {
	return request.baseRequest({
		url: '/user/userActivity',
		method: 'POST',
		data
	})
}

// 获取用户即将进行的活动
const getUserJoining = (data) => {
	return request.baseRequest({
		url: '/user/userwhillActivity',
		method: 'POST',
		data
	})
}

// 获取活动详情
const getActiveDetail = (data) => {
	return request.baseRequest({
		url: '/activityinfo/newActivityinfo',
		method: 'POST',
		data
	})
}

export default {
	getAllOrganize,
	getAllActive,
	getSonActive,
	getUserActiveInfo,
	getAllActiveInfo,
	getHoldingInfo,
	getUserJoining,
	getActiveInfo,
	getActiveDetail
}
