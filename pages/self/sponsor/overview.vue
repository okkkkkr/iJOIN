<template>
	<view class="content" :class="pointer_event === false?'ban_pointor':''">
		<view class="avatar_wrapper">
			<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		</view>

		<view class="user_tips">
			<a class="user_detail" href="#" style="font-weight: bold;">{{ user_name }}</a>
			<text class="logout" @tap="logout">注销登录</text>
		</view>

		<!-- 注销登录提示框 -->
		<view class="cu-modal" :class="logout_flag === true ?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">注销登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否确认注销登录此账号？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="relaunch_to('/pages/login/login')">确定</button>

					</view>
				</view>
			</view>
		</view>

		<view class="my_item">
			<view class="my_item_tags bg-white padding">
				<view class="grid margin-bottom text-center col-3">
					<view v-for="(item, index) in tags_list" :key="index">
						<a class="tags_cont" :href="item.tag_path">{{item.tag_title}}</a>
						<text class="tags_text">{{item.tag_number}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="report">
			<button @tap="navigate_to('/pages/self/sponsor/hold_activity')" class="report-btn cu-btn round bg-orange">我要举办新活动</button>
		</view>

		<!-- 下方标签内容 -->
		<view class="card_wrapper cu-card article no-card">
			<view class="card_item cu-item shadow">
				<view class="title">
					<view class="title_tags bg-white padding">
						<view class="grid margin-bottom text-center col-2">
							<view class="title_left">
								<text>近期举办活动</text>
							</view>
							<view class="title_right" @tap="navigate_to('/pages/self/sponsor/examine_activity/examine_list')">
								<text>查看全部记录＞</text>
							</view>
						</view>
					</view>
				</view>

				<view class="card_content content flex p-xs margin-bottom-sm mb-sm" v-for="(item, activity_id) in activity_list"
				 :key="activity_id" :data-id="activity_id">
					<view class="time flex-sub padding-sm">
						{{item.activity_publish_time | formatDate}}
					</view>
					<view class="describe flex-treble padding-sm">
						{{item.activity_title}}
					</view>
					<view class="remarks flex-twice padding-sm">
						{{item.activity_leader}}
					</view>
				</view>

			</view>
		</view>

		<view class="card_wrapper cu-card article no-card">
			<view class="card_item cu-item shadow">
				<view class="title">
					<view class="title_tags bg-white padding">
						<view class="grid margin-bottom text-center col-2">
							<view class="title_left">
								<text>我的消息</text>
							</view>
							<view class="title_right">
								<text @tap="navigate_to('/pages/self/sponsor/message')">查看全部消息＞</text>
							</view>
						</view>
					</view>
				</view>

				<view class="card_content content flex p-xs margin-bottom-sm mb-sm" v-for="(item, notice_id) in notice_list" :key="notice_id"
				 :data-id="notice_id">
					<view class="time flex-sub padding-sm">
						{{item.notice_time}}
					</view>
					<view class="describe flex-treble padding-sm">
						{{item.notice_title}}
					</view>
					<view class="remarks flex-twice padding-sm">
						{{ item.scan_status }}
					</view>
				</view>

			</view>
		</view>

		<view class="set_info">
			<text @tap="navigate_to('/pages/self/sponsor/set_info/details')">修改资料＞</text>
		</view>
	</view>

</template>

<script>
	import httpRequest from '../../../api/GetActive.js'

	var _self;
	export default {
		filters: {
			formatDate(date) {
				const nDate = new Date(date)
				console.log(nDate)
				const year = nDate.getFullYear()
				const month = nDate.getMonth() + 1
				const day = nDate.getDate()
				return year + '/' + month + '/' + day
				
			}
		},
		data() {
			return {

				user_name: "iJOIN",
				logout_flag: false,
				pointer_event: true,
				tags_list: [{
						index: 1,
						tag_title: "我的发布",
						tag_path: "#",
						tag_number: "68"
					},
					{
						index: 2,
						tag_title: "正在进行",
						tag_path: "#",
						tag_number: "3"
					},
					{
						index: 3,
						tag_title: "审核中",
						tag_path: "#",
						tag_number: "9"
					},
				],
				activity_list:[
					{
						activity_id: "1",
						leader: "吴俊忠",
						activity_title: "微信小程序之创新创意编程总决赛",
						activity_publish_time: "2020/09/29"
					}, {
						activity_id: "2",
						leader: "陈颖茵",
						activity_title: "游戏角色原画设计初赛",
						activity_publish_time: "2020/10/30"
					}
				],
				notice_list: [{
						notice_id: 1,
						notice_title: "微信小程序之创新创意编程总决赛咨询",
						scan_status: "待处理",
						notice_time: "2020/10/25"
					},
					{
						notice_id: 2,
						notice_title: "游戏角色原画设计大赛09-26报名名单审核",
						scan_status: "待处理",
						notice_time: "2020/10/28"
					}
				]
			}
		},
		mounted() {
			_self = this;
			uni.getStorage({
				key: 'sponsor_id',
				success: function(res) {
					let sponsor_data = {
						sponsor_id: ""
					}
					sponsor_data.sponsor_id = res.data
					// 请求用户数据
					httpRequest.getActiveInfo(sponsor_data).then(res => {
						console.log('result', res[1].data.data);
						_self.activity_list = [].concat(res[1].data.data);
					}).catch(err => {
						console.log(err)
					})

				}
			})
		},
		methods: {

			logout() {
				_self.logout_flag = true
				_self.pointer_event = false
			},

			hideModal() {
				_self.logout_flag = false
				_self.pointer_event = true
			},


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

	.ban_pointor {
		pointer-events: none;
	}
</style>
