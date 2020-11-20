import request from '../utils/request.js'

// 获取父亲导航
const getParentNavList = () => {
	return request.baseRequest({
		url:'',
		method:'GET'
	})
}

// 获取子类导航
const getChildrenNav = (data) => {
	console.log("NavList request --------->",data)
	return request.baseRequest({
		url:`/organize/getAllType/${data}`,
		method:'GET',
	})
}

export default {
	getParentNavList,
	getChildrenNav
}