<template>
  <div class="box">
    <div id="container"></div>
    <a-input-search
      class="search"
      placeholder="输入关键词搜索"
      search-button
      @search="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import AMapLoader from '@amap/amap-jsapi-loader';
  import { onMounted, nextTick } from 'vue';

  const emits = defineEmits(['address']);
  const props = defineProps({
    shopLocation: {
      type: Array,
      default: () => []
    }
  });
  // const map = shallowRef(null);
  const MAP_KEY = '578be590b558e4edf6eb5cb610a8388a';
  const MAP_KEY_WEB_SERVICE = '6f75f95ddf27a65bb87bd54937e3451f';

  // enum STATUS {
  //   complete = 'complete',
  //   error = 'error',
  //   noData = 'no_data'
  // }

  const onSearch = (e: string) => {
    axios
      .get('https://restapi.amap.com/v3/geocode/geo', {
        params: {
          key: MAP_KEY_WEB_SERVICE,
          address: e,
          city: e
        }
      })
      .then((res) => {
        if (res.data.info === 'OK') {
          const locationArr = res.data.geocodes[0]?.location || '';
          if (locationArr) {
            const location = locationArr.split(',');
            initMap(location);
          }
        }
      });
  };
  const initMap = (location: number[]) => {
    AMapLoader.load({
      key: MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        'AMap.Autocomplete', // 输入提示插件
        'AMap.PlaceSearch', // POI搜索插件
        'AMap.Geolocation', // 定位控件，用来获取和展示用户主机所在的经纬度位置
        'AMap.Geocoder'
      ]
    })
      .then((AMap) => {
        const map = new AMap.Map('container', {
          // 设置地图容器id
          viewMode: '2D', // 是否为3D地图模式
          zoom: 12,
          resizeEnable: true,
          center:
            location && location.some((el: any) => el) ? location : undefined
        });
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
          buttonPosition: 'RB'
        });
        let geocoder: any;
        let marker: any;
        // 有 location 才定位，防止新增时报错
        if (!marker && location && location.length) {
          marker = new AMap.Marker();
          map.add(marker);
          marker.setPosition(location); // 设置标记的位置
        }
        let lngLat: unknown;
        let lngLatStr: string;
        map.on('click', (e: any) => {
          lngLat = e.lnglat;
          lngLatStr = `${e.lnglat.lng},${e.lnglat.lat}`;
          setAMarkerOnMap();
        });
        function setAMarkerOnMap() {
          if (!geocoder) {
            geocoder = new AMap.Geocoder({
              city: '010'
            });
          }
          if (!marker) {
            marker = new AMap.Marker();
            map.add(marker);
          }
          marker.setPosition(lngLat); // 设置标记的位置
          marker.setMap(map); // 在地图上显示一个标记
          getAddressByLonLat();
        }
        function getAddressByLonLat() {
          axios
            .get('https://restapi.amap.com/v3/geocode/regeo', {
              params: {
                key: MAP_KEY_WEB_SERVICE,
                location: lngLatStr
              }
            })
            .then(({ data }) => {
              if (data.info === 'OK') {
                const temp = data.regeocode;
                console.log(temp);
                emits('address', {
                  longitude: lngLatStr.split(',')[0],
                  latitude: lngLatStr.split(',')[1],
                  addressFormat: temp.formatted_address,
                  provinceName: temp.addressComponent.province,
                  cityName: temp.addressComponent.city,
                  districtName: temp.addressComponent.district,
                  areaCode: temp.addressComponent.adcode
                });
              }
            });
        }
        map.add(geolocation);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  onMounted(() => {
    nextTick(() => {
      initMap(props.shopLocation as number[]);
    });
  });
</script>

<style scoped lang="less">
  .box {
    position: relative;
    width: 100%;
    height: 100%;

    .search {
      position: absolute;
      top: 2%;
      left: 5%;
      width: 90%;
      max-width: 250px;
      background-color: rgba(255, 255, 255, 0.8);
      border: 1px solid #fff;
      border-radius: 5px 0 0 5px;

      :deep(.arco-input-wrapper) {
        background-color: transparent;
      }
    }
  }

  #container {
    width: 100%;
    height: 100%;
  }
</style>
