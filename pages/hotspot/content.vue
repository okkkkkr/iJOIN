<template>
	<view class="content">
		<view class="empty_box"></view>
		<view class="search_input">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入内容进行全局检索"
					 confirm-type="search" v-model:value="search_content"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-cyan shadow-blur round" @tap="search">搜索</button>
				</view>
			</view>
		</view>


		<view class="swiper_wrapper">
			<!-- 轮播框 -->
			<view class="swiper_image">
				<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="3000"
				 duration="500">
					<swiper-item v-for="(item,activity_id) in swiper_list" :key="activity_id" :data-id="activity_id" @tap="swiper_select">
						<image :src="(JSON.parse(item.activity_cover)[0])" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 轮播文字 -->
			<view class="swiper_text">
				<swiper class="screen-swiper" :circular="true" :autoplay="true" interval="3000"
				 duration="500">
					<swiper-item v-for="(item,activity_id) in swiper_list" :key="activity_id" :data-id="activity_id" @tap="swiper_select">
						<text>{{ item.activity_title }}</text>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!-- 刷新内容加载框 -->
		<Loadding class="loadding" v-show="set_loadding" :class="set_loadding===true?'loadding_enter':'loadding_cbk'"></Loadding>
		<!-- 热点内容 -->
		<view class="cu-card article" v-for="(item, activity_id) in activity_list" :key="item.activity_id" :data-id="item.activity_id" @tap="hotspot_select('/pages/homepage/activity/details?activity_id=' + item.activity_id)">
			<view class="article_cont cu-item shadow">
				<view class="title"><view class="text-cut">{{ item.activity_title }}</view></view>
				<view class="content">
					<image :src="(JSON.parse(item.activity_cover)[0])"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content">{{ item.activity_content }}</view>
						<view>
							<view class="cu-tag bg-cyan light sm round">{{ item.sponsor_name }}</view>
							<view class="cu-tag bg-red light sm round">HOT</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="advertisement">
			<image src="../../static/advertisement/adv.png"></image>
		</view>

	</view>
</template>

<script>
	import contRequest from '../../api/Content.js';
	import searchRequest from '../../api/Search.js';
	import Loadding from '../common_pages/loadding.vue';
	
	var _self;
	export default {
		components: {
			Loadding
		},
		watch:{
			search_content:function(val){
				if(val == ""){
					_self.set_loadding = true;
					setTimeout(()=>{
						contRequest.getHotContent().then((res) => {
							_self.set_loadding = false;
							_self.activity_list = res[1].data.data
						}).catch((err) => {
							console.log(err)
						})
					},800)
					
				}
			}
		},
		data() {
			return {
				search_content: "",
				searchIcon: "",
				InputBottom: 0,
				set_loadding: false,

				swiper_list: [{
						"activity_id": "1",
						"activity_title": "全国大学生电子设计竞赛踊跃报名中",
						"activity_cover": "../../static/swiper/swiper3.jpg",
					},
					{
						"activity_id": "2",
						"activity_title": "开学啦！新生必须要注意的十个问题！",
						"activity_cover": "../../static/swiper/swiper2.jpg",
					},
					{
						"activity_id": "3",
						"activity_title": "信息系统设计大拉开帷幕，田艳院长发表重要讲话！",
						"activity_cover": "../../static/swiper/swiper1.jpg",
					}
				],
				
				activity_list: [
					{
						"activity_id": "1",
						"activity_title": "新生爆照丨我想和你过个秋！",
						"activity_cover": "../../static/hotspot/student.jpeg",
						"sponsor_id": "iJoin",
						"activity_content": "在日常学习、工作或生活中，大家都经常接触到新闻稿吧，通过新闻稿可以把我们那些零零散散的思想，聚集在一块。你写新闻稿时总是无从下笔？以下是小编收集整理的学生毕业典..."
					}, {
						"activity_id": "2",
						"activity_title": "揭秘女生宿舍的桌子到底有什么？",
						"activity_cover": "../../static/hotspot/dormitory.jpg",
						"sponsor_id": "海贝TV",
						"activity_content": "近期小编收到很多粉丝的来信，都希望看看女生宿舍的桌子上都会摆放些什么东西，下面通过这条推送，大家"
					},
					{
						"activity_id": "3",
						"activity_title": "新生爆照丨我想和你过个秋！",
						"activity_cover": "../../static/hotspot/student.jpeg",
						"sponsor_id": "iJoin",
						"activity_content": "在日常学习、工作或生活中，大家都经常接触到新闻稿吧，通过新闻稿可以把我们那些零零散散的思想，聚集在一块。你写新闻稿时总是无从下笔？以下是小编收集整理的学生毕业典..."
					},
					{
						"activity_id": "4",
						"activity_title": "揭秘女生宿舍的桌子到底有什么？",
						"activity_cover": "../../static/hotspot/dormitory.jpg",
						"sponsor_id": "海贝TV",
						"activity_content": "近期小编收到很多粉丝的来信，都希望看看女生宿舍的桌子上都会摆放些什么东西，下面通过这条推送，大家"
					}
				]
			}
		},
		onLoad() {
			_self = this;
			contRequest.getHotSwiper().then((res) => {
				_self.swiper_list = res[1].data.data
				
			}).catch((err) => {
				console.log(err)
			})
			
			contRequest.getHotContent().then((res) => {
				_self.activity_list = res[1].data.data
			}).catch((err) => {
				console.log(err)
			})
		},
		methods: {
			// 检索框
			InputFocus(e) {
				this.InputBottom = e.detail.height;
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			
			// 轮播选择
			swiper_select(e) {
				console.log("swiper_select",e)
			},
			
			// 热点内容选择
			hotspot_select(url) {
				uni.navigateTo({
					url
				})
			},
			
			// 确认检索
			search(){
				console.log("_self.search_content",_self.search_content)
				if(_self.search_content == ""){
					uni.showToast({
						title:'请输入检索值',
						duration: 2000,
						icon:'none'
					})
				}else{
					let search_data = {
						test_content: _self.search_content
					}
					_self.set_loadding = true;
					_self.activity_list = [];
					setTimeout(() => {
						searchRequest.getSearch(search_data).then((res) => {
							_self.activity_list = res[1].data.data
							_self.set_loadding = false;
						}).catch((err) => {
							console.log(err)
						})
					}, 800)
					
				}
			}

		}
	}
</script>

<style>
	.search_input {
		position: fixed;
		z-index: 999;
		height: 50rpx;
		top: 0;
	}

	.empty_box,
	.search_input {
		width: 100%;
		height: 90rpx;
	}
	
	.swiper_text{
		background-color: #FFFFFF;
		padding: 10rpx 0 0 15rpx;
	}
	
	.swiper_text swiper{
		min-height: 40rpx!important;
		max-height: 50rpx;
	}
	
	.article_cont {
		margin-bottom: 0!important;
	}
	
	.advertisement {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30rpx;
	}

	.advertisement image {
		width: 95%;
		max-height: 150px
	} 
</style>
