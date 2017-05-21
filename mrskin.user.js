// ==UserScript==
// @name        Mr Skin
// @namespace   MrSkin
// @description MsSkin
// @include     http://movie.douban.com/people/*
// @include     https://movie.douban.com/people/*
// @include     http://www.mrskin.com/*
// @include     https://www.mrskin.com/*
// @version     0.7
// @grant       GM_addStyle
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==

GM_addStyle('a:visited {color: lightgrey !important;}#yt-video{width:100%;height:100vh;background-color:black;}.none{display:none !important}');

if (document.domain == 'movie.douban.com') {
    $('.grid-view .title').each(function(){
        var name = $(this).find('a').text();
        name = name.substring(name.indexOf(' ') + 1);
        $(this).append('<a style="float:right" target="_blank" href="http://www.mrskin.com/search/search?term=' + name + '"><em>' + name + '</em></a>');
    });
}
else {
    $('.media-item').each(function(){
        $(this).removeClass('media-item');
    });
    $('.media-view').addClass('none');
    var url = window.location.href;
    if (url.includes('clipplayer')) {
        $.ajax({
            type: "GET",
            url: url,
            success: function(data) {
                var str = data.model.download_url;
                $('#watchSceneView').prepend('<div id="yt-top" style="height:0;overflow:hidden"></div><video id="yt-video" src="' + str + '" controls autoplay loop preload="auto"></video>');
                scrollToPlayer();
                var title = $('.media-title').text();
                $('.media-title').append(' <a id="yt-download" class="none" href="' + str + '">' + title + '</a>');
                $("#yt-video").on("error", function(err) {
                    location.reload(true);
                });
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
            }
        });

        var degree = 0;
        $(document).keydown(function(e) {
            var video = $('video')[0];
            //R
            if (e.keyCode == 82) {
                degree += 90;
                rotate(degree);
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
                $temp.val($('#yt-download').text().trim()).select();
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
        });
    }
}
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
function scrollToPlayer() {
    $('html, body').animate({
        scrollTop: $("#yt-top").offset().top
    }, 0);
}
