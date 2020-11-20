<template>
	<view>
		<form>
				<view class="cu-form-group">
					<view class="title">学号</view>
					<input class="inputs" placeholder="请输入学号" name="input" v-model:value="baoming_data.user_id" type="number"></input>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">登录密码</view>
					<input class="inputs" placeholder="请输入密码" name="input" :value="self_info.pwd" type="password"></input>
				</view> -->
				<view class="cu-form-group">
					<view class="title">就读专业</view>
					<input class="inputs" placeholder="请输入就读专业" name="input" v-model:value="baoming_data.user_major" type="number"></input>
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
					<input class="inputs" placeholder="真实姓名" name="input" v-model:value="baoming_data.user_name" type="text"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title">联系电话</view>
					<input class="inputs" placeholder="请输入联系电话" name="input" v-model:value="baoming_data.apply_desire" type="text"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title">个人简介</view>
					<input class="inputs" placeholder="请输入个人简介" name="input" v-model:value="baoming_data.apply_introduce" type="text"></input>
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
					activity_id:"20201026488",
					user_id:"",
					user_major:"",
					user_name:"",
					apply_desire:"",
					apply_introduce:""
				},
				baoming: true
			}
		},
		mounted() {
			_self = this;
			uni.getStorage({
				key: 'bit_id',
				success: function (res) {
					let bit_data = {
						wechat_bit_id:""
					}
					bit_data.wechat_bit_id = res.data
					// 请求用户数据
					httpRequest.getUserInfo(bit_data).then(res => {
						console.log("infoRes",res)
						_self.self_info = res[1].data.data[0]
						console.log(_self.self_info)
					}).catch(err => {
						console.log(err)
					})
				}
			})
		},
		methods: {
		showTips() {
			uni.showToast({
				title: '不允许修改',
				duration: 2000
			})
		},
		submit_info() {
			baomingRequest.Baoming(_self.baoming_data).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(res)
			})
			
			
			uni.showToast({
				title: '报名成功！',
				duration: 2000
			})
			
			uni.switchTab({
				url:'/pages/homepage/content'
			})
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
