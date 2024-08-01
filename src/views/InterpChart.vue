<template>
	<div id="InterpChart">
		<!-- <p>社会关系网络图</p> -->
		<div id="chart" class="chart-body"></div>
	</div>
</template>

<script>
	import graphData from '../js/graphData.json'

	const echarts = require('echarts/lib/echarts');
	require('echarts/lib/component/title');
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/legend');
	require('echarts/lib/chart/graph');
	export default {
		data() {
			return {
				myChart: null,
				graph: graphData
			};
		},
		methods: {
			// 画图
			draw(id) {
				let myChart;
				let option;
				let graph = this.graph;

				// 初始化图标
				myChart = echarts.init(document.getElementById(id));
				myChart.showLoading();

				// graph.nodes.forEach(function(node) {
				// 	if (node.symbolSize = 40) {
				// 		node.label = {
				// 			fontSize: 14
				// 		}
				// 	}
				// });

				option = {
					// title: {
					// 	text: 'Social Network',
					// 	subtext: 'Default layout',
					// 	top: 'bottom',
					// 	left: 'right'
					// },
					tooltip: {
						show: false
					},
					legend: [{
						// selectedMode: 'single',
						data: graph.categories.map(function(a) {
							return a.name;
						})
					}],
					animationDuration: 1500,
					animationEasingUpdate: 'quinticInOut',
					series: [{
						name: '关联度',
						type: 'graph',
						layout: "force",
						force: {
							repulsion: 160,
							edgeLength: [80, 240]
						},
						data: graph.nodes,
						links: graph.links,
						categories: graph.categories,
						roam: true,
						label: {
							show: true,
							position: 'inside',
							formatter: '{b}'
						},
						lineStyle: {
							color: 'source',
							curveness: 0.3
						},
						emphasis: {
							focus: 'adjacency',
							lineStyle: {
								width: 10
							}
						}
					}]
				};

				option && myChart.setOption(option);
				myChart.hideLoading();
				// window.onresize = function() {
				//   this.myChart.resize();
				// };
			}
		},
		mounted() {
			this.draw("chart")
		},
		created() {}
	};
</script>

<style lang="less">
	#InterpChart {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;

		.chart-body {
			// width: 100%;
			// height: 40%;
			width: 800px;
			height: 64vh;
			// margin-top: 20px;
			border: 2px solid #efefef;
			border-radius: 5px;
		}
	}
</style>
