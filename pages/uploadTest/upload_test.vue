<template>
	<view>
		<view class='pages'>
		  
			<view class='father_view'> 
				<view class='son_view'> 
				  <view class="title-bg">想说就说(最多120个汉字)：</view>
				  <textarea class="textarea-bg" v-model="text1" @blur="inputText"  placeholder="请输入留言" /> 
				</view> 
			</view>
			
			<!-- 图片 -->
			<view class="images_box">
				<block v-for="(item, index) in imglist" :key="index">
				  <view class='img-box'>
					<image class='img' :src='item' mode='aspectFill'></image>
					<view class='img-delete' @click='imgDelete1' :data-delindex="index">
					    <image class='img' src='../../static/uploadTest/delete.png' ></image>  
					</view>
				  </view>
				</block>
				<view class='img-box' @click='addPic1' v-if="imglist.length<9">
					<image class='img' src='../../static/uploadTest/add.png'></image>  
				</view>
			</view>
			
			<button @click='uploadimage'>上传图片</button>			
			<button @click='viewmemo'>查看留言</button>
		</view>		
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				imglist:[],//选择图片后生成的临时地址数组
				text1:'',
				imglist00:[]
			}
		},
		
		onLoad() {	},
		
		methods: {	
			//*获取文本框内容*//
			inputText:function (e) {
				this.text1 = e.detail.value	
			},
			
			//*选择图片*//
			addPic1: async function() {
				let that = this				
				uni.chooseImage({
					count: 9,  // 最多可以选择的图片张数，默认9
					sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
				    success: function (res) {						
						if (that.imglist.length === 0) {
							that.imglist = res.tempFilePaths
						} else if (that.imglist.length < 9) {
							that.imglist = that.imglist.concat(res.tempFilePaths); //concat追加到数组
						}
					}
				})
			},
			
			//*显示选择后的图片*//
			imgbox: function (e) {				
			    this.imglist = e.detail.value
			},
			
			//* 删除已经选择的图片 *//
			imgDelete1: function (e) {				
				let index = e.currentTarget.dataset.delindex; //获取要删除的图片的下标，否则删除的永远是第一张 ,对应 <view class='img-delect' @click='imgDelete1' :data-delindex="index">
				this.imglist.splice(index, 1);			  	
			},
			
			//*上传图片*//
			uploadimage: function () {
				let app = getApp()
				let that = this
				let upimg = require("./upimg.js") //引用当前目录下的自定义函数
				let text2 = that.text1
				
				if (text2 == '') {
					uni.showToast({  //显示对话框
						title: "请输入留言！",
						icon: 'none',
						duration: 1000,
					});
				} else {	
					if (that.imglist.length != 0 ) { //数组不为空的时候才执行 				
						upimg.uploadimg({ //********* 调用引入的upimg.js文件uploadimg函数 ************
							url: 'http://127.0.0.1:3000' +'/imgup', //全局变量，后端接口地址
							path: that.imglist, //选取图片的临时地址数组 
							text: that.text1,  //文本框内容  
							user: "崩溃的测试员", 
						});
						uni.showToast({  //显示对话框
							title: "上传中！",
							icon: 'loading',
							duration: 3000,
						});					
						setTimeout(function () { //延迟执行，目的是等待上一步的uploadimg函数执行完成赋值给全局变量后再执行下面的代码
							that.imglist = []  //清空选择的图片
							that.text1 = ''   //清空文本框的内容						
						}, 1000); //延迟时间
					 
					} else {
						uni.showToast({
						  title: "请添加图片！",
						  icon: 'none',
						  duration: 1000,
						})
					}
				}
			},
			
			viewmemo:function (e) {
				uni.navigateTo({  //跳转到指定页面
					url: "../memo/memo",
				})
			}
		},
	}
</script>

<style>
	
</style>