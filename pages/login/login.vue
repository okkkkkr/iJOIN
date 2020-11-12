<template>
	<view class="content">
		<view class="head_logo">
			<image src="../../static/login/login_head.png" mode=""></image>
		</view>

		<view class="choice_tips">
			<text>请选择登录方式</text>
		</view>

		<button class="wx-btn cu-btn bg-green round shadow" @tap="wx_login">微信账号登陆</button>
		<button class="public-btn cu-btn bg-green round shadow">官方账号登陆</button>

		<view class="login_tips">
			<text>登录后可使用相应账号的功能</text>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			_self = this;
			console.log("onLoad!")
		},
		onHide() {
			console.log("onHide!")
		},
		methods: {
			wx_login() {
				// uni.request({
				// 	url: '',
				// 	data:{
						
				// 	},
				// 	header:{
						
				// 	},
				// 	success: (res) => {
				// 		uni.setStorage({
							
				// 		})
				// 		uni.switchTab({
				// 			url: '/pages/homepage/content'
				// 		})
				// 	},
				// 	fail:err => {
						
				// 	}
				// })
				uni.switchTab({
					url: '/pages/homepage/content'
				})
			}
		}
	}
</script>

<style>
	html {
		background-image: url(../../static/login/head_bg.jpg);
		background-size: 100% 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.head_logo image {
		width: 180rpx;
		height: 180rpx;
		border: 3px solid #FFFFFF;
		border-radius: 50%;
		margin-top: 270rpx;
	}

	.choice_tips {
		color: #adadad;
		font-size: 16px;
		margin: 40rpx 0 60rpx;
	}

	.wx-btn,
	.public-btn {
		width: 70%;
		height: 100rpx;
		margin-top: 40rpx;
	}

	.wx-btn {
		background-color: #43cf7c !important;
	}

	.public-btn {
		background-color: #4aa0d5 !important;
	}

	.login_tips {
		margin-top: 60rpx;
		font-size: 12px;
		color: #adadad;
	}
</style>
