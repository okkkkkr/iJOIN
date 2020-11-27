<template>
	<view>
		<view class="name bg-grey">{{activity_info.sponsor_name}}</view>
		<view class="goods_detail">
			<swiper indicator-dots>
				<swiper-item v-for="item in url_list">
					<image :src="item"></image>
				</swiper-item>
			</swiper>
			<view class="line"></view>
			<view class="box1">
				<view class="active_title">
					{{activity_info.activity_title}}
				</view>

				<view class="line"></view>
				<!-- <view class="box2">
				<view>货号：{{info.goods_no}}</view>
				<view>库存：{{info.stock_quantity}}</view>
			</view> -->
				<view class="box3">
					<view class="title">详情介绍</view>
					<view>
						{{activity_info.activity_content}}
					</view>
					<!-- <view class="content">
					<rich-text :nodes="content"></rich-text>
				</view> -->
				</view>
			</view>
			<view class="cu-capsule round padding-left">
				<view class='cu-tag bg-red'>
					<text>报名截止时间</text>
				</view>
				<view class="cu-tag line-red">
					{{activity_info.apply_end_time | formatDate}}
				</view>
			</view>
			
			<view class="goods_nav">
				<view class="cu-progress radius striped active">
					<view class="bg-red" :style="[{ width:loading? scale + '%' :''}]">已报名{{scale + '%'}}</view>
				</view>
				<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @buttonClick="buttonClick" :key="id"></uni-goods-nav>
			</view>

			<view class="cu-modal" :class="model_id == '1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">联系我们</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						{{activity_info.activity_leader}}:{{activity_info.activity_phone}}
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 80px;">
			
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import httpRequest from '../../../api/GetActive.js'

	var _self;
	export default {
		components: {
			uniGoodsNav
		},
		filters: {
			formatDate(date) {
				const nDate = new Date(date)
				const year = nDate.getFullYear()
				const month = nDate.getMonth() + 1
				const day = nDate.getDate()
				return year + '-' + month + '-' + day
			}
		},
		data() {
			return {
				id: 0,
				loading: false,
				scale: 0,
				swipers: [],
				applyOrNot: true,
				info: {},
				content: '',
				model_id: "0",
				buttonGroup: [{
						id: '1',
						text: '联系我们',
						backgroundColor: '#003D79',
						color: '#fff'
					},
					{
						id: '2',
						text: '加入我们',
						backgroundColor: '#1cbbb4',
						color: '#fff'
					}
				],
				activity_info: {},
				url_list: []
			}
		},
		methods: {

			async getDetailInfo() {
				const res = await this.$myRequest({
					url: '/api/goods/getinfo/' + this.id
				})
				this.info = res.data.message[0]
			},

			buttonClick(e) {
				console.log(e)
				this.model_id = e.content.id
				if (this.model_id == "2") {
					if(_self.applyOrNot){
						this.navigation_to('/pages/homepage/apply?activity_id=' + _self.activity_info.activity_id);
					}
					
				}
			},

			hideModal() {
				this.model_id = "0";
			},

			navigation_to(url) {
				uni.navigateTo({
					url
				})
			}


		},
		onLoad: function(option) {
			_self = this;
			
			uni.getStorage({
				key:'sponsor_id',
				success:function(res){
					console.log("getStorage")
					_self.applyOrNot = false;
				}
			})

			setTimeout(function() {
				_self.loading = true
			}, 500)

			let activity_data = {
				activity_id: option.activity_id
			}

			console.log("option.activity_id", option.activity_id)

			// 加载活动详细信息
			httpRequest.getActiveDetail(activity_data).then((res) => {
				_self.activity_info = res[1].data.data[0];

				// 计算已报名人数比例
				_self.scale = Math.round(((_self.activity_info.activity_registered / _self.activity_info.activity_people_number)*100))
				
				console.log("hello",_self.activity_info.activity_state)
				if(_self.activity_info.activity_state != "1"){
					_self.applyOrNot = false;
				}
				// 转换图片url数组
				_self.url_list = JSON.parse(_self.activity_info.activity_cover)
				console.log("url", _self.url_list)
			}).catch((err) => {
				console.log(err)
			})
			
			setTimeout(() => {
				//判断是否能报名
				if(_self.applyOrNot == false){
					_self.buttonGroup[1].backgroundColor = "#CDCDB4",
					_self.buttonGroup[1].text = "不可报名"
				}
			},800)

		}
	}
</script>

<style lang="scss">
	.name {
		width: 100%;
		opacity: .2;
		position: fixed;
		top: 0;
		font-size: 16px;
		text-align: center;
		padding: 10rpx 0;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);

		.inputs {
			margin-left: 20rpx;
		}
	}

	page {
		background: #FFFFFF;
	}

	.goods_detail {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 10px;

			.price {
				font-size: 28rpx;
				line-height: 80rpx;
			}

			.active_title {
				font-size: 40rpx;
				line-height: 60rpx;
			}
		}

		.box2 {
			padding: 0 10px;
			font-size: 32rpx;
			line-height: 70rpx;
		}

		.box3 {

			.title {
				font-size: 32rpx;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333333;
				line-height: 50rpx;
			}
		}

	}

	.goods_nav {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.line {
		height: 4rpx;
		width: 750rpx;
		background: #eee;
	}
</style>
