import cardImg from "@/static/card/card.png";
import cardImgActive from "@/static/card/card_active.png";

import mineImg from "@/static/card/user.png";
import mineImgActive from "@/static/card/user_active.png";

export function useTabbar(page: string) {
  if (page === "mine") {
    return [
      { label: "储值卡", icon: cardImg, path: "./home" },
      { label: "统计", icon: mineImgActive }
    ];
  } else {
    return [
      { label: "储值卡", icon: cardImgActive },
      { label: "统计", icon: mineImg, path: "/pages/card/tabbar/mine" }
    ];
  }
}
