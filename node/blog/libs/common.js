/**
 * Created by Admin on 2018/11/23.
 */
const crypto = require('crypto'); //引入加密模块

module.exports = {
    MD5_SUFFIX: 'sdakljdsajfpf?fkl7834$3&*d#l5@46dsajlfsa曼切斯特klsa发破碎的kjfnlkasnfklsadkldnsa564f68s7123sfasfasd',
    md5: function (str) {
        var obj = crypto.createHash('md5');

        obj.update(str); //加密
        // var str = obj.digest('hex');  //16进制结果
        // console.log(str);
        return obj.digest('hex');
    }
};