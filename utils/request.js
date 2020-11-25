const baseUrl = 'http://localhost:3000/api'

const baseRequest = (target) => {
	let baseDefault = {
		// 请求的接口地址
		url: baseUrl + target.url,

		// 请求方式
		method: target.method,

		// 传输的数据
		data: target.data,

		// 请求头
		header: {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json'
	}


	let promise = new Promise((resolve, reject) => {
		uni.request(baseDefault).then(res => {
			console.log("promise res ---->",res)
			resolve(res);
		}).catch(err => {
			console.log("promise err ---->",err)
			reject(err);
		})
	})

	return promise;
}

export default {
	baseRequest,
	baseUrl
}
