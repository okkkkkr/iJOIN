<template>
	<view class="content">
		<view class="avatar_wrapper">
			<view class="cu-avatar xl round" :style="[{backgroundImage:'url(' + wechat_icon + ');' }]"></view>
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
		<view class="card_wrapper cu-card article " v-for="(item, activity_id) in activity_list" :key="activity_id" :data-id="activity_id">
			<view class="card_item cu-item shadow">
				<view class="card_content content flex p-xs margin-bottom-sm mb-sm">
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
		
		<view class="get_details">
			<a href="#">{{acticity_tips}}</a>
		</view>
	</view>
</template>

<script>
	import actRequest from '../../../api/GetActive.js'
	
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
				wechat_icon:"",
				user_name: "",
				acticity_tips:"点击列表项目即可查看详情＞",
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
				]
			}
		},
		onLoad() {
			_self = this;
			
			uni.getStorage({
				key:'bit_id',
				success:function(res){
					let data = {
						user_id: res.data
					}
					
					actRequest.getUserJoining(data).then((res) => {
						if(res[1].data.code == 200){
							_self.activity_list = res[1].data.data;
						}else{
							_self.acticity_tips = "暂无活动信息"
						}
					}).catch((err) => {
						console.log(err)
					})
				}
			})
			
			uni.getStorage({
				key:'wechat_id',
				success:function(res) {
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
					
					
				}
			})
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
		padding: 0!important;
	}

	.card_item {
		margin-bottom: 0!important;
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
