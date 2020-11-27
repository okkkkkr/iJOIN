<template>
	<view>
		<form>
				<view class="cu-form-group">
					<view class="title">学号</view>
					<input class="inputs" placeholder="请输入学号" name="input" :value="self_info.user_id" type="number" disabled="true" @tap="showTips"></input>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">登录密码</view>
					<input class="inputs" placeholder="请输入密码" name="input" :value="self_info.pwd" type="password"></input>
				</view> -->
				<view class="cu-form-group">
					<view class="title">就读专业</view>
					<input class="inputs" placeholder="请输入就读专业" name="input" :value="self_info.user_major" disabled="true" @tap="showTips"></input>
					<!-- <view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view> -->
				</view>
				<view class="cu-form-group">
					<view class="title">真实姓名</view>
					<input class="inputs" placeholder="真实姓名" name="input" :value="self_info.user_name" type="text" disabled="true" @tap="showTips"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title">联系电话</view>
					<input class="inputs" placeholder="请输入联系电话" name="input" v-model:value="baoming_data.phone" type="text"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title">个人简介</view>
					<textarea class="inputs" name="input" v-model:value="baoming_data.apply_introduce" type="text"></textarea>
				</view>
				
				<button class="cu-btn save bg-cyan margin-tb-sm lg" @tap="submit_info">保存</button>
			
		</form>
	</view>
</template>

<script>
	import httpRequest from '../../api/UserInfo.js'
	import baomingRequest from '../../api/baoming.js'
	
	var _self;
	export default {
		data() {
			return { // 请求用户信息
				self_info: {},
				baoming_data:{
					activity_id:"",
					wechat_id:"",
					user_id:"",
					phone:"",
					apply_introduce:""
				},
				baoming: true
			}
		},
		onLoad:function(option) {
			_self = this;
			console.log(option)
			_self.baoming_data.activity_id = option.activity_id;
			
			uni.getStorage({
				key:'wechat_id',
				success:function(res){
					_self.baoming_data.wechat_id = res.data;
					let data = {
						wechat_id: res.data
					}
					httpRequest.getStuNo(data).then(res => {
						_self.baoming_data.user_id = res[1].data.data[0].wechat_bit_id
						let bit_data = {
							user_id: res[1].data.data[0].wechat_bit_id
						} 
						
						// 请求用户数据
						httpRequest.getUserInfo(bit_data).then(res => {
							console.log("infoRes",res)
							_self.self_info = res[1].data.data[0]
						}).catch(err => {
							console.log(err)
						})
					})
				}
			})
			
			// httpRequest.getStuNo(_self.baoming_data.wechat_id).then((res) => {
				
			// })
		},
		methods: {
		showTips() {
			uni.showToast({
				title: '不允许修改',
				duration: 1000,
				icon:'loading'
			})
		},
		submit_info() {
			console.log("_self.baoming_data",_self.baoming_data)
			baomingRequest.Baoming(_self.baoming_data).then(res => {
				console.log("baoming",res)
			}).catch(err => {
				console.log(res)
			})
			
			
			uni.showToast({
				title: '报名成功！',
				duration: 800
			})
			setTimeout(()=>{
				uni.switchTab({
					url:'/pages/homepage/content'
				})
			}, 1000)
			
		}
	}
	}
	
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.inputs {
		margin-left: 20rpx;
	}

	.save {
		width: 100%;
		margin-top: 80rpx;
		color: #FFFFFF;
	}

	.tips1 {
		margin-top: 120rpx;
		font-size: 20rpx;
		text-align: center;
		color: #ADADAD;
	}

	.tips2 {
		font-size: 20rpx;
		text-align: center;
		color: #ADADAD;
	}

	.xieyi {
		font-size: 20rpx;
		margin-top: 170rpx;
		text-align: center;
		color: #0000C6;
	}
</style>
