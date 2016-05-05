// ==UserScript==
// @name         91Porn HTML5 Player
// @version      0.5
// @author       ytzong
// @description  91Porn
// @include      http://*.space/*
// @copyright    2016+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('#container_video table {width:100% !important}#container_video td[align="right"],#container_video td[align="left"] ,#rightside{display:none !important}#leftside{width:100% !important} #recently, #userinfo, #mediumbox, #mostactive, #topwatched, #signup, #browsegroup, #viewvideo, #recently-added, #myvideo, #myfriends, #groups, #bookmark, #videodetails, #sharedetails, #videocomment {width:auto !important}');

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {
    /*
    $.removeCookie('__cfduid');
    $.removeCookie('CLIPSHARE');
    */
    $('#topbar').remove();
    $.cookie('level', '6');
    $.cookie('user_level', '6');
    $.removeCookie('watch_times');
    window.setTimeout(YTPlay, 500);
}
function YTPlay(){
    var mp4 = 0;
    if( typeof(so) != 'undefined'){
        if ($('#mediaspace img[src="images/hd.png"]').length > 0) mp4 = 1;
        console.log(mp4);
        $.get('getfile.php?VID=' +so.getVariable('file') +'&mp4=' + mp4 + '&seccode=' +so.getVariable('seccode') +'&max_vid='+so.getVariable('max_vid'),function(data,status){
            var str = data;
            str = decodeURIComponent(str);
            str = str.substring(5, str.length - 2);
            console.log(str);
            var height = $(window).height();
            var width = $('.videoplayer').width();
            $('.videoplayer').html('<video src="' + str + '" controls autoplay style="width:' + width + 'px; height:' + height + 'px"></video>');
            $('#rightside').parent().attr('width', '0');
        });
    }
    function rotate(deg) {
        var height = $(window).height();
        var width = $('.videoplayer').width();
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
        //R
        if(e.keyCode == 82) {
            degree += 90;
            rotate(degree);
        }
    });
}

addJQuery(window.setTimeout(main, 1500));