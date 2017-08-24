// ==UserScript==
// @name         91Porn HTML5 Player
// @version      4.4
// @author       ytzong
// @description  91Porn
// @include      http://*91porn*/*
// @include      http://d.u6p.co//*
// @include      http://*91dizhi*/*
// @include      http://*91*.space/*
// @copyright    2016+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// ==/UserScript==

if (window.location.host == '91porn.com') {
    window.location.href = window.location.href.replace('91porn.com', 'email.91dizhi.at.gmail.com.8h3.space');
    return;
}

if (document.title == 'Connection Closed') {
    alert('aaa');
    location.reload(true);
    return;
}
var pathname = window.location.pathname;
console.log(pathname);
if (pathname == '/view_video_hd.php') { window.setTimeout(YTPlayHD, 500); }
if (pathname == '/view_video.php') { window.setTimeout(YTPlay, 500); }
if (pathname == '/v.php' || pathname == '/search_result.php') {
    var strURL = window.location.href;
    var strContain = 'viewtype=detailed';
    if (!strURL.includes(strContain)) {
        if (strURL.includes('?')) window.location.href = strURL + '&' + strContain;
        else window.location.href = strURL + '?' + strContain;
    }
}
if (pathname == '/video.php' || pathname == '/v.php' || pathname == '/search_result.php') {
    $('.imagechannelinfo').contents().not("a, span, br").wrap("<b/>");
    $('.imagechannelinfo').each(function(i){
        var num = parseInt($(this).children('.info').eq(4).next().text()) + parseInt($(this).children('.info').eq(5).next().text());
        var view = parseInt($(this).children('.info').eq(3).next().text());
        //var percent = parseInt(100 * num / view);
        $(this).find('.title').parent().before('[' + num + '] ');
    });
    $('#videobox a').each(function(i){
        var href = $(this).attr('href');
        if (href.includes('view_video.php')) {
            href = href.substring(0, href.indexOf('&'));
            $(this).attr('href', href);
        }
    }); 
}

var myservers = [/*'192.240.120.106', '192.240.120.107', '192.240.120.108', */'192.240.120.38',/* '192.240.120.35', '192.240.120.37', '192.240.120.34', '192.240.120.75', '192.240.120.76',*/ '192.133.81.234:8080', '192.133.81.234'];
var current = 0;

