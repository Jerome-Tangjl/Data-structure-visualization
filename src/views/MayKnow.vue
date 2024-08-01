<template>
	<div id="MayKnow">
		<!-- <p>可能认识的人</p> -->
		<div class="table-warp">
			<el-table :data="mkData" style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="table-expand">
							<el-form-item label="共同好友">
								<span class="expand-item" v-for="item in props.row.coFriendList">{{ item }}</span>
							</el-form-item>
							<el-form-item label="共同群组">
								<span class="expand-item" v-for="item in props.row.coGroupList">{{ item }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="姓名" prop="name">
				</el-table-column>
				<el-table-column label="共同好友个数">
					<template slot-scope="scope">
						{{scope.row.coFriendList.length}}
					</template>
				</el-table-column>
				<el-table-column label="共同群组个数">
					<template slot-scope="scope">
						{{scope.row.coGroupList.length}}
					</template>
				</el-table-column>
				<!-- <el-table-column label="关联度"  prop="corrDeg" sortable>
				</el-table-column> -->
				<el-table-column label="关联度" prop="corrDeg">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				mkData: []
			}
		},
		created() {
			this.userInfo = JSON.parse(sessionStorage.userInfo)
			this.mkData = JSON.parse(sessionStorage.mayKnow).sort((x, y) => {
				return y.corrDeg - x.corrDeg
			})
		}
	}
</script>

<style lang="less">
	#MayKnow {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;

		p {}

		.table-warp {
			width: 100%;
			flex-grow: 1;

			.table-expand {
				font-size: 0;
			}

			.table-expand label {
				width: 90px;
				color: #99a9bf;
			}

			.table-expand .el-form-item {
				margin-right: 0;
				margin-bottom: 0;
				// width: 50%;

				.expand-item {
					display: block;
					// min-width: 160px;
					width: 160px;
				}
			}
		}
	}
</style>
