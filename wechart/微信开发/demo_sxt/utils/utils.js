function convertToStarsArray(stars){
  //num代表拆分的数字
  var num = stars.subString(0, 1);
  //声明一个数组
  var StarsArr = [];
  for(var i = 0; i <5; i++){
    if(i < num){
      StarsArr.push(1);
    } else{
      StarsArr.push(0);
    }
  }

  return StarsArr;
}

function movieHttp(url, categoryname, callback) {
  console.log(url);
  wx.request({
    url: url,
    success(res) {
      // console.log(res.data);
      if (res.data) {
        if (res.data.ms) {
          var list = res.data.ms;
          for(let i = 0; i < list.length; i++){
            list[i].rating = list[i].r;
          }
          
          callback(list);
        }
      }
    },
    fail(err) {
      console.log(err);
    }
  })
}

function http(url, arg, callback) {
  console.log(url);
  wx.request({
    url: url,
    data: arg,
    success(res) {
      if (res.data) {
        callback(res.data)
      }
    },
    fail(err) {
      console.log(err);
    }
  })
}


module.exports = {
  convertToStarsArray: convertToStarsArray,
  movieHttp: movieHttp,
  http: http
}