<template>
	<view class="content">
		<view class="empty_box"></view>
		<view class="search_input">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入检索内容"
					 confirm-type="search" :value="search_content"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-cyan shadow-blur round">搜索</button>
				</view>
			</view>
		</view>

		<!-- 导航框 -->
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation>
			<view class="cu-item" :class="sup_type_id == TabCur?'tab_color_focus cur':''" v-for="(item, sup_type_id) in nav_list"
			 :key="sup_type_id" @tap="tabSelect" :data-id="sup_type_id">
				{{item.sup_type_name}}
			</view>
		</scroll-view>

		<!-- 分类栏 -->
		<view class="tag_wrapper">
			<view class='cu-tag radius' :class="sub_type_id == TagCur ? 'tag_color_focus':'tag_color_unfocus'" v-for="(item, sub_type_id) in tag_list"
			 :key="item.sub_type_id" @tap="tagSelect" :data-id="sub_type_id">
				{{ item.sub_type_name }}
			</view>
		</view>

		<!-- 刷新内容加载框 -->
		<Loadding class="loadding" v-show="set_loadding" :class="set_loadding===true?'loadding_enter':'loadding_cbk'"></Loadding>

		<!-- 展示内容 -->
		<view class="cu-card case" v-for="(item, activity_id) in activity_list" :key="activity_id" :data-id="activity_id"
		 @tap="activitySelect(item.url)">
			<view class="cu-item shadow">
				<view class="image">
					<image style="max-height: 500rpx;" :src="item.activity_cover" mode="widthFix"></image>
					<view class="cu-tag bg-blue">{{ item.sub_type_name }}</view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">{{ item.activity_title}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{item.sponsor_name}} &nbsp;&nbsp; {{ item.activity_publish_time }}
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 1.2k
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 1k
								</view>
							</view>
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
	import Loadding from '../common_pages/loadding.vue';
	import httpRequest from '../../api/NavList.js';
	var _self;
	export default {
		components: {
			Loadding
		},
		data() {
			return {
				searchIcon: "",
				search_content: "",
				TabCur: 0,
				TagCur: 0,
				InputBottom: 0,
				set_loadding: false,


				nav_list: [{
						sup_type_id: 1,
						sup_type_name: "i 组织"
					},
					{
						sup_type_id: 2,
						sup_type_name: "i 活动"
					}
				],
				
				tag_model:[
					{
						sub_type_id: "0100",
						sub_type_name: "全部分类"
					}
				],

				tag_list: [],

				tag_list_2: [],

				active_list: [{
						activity_id: "1",
						sub_type_name: "学术科技",
						activity_cover: "../../static/home_page_content/test1.jpg",
						sponsor_name: "iJoin",
						activity_title: "这个工作室在北理珠火了！快来加入",
						activity_publish_time: "2020-11-10",
						url:'/pages/demoPage/demoDetail'
					},
					{
						activity_id: "2",
						sub_type_name: "学术科技",
						activity_cover: "../../static/home_page_content/test2.jpg",
						sponsor_name: "商职协",
						activity_title: "致力为商院学生提供就职机会！",
						activity_publish_time: "2020-11-10",
						url:''
					},
					{
						activity_id: "3",
						sub_type_name: "创新创业",
						activity_cover: "../../static/home_page_content/test3.jpg",
						sponsor_name: "创业学院",
						activity_title: "创新创业联盟-赢在“企”跑线！",
						activity_publish_time: "2020-11-10",
						url:''
					},
					{
						activity_id: "4",
						sub_type_name: "文化艺术",
						activity_cover: "../../static/home_page_content/test4.jpg",
						sponsor_name: "大艺团",
						activity_title: "大学生艺术团带你实现人生目标！",
						activity_publish_time: "2020-11-10",
						url:''
					},
					{
						activity_id: "5",
						sub_type_name: "文化艺术",
						activity_cover: "../../static/home_page_content/test5.png",
						sponsor_name: "电影社-",
						activity_title: "史诗巨作邀你一同欣赏",
						activity_publish_time: "2020-11-10",
						url:''
					},
					{
						activity_id: "6",
						sub_type_name: "学术科技",
						activity_cover: "../../static/home_page_content/test6.jpeg",
						sponsor_name: "学生科技协会",
						activity_title: "大学生艺术团带你实现人生目标！",
						activity_publish_time: "2020-11-10",
						url:''
					},{
						activity_id: "7",
						sub_type_name: "学术科技",
						activity_cover: "../../static/demoImg/demoImg.jpg",
						sponsor_name: "北理珠商学院",
						activity_title: "商院精英齐聚一堂！",
						activity_publish_time: "2020-11-20",
						url:'/pages/homepage/activity/details'
					}
				],
				activity_list: [
					{
						activity_id: "1",
						sub_type_name: "文化艺术",
						activity_cover: "../../static/home_page_content/test4.jpg",
						sponsor_name: "大艺团",
						activity_title: "大学生艺术团带你实现人生目标！",
						activity_publish_time: "2020-11-10",
						url:''
					},
					{
						activity_id: "2",
						sub_type_name: "创新创业",
						activity_cover: "../../static/home_page_content/test3.jpg",
						sponsor_name: "创业学院",
						activity_title: "创新创业联盟-赢在“企”跑线！",
						activity_publish_time: "2020-11-10",
						url:''
					},
					{
						activity_id: "3",
						sub_type_name: "学术科技",
						activity_cover: "../../static/home_page_content/test2.jpg",
						sponsor_name: "商职协",
						activity_title: "致力为商院学生提供就职机会！",
						activity_publish_time: "2020-11-10"
					},{
						activity_id: "4",
						sub_type_name: "学术科技",
						activity_cover: "../../static/home_page_content/test1.jpg",
						sponsor_name: "iJoin",
						activity_title: "这个工作室在北理珠火了！快来加入",
						activity_publish_time: "2020-11-10",
						url:'/pages/demoPage/demoDetail'
					},
					{
						activity_id: "5",
						sub_type_name: "文化艺术",
						activity_cover: "../../static/home_page_content/test5.png",
						sponsor_name: "电影社-",
						activity_title: "史诗巨作邀你一同欣赏",
						activity_publish_time: "2020-11-10",
						url:''
					},
					{
						activity_id: "6",
						sub_type_name: "学术科技",
						activity_cover: "../../static/home_page_content/test6.jpeg",
						sponsor_name: "学生科技协会",
						activity_title: "大学生艺术团带你实现人生目标！",
						activity_publish_time: "2020-11-10",
						url:''
					},{
						activity_id: "7",
						sub_type_name: "学术科技",
						activity_cover: "../../static/demoImg/demoImg.jpg",
						sponsor_name: "北理珠商学院",
						activity_title: "商院精英齐聚一堂！",
						activity_publish_time: "2020-11-20",
						url:'/pages/homepage/activity/details'
					}
				]

			}
		},
		onLoad() {
			console.log("onload")
			_self = this;
			console.log(_self)
			
			httpRequest.getChildrenNav("01").then(res => {
				_self.tag_list = _self.tag_model.concat(res[1].data.data)
			}).catch(err => {
				console.log("err", err)
			})
			
			uni.getStorage({
			    key: 'role',
			    success: function (res) {
					console.log("role",res)
			        if(res.data == 0){
						console.log("setTabBar")
						uni.setTabBarItem({
						  index: 2,
						  text: 'i 组织'
						})
					}
			    }
			});
		},
		methods: {
			// 检索框
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				// this.InputBottom = 0
			},

			// 导航栏
			tabSelect(e) {
				console.log("---------------", e)
				_self.TabCur = e.currentTarget.dataset.id
				let id = e.currentTarget.dataset.id == 0 ? "01":"02";
				
				_self.tag_list.splice(0, _self.tag_list.length);
				_self.activity_list.splice(0, _self.activity_list.length);
				_self.set_loadding = true;
				setTimeout(() => {
					_self.set_loadding = false;
					httpRequest.getChildrenNav(id).then(res => {
							_self.tag_list = _self.tag_model.concat(res[1].data.data)
					}).catch(err => {
						console.log("err", err)
					})
					_self.activity_list = [].concat(_self.active_list)
				}, 2000)
			},

			// 分类栏
			tagSelect(e) {
				_self.activity_list.splice(0, _self.activity_list.length);
				_self.set_loadding = true;
				setTimeout(() => {
					_self.set_loadding = false;
					_self.activity_list = [].concat(_self.active_list)
				}, 2000)
				this.TagCur = e.currentTarget.dataset.id;
			},

			// 活动内容
			activitySelect(url) {
				uni.navigateTo({
					url
				})
			},

			

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

	.nav {
		padding: 0 20rpx;
	}

	.cu-item {
		font-weight: bold;
	}

	.tag_wrapper {
		padding: 25rpx 25rpx;
		border-bottom: 1px solid #ebebeb;
	}

	,

	.tag_color_unfocus {
		color: #808080;
	}

	.tab_color_focus,
	.tag_color_focus {
		color: #ff972f;
	}

	.tag_wrapper {
		background-color: #FFFFFF;
	}

	.advertisement {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.advertisement image {
		width: 95%;
		max-height: 200px
	}
</style>
