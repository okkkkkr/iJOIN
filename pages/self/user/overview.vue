<template>
	<view class="content">
		<view class="avatar_wrapper">
			<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		</view>

		<view class="user_tips">
			<a class="user_detail" href="#" style="font-weight: bold;">{{ user_name }}</a>
			<a class="logout" href="pages/login/login">注销登录</a>
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
								<a href="">查看全部记录＞</a>
							</view>
						</view>
					</view>
				</view>

				<view class="card_content content flex p-xs margin-bottom-sm mb-sm" v-for="(item, activity_id) in activity_list" :key="activity_id"
				 :data-id="activity_id">
					<view class="time flex-sub padding-sm">
						{{item.activity_publish_time}}
					</view>
					<view class="describe flex-treble padding-sm">
						{{item.activity_title}}
					</view>
					<view class="remarks flex-twice padding-sm">
						{{ item.sponsor_name }}
					</view>
				</view>

			</view>
		</view>
		
		<view class="set_info">
			<a href="#">修改资料＞</a>
		</view>
	</view>

</template>

<script>
	var _selt;
	export default {
		data() {
			return {
				user_name: "iJOIN",
				tags_list: [{
						index: 1,
						tag_title: "我参与过",
						tag_path: "#",
						tag_number: "12"
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
						tag_path: "#",
						tag_number: "6"
					},
				],
				activity_list: [
					{
						activity_id: "1",
						sponsor_name: "学生科技协会",
						activity_title: "信息系统分析与设计大赛",
						activity_publish_time: "2020/11/10"
					}, {
						activity_id: "2",
						sponsor_name: "京涛海纳",
						activity_title: "林俊杰线下演出会北理珠站",
						activity_publish_time: "2020/10/21"
					}, 
				]
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
	
	.set_info{
		width: 100%;
		color: #a6a6a6;
		margin: 50rpx 0;
		text-align: center;
	}
</style>
