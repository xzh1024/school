define(function () {
    let msg = 'Hello';

    function getMsg() {
        console.log($);
        return msg.toUpperCase();
    }

    return { getMsg }
})