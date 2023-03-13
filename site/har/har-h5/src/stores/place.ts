import { defineStore } from "pinia";
type PlaceState = {
  venueId: any;
  storeId: any;
  chooseTimeArr: any[];
  placeCard: any;
};
export const usePlaceStore = defineStore("place", {
  state: (): PlaceState => {
    return {
      venueId: null,
      storeId: null,
      chooseTimeArr: [], //用户选择的时间段
      placeCard: {}
    };
  },
  actions: {
    setPlaceCard(payload: any) {
      this.placeCard = payload;
    },
    setVenueId(payload: any) {
      this.venueId = payload;
    },
    setStoreId(payload: any) {
      this.storeId = payload;
    },
    /**
     * 清空所有选择的时间
     */
    clearArr() {
      this.chooseTimeArr = [];
    },
    /**
     * 删除选择的时间段
     * @param payload
     */
    delTimeArr(payload: any) {
      const index = this.chooseTimeArr.findIndex(
        (item) => item.date === payload.dayTimes
      );
      if (index > -1) {
        const timeIndex = this.chooseTimeArr[index].timeArr.findIndex(
          (item: any) =>
            item.start === payload.start && item.end === payload.end
        );
        this.chooseTimeArr[index].timeArr.splice(timeIndex, 1);
      }
    },
    /**
     * 添加选择的时间段
     * @param payload
     */
    addTimeArr(payload: any) {
      if (this.chooseTimeArr.length < 1) {
        this.chooseTimeArr.push({
          date: payload.dayTimes,
          skuId: payload.skuId,
          timeArr: [
            {
              skuId: payload.skuId,
              salePrice: payload.salePrice,
              start: payload.start,
              end: payload.end
            }
          ]
        });
      } else {
        const index = this.chooseTimeArr.findIndex(
          (item) => item.date === payload.dayTimes
        );
        if (index > -1) {
          this.chooseTimeArr[index].timeArr.push({
            skuId: payload.skuId,
            salePrice: payload.salePrice,
            start: payload.start,
            end: payload.end
          });
        } else {
          this.chooseTimeArr.push({
            date: payload.dayTimes,
            skuId: payload.skuId,
            timeArr: [
              {
                skuId: payload.skuId,
                salePrice: payload.salePrice,
                start: payload.start,
                end: payload.end
              }
            ]
          });
        }
      }
    }
  }
});
