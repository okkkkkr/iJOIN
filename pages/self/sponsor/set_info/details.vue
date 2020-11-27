<template>
	<view>
		<form>

			<view class="cu-form-group margin-top">
				<view class="title">名称</view>
				<input placeholder="请输入名称" name="input" v-model:value="sponsor_info.sponsor_name" type="text" disabled="true" @tap="showTips"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">编号</view>
				<input placeholder="请输入编号" name="input" v-model:value="sponsor_info.sponsor_id" type="text" disabled="true" @tap="showTips"></input>
			</view>
			<!-- <view class="cu-form-group">
					<view class="title">登录密码</view>
					<input placeholder="请输入密码" name="input" v-model:value="item.pwd" type="password"></input>
				</view> -->
			<view class="cu-form-group">
				<view class="title">注册院校</view>
				<input placeholder="请输入注册院校" name="input" v-model:value="sponsor_info.sp_college" type="text" disabled="true" @tap="showTips"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">负责人</view>
				<input placeholder="请输入负责人姓名" name="input" v-model:value="sponsor_info.leader" type="text"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="请输入联系方式" name="input" v-model:value="sponsor_info.leader_phone" type="number"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>

		</form>
		<button class="cu-btn save bg-cyan margin-tb-sm lg" @tap="submit_info">保存</button>
		<view class="tips1">登录密码用于学籍认证</view>
		<view class="tips2">所有个人信息将严格遵守《个人信息保密协议》</view>
		<view class="xieyi">个人信息保密协议></view>
	</view>
</template>

<script>
	import httpRequest from '../../../../api/UserInfo.js'

	var _self;
	export default {
		data() {
			return {
				sponsor_info: {}
			}
		},
		onLoad() {
			_self = this;
			uni.getStorage({
				key: 'sponsor_id',
				success: function(res) {
					let sponsor_data = {
						sponsor_id: ""
					}
					sponsor_data.sponsor_id = res.data
					// 请求用户数据
					httpRequest.getSponsorInfo(sponsor_data).then(res => {
						_self.sponsor_info = res[1].data.data[0]
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
				let sponsor_data = {
					leader: _self.sponsor_info.leader,
					leader_phone: _self.sponsor_info.leader_phone,
					sponsor_id: _self.sponsor_info.sponsor_id
				}
				
				httpRequest.setSponsorInfo(sponsor_data).then(res => {
					console.log(res)
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
