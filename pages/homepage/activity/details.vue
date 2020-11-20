<template>
	<view>
		<view class="line"></view>
	    <view class="goods_detail">
		<swiper indicator-dots>
			<swiper-item >
				<image src="http://shang.xy.bitzh.edu.cn/wp-content/uploads/2019/04/IMG_4714-1078x516.jpg"></image>
			</swiper-item>
		</swiper>
		<view class="line"></view>
		<view class="box1">
			<view class="active_title">
				商院精英齐聚一堂！
			</view>
			<view class="price">
				<text>上限人数：100人</text>
			</view>
			
			<view class="line"></view>
			<!-- <view class="box2">
				<view>货号：{{info.goods_no}}</view>
				<view>库存：{{info.stock_quantity}}</view>
			</view> -->
			<view class="line"></view>
			<view class="box3">
				<view class="title">详情介绍</view>
				<view>
					商院各大教授为您开启学术沙龙！
				</view>
				<!-- <view class="content">
					<rich-text :nodes="content"></rich-text>
				</view> -->
			</view>
		</view>
		<view class="goods_nav">
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
					吴俊忠:13169608945
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
	</view>
</template> 

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				id: 0,
				swipers: [],
				info: {},
				content: '',
				model_id: "0",
				buttonGroup: [{
					    id:'1',
						text: '联系我们',
						backgroundColor: '#003D79',
						color: '#fff'
					},
					{
						id:'2',
						text: '报名通道',
						backgroundColor: '#1cbbb4',
						color: '#fff'
					}
				]
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
				if(this.model_id == "2"){
					this.navigation_to('/pages/demoPage/baoming');
				}
			},
			
			hideModal(){
				this.model_id = "0";
			},
			
			navigation_to(url){
				uni.navigateTo({
					url
				})
			}


		},
		onLoad(options) {
			
		}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
		.inputs{
			margin-left: 20rpx;
		}
	}
	page{
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
			padding-bottom: 50px;
			.title {
				font-size: 32rpx;
				padding-left: 10px;
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

