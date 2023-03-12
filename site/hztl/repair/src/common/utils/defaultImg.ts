import defaultImgSquareData from "../../assets/img/default-412-412.png";
import defaultImgRectangleData from "../../assets/img/default-444-264.png";

export function defaultImgSquare(event: any) {
  const img = event.srcElement;
  img.src = defaultImgSquareData;
  img.onerror = null; //防止闪图
}

export function defaultImgRectangle(event: any) {
  const img = event.srcElement;
  img.src = defaultImgRectangleData;
  img.onerror = null;
}
