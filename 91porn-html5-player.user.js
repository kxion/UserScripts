// ==UserScript==
// @name         91Porn HTML5 Player
// @version      0.2
// @author       ytzong
// @description  91Porn
// @include      http://email.91dizhi.at.gmail.com.9h8.space/*
// @copyright    2016+
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('#container_video td[align="right"],#container_video td[align="left"], #topbar {display:none !important}#leftside{width:100% !important}  #recently, #userinfo, #mediumbox, #mostactive, #topwatched, #signup, #browsegroup, #viewvideo, #recently-added, #myvideo, #myfriends, #groups, #bookmark, #videodetails, #sharedetails, #videocomment {width:auto !important}');

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
    $.cookie('level', '6');
    $.cookie('user_level', '6');
    $.removeCookie('watch_times');
    var mp4 = 0;
    if( typeof(so) != 'undefined'){
        if ($('#mediaspace img[src="images/hd.png"]').length > 0) mp4 = 1;
        console.log(mp4);
        $.get('getfile.php?VID=' +so.getVariable('file') +'&mp4=' + mp4 + '&seccode=' +so.getVariable('seccode') +'&max_vid='+so.getVariable('max_vid'),function(data,status){
            var str = data;
            str = decodeURIComponent(str);
            str = str.substring(5, str.length - 2);
            console.log(str);
            $('#mediaspace').html('<video src="' + str + '" controls autoplay width="100%" height="100%"></video>');
        });
    }
}

addJQuery(window.setTimeout(main, 1000));