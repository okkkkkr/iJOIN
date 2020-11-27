import request from '../utils/request.js'

// 获取热点内容
const getHotContent = (data) => {
	return request.baseRequest({
		url:'/popular/getContent',
		method:'GET'
	})
}

// 获取热点轮播图
const getHotSwiper = (data) => {
	return request.baseRequest({
		url:'/popular/getRotation',
		method:'GET'
	})
}



export default {
	getHotSwiper,
	getHotContent
}