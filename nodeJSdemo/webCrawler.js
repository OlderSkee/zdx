/**
 * Created by zdx on 2016/9/13.
 */
var http = require("http");
//var url = "http://www.imooc.com/learn/348"
var cheerio = require('cheerio');

var urls = ["http://www.imooc.com/learn/348",
            ]

for(var j=0;j<urls.length;j++) {


    http.get(urls[j], function (res) {
        var html = '';
        res.on('data', function (data) {
            html += data;
        })
        console.log( 'statusCode:' + res.statusCode);
        res.on('end', function () {
            var message = filterChapters(html);
            printLog(message);
            console.log("-------------------分隔符---------------------")

        })

        //以下是错误的
        //res.data(function () {
        //    html += data;
        //})
        //
        //res.end(function () {
        //    var message = filterChapters(html);
        //    consoleLog(message)
        //})

    }).on('error', function () {
        console.log("获取失败!")
    })

}


function filterChapters(html){

var $ = cheerio.load(html);

    var chapters = $('.chapter');
    var info = [];
    //console.log(chapters)
    chapters.each(function () {
        var title = $(this).find("strong").text().replace(/\s/g,"");

        var video = $(this).find(".J-media-item");

        var everyInfo = {
            title:title,
            video:[],
        }
        video.each(function () {
                var videoTitle = $(this).text().replace(/\s/g,"")
                var videoNum = $(this).attr("href").split("video/")[1];
            everyInfo.video.push({
                videoTitle :videoTitle,
                videoNum : videoNum,
            })
        })


     info.push(everyInfo)
    })
    return info

}
function printLog(message){
    var str = ''
    message.forEach(function (everyObj) {
        str += "\n"+everyObj.title + "\n"
        //console.log(everyObj.title + "\n")

        everyObj.video.forEach(function (video) {
            //console.log("\n【"+ video.videoNum + "】" + video.videoTitle+"\n")
            str+="\n【编号"+ video.videoNum + "】" + video.videoTitle+"\n"

        })

    })
    console.log(str)
}