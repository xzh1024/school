/**
 * Created by Admin on 2018/11/23.
 */
(function () {
    var html = '<div class="sidebar-scroll">\
    <nav>\
    <ul class="nav">\
    <li><a href="index.html" id="activeIndex"><i class="lnr lnr-home"></i> <span>首页</span></a></li>\
    <li><a href="elements.html" class=""><i class="lnr lnr-code"></i> <span>表单</span></a></li>\
    <li><a href="charts.html" class=""><i class="lnr lnr-chart-bars"></i> <span>图表</span></a></li>\
    <li><a href="panels.html" class=""><i class="lnr lnr-cog"></i> <span>面板</span></a></li>\
    <li><a href="notifications.html" class=""><i class="lnr lnr-alarm"></i> <span>通知</span></a></li>\
    <li>\
    <a href="#subPages" data-toggle="collapse" class="collapsed"><i class="lnr lnr-file-empty"></i> <span>页面</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>\
    <div id="subPages" class="collapse ">\
    <ul class="nav">\
    <li><a href="page-profile.html" id="activePageProfile" class="">个人资料</a></li>\
    <li><a href="login.html" class="">登录</a></li>\
    <li><a href="page-lockscreen.html" class="">一键锁屏</a></li>\
    </ul>\
    </div>\
    </li>\
    <li><a href="tables.html" class=""><i class="lnr lnr-dice"></i> <span>表格</span></a></li>\
    <li><a href="typography.html" class=""><i class="lnr lnr-text-format"></i> <span>排版样式</span></a></li>\
    <li><a href="icons.html" class=""><i class="lnr lnr-linearicons"></i> <span>图标</span></a></li>\
    <li><a href="article.html" id="activeArticle" class=""><i class="lnr lnr lnr-pencil"></i> <span>文章</span></a></li>\
    </ul>\
    </nav>\
    </div>';
    document.getElementById('sidebar-nav').innerHTML = html;
})();

