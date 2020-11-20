<template>
	<view class="content" :class="pointer_event==false?'ban_pointor':''">
		<view class="head_logo">
			<image src="../../static/login/login_head.png" mode=""></image>
		</view>

		<view class="choice_tips">
			<text>请选择登录方式</text>
		</view>

		<button class="wx-btn cu-btn bg-green round shadow" @tap="wx_login">微信授权登陆</button>
		<button class="public-btn cu-btn bg-green round shadow" @tap="official_login">官方账号登陆</button>

		<view class="login_tips">
			<text>登录后可使用相应账号的功能</text>
		</view>

		<!-- 授权加载 -->
		<view class="cu-load load-modal" v-if="login_loading">
			<image :src="load_src" mode="aspectFit"></image>
			<view class="gray-text">{{login_tips}}</view>
		</view>

		<!-- 同意授权模态框 -->
		<view class="cu-modal bottom-modal" :class="accept_empower== true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="confirm_wx_login">确定</view>
					<view class="action text-blue" @tap="hide_login">取消</view>
				</view>
				<view>
					<view class="cu-dialog" @tap.stop="">
						<radio-group class="block">
							<view class="cu-list menu text-left">
								<view class="cu-item" v-for="(item, wechat_id) in wx_user" :key="item.wechat_id">
									<label class="flex justify-between align-center flex-sub" @tap="select_label" :data-id="item.wechat_id">
										<view class="cu-avatar radius" :style="[{ backgroundImage:'url(' + item.wechat_icon + ')' }]"></view>
										<view class="flex-sub margin-left">{{ item.wechat_name }}</view>
										<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
										 :value="'radio' + index"></radio>
									</label>
								</view>
							</view>
						</radio-group>
					</view>
				</view>
			</view>
		</view>

		<!-- 官方登录模态框 -->
		<view class="cu-modal" :class="official_model == true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">官方登录</view>
					<view class="action" @tap="hide_official">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<form>
						<view class="cu-form-group">
							<view class="title">官方账号</view>
							<input placeholder="请输入官方账号" name="input" v-model:value="official_data.sponsor_id" required></input>
						</view>
						<view class="cu-form-group">
							<view class="title">登陆密码</view>
							<input type="password" placeholder="请输入登陆密码" name="input" v-model:value="official_data.sponsor_password" required></input>
						</view>
						<view class="cu-bar btn-group">
							<button class="cu-btn bg-cyan shadow-blur round" @tap="reset_form">重置</button>
							<button class="cu-btn bg-blue shadow-blur round" @tap="confirm_official_login">提交</button>
						</view>
					</form>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import loginHttp from '../../api/Login.js'
	var _self;
	export default {
		data() {
			return {
				pointer_event: true,
				login_loading: false,
				accept_empower: false,
				official_model: false,
				login_wx_data: {
					wechat_id: ""
				},
				radio: "",
				login_tips: "",
				load_src: "",
				official_data: {
					sponsor_id: "",
					sponsor_password: ""
				},
				//验证的规则
				rules: {
					sponsor_id: {
						rule: /\S/,
						msg: "账号不能为空"
					},
					sponsor_password: {
						rule: /^[0-9a-zA-Z]{6,16}$/,
						msg: "密码应该为6-16位"
					}
				},
				
				wx_user: [{
					wechat_id: "cyy0304",
					wechat_icon: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
					wechat_name: "陈颖茵的微信"
				}]
			}
		},
		onLoad() {
			_self = this;
			uni.clearStorage()
			console.log("onLoad!")
		},
		onHide() {
			console.log("onHide!")
		},
		methods: {

			// 标签选择时获取id
			select_label(e) {
				_self.login_wx_data.wechat_id = e.currentTarget.dataset.id
			},

			// 确认微信登陆
			confirm_wx_login() {
				_self.accept_empower = false;
				_self.login_tips = "微信授权登录";
				_self.load_src = "../../static/login/wechat.png";
				_self.login_loading = true;
				_self.pointer_event = false;
				_self.loginRequest(_self.login_wx_data, 1);
			},

			// 确认官方登录
			confirm_official_login() {
				// 表单验证
				if (!this.validate('sponsor_id')) {
					return;
				} else if (!this.validate("sponsor_password")) {
					return;
				} else {
					_self.official_model = false;
					_self.login_tips = "官方授权登录";
					_self.load_src = "../../static/login/official_logo.png";
					_self.login_loading = true;
					_self.pointer_evevt = false;
					_self.loginRequest(_self.official_data, 0);
				}
			},

			// 点击微信登陆,选择微信账号
			wx_login() {
				_self.accept_empower = true
			},

			// 选择官方登录
			official_login() {
				_self.official_model = true;
			},

			// 登陆封装
			loginRequest(data, role) {
				if (role == 1) {
					loginHttp.wxLogin(data).then(res => {
						_self.login_tips = "授权中...";
						if (res[1].data.code == 200) {
							setTimeout(() => {
								_self.login_tips = "授权成功";
							}, 1000)

							let clock = setTimeout(() => {
								_self.login_tips = "登陆中..."
							}, 2000);
							
							_self.set_storage("role", role);
							_self.set_storage("wechat_id", data.wechat_id)

							let redirect = setTimeout(() => {
								_self.login_loading = false;
								_self.open_pointer();
								uni.switchTab({
									url: '/pages/homepage/content'
								});
							}, 3500)
						}

						if (res[1].data.code == 400) {
							setTimeout(() => {
								_self.login_tips = "登陆失败";
							}, 1000)

							let clock = setTimeout(() => {
								_self.login_loading = false;
							}, 3000)

						}
					}).catch(err => {
						_self.login_tips = "登陆失败";
						let clock = setTimeout(() => {
							_self.login_loading = false;
							_self.open_pointer();
						}, 2000)
					})
				}

				if (role == 0) {
					loginHttp.officialLogin(data).then(res => {
						_self.login_tips = "授权中...";
						if (res[1].data.code == 200) {
							
							_self.set_storage("role", role);
							_self.set_storage("sponsor_id", data.sponsor_id)
							
							setTimeout(() => {
								_self.login_tips = "授权成功";
							}, 1000)

							let clock = setTimeout(() => {
								_self.login_tips = "登陆中..."
							}, 2000);
							
							
							let redirect = setTimeout(() => {
								_self.login_loading = false;
								_self.open_pointer();
								uni.switchTab({
									url: '/pages/homepage/content'
								});
							}, 3500)
						} else {

							setTimeout(() => {
								_self.login_tips = res[1].data.code == 400 ? "密码错误" : "用户未注册"

							}, 1000)

							setTimeout(() => {
								_self.login_tips = "登陆失败";
							}, 3000)

							let clock = setTimeout(() => {
								_self.reset_form()
								_self.login_loading = false;
							}, 4000)

						}
					}).catch(err => {
						_self.login_tips = "授权中...";
						let clock = setTimeout(() => {
							_self.login_tips = "登陆失败";
							_self.reset_form()
							_self.open_pointer();
							_self.login_loading = false;
						}, 2000)
					})

				}
			},

			// 隐藏登录微信选择模态框
			hide_login() {
				_self.accept_empower = false;
			},

			// 隐藏官方登录模态框
			hide_official() {
				_self.official_model = false
			},

			// 重置表单
			reset_form() {
				let obj = _self.official_data;
				for (let key in obj) {
					obj[key] = "";
				}
			},

			// 退出登录，开启点击事件
			open_pointer() {
				_self.pointer_event = true;
			},

			// 表单验证
			validate(key) {
				let bool = true;
				if (!_self.rules[key].rule.test(_self.official_data[key])) {
					console.log("inter")
					//提示信息
					uni.showToast({
						title: _self.rules[key].msg,
					})
					//取反
					bool = false;
					return false;
				}
				return bool;
			},
			
			// 存储storage
			set_storage(key, data){
				console.log("setStorage")
				uni.setStorage({
					key,
					data
				})
			}
			
		}
	}
</script>

<style>
	html {
		background-image: url(../../static/login/head_bg.jpg);
		background-size: 100% 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.head_logo image {
		width: 180rpx;
		height: 180rpx;
		border: 3px solid #FFFFFF;
		border-radius: 50%;
		margin-top: 270rpx;
	}

	.choice_tips {
		color: #adadad;
		font-size: 16px;
		margin: 40rpx 0 60rpx;
	}

	.wx-btn,
	.public-btn {
		width: 70%;
		height: 100rpx;
		margin-top: 40rpx;
	}

	.wx-btn {
		background-color: #43cf7c !important;
	}

	.public-btn {
		background-color: #4aa0d5 !important;
	}

	.login_tips {
		margin-top: 60rpx;
		font-size: 12px;
		color: #adadad;
	}

	.ban_pointor {
		pointer-events: none;
	}
</style>
