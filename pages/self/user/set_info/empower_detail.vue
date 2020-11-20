<template>
	<view>
		<form>
			<view class="selfinfo" v-for="(item,stuid) in self_info" :key="item.stuid">
				<view class="cu-form-group margin-top">
					<view class="title">昵称</view>
					<input class="inputs" placeholder="昵称" name="input" :value="item.nickname" type="text"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">学号</view>
					<input class="inputs" placeholder="请输入学号" name="input" :value="item.stuid" type="number"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">登录密码</view>
					<input class="inputs" placeholder="请输入密码" name="input" :value="item.pwd" type="password"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">就读院校</view>
					<input class="inputs" placeholder="请输入就读院校" name="input" :value="item.school" type="text"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">真实姓名</view>
					<input class="inputs" placeholder="请输入真实姓名" name="input" :value="item.name" type="text"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<input class="inputs" placeholder="请输入联系方式" name="input" :value="item.phone" type="number"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
			</view>
		</form>
		<checkbox class="checkbox">我同意遵守诚信协议</checkbox>
		<button @click="save" class="save">立即认证</button>
		<view class="tips1">此认证严格遵守诚信协议，务必保证认证信息为个人真实信息</view>
	    <view class="tips2">所有个人信息将严格遵守《个人信息保密协议》</view>
		<view class="xieyi1">诚信协议></view>
		<view class="xieyi2">个人信息保密协议></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				self_info:[{
					"nickname":"wjz",
					"stuid":"170000000000",
					"pwd":"5300",
					"school":"北京理工大学珠海学院",
					"name":"吴军中",
					"phone":"13530000000"
					}
				]
			}
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.checkbox{
		margin-top: 30rpx;
		margin-left: 20rpx;
	}
	.save{
		background-color: #8DC63F;
		margin-top: 30rpx;
		color: #FFFFFF;
	}
	.tips1{
		margin-top: 120rpx;
		font-size: 20rpx;
		text-align: center;
		color:  #ADADAD ;
	}
	.tips2{
		font-size: 20rpx;
		text-align: center;
		color:  #ADADAD ;
	}
	.xieyi{
		font-size: 20rpx;
		margin-top: 170rpx;
		text-align: center;
		color:  #0000C6 ;
	}
	.xieyi1{
		font-size: 20rpx;
		margin-top: 140rpx;
		text-align: center;
		color:  #0000C6 ;
	}
	.xieyi2{
		font-size: 20rpx;
		text-align: center;
		color:  #0000C6 ;
	}
</style>