GM_addStyle('a:visited {color: lightslategrey !important;}video{width:100%;height:100vh}body{width:100%;overflow-x:hidden;}table, tr, td { border-collapse:collapse;border:0 }#viewvideo-title a{display:inline-block; padding:0.5em 1em;}.border-box{box-sizing:border-box;}.fixed{position: fixed;top: 0;z-index: 9999999999}#paging{padding-bottom:250px}.pagingnav a, span.pagingnav{padding: 10px 20px !important;margin:6px !important}input.page_number {margin: 6px !important;padding: 9px !important;}.none{display:none !important}.full-width{width:100% !important}.no-float{float:none !important}.auto-width{width:auto !important}.clearfix{overflow:hidden;}.text-center{text-align:center;}.text-left{text-align:left;}.preview{margin-bottom:10px;width:352px !important;height:198px !important;overflow:hidden;}.preview, .preview img{padding:0 !important;}.preview img{border: 0!important;width:100%; height:auto !important} .preview, .myvideo .maindescwithoutborder{width:272px !important;} .preview{height:153px !important}.bg-white{background-color:white !important}.bg-white, .bg-white a{color:#333 !important;}.margin-auto, video{margin:0 auto !important}.no-margin{margin:0 !important;}.no-padding{padding:0 !important;}.inline-block{display:inline-block !important;vertical-align: top;}.no-border{border:0 !important}.no-bg{background-image:none !important}.white{color:white!important}');
//#mediaplayer, #mediaplayer_video_wrapper, #mediaplayer_video{width:100% !important;height:760px !important;left:0 !important}#mediaplayer_jwplayer_controlbar{display:none!important}
main();
function scrollToPlayer() {
    $('html, body').animate({
        scrollTop: $("#yt-top").offset().top
    }, 0);
}
function main() {
    $('td[width="0"]').remove();
    $('#videodetails-content .title').eq(1).attr('style', 'background-color:yellow;color:black');
    $('#container td[align="right"],#container td[align="left"],#container_video > table > tbody > tr > td:nth-child(1),#container_video > table > tbody > tr > td:nth-child(3),#container_video #rightside, .arrow-general, #topbar').addClass('none');
    $('#submenu, #subcontent, #container, #leftside, #myvideo, .myvideo, #fullside, #fullbox, .listchannellarge, #paging,.pagingnav').addClass('auto-width');
    $('#leftside, .myvideo, .maindescwithoutborder, .listchannellarge, .listchannellarge .imagechannel, .listchannellarge .imagechannelinfo, .videothumb, #subcontent p, #viewvideo_hd').addClass('no-float');
    $('#myvideo-content, #viewvideo-content, #viewvideo-title').addClass('no-bg');
    $('#myvideo-content, #videobox table tr td').addClass('text-center');
    $('.maindescwithoutborder, .imagechannelinfo').addClass('text-left');
    $('.myvideo').addClass('clearfix');
    $('.myvideo, .listchannellarge, .listchannellarge .imagechannel, .imagechannelinfo, #subcontent p').addClass('inline-block');
    $('.myvideo').removeClass('blue');
    $('.videothumb, .listchannellarge .imagechannel img, #subcontent p a img').addClass('preview');
    //$('#myvideo-content, #videobox table tr td, #viewvideo-content').addClass('bg-white');
    $('table[width="800"], table[width="760"], table[width="99%"], td[width="900"], td[width="784"], td[width="784"] table, #viewvideo, #viewvideo-title, #hd_video, #viewvideo_hd').addClass('full-width');
    $('#videobox table tr td, .listchannellarge, #fullbox-content,#viewvideo-content, #viewvideo').addClass('no-padding');
    $('#viewvideo, #viewvideo_hd').addClass('no-border');
    $('#viewvideo-content, .videoplayer').addClass('no-margin');
    $('.imagechannelinfo, #useraction, #search').addClass('margin-auto');
    $('.imagechannelinfo').css('width','500px');
    $('#subcontent p').addClass('border-box');
    $('#subcontent p').css('width','49%');
    $('#navsubbar p').attr('style', 'text-align: center !important;text-indent: 0 !important;');
    //$('#videodetails-content .title a').attr('style', 'right:0; padding:0 2em;font-size:16px;line-height:22px;');
    //$('#videodetails-content a .title').attr('style', 'right:10em; padding:0 2em;font-size:16px;line-height:22px;');
    $('#viewvideo-title').addClass('fixed');
    $('#latestvideo').attr('style', 'position: absolute;left:50%;top:200px');
    $('#headnav td').attr('background', '');
    /*
    $.removeCookie('__cfduid');
    $.removeCookie('CLIPSHARE');
    */
    $.cookie('level', '6');
    $.cookie('user_level', '6');
    $.cookie('watch_times', '1');
    $.cookie('EMAILVERIFIED', 'yes');
    $('#topbar, #mediaspace').hide();

    function rotate(deg) {
        var height = $(window).height();
        var width = $('#yt-video').width();
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
        $('video').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ');transform-origin:center center;');
    }
    var degree = 0;
    $(document).keydown(function(e) {
        var video = $('video')[0];
        //video.attr('controls', 'controls');
        //R
        if (e.keyCode == 82) {
            degree += 90;
            rotate(degree);
            //$('#yt-top').get(0).scrollIntoView();
            scrollToPlayer();
        }
        //D
        if (e.keyCode == 68) {
            copyTitle();
            $('#yt-download').get(0).click();
        }
        function copyTitle() {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($('#videodetails-content a').eq(0).text().trim()  + ' - ' + $('#yt-download').text().trim() + ' - ' + getUrlParameter('viewkey')).select();
            document.execCommand("copy");
            $temp.remove();
        }
        //C
        if (e.keyCode == 67) {
            copyTitle();
        }
        //P
        if (e.keyCode == 80) {
            if (video.paused) video.play();
            else video.pause();
        }
        //V
        if (e.keyCode == 86) {
            copyTitle();
            window.location.href = window.location.href.replace('view_video.php', 'view_video_hd.php');
        }
        //A
        if (e.keyCode == 65) {
            var allLink = $('#videodetails-content .title a').attr('href');
            if (pathname == '/uprofile.php') allLink = $('#navsubbar a').eq(1).attr('href');
            if (allLink.length > 0)
                window.location.href = allLink;
        }
        //S
        if (e.keyCode == 83) {
            var authorLink = $('#videodetails-content a').eq(0).attr('href');
            if (pathname == '/uvideos.php') authorLink = $('#navsubbar a').eq(0).attr('href');
            if (authorLink.length > 0)
                window.location.href = authorLink;
        }
        //右箭头
        if (e.keyCode == 39) {
            if (e.metaKey) video.volume = video.volume + 0.1;
            else video.currentTime = video.currentTime + 7;
        }
        //左箭头
        if (e.keyCode == 37) {
            if (e.metaKey) video.volume = 0.1;
            else video.currentTime = video.currentTime - 7;
        }
        //ALT + 右箭头
        if (e.altKey && e.keyCode == 39) {
            video.currentTime = video.currentTime + 60;
        }
        //ALT + 左箭头
        if (e.altKey && e.keyCode == 37) {
            video.currentTime = video.currentTime - 60;
        }
        //Q 或 J
        if (e.keyCode == 81 || e.keyCode == 74) {
            var next = $('span.pagingnav').next().attr('href');
            if (next.length > 0) self.location = next;
        }
        //W 或 K
        if (e.keyCode == 87 || e.keyCode == 75) {
            var prev = $('span.pagingnav').prev().attr('href');
            if (prev.length > 0) self.location = prev;
        }
    });
}
function YTPlay(){
    var mp4 = 0;
    var strHD = '';
    if ($('.videoplayer img[src="images/hd.png"]').length > 0 || $('#hd_video').length > 0) {
        mp4 = 1;
        strHD = ' HD';
    }
    console.log(mp4);
    if ( mp4 > 0) {
        window.location.href = window.location.href.replace(/view_video/g, 'view_video_hd');
    }
    else {
        var str = $('#useraction .floatmenu a').eq(3).attr('href');
        var parser = document.createElement('a');
        parser.href = str;
        var urlreplace = parser.hostname;
        if (parser.port.length > 0) urlreplace = parser.hostname + ':' + parser.port;
        str = str.replace(urlreplace, myservers[current]);
        console.log(str);
        var height = $(window).height();
        $('.videoplayer').html('<div id="yt-top" style="height:0;overflow:hidden"></div><video id="yt-video" src="' + str + '" controls autoplay loop preload="auto"></video>');
        var title = $('#viewvideo-title').text().trim();
        $('#viewvideo-title').html(strHD + '<a id="yt-download" href="' + str + '" download="' + title + '.mp4">' + title + '</a>');
        $('#viewvideo-title').append($('#videodetails-content a').eq(0).clone());
        $('#viewvideo-title').append($('#videodetails-content .title a').eq(0).clone());
        $('#rightside').parent().attr('width', '0');
        $("#yt-video").on("error", function(err) {
            current++;
            if (current < myservers.length) {
                str = str.replace(myservers[current - 1], myservers[current]);
                $("video").attr('src', str);
                $('#yt-download').attr('href', str);
            }
            else location.reload(true);
        });
        scrollToPlayer();
    }
}
function YTPlayHD(){
    var mp4 = 0;
    if( typeof(so) != 'undefined'){
        var strHD = '';
        if ($('.videoplayer img[src="images/hd.png"]').length > 0 || $('#hd_video').length > 0) {
            mp4 = 1;
            strHD = 'HD ';
        }
        console.log(mp4);
        var timestamp = $.now();
        //mp4 = 0;
        $.ajax({
            type: "GET",
            url: 'getfile.php?VID=' +so.getVariable('file') +'&mp4=' + mp4 + '&seccode=' +so.getVariable('seccode') +'&max_vid='+so.getVariable('max_vid'),
            success: function(data) {
                var str = data;
                str = decodeURIComponent(str);
                str = str.substring(5, str.length - 2);
                console.log(str);
                var index = str.indexOf('&domainUrl');
                str = str.substring(0, index);
                var parser = document.createElement('a');
                parser.href = str;
                var urlreplace = parser.hostname;
                if (parser.port.length > 0) urlreplace = parser.hostname + ':' + parser.port;
                str = str.replace(urlreplace, myservers[current]);
                console.log(str);
                var height = $(window).height();
                $('.videoplayer').html('<div id="yt-top" style="height:0;overflow:hidden"></div><video id="yt-video" src="' + str + '" controls autoplay loop preload="auto"></video>');
                var title = $('#viewvideo-title').text().trim();
                $('#viewvideo-title').html(strHD + '<a id="yt-download" href="' + str + '" download="' + title + '.mp4">' + title + '</a>');
                $('#viewvideo-title').append($('#videodetails-content a').eq(0).clone());
                //$('#viewvideo-title').append($('#videodetails-content .title a').clone());
                $('#rightside').parent().attr('width', '0');
                $("#yt-video").on("error", function(err) {
                    current++;
                    if (current < myservers.length) {
                        str = str.replace(myservers[current - 1], myservers[current]);
                        $("video").attr('src', str);
                        $('#yt-download').attr('href', str);
                    }
                    else location.reload(true);
                });
                scrollToPlayer();
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Requested-With", "ShockwaveFlash/23.0.0.173");
                xhr.setRequestHeader("Proxy-Connection", "keep-alive");
            },
            error: function() {
                location.reload(true);
            }
        });
    }
}
//https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
/*
if ($('span.pagingnav').length > 0 && $('span.pagingnav').next().length > 0) {
    //$(body).css('padding-bottom', '100px');
    $(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() == $(document).height()) {
           console.log("bottom!");
           var next = $('span.pagingnav').next().attr('href');
           location.href = next;
       }
    });
}*/
//http://joji.me/zh-cn/blog/how-to-develop-high-performance-onscroll-event

var next = $('span.pagingnav').next().attr('href');
console.log(next);
if (next.length > 0) {
    var $window = $(window);
    var $document = $(document);
    var scroll = function () {
        if($window.scrollTop() + $window.height() == $document.height()) {
           window.location.href = next;
        }
    };
    var raf = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    var $window = $(window);
    var lastScrollTop = $window.scrollTop();

    if (raf) {
        loop();
    }

    function loop() {
        var scrollTop = $window.scrollTop();
        if (lastScrollTop === scrollTop) {
            raf(loop);
            return;
        } else {
            lastScrollTop = scrollTop;

            // 如果进行了垂直滚动，执行scroll方法
            scroll();
            raf(loop);
        }
    }
}
