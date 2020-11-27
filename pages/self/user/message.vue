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
		<view class="card_wrapper cu-card article " v-for="(item, notice_id) in notice_list" :key="notice_id" :data-id="notice_id" @tap="change_state">
			<view class="card_item cu-item shadow">
				<view class="card_content content flex p-xs margin-bottom-sm mb-sm">
					<view class="time flex-sub padding-sm">
						{{item.notice_time | formatDate}}
					</view>
					<view class="describe flex-treble padding-sm">
						{{item.notice_content}}
					</view>
					<view class="remarks flex-twice padding-sm">
						{{ item.notice_status }}
					</view>
				</view>
			</view>
		</view>
		
		<view class="get_details">
			<a href="#">{{notice_tips}}</a>
		</view>
	</view>
</template>

<script>
	import noticeRequest from '../../../api/Notice.js'
	
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
				notice_tips:"点击列表项目即可查看详情＞",
				notice_list:[
					// {
					// 	notice_id: 1,
					// 	notice_title: "微信小程序之创新创意编程总决赛入围通知",
					// 	scan_status: "待处理",
					// 	notice_time: "2020/9/20"
					// },
					// {
					// 	notice_id: 2,
					// 	notice_title: "游戏角色原画设计大赛参赛须知",
					// 	scan_status: "待处理",
					// 	notice_time: "2020/10/28"
					// }
				]
			}
		},
		onLoad() {
			_self = this;
			uni.getStorage({
				key:'wechat_id',
				success(res) {
					let notice_data = {
						obj_id: res.data
					}
					
					
					// 获取我的消息（主办方未处理）
					noticeRequest.getUntreated(notice_data).then((res) => {
						console.log("getNotice")
						if(res[1].data.code == 200){
							let initStatus = [].concat(res[1].data.data);
							console.log(_self.notice_list.length)
							if(_self.notice_list.length == 0){
								initStatus[0].notice_status = "未处理"
							}
							for(let i=0; i<_self.notice_list.length; i++){
								console.log("in",i)
								initStatus[i].notice_status = "未处理"
							}
							console.log("initStatus",initStatus)
							_self.notice_list = [].concat(initStatus)
						}else{
							_self.notice_tips = "暂无消息通知"
						}
					}).catch((err) => {
						console.log(err)
					})
					
					noticeRequest.getProcessed(notice_data).then((res) => {
						console.log("getNotice2")
						if(res[1].data.code == 200){
							let initStatus = res[1].data.data;
							console.log(_self.notice_list.length)
							if(_self.notice_list.length == 0){
								initStatus[0].notice_status = "已处理"
							}
							for(let i=0; i<_self.notice_list.length; i++){
								initStatus[i].notice_status = "已处理"
							}
							console.log("initStatus2",initStatus)
							_self.notice_list = _self.notice_list.concat(initStatus)
						}else{
							_self.notice_tips = "暂无消息通知"
						}
					})
				}
			})
			
			uni.getStorage({
				key:'wechat_icon',
				success(res) {
					_self.wechat_icon = res.data
				}
			})
			
			uni.getStorage({
				key:'wechat_name',
				success(res) {
					_self.user_name = res.data
				}
			})
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			
			change_state(e){
				let data= {
					notice_id: _self.notice_list[e.currentTarget.dataset.id].notice_id
				}
				noticeRequest.changeState(data).then((res) => {
					if(res[1].data.code == 200){
						_self.notice_list[e.currentTarget.dataset.id].notice_status = "已处理";
					}
				}).catch((err) => {
					console.log(err)
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
