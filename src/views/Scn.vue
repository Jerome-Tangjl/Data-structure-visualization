<template>
	<div class="home">
		<el-container>
			<el-aside>
				<h4><i class="el-icon-s-custom"></i> {{userInfo.name}}</h4>
				<!-- <div class="top-warp"><i class="el-icon-s-custom"></i> {{userInfo.name}}</div> -->
				<br>
				<div class="btn-warp">
					<el-button @click="toPane(0)" type="primary" round >{{tabs[0]}}</el-button>
					<br><br><br>
					<el-button @click="toPane(1)" type="primary" round >{{tabs[1]}}</el-button>
					<br><br><br>
					<el-button @click="toPane(2)" type="primary" round >{{tabs[2]}}</el-button>
					<br><br><br>
					<el-button @click="dialogVisible = true" type="primary" round >切换身份</el-button>
				</div>
			</el-aside>
			<el-main>
				<!-- <div class="top-warp" style="border-left: 1px dashed #ffffff;">{{tabs[active]}}</div> -->
				<h1>{{tabs[active]}}</h1>

				<div class="pane-container">
					<router-view></router-view>
				</div>

				<el-dialog title="切换身份" :visible.sync="dialogVisible" center width="30%">
					<center>
					<div class="dialog-main">
						<span>姓名：</span>
						<el-select v-model="selectValue" filterable placeholder="请选择">
							<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</div>
					</center>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="changeIdentity()">确 定</el-button>
					</span>
				</el-dialog>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import userData from '../js/userData.json'
	import graphData from '../js/graphData.json'
	export default {
		name: 'Scn',
		data() {
			return {
				tabs: ["社会关系网络", "可能认识的人", "个人信息"],
				userInfo: {
					name: null
				},
				active: 0,
				dialogVisible: false,
				options: userData.userInfo,
				selectValue: ''
			}
		},
		methods: {
		// 切换模块
			toPane(index) {
				this.active = index;
				switch (index) {
					case 0:
						this.$router.push("/scn/InterpChart")
						break;
					case 1:
						this.$router.push("/scn/MayKnow")
						break;
					case 2:
						this.$router.push("/scn/UserInfo")
						break;
					case 3:
						// 打开dialog
						break;
					default:
						break;
				}
			},
			// 切换身份 -> dialog【确定】
			changeIdentity() {
				if (!this.selectValue) {
					this.$notify({
						type: 'warning',
						title: '提示',
						message: `请先选择身份`,
						duration: 1000
					});
				} else {
					let _this = this;
					let index = this.selectValue;
					let old = JSON.parse(sessionStorage.userInfo);
					let val;

					val = userData.userInfo[index];
					if (old.name == val.name) {
						this.$notify({
							type: 'warning',
							title: '提示',
							message: `当前已是【${val.name}】`,
							duration: 1000
						});
					} else {
						this.$confirm(`此操作将【${old.name}】切换为【${val.name}】, 是否继续?`, '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							duration: 1000
						}).then(() => {
							sessionStorage.userInfo = JSON.stringify(val)
							_this.userInfo = JSON.parse(sessionStorage.userInfo)
							this.$notify({
								type: 'success',
								title: '成功',
								message: `已切换为【${val.name}】`,
								duration: 1000,
								// onClose: () => {
								// 	_this.$router.push("/InterpChart");
								// 	_this.active = 0;
								// }
							});
							if (_this.$route.path != "/scn/InterpChart") {
								_this.setGraphData()
								_this.$router.push("/scn/InterpChart");
								_this.active = 0;
							} else {
								_this.$router.go(0);
							}
						}).catch(() => {
							this.$notify({
								type: 'info',
								title: '提示',
								message: '已取消操作',
								duration: 1000
							});
						});
					}
					this.dialogVisible = false;
				}
			},
			// 由好友和群组构建可能认识的人
			findMayKnow(selfName, selfFriend, selfGroup) {
				// let preData = []; // 非自己及好友的备选人员列表（姓名）
				let hasCoFri = []; // 和自己有共同好友的人
				let onlyCoGro = []; // 无共同好友，有共同群组的人

				userData.userInfo.map((item, index) => {
					let flag = true;
					selfFriend.map(ele => {
						if (item.name == ele) {
							flag = false;
						}
					})
					// console.log(flag);
					// 若当前人员不是自己或好友
					if (item.name != selfName && flag) {
						// preData.push(item.name);
						// // 判断该备选是否与自己拥有共同好友
						// let a, b, c;
						// a = selfFriend.length;
						// b = item.friend.length;
						// c = new Set(selfFriend.concat(item.friend));
						// if (a + b > c.size) {
						// 	// 有共同好友，将该备选的信息添加到hasCoFri
						// 	hasCoFri.push(item);
						// } else {
						// 	// 若无共同好友，判断该备选是否与自己拥有共同群组
						// 	a = selfGroup.length;
						// 	b = item.group.length;
						// 	c = new Set(selfGroup.concat(item.group));
						// 	if (a + b > c.size) {
						// 		// 有共同群组，将该备选的信息添加到onlyCoGro
						// 		onlyCoGro.push(item);
						// 	}
						// }


						/* res struct
						{
							name: "",
							coFriendList: [], // name
							coGroupList: [],
							corrDeg: 100
						}
						*/

						// 该备选与自己的共同好友
						let coFriend = selfFriend.filter(data =>
							item.friend.indexOf(data) > -1
						)

						// 该备选与自己的共同群组
						let coGroup = selfGroup.filter(data =>
							item.group.indexOf(data) > -1
						)

						if (coFriend.length > 0) {
							hasCoFri.push({
								"name": item.name,
								"coFriendList": coFriend,
								"coGroupList": coGroup,
								"corrDeg": coFriend.length + coGroup.length * 2
							})
						} else if (coGroup.length > 0) {
							onlyCoGro.push({
								"name": item.name,
								"coFriendList": [],
								"coGroupList": coGroup,
								"corrDeg": coGroup.length * 2
							})
						}
					}
				})
				// console.log(preData);

				// 可能认识的人存入sessionStorage
				sessionStorage.mayKnow = JSON.stringify(hasCoFri.concat(onlyCoGro))
				console.log(sessionStorage.mayKnow)

				return {
					"all": hasCoFri.concat(onlyCoGro),
					"hasCoFri": hasCoFri,
					"onlyCoGro": onlyCoGro
				};
			},
			setGraphData() {
				// 构建当前身份的graphData echarts[type:graph].data
				graphData.nodes = [{
					"id": "0",
					"name": this.userInfo.name,
					"x": 400,
					"y": 200,
					"fixed": true,
					"category": 0
				}];
				graphData.links = [];
				// 1、nodes添加好友点
				this.userInfo.friend.map((item, index) => {
					graphData.nodes.push({
						"id": (index + 1).toString(), // 好友点为除自己外加入的第一批点，id正好为index+1
						"name": item,
						"category": 1 // 1->好友, 2->可能认识的人
					})
				})
				// 2、添加好友点与我点之间links
				graphData.nodes.slice(1).map((item, index) => {
					graphData.links.push({
						"id": index.toString(), // 好友点与我点之间links为第一批links，id正好为index-1
						"source": "0",
						"target": item.id
					})
				})

				// 3、将findMayKnow()返回的可能认识的人加到nodes
				let mayKnow = this.findMayKnow(this.userInfo.name, this.userInfo.friend, this.userInfo.group);
				console.log(mayKnow);
				let mkNodeStart = graphData.nodes.length;
				let mkNodeId = mkNodeStart.toString();
				mayKnow.all.map((item, index) => {
					graphData.nodes.push({
						"id": mkNodeId,
						"name": item.name,
						"category": 2 // 1->好友, 2->可能认识的人,
					})
					mkNodeId = (parseInt(mkNodeId) + 1).toString();
				})

				// 4、构建可能认识的人相关的links (“我”与其他所有结点都有连线,其他结点互为好友的之间有连线)
				let mkLinkStart = graphData.links.length;
				console.log("mkLinkStart:" + mkLinkStart)
				let mkLinkId = mkLinkStart.toString();
				graphData.nodes.slice(mkNodeStart).map(node => {
					// 4.1 可能认识的人与我的links
					graphData.links.push({
						"id": mkLinkId,
						"source": "0",
						"target": node.id
					})
					mkLinkId = (parseInt(mkLinkId) + 1).toString();
					// 4.2 若是有共同好友的mayknow 可能认识的人与共同好友的links
					// 从有共同好友的mayknow中找该mayknow，若找到遍历该mayknow信息中的共同好友列表
					let thisMkIndex = mayKnow.hasCoFri.findIndex(ele => ele.name == node.name);
					if (thisMkIndex > -1) {
						// 遍历共同好友列表，并找到该好友nodes的id赋给source
						let friNodeIndex;
						mayKnow.hasCoFri[thisMkIndex].coFriendList.map((item, index) => {
							friNodeIndex = graphData.nodes.findIndex(ele => ele.name == item);
							graphData.links.push({
								"id": mkLinkId,
								"source": friNodeIndex.toString(), // 我的好友
								"target": node.id
							})
							mkLinkId = (parseInt(mkLinkId) + 1).toString();
						})
					}
				})

				console.log(graphData)
			}
		},
		created() {
			// userInfo为空时 默认复制为userData.userInfo[0]
			if (!sessionStorage.userInfo) {
				sessionStorage.userInfo = JSON.stringify(userData.userInfo[0])
				console.log("init" + JSON.parse(sessionStorage.userInfo).name)
			}

			this.userInfo = JSON.parse(sessionStorage.userInfo)
			// this.username = JSON.parse(sessionStorage.userInfo).name

			this.setGraphData();
		}
	}
</script>

<style lang="less">

</style>
