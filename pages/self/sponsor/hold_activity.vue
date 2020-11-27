<template>
	<view>
		<view class="line"></view>
		<form>
			<view class="cu-form-group">
				<view class="title">活动负责人</view>
				<input placeholder="请输入负责人名字" name="input" v-model:value="activity_form.activity_leader"></input>
			</view>
			<view class="line"></view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="请输入联系方式" name="input" v-model:value="activity_form.activity_phone"></input>
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
			<view class="cu-form-group">
				<view class="title">所属类型</view>
				<picker @change="PickerChange" :value="index" :range="picker" range-key="sub_type_name">
					<view class="picker">
						{{index>-1?picker[index].sub_type_name:'请选择所属类型'}}
					</view>
				</picker>
			</view>
			<!-- <view class="cu-form-group margin-top">
				<view class="title">所属类型</view>
				<input placeholder="请输入所属类型" name="input"></input>
			</view> -->
			<view class="cu-bar bg-white" style="margin-top: 10rpx;">
				<view class="action">
					图片上传(首张将作为封面)
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
				<input placeholder="请输入标题" name="input" v-model:value="activity_form.activity_title"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">人数限制</view>
				<input placeholder="请输入报名限制的人数" name="input" type="number" v-model:value="activity_form.activity_people_number"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">报名截止时间</view>
				<picker mode="date" :value="activity_form.apply_end_time" :start="initBegin" :end="initEnd" @change="applyDateChange">
					<view class="picker">
						{{activity_form.apply_end_time}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">活动开始时间</view>
				<picker mode="date" :value="activity_form.activity_start_time" :start="initBegin" :end="initEnd" @change="beginDateChange">
					<view class="picker">
						{{activity_form.activity_start_time}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">活动结束时间</view>
				<picker mode="date" :value="activity_form.activity_end_time" :start="initBegin" :end="initEnd" @change="endDateChange">
					<view class="picker">
						{{activity_form.activity_end_time}}
					</view>
				</picker>
			</view>

			<view class="line"></view>
			<view class="cu-form-group">
				<textarea maxlength="-1" placeholder="请编写提送内容" v-model:value="activity_form.activity_content"></textarea>
			</view>
		</form>
		<view class="line"></view>
		<button class="cu-btn submit bg-cyan margin-tb-sm lg" @tap="submit">提交</button>
	</view>
</template>

<script>
	import httpRequest from "../../../utils/request.js"
	import Request from "../../../api/HoldAct.js"

	var _self;
	export default {
		data() {
			return {
				imgList: [],
				initBegin: "",
				initEnd: "",
				index: -1,
				activity_form: {
					activity_leader: "",
					activity_phone: "",
					sub_type_id: "",
					activity_title: "",
					activity_content: "",
					activity_cover: [],
					activity_start_time: "",
					activity_end_time: "",
					activity_people_number: 10,
					apply_end_time: ""
				},
				picker: [{
						sub_type_id: "A101",
						sub_type_name: "学术科技"
					},
					{
						sub_type_id: "A102",
						sub_type_name: "文化艺术"
					}, {
						sub_type_id: "A103",
						sub_type_name: "创新创业"
					}, {
						sub_type_id: "A201",
						sub_type_name: "比赛通知"
					}, {
						sub_type_id: "A202",
						sub_type_name: "新闻通知"
					},
				]
			}
		},
		onLoad() {
			_self = this;
			uni.getStorage({
				key: 'sponsor_id',
				success(res) {
					_self.$set(_self.activity_form, 'sponsor_id', res.data);
				}
			})

			// 初始化时间
			let nDate = new Date();
			let beginYear = nDate.getFullYear();
			let endYear = nDate.getFullYear() + 1;
			let month = nDate.getMonth() + 1;
			let day = nDate.getDate();
			_self.activity_form.activity_start_time = beginYear + '-' + month + '-' + day;
			_self.activity_form.activity_end_time = beginYear + '-' + month + '-' + day;
			_self.activity_form.apply_end_time = beginYear + '-' + month + '-' + day;
			_self.initBegin = beginYear + '-' + month + '-' + day;
			_self.initEnd = endYear + '-' + month + '-' + day;
		},
		methods: {
			// 报名截止时间
			applyDateChange(e) {
				_self.activity_form.apply_end_time = e.detail.value;
			},

			// 活动结束时间
			endDateChange(e) {
				_self.activity_form.activity_end_time = e.detail.value;
			},
			// 活动开始时间
			beginDateChange(e) {
				_self.activity_form.activity_start_time = e.detail.value;
			},

			// 单选框，选择类型
			PickerChange(e) {
				if (e.detail.value == -1) {
					uni.showToast({
						title: "请选择所属类型",
						duration: 2000
					})
				}
				_self.index = e.detail.value
				_self.activity_form.sub_type_id = _self.picker[_self.index].sub_type_id

			},

			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
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

			// textareaAInput(e) {
			// 	this.textareaAValue = e.detail.value
			// },

			submit() {
				console.log(_self.activity_form)
				console.log(_self.imgList[0])
				for (let i = 0; i < _self.imgList.length; i++) {
					uni.uploadFile({
						url: httpRequest.baseUrl + '/upload', //仅为示例，非真实的接口地址
						filePath: _self.imgList[i],
						name: 'file',
						formData: {
							sponsor_id: _self.activity_form.sponsor_id
						},
						success: (uploadFileRes) => {
							_self.activity_form.activity_cover.push(uploadFileRes.data);
						},
						fail(err) {
							console.log(err)
						}
					});
				}



				setTimeout(() => {
					console.log(_self.activity_form)
					Request.holdActivity(_self.activity_form).then((res) => {
						console.log(res)
					}).catch(err => {
						console.log(err)
					})
				}, 500)


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

	.textwrite {
		margin-left: 28rpx;
	}

	.line {
		height: 10rpx;
		width: 750rpx;
		background: #eee;
	}

	.submit {
		width: 100%;
		color: #FFFFFF;
		margin-top: 50rpx;
	}
</style>
