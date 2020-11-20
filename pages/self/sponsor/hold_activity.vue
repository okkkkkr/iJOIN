<template>
	<view>
		<view class="line"></view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">活动负责人</view>
				<input placeholder="请输入负责人名字" name="input"></input>
			</view>
			<view class="line"></view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="请输入联系方式" name="input"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="cu-form-group margin-top">
				<view class="title">所属类型</view>
				<input placeholder="请输入所属类型" name="input"></input>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			
			
			
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="cu-form-group">
				<view class="title">标题</view>
				<input placeholder="请输入标题" name="input"></input>
			</view>
			<view class="line"></view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请编写提送内容"></textarea>
			</view>
		</form>
		<view class="line"></view>
		<button class="cu-btn submit bg-cyan margin-tb-sm lg" @tap="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				textareaAValue: '',
			}
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			
			submit(){
				uni.showToast({
					title:"发布成功",
					duration:1000,
					success() {
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/homepage/content'
							})
						},1500)
						
					}
				})
				
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.cu-form-group{
		margin-top: 2rpx;
	}
	.textwrite{
		margin-left: 28rpx;
	}
	.line {
		height: 10rpx;
		width: 750rpx;
		background: #eee;
	}
	.submit{
		width: 100%;
		color: #FFFFFF;
		margin-top: 50rpx;
	}
</style>
