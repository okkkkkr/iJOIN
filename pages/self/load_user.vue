<template>
	<sponsor v-if="sponsor_page"></sponsor>
	<user v-else></user>
</template>

<script>
	import httpRequest from '../../api/UserInfo.js'
	import sponsor from './sponsor/overview.vue';
	import user from './user/overview.vue'
	
	var _self;
	export default {
		data(){
			return{
				sponsor_page: false
			}
		},
		components:{
			sponsor,
			user
		},
		onLoad() {
			console.log("onload loaduser")
			_self = this;
			
			uni.getStorage({
			    key: 'role',
			    success: function (res) {
					console.log("role------>",res.data)
			        if(res.data == 0){
						_self.sponsor_page = true;
					}
			    }
			});
			uni.getStorage({
				key: 'wechat_id',
				success: function (res) {
					console.log("userOverView",res.data)
					let bit_id = {
						wechat_bit_id:""
					}
					
				    let wx_data = {
						wechat_id: res.data
					}
					
					console.log(wx_data) 
					// 请求学号
					httpRequest.getStuNo(wx_data).then(res =>{
						console.log("get bit_id")
						bit_id.wechat_bit_id = res[1].data.data[0].wechat_bit_id;
						_self.user_name = res[1].data.data[0].wechat_name;
						uni.setStorage({
							key:"bit_id",
							data:bit_id.wechat_bit_id
						})
					}).catch(err => {
						console.log(err);
					})
				}
			})
			
		}
	}
</script>

<style>
</style>
