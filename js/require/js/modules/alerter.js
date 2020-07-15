define(['dataService'], function (dataService) {
    let name = ' World'

    function showMsg() {
        $('body').css('background', 'gray')
        alert(dataService.getMsg() + ', ' + name)
    }

    return { showMsg }
})