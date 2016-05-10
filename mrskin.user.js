// ==UserScript==
// @name        Mr Skin
// @namespace   MrSkin
// @description MsSkin
// @include     http://movie.douban.com/people/*
// @include     https://movie.douban.com/people/*
// @include     http://www.mrskin.com/*
// @include     https://www.mrskin.com/*
// @version     0.2
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==

GM_addStyle('.l-mrstrap-container{width:100% !important}.mrskin-modal-video-player {max-width:none !important}.mrskin-modal-video-player{padding:5px 0 !important;margin-top:-40px !important}.yui3-panel {height: 100% !important;width: 100% !important;left: 0 !important}.mrskin-scene-player-wrapper{width: auto !important}.mrskin-video-wrapper {height:auto !important;width: auto !important;}#mrskinVideo_wrapper{height:730px !important;width: auto !important;}');

function main() {
    //
    if (document.domain == 'movie.douban.com') {
        $('.grid-view .title').each(function(){
            var name = $(this).find('a').text();
            name = name.substring(name.indexOf(' ') + 1)
            $(this).append('<a style="float:right" target="_blank" href="http://www.mrskin.com/search/search?term=' + name + '"><em>' + name + '</em></a>')
        })
    }
    else {
        var parser = document.createElement('a');parser.href = window.location.href;
        if (parser.pathname.indexOf('/clipplayer/') > -1) {
            self.location = jQuery(".btn-group:nth-of-type(2) .btn:first-child").attr("href");
        }
        if (parser.pathname.indexOf('/search/search') > -1) {
            self.location = jQuery('.mrstrap-grid h3 a').attr('href')
        }
        jQuery(document).keydown(function(e) {
            //d
            if(e.keyCode == 68) {
                self.location = jQuery('#pjax-video .icon-download').parent().attr('href')
            }
        })
    }

}

main();