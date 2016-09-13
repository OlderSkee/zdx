/**
 * Created by zdx on 2016/9/13.
 */

var http = require("http");
//var url = "http://www.imooc.com/learn/348"
var Promise = require("Promise");
var cheerio = require('cheerio');

var url = "http://www.imooc.com/learn/348"


function getPageAsync(url){
    return new Promise(function (resolve,reject) {
        console.log("正在爬取"+url)

        http.get(url, function (res) {
            var html = '';
            res.on('data', function (data) {
                html += data;
            })
            res.on('end', function () {
                resolve(html)
               // var message = filterChapters(html);
               // printLog(message);
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

        }).on('error', function (e) {
            reject(e)
            console.log("获取失败!")
        })

    })
}


var fetchCourseArry = []

Promise
    .all([])
    .then(function (pages) {

    })




function filterChapters(html){

    var $ = cheerio.load(html);

    var chapters = $('.chapter');
    var info = [];

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