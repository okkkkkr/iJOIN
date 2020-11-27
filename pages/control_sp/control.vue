<template>
	<view class="">
		<view class="">
			<input type="text" v-model:value="sponsor_id" />
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
			<view>
				<button type="default" @tap="submit">上传</button>
			</view>
		</view>
		<view>
			<image :src="url" mode=""></image>
		</view>
		
		
	</view>
	

</template>

<script>
	import httpRequest from "../../utils/request.js"
	var _self;
	export default {
		data() {
			return {
				head: {
					sponsor_icon: ""
				},
				imgList: [],
				url:"",
				sponsor_id:""
			}
		},
		onLoad() {
			_self = this;
		},

		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						console.log("this.imgList", this.imgList)
					}
				});
			},

			ViewImage(e) {
				uni.previewImage({
					urls: _self.imgList,
					current: e.currentTarget.dataset.url
				});
			},

			DelImg(e) {
				uni.showModal({
					success: res => {
						if (res.confirm) {
							_self.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},

			submit() {
				console.log(_self.activity_form)
				console.log(_self.imgList[0])
				uni.uploadFile({
					url: httpRequest.baseUrl + '/sponsorUpload', //仅为示例，非真实的接口地址
					filePath: _self.imgList[0],
					name: 'file',
					formData: {
						sponsor_id: _self.sponsor_id // 这里写sponsor_id
					},
					success: (uploadFileRes) => {
						_self.url = uploadFileRes.data;
						console.log(JSON.stringify(uploadFileRes.data));
					},
					fail(err) {
						console.log(err)
					}
				});
			}
		}
	}
</script>

<style>
</style>
