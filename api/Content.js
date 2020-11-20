import request from '../utils/request.js'

// 获取全部分类内容
const getAllContent(){
	return request.baseRequest({
		url:'',
		method:'GET'
	})
}

// 获取组织活动分类内容
const getHomeContent(data){
	return request.baseRequest({
		url:``,
		method:'GET'
	})
}

// 获取热点内容
const getHotContent(data){
	return request.baseRequest({
		url:'/popular/getContent',
		method:'GET'
	})
}

export default {
	getAllContent,
	getHomeContent,
	getHotContent
}