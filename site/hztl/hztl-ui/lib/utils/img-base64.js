"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBase64Image = getBase64Image;
exports.getCanvasBase64 = getCanvasBase64;

function getBase64Image(img, width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width ? width : img.width;
  canvas.height = height ? height : img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  var dataURL = canvas.toDataURL();
  return dataURL;
}

function getCanvasBase64(url) {
  var image = new Image(); //至关重要

  image.crossOrigin = "";
  image.src = url; //至关重要

  return new Promise(function (resolve, reject) {
    if (url) {
      image.onload = function () {
        resolve(getBase64Image(image));
      };
    } else {
      reject();
    }
  });
}