<template>
    <div>
        <div id="myChart" class="my-chart"></div>
        <div id="myChartBar" class="my-chart"></div>
        <div id="myChartPie" class="my-chart"></div>
    </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    require('echarts/lib/chart/line')
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend')
    require('echarts/lib/component/grid')
    require('echarts/lib/component/toolbox')

    const successNum = 352648;
    const failureNum = 12546;

    export default {
        name: 'hello',
        data () {
            return {
            msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            this.drawLine();
            this.drawBar();
            this.drawPie();
        },
        methods: {
            drawPie() {
                let myChart = echarts.init(document.getElementById('myChartPie'))
                myChart.setOption({
                    title: [
                        // {
                        //     text: '标题',
                        //     x: 'center',
                        //     textStyle: {
                        //         fontSize: 16,
                        //         color: '#fff'
                        //     }
                        // },
                        {
                            // text: '34106.24吨',
                            text: successNum+failureNum,
                            x: 'center',
                            y: 'center',
                            // subtext: '2019-05-20 15:19:32',
                            textStyle: {
                                fontSize: 20,
                                color: '#fff'
                            }
                        },
                        {
                            text: Math.round(successNum/(successNum+failureNum)*10000)/100,
                            x: '90%',
                            y: '20%',
                            textAlign: 'right',
                            textBaseline: 'middle',
                            textStyle: {
                                fontSize: 16,
                                color: '#F17D04',
                                lineHeight: 18
                            },
                            itemGap: 0,
                            subtext: '成功率',
                            subtextStyle: {
                                fontSize: 10,
                                lineHeight: 12
                            }
                        },
                        {
                            text: successNum,
                            x: '90%',
                            y: '46%',
                            textAlign: 'right',
                            textBaseline: 'middle',
                            textStyle: {
                                fontSize: 16,
                                color: '#1ED1E1',
                                lineHeight: 18
                            },
                            itemGap: 0,
                            subtext: '今日成功数量',
                            subtextStyle: {
                                fontSize: 10,
                                lineHeight: 12
                            }
                        },
                        {
                            text: failureNum,
                            x: '90%',
                            y: '72%',
                            textAlign: 'right',
                            textBaseline: 'middle',
                            textStyle: {
                                fontSize: 16,
                                color: '#CECED0',
                                lineHeight: 18
                            },
                            itemGap: 0,
                            subtext: '今日失败数量',
                            subtextStyle: {
                                fontSize: 10,
                                lineHeight: 12
                            }
                        }
                    ],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     x: 'left',
                    //     data:['成功','失败']
                    // },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: [80, 100],
                            // center: ['40%', '50%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                normal: {
                                    borderColor: '#1B1E32',
                                    borderWidth: 5
                                }
                            },
                            labelLine:{  
                                normal:{  
                                    length: 20,
                                    length2: 30
                                }  
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter: '{c|{c}}'
                                }
                            },
                            data:[
                                {
                                    value: 352648,
                                    name: '成功',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'outside',
                                            // formatter: '{b} : {c} ({d}%)'
                                            formatter: [
                                                '{d|{d}%}',
                                                '{b|{b}}'
                                            ].join('\n'),
                                            rich: {
                                                d: {
                                                    color: '#1ED2E2',
                                                    fontSize: 16,
                                                    fontWeight:'bold',
                                                    height: 30
                                                },
                                                b: {
                                                    color: '#999',
                                                    fontSize: 12,
                                                    lineHeight: 5
                                                }
                                            }
                                        }
                                        
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 0,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0, color: '#70ffac' // 0% 处的颜色
                                                }, {
                                                    offset: 1, color: '#00a2ff' // 100% 处的颜色
                                                }],
                                                global: false // 缺省为 false
                                            }
                                        }
                                    }
                                },
                                {
                                    value: 12546,
                                    name: '失败',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'outside',
                                            formatter: [
                                                '{d|{d}%}',
                                                '{b|{b}}'
                                            ].join('\n'),
                                            rich: {
                                                d: {
                                                    color: '#1ED2E2',
                                                    fontSize: 16,
                                                    fontWeight:'bold',
                                                    height: 30
                                                },
                                                b: {
                                                    color: '#999',
                                                    fontSize: 12,
                                                    lineHeight: 5
                                                },
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 0,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0, color: '#DDDDDD' // 0% 处的颜色
                                                }, {
                                                    offset: 1, color: '#909090' // 100% 处的颜色
                                                }],
                                                global: false // 缺省为 false
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                });
            },

            drawBar() {
                let myChart = echarts.init(document.getElementById('myChartBar'))
                myChart.setOption({
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }]
                });
            },

            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    // backgroundColor: '#2c343c',
                    title: {
                        text: '消费逐月消费趋势',
                        // color: '#fff',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    // textStyle:{
                    //     fontSize: 15,
                    //     color: '#fff'
                    // },
                    // 不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['差旅', '个人', '公司']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            // 是否不可编辑（只读）。
                            dataView: {readOnly: true}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        // axisLine: {
                        //     lineStyle: {
                        //         type: 'solid',
                        //         color: '#fff',//左边线的颜色
                        //         width: '1'//坐标线的宽度
                        //     },
                        //     axisLabel: {
                        //         textStyle: {
                        //             color: '#fff',//坐标值得具体的颜色
                        //         }
                        //     }
                        // }, 
                    },
                    yAxis: {
                        type: 'value',
                        name: '(万)',
                        nameLocation: 'start',
                        nameTextStyle: {
                            fontSize: 14,
                            padding: [0, 50, 0, 0],
                        },
                        // axisLine: {
                        //     lineStyle: {
                        //         type: 'solid',
                        //         color: '#fff',//左边线的颜色
                        //         width:'1'//坐标线的宽度
                        //     },
                        //     axisLabel: {
                        //         textStyle: {
                        //             color: '#fff',//坐标值得具体的颜色
                        //         }
                        //     }
                        // }, 
                    },
                    series: [
                        {
                            name: '差旅',
                            type: 'line',
                            smooth: true,
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '个人',
                            type: 'line',
                            smooth: true,
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '公司',
                            type: 'line',
                            smooth: true,
                            stack: '总量',
                            data: [320, 260, 240, 180, 300, 360, 330, 160, 180, 120, 100, 245, 230, 200]
                        }
                    ]
                });
            }
        }
    }
</script>
<style scoped lang='scss'>
    .my-chart{
        width: 666px;
        height: 355px;
        background-color: #1B1E32;
        margin-bottom: 10px;
    }
</style>