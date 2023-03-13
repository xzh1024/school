export function getBase64Image(img, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width ? width : img.width;
    canvas.height = height ? height : img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
    return dataURL;
}


export function getCanvasBase64(url) {
    var image = new Image();
    //至关重要
    image.crossOrigin = "";
    image.src = url;
    //至关重要
    return new Promise((resolve, reject) => {
        if (url) {
            image.onload = function () {
                resolve(getBase64Image(image));
            }
        } else {
            reject()
        }
    })
}