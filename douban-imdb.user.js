// ==UserScript==
// @name        doubanIMDb
// @namespace   http://notimportant.org
// @version     v1.6.3
// @include     http://movie.douban.com/subject/*
// @include     https://movie.douban.com/subject/*
// @author      iseansay@gmail.com
// @description 在豆瓣的电影条目下显示IMDb和烂番茄相关数据
// ==/UserScript==

function imdb(){
    rottenTomatoesApiKey = 'waz8xhsmeakxvwy9h2ddq9et';
    var imdbnum;  // IMDb 編號
    $("div#info span.pl").each(function(){
        if($(this).text() == 'IMDb链接:')
            imdbnum = $(this).next().text();
    });
    if (!imdbnum)
        return;
    var imdbUrl = "http://imdbapi.xiuxiu.de/" + imdbnum;
    var rottenUrl = "http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?" +
                    "type=imdb&id=" + imdbnum.slice(2) +
                    "&apikey=" + rottenTomatoesApiKey;
    
    $.ajax({
        type : "GET",
        dataType: "json",
        url :imdbUrl,
        success : function(data) {
            var rating = data.Rating;
            var rank = data.Rank;
            var rateHtml;       // IMDb rating score HTML stiring
            var rankHtml;       // IMDb rank HTML string
            if(rating && rating!=='-') {            // construct IMDb score html
                rateHtml ='<span>IMDb:'+rating+'</span>';
            }
            else {
                rateHtml='';
            }

            if(rank) {                            // construct IMDb top250 tank html
                rankHtml = '<b style="color:red;">'+rank+'<b>';
            }
            else {
                rankHtml = '';
            }
            $("strong.rating_num").after('<div id="imdb_score" ><br>' + rateHtml + ' ' + rankHtml + '</div>');
            $('#imdb_score').css({
                "font-size": "14px",
                "color": "green",
                "line-height": "18px"
            });
        }
    });
     
    $.ajax({
            type : "GET",
            dataType: "jsonp",
            url :rottenUrl,
            success : function(data) {
                var rottenImage;
                var rottenText = "";
                var rottenTextColor = "grey";
                var numberRating;
                if (data.error) {
                    numberRating = -1;
                } else {
                    numberRating = data.ratings.critics_score;
                } 
                
                if (numberRating === -1) {
                    rottenImage = "data:image/png;base64,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";
                    rottenText = "N/A"
                } else if (numberRating >= 60) {               // if the movie is fresh
                    rottenImage =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAXPSURBVHjafJZbiF5XFcd/+1y+62Qy11wnzcVMsUybeEkFscSkrYJUq6TQKrbiBbVQi09VLAWfLFTwIX2pBUUfCtIg8UVrLVITWqI0iTVRm9gkJCG3mWlmvtv5zm3vvZYP32QMNdMFBw5rw/qv81/rv//HqCof/dI0ACqK98qnHtpMez7nwE9OsnF6mI89eju1esC5Rf+d4+ft20N1jm4cDslUCTDsupDzo6s5RWxY1XbMnClI6waA5rWzRKwQqqBWUQxToyGrVoVEqi+ePu2/+8Cu5tEtw4brXgmM4Rv/6OIF3Aq1glsljVl6KTxZzwYaGGw9qmUnWpfvbZSuid+6mAmuGnLPGz1qXY+NzUr9DkCC0Cw/YWwoUs/kpgYPPr2Dmd1rwiyxXxanT0o3H9l459D+2Qv97Um7HE421pg+m9PsetyKnDCga7ZwyxQVuQ+2Zm7LutuHix3rGnfnqXviyr869+uoR63nwu8vs/kr255ZLJz/zEtzX7zjTNY7s7nKB0UEsOaqXU64QuTcH69Vql3309LJQ2Ob6pT1mDdeX2TsmiW91Ofi5WL30JY6I53er69sqb2sRv8w1nL97lCImhVADs/WUAMVp9S7jhMtPb1/xhdnP1wjXBVRYKiOx1yZGmXD/ZvYvD6ms1Dwi0fG96WR2bdtwV/99Mn0hV3HkueGu97+34xVFdZNgwHanvemqzuff3j8pW7AnVtPZVxcFzN3V5Pt9YDjcYgK3BYqa//S4r7fXWdhfYV3puucuqOOG6/88/FX2o/tebVzoj8aghmssFFV0g3TVK1ybii458An64emFn344Ik+Y6VCJPz4ySmOf2KEvb+dY6FhOPrZCTZYeObZS0y/1YU4pBUpr9zd5O2Zun/kSH/3xy+WR/JaQOOGTooQnDFrCfVP3zzSDzdUDfqRJulwSKcaMLepQTKb861DbernS/ZfKjnw1CZ+s2+cp99J6Q9H1Ax89WjG3lN5ODsZv5Y0wm1imG/cmIkAHn61UWhE6yt01hgOTUa8uaHKu5MVqu9lPHusy+rbKkgz5gcHW7TWVnh39wjZqojIClk1oD8RMeJhbFGaScwvDXxhefBGuMsEfK4cDvDjAWa0ws6hiG1liLnk2Zp4mqurdCshNrSMb6nzxMEWP1tboTURM3m1GIhOIQ8G6guVzyvMAP++IaFHiYGmQesB4VDE1ESTaGIIajEkOb35HmYuJao7FidDpk479h5JaNcMk7dYWwU8+nXgqRsgOwmA2GBiA5WAshoho03CsSbuWpugkyFxAJGBUEmHA2bO5IQB2MrgdrqBJYBFKZWdy3QBq9GlUwVEwQuaW6SXQ+nAyyCvYASyyDDZFyQCFxrM4AgHWFUyIEMbN4PkeCBXNBc0c2ivwAcdZCFBC4smJZoJmisUinHgIzO4/RQ8UAKlKhlKX5W+Svk/EMMZHHs0EbTnkaoDckxmGfAhSOLQnkV7Hu0rRgcDFsCpUsKgexX6KiSidNSdvxnkIMK3SRS97gHwVjE9A6EBD5o6aHtYEEyuiAGPYhXypeKpQl89PREWvSMT//LNdL1KwFk827UlYIFUoBZAAOqB1EMH6AtewAZKoZCpkqKkKvRU6IqnbS3Xy/w/sTGv3QwC8BgBf8WBdgT6Bo0EAjAecIr4ATWFgVyVVCFVIVGhJ0JbLJ2yZK5IcaJfa4QR7wf5G/B9AvajQKlQDtZSAWegNEoRLHUvSl+Fnng66uk4S6vImC9yut5/bzyO3zJLFvt+P3seKDG8QDhIeBSLoVAhg6XiSiJCVxxtsbTLklaRM18WdOHxBrwYGrOsm1uZ5s+BYwLPWfTeUqFAyAYrSV+UrgodsbStZbHIWCgLFkX+nMEPK/D36FamdYs4JnBfoezpoQ8nInsT8R9KVOKOd7ScpWML2yqLcx3nXu/BAQeHwxX+TFa0/6VPPeThcql6rFDdkYmsScXHqXe2b+185tzJEg4D58IP8Pj/DgCAPVIw/gWpvwAAAABJRU5ErkJggg==";
                    rottenText = numberRating + "%";
                    rottenTextColor = "red";
                } else if (numberRating < 60 && numberRating >= 0) {        // if the movie is rotten 
                    rottenImage = 'data:image/png;base64,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';
                    rottenText = numberRating + "%";
                    rottenTextColor = "green";
                     if (numberRating < 10) {
                         rottenText = " " + numberRating +"%";
                     }
                 } else if (numberRating === -1) {    // if the score is not available
                     rottenImage = "data:image/png;base64,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";
                     rottenText = "N/A"
                 }
                $('span.year').after('<span dir="ltr" id="rottentomato" ><img width="25px" height="25px" src="' + rottenImage +'"/> '+ rottenText +'</span>');
                $('#rottentomato').css({
                    "color": rottenTextColor,
                    "margin-left": "10px"
                    });
                }
    });
}

// Content Script Injection, see http://wiki.greasespot.net/Content_Script_Injection
function contentEval( source ) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(imdb);