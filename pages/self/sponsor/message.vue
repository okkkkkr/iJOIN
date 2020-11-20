<template>
	<view class="content">
		<view class="avatar_wrapper">
			<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		</view>

		<view class="user_tips">
			<a class="user_detail" href="#" style="font-weight: bold;">{{ user_name }}</a>
		</view>

		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入检索内容"
				 confirm-type="search"></input>
			</view>
		</view>

		<!-- 即将进行的活动列表 -->
		<view class="card_wrapper cu-card article " v-for="(item, notice_id) in notice_list" :key="notice_id" :data-id="notice_id">
			<view class="card_item cu-item shadow">
				<view class="card_content content flex p-xs margin-bottom-sm mb-sm">
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

		<view class="get_details">
			<a href="#">点击列表项目即可了解详情＞</a>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_name: "iJoin",
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
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
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
		align-items: center;
		padding: 20rpx 0;
		background-color: #FFFFFF;
	}

	.card_content {
		margin-bottom: 0;
		padding: 0 !important;
	}

	.card_item {
		margin-bottom: 0 !important;
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

	.get_details {
		width: 100%;
		color: #a6a6a6;
		margin: 50rpx 0;
		text-align: center;
	}
</style>
