<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">真实姓名</view>
				<input class="inputs" placeholder="真实姓名" name="input" v-model:value="self_info.user_name" type="text" disabled="true"
				 @tap="showTips"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">学号</view>
				<input class="inputs" placeholder="请输入学号" name="input" v-model:value="self_info.user_id" type="number" disabled="true"
				 @tap="showTips"></input>
			</view>
			<!-- <view class="cu-form-group">
					<view class="title">登录密码</view>
					<input class="inputs" placeholder="请输入密码" name="input" :value="self_info.pwd" type="password"></input>
				</view> -->
			<view class="cu-form-group">
				<view class="title">就读院校</view>
				<input class="inputs" placeholder="请输入就读院校" name="input" v-model:value="self_info.user_college" type="text"
				 disabled="true" @tap="showTips"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">就读专业</view>
				<input class="inputs" placeholder="请输入就读专业" name="input" v-model:value="self_info.user_major" type="number"
				 disabled="true" @tap="showTips"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input class="inputs" placeholder="请输入联系方式" name="input" v-model:value="set_data.user_phone" type="number"></input>
			</view>
			

			<button class="cu-btn save bg-cyan margin-tb-sm lg" @tap="submit_info">保存</button>
			<view class="tips1">登录密码用于学籍认证</view>
			<view class="tips2">所有个人信息将严格遵守《个人信息保密协议》</view>
			<view class="xieyi">个人信息保密协议></view>

		</form>
	</view>
</template>

<script>
	import httpRequest from '../../../../api/UserInfo.js'
	import wxRequest from '../../../../api/getAllWXuser.js'

	var _self;
	export default {
		data() {
			return { // 请求用户信息
				self_info: {},
				set_data:{
					wechat_id:"",
					user_phone:""
				}
			}
		},
		onLoad() {
			_self = this;
			uni.getStorage({
				key: 'bit_id',
				success: function(res) {
					let bit_data = {
						user_id: res.data
					}
					// 请求用户数据
					httpRequest.getUserInfo(bit_data).then(res => {
						console.log("infoRes", res)
						_self.self_info = res[1].data.data[0]
						console.log(_self.self_info)
					}).catch(err => {
						console.log(err)
					})
				}
			})
			
			uni.getStorage({
				key:'wechat_id',
				success:function(res){
					_self.set_data.wechat_id = res.data
					let wx_data = {
						wechat_id: res.data
					}
					wxRequest.getWXuser(wx_data).then((res) => {
						_self.set_data.user_phone = res[1].data.data[0].phone
					}).catch((err) => {
						console.log(err)
					})
				}
			})
			
			
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
				httpRequest.setUserInfo(_self.set_data).then(res => {
					uni.showToast({
						title: '更新成功',
						duration: 1000
					});
					setTimeout(() => {
						uni.navigateBack({
							delta: 2
						});
					}, 1000)

				}).catch(err => {
					console.log(err)
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
