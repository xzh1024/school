<template>
    <div class="map">
        <Header title="地图" class="header">
            <div slot="left" class="header-left" @click="$router.go(-1)">
                <i class="x-button-icon" style="font-style: normal;">&lt;&nbsp;</i>
                <!-- <label>返回</label> -->
            </div>
        </Header>
        <div ref="mapbox" id="chart" style="width: 100%; height: 500px;"></div>
    </div>
</template>

<script>
import echarts from 'echarts';
import jsonp from 'jsonp';
import 'echarts/map/js/china';
import Header from '../../components/Header/Header'

const option = {
    title: {
        text: 'vue实现疫情地图数据展示',
        x: 'center', //居中
        textStyle: {
            color: '#9c0505'
        }
    },
    series: [
        {
            type: 'map',
            map: 'china',
            label: {
                show: true,
                color: 'red',
                fontSize: 10
            },
            itemStyle: {
                borderColor: 'blue',
                borderWidth: 1
            },
            zomm: 1.3,
            emphasis: {
                label: {
                    color: '#fff',
                    fontSize: 12
                },
                itemStyle: {
                    areaColor: 'green',
                    borderColor: 'orange'
                }
            }
        }
    ],
    visualMap: [
        {
            type: 'piecewise',
            show: true,
            pieces: [
                {min: 10000},
                {min: 1000, max: 9999},
                {min: 100, max: 999},
                {min: 10, max: 99},
                {min: 1, max: 9},
                {value: 0}
            ],
            inRange: {
                color: ['#fff', '#ffaa85', '#660208']
            },
            itemWidth: 10,
            itemHeight: 10
        }
    ],
    tooltip: {
        tigger: 'item',
        formatter: '地区：{b}<br/>确诊：{c}'
    },
    toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    }
};

export default {
    name: 'map',
    data() {
      return {
          myChart: ''
      }  
    },
    components: {
        Header
    },
    mounted() {
        console.log(echarts);
        this.getData();
        this.myChart = echarts.init(document.getElementById('chart'));
    },
    methods: {
        getData() {
            jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', (err, data) => {
                if(!err) {
                    let list = data.data.list.map(item => ({name: item.name, value: item.value}));
                    console.log(list);
                    option.series[0].data = list;
                    this.myChart.setOption(option);
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.map {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header-left{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .main{
        flex: 1;
        .my-chart{
            width: 500px;
            height: 300px;
        }
    }
}
</style>