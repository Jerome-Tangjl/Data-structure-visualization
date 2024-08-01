<template>
	<div id="UserInfo">
		<!-- <p>个人信息</p> -->
		<p>
			<span>姓名:</span>
			<strong>{{userInfo.name}}</strong>
		</p>
		<el-input placeholder="请输入 好友姓名/群名" v-model="filterKey">
			<i slot="prefix" class="el-input__icon el-icon-search"></i>
		</el-input>
		<!-- <el-tabs v-model="active" tab-position="left"> -->
		<el-tabs v-model="active">
			<el-tab-pane label="好友" name="friend">
				<ul>
					<li v-for="(item, index) in userInfo.friend.filter(data => !filterKey || data.includes(filterKey))"><i class="el-icon-user-solid"></i>{{item}}</li>
				</ul>
			</el-tab-pane>
			<el-tab-pane label="群组" name="group">
				<ul>
					<li v-for="(item, index) in userInfo.group.filter(data => !filterKey || data.includes(filterKey))"><i class="el-icon-s-opportunity"></i>{{item}}</li>
				</ul>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 'friend',
				userInfo: {},
				filterKey: null,
			}
		},
		created() {
			this.userInfo = JSON.parse(sessionStorage.userInfo)
		}
	}
</script>

<style lang="less">
	#UserInfo {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;

		ul li {
			list-style: none;
			color: #666666;
			line-height: 2.4;
			letter-spacing: 8px;
			font-weight: 600;
		}

		ul {
			margin: 1vw;
			padding: 0;
		}

		p {
			// background: #efefef;
			margin: 8px 0;

			span {
				// display: inline-block;
				// width: 66px;
				// height: 40px;
				// line-height: 40px;
				text-align: center;
				// padding: 0 20px;
				margin-right: 20px;
				// border-right: 2px solid #efefef;
			}

			strong { 
				letter-spacing: 8px;
				font-size: 16px;
				font-weight: 600;
				color: #555555;
			}
		}
		
		.el-input {
			width: 240px;
			margin: 16px 0;
		}
	}
</style>
