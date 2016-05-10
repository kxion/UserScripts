// ==UserScript==
// @name         91Porn HTML5 Player
// @version      1.2
// @author       ytzong
// @description  91Porn
// @include      http://*91porn*/*
// @include      http://*91*.space/*
// @include      http://*9p1*.space/*
// @copyright    2016+
// @run-at       document-idle
// @grant        GM_addStyle
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// ==/UserScript==

GM_addStyle('body{width:100%;overflow-x:hidden;}#container, #container table, #container_video table, #hd_video {width:100% !important}#container td[align="right"],#container td[align="left"],#container_video > table > tbody > tr > td:nth-child(1),#container_video > table > tbody > tr > td:nth-child(3),#container_video #rightside, .arrow-general, #topbar, embed{display:none !important} #leftside{width:100% !important} #recently, #userinfo, #mediumbox, #mostactive, #topwatched, #signup, #browsegroup, #viewvideo, #viewvideo_hd, #recently-added, #myvideo, #myfriends, #groups, #bookmark, #videodetails, #sharedetails, #videocomment,#fullside, #fullbox, #invitefriend, #invitenewfriend,#paging,.pagingnav,#submenu, #subcontent {width:auto !important}.imagechannelhd{width:auto !important;height:auto !important}.pagingnav a, span.pagingnav{padding: 10px 20px !important;margin:6px !important}input.page_number {margin: 6px !important;padding: 9px !important;}.listchannel, .videothumb{text-align:left !important; width:210px !important;height:210px !important;} .imagechannel a img, .imagechannelhd a img,#subcontent p a img,.videothumb img {padding:0 !important;height: 117px !important;width: 208px !important;}#viewvideo-content,.videoplayer{padding:0 !important;background-image:none !important}.videoplayer{margin:0 !important}#subcontent{overflow:hidden;}#tab-featured a[href="video.php?category=rf"]{display: block;text-align: center;padding: 6px;}#containersearch{margin:10px !important;}#search{display:inline-block;}#videodetails{width:500px !important;}#useraction{position:relative;left:50%;margin-left:-225px;}#viewvideo, #viewvideo_hd{border:0 none !important;}#viewvideo-title{background-image: none !important;text-align:center !important;}.myvideo, .listchannel, .listchannellarge, #subcontent p, #subcontent p.blue{float:none!important;display:inline-block !important;padding:10px 0.5%!important;vertical-align: top;}.myvideo, .listchannellarge, #subcontent p, #subcontent p.blue{width:48.5% !important;}.listchannel {}video{margin:0 auto;}');

main();
window.setTimeout(YTPlay, 500);

function main() {
    /*
    $.removeCookie('__cfduid');
    $.removeCookie('CLIPSHARE');
    */
    $.cookie('level', '6');
    $.cookie('user_level', '6');
    $.removeCookie('watch_times');
    $.cookie('EMAILVERIFIED', 'yes');
}
function YTPlay(){
    $('#viewvideo-content').get(0).scrollIntoView();
    $('#topbar').remove();
    var mp4 = 0;
    if( typeof(so) != 'undefined'){
        if ($('#mediaspace img[src="images/hd.png"]').length > 0 || $('#hd_video').length > 0) mp4 = 1;
        console.log(mp4);
        var title = $('#viewvideo-title').text().trim();
        var timestamp = $.now();
        $.get('getfile.php?t=' + timestamp + '&VID=' +so.getVariable('file') +'&mp4=' + mp4 + '&seccode=' +so.getVariable('seccode') +'&max_vid='+so.getVariable('max_vid'),function(data,status){
            var str = data;
            str = decodeURIComponent(str);
            str = str.substring(5, str.length - 2);
            console.log(str);
            var height = $(window).height();
            var width = $('.videoplayer').width();
            $('.videoplayer').html('<video id="yt-video" src="' + str + '" controls autoplay loop preload="auto" style="width:' + width + 'px; height:' + height + 'px"></video><p style="text-align:center"></p>');
            $('#viewvideo-title').html('<a id="yt-download" href="' + str + '" download="' + title + '.mp4">' + title + '</a>');
            $('#rightside').parent().attr('width', '0');
            $("video").on("error", function(err) {
                location.reload(true);
            });
        });
    }
    function rotate(deg) {
        var height = $(window).height();
        var width = $('.videoplayer').width();
        /*
        var bestHeight = width * 9/16;
        if (bestHeight > height) width = height * 16/9;
        else height = bestHeight;
        */
        var zoom = 1;
        if (deg % 360 == 90 || deg % 360 == 270) {
            zoom = height/width;
        }
        else {
            zoom = 1;
        }
        $('video').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ');transform-origin:50% 50%;width:' + width + 'px; height:' + height + 'px;');
    }
    var degree = 0;
    $(document).keydown(function(e) {
        var video = $('video')[0];
        //video.attr('controls', 'controls');
        //R
        if (e.keyCode == 82) {
            degree += 90;
            rotate(degree);
        }
        //D
        if (e.keyCode == 68) {
            $('#yt-download').get(0).click();
        }
        //P
        if (e.keyCode == 80) {
            if (video.paused) video.play();
            else video.pause();
        }
        //右箭头
        if (e.keyCode == 39) {
            if (e.metaKey) video.volume = video.volume + 0.1;
            else video.currentTime = video.currentTime + 10;
        }
        //左箭头
        if (e.keyCode == 37) {
            if (e.metaKey) video.volume = 0.1;
            else video.currentTime = video.currentTime - 10;
        }
        //ALT + 右箭头
        if (e.altKey && e.keyCode == 39) {
            video.currentTime = video.currentTime + 60;
        }
        //ALT + 左箭头
        if (e.altKey && e.keyCode == 37) {
            video.currentTime = video.currentTime - 60;
        }
        /*
        //Q
        if (e.keyCode == 81) {
            self.location = $('span.pagingnav').next().attr('href');
        }
        //W
        if (e.keyCode == 87) {
            self.location = $('span.pagingnav').prev().attr('href');
        }
        */
    });
}