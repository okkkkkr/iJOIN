<template>
	<view class="content">
		<view class="avatar_wrapper">
			<view class="cu-avatar xl round" :style="[{backgroundImage:'url(' + wechat_icon + ');' }]"></view>
		</view>

		<view class="user_tips">
			<a class="user_detail" href="#" style="font-weight: bold;">{{ user_name }}</a>
			<text class="logout" @tap="relaunch_to('/pages/login/login')">注销登录</text>
		</view>

		<view class="my_item">
			<view class="my_item_tags bg-white padding">
				<view class="grid margin-bottom text-center col-3">
					<view v-for="(item, index) in tags_list" :key="index">
						<a class="tags_cont" @tap="navigate_to(item.tag_path)">{{item.tag_title}}</a>
						<text class="tags_text">{{item.tag_number}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="report">
			<button class="report-btn cu-btn round bg-orange">查看我的活动统计报告</button>
		</view>

		<!-- 下方标签内容 -->
		<view class="card_wrapper cu-card article no-card">
			<view class="card_item cu-item shadow">
				<view class="title">
					<view class="title_tags bg-white padding">
						<view class="grid margin-bottom text-center col-2">
							<view class="title_left">
								<text>我即将进行的活动</text>
							</view>
							<view class="title_right">
								<text @tap="navigate_to('/pages/self/user/joining')">查看全部记录＞</text>
							</view>
						</view>
					</view>
				</view>

				<view class="card_content content flex p-xs margin-bottom-sm mb-sm" v-for="(item, activity_id) in activity_list"
				 :key="activity_id" :data-id="activity_id">
					<view class="time flex-sub padding-sm">
						{{item.activity_start_time | formatDate}}
					</view>
					<view class="describe flex-treble padding-sm">
						{{item.activity_title}}
					</view>
					<view class="remarks flex-twice padding-sm">
						{{ item.activity_leader }}
					</view>
				</view>

			</view>
		</view>

		<view class="set_info">
			<text @tap="navigate_to('/pages/self/user/set_info/details')">修改资料＞</text>
		</view>
	</view>

</template>

<script>
	import httpRequest from '../../../api/UserInfo.js';
	import wxRequest from '../../../api/getAllWXuser.js';
	import actRequest from '../../../api/GetActive.js';
	import noticeRequest from '../../../api/Notice.js';

	var _self;
	export default {
		filters: {
			formatDate(date) {
				const nDate = new Date(date)
				const year = nDate.getFullYear()
				const month = nDate.getMonth() + 1
				const day = nDate.getDate()
				return year + '/' + month + '/' + day
			}
		},
		data() {
			return {
				user_name: "",
				wechat_icon:"",
				joining_list:[],
				tags_list: [{
						index: 1,
						tag_title: "我参与过",
						tag_path: "/pages/self/user/paticipate/paticipate_records",
						tag_number: "0"
					},
					{
						index: 2,
						tag_title: "我的足迹",
						tag_path: "#",
						tag_number: "69"
					},
					{
						index: 3,
						tag_title: "我的消息",
						tag_path: "/pages/self/user/message",
						tag_number: "0"
					},
				],
				activity_list: [
				// 	{
				// 	activity_id: "1",
				// 	sponsor_name: "学生科技协会",
				// 	activity_title: "信息系统分析与设计大赛",
				// 	activity_publish_time: "2020/11/10"
				// }, {
				// 	activity_id: "2",
				// 	sponsor_name: "京涛海纳",
				// 	activity_title: "林俊杰线下演出会北理珠站",
				// 	activity_publish_time: "2020/10/21"
				// } 
				],
				
				notice_list:[]
			}
		},
		mounted() {
			_self = this;
			
			uni.getStorage({
				key:'wechat_icon',
				success(res) {
					_self.wechat_icon = res.data;
				}
			})
			
			uni.getStorage({
				key:'wechat_name',
				success(res) {
					_self.user_name = res.data;
				}
			})
			
			uni.getStorage({
				key:'bit_id',
				success:function(res){
					let data = {
						user_id: res.data
					}
					
					//获取我参与过的活动信息
					actRequest.getUserActiveInfo(data).then((res) => {
						console.log("res.data",res)
						console.log("getAll",_self.tags_list[0].tag_number)
						if(res[1].data.code == 200){
							_self.activity_list = res[1].data.data;
							_self.tags_list[0].tag_number = _self.activity_list.length;
						}
					}).catch((err) => {
						console.log(err)
					})
					
					// 获取我即将进行的活动
					actRequest.getUserJoining(data).then((res) => {
						_self.joining_list = res[1].data.data
					}).catch((err) => {
						console.log(err)
					})
				}
			})
			
			uni.getStorage({
				key:'wechat_id',
				success(res) {
					let data = {
						user_id: res.data
					}
					
					let notice_data = {
						obj_id: res.data
					}
					
					
					
					// 获取我的消息（用户未处理）
					noticeRequest.getUntreated(notice_data).then((res) => {
						console.log("getNotice")
						if(res[1].data.code == 200){
							_self.notice_list = res[1].data.data;
							for(let i=0; i<_self.notice_list.length; i++){
								_self.notice_list[i].notice_status = "未处理"
							}
							_self.tags_list[2].tag_number = _self.notice_list.length
						}else{
							_self.tags_list[2].tag_number = 0;
						}
					}).catch((err) => {
						console.log(err)
					})
					
				}
			})
			
			
			

		},
		methods: {
			// 保留当前页面，跳转至另一页面
			navigate_to(pathName) {
				uni.navigateTo({
					url: pathName
				})
			},

			// 关闭所有页面，跳转另一页面
			relaunch_to(pathName) {
				console.log(pathName)
				uni.reLaunch({
					url: pathName
				})
			}
		}
	}
</script>

<style>
	.avatar_wrapper {
		height: 200rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
		position: relative;
		background-color: #FFFFFF;
	}

	.user_tips {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding: 20rpx 0;
		background-color: #FFFFFF;
	}

	.user_detail {
		display: inline;
	}

	.logout {
		position: absolute;
		left: 570rpx;
		color: #2a82e4;
	}

	.tags_text {
		font-size: 12px;
	}

	.tags_cont {
		font-size: 12px;
		margin-bottom: 15rpx;
	}

	.my_item_tags {
		padding: 15rpx 0 5rpx;
	}

	.report {
		display: flex;
		justify-content: center;
		background-color: #FFFFFF;
		padding-bottom: 30rpx;
	}

	.report-btn {
		background-color: #fe3528;
	}

	.card_wrapper {
		margin-top: 25rpx;
	}

	.title_tags {
		font-size: 25rpx;
		padding: 0;
		height: 45px;
		border-bottom: 1px solid #f1f1f1;
	}

	.title_left,
	.title_right {
		display: flex;
		height: 45px;
		align-items: center;
	}

	.title_right {
		justify-content: flex-end;
		color: #a6a6a6;
	}

	.card_content {
		margin-bottom: 0;
		padding-top: 20rpx;
	}

	.card_item {
		padding: 0 !important;
	}

	.time,
	.describe,
	.remarks {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #888888;
	}

	.time,
	.describe {
		margin-right: 10rpx;
	}

	.remarks {
		justify-content: flex-end;
	}

	.set_info {
		width: 100%;
		color: #a6a6a6;
		margin: 50rpx 0;
		text-align: center;
	}
</style>
