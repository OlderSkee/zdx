/**
 * Created by zdx on 2016/9/13.
 */

var http = require("http");
//var url = "http://www.imooc.com/learn/348"
var Promise = require("bluebird");
var cheerio = require('cheerio');

//var url = "http://www.imooc.com/learn/348"
var baseUrl = "http://www.imooc.com/learn/"
var videoIds = [348,859,197,134,75]
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


var fetchCourseArry = [];
    videoIds.forEach(function (id) {
        fetchCourseArry.push(getPageAsync(baseUrl + id))
    })

Promise
    .all(fetchCourseArry)
    .then(function (pages) {

        var coursesData = [];

        pages.forEach(function (html) {

            var courses = filterChapters(html);

            coursesData.push(courses)

        })
        coursesData.sort(function (a,b) {
            return a.number< b.number;
        })
        printLog(coursesData)
    })




function filterChapters(html){

    var $ = cheerio.load(html);

    var chapters = $('.chapter');
    // info = {
    //     title:"",
    //     number:"",
    //   videos: [
    //               {
    //
    //                title:"",
    //                video:[
    //                    {
    //                        videoTitle:"",
    //                        videoNum:""
    //                    }
    //                    ]
    //                 }
    //             ]
    //}

    var title = $("#main .path span").text()
    var number = parseInt($(".js-learn-num").text().trim(),10)
    var info = {
        title:title,
        number:number,
        videos:[]
    };

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


        info.videos.push(everyInfo)
    })
    return info

}

//function printLog(coursesData){
//    coursesData.forEach(function (courseData) {
//        console.log(courseData.number + "人学过" +courseData.title + "\n")
//    })
//
//    coursesData.forEach(function (courseData) {
//        console.log("###"+courseData.title + "\n");
//        courseData.videos.forEach(function (item) {
//            console.log(item.title + "\n");
//
//            item.video.forEach(function (video) {
//                console.log("【"+ video.videoNum + "】" + video.videoTitle+"\n")
//            })
//        })
//
//    })
//
//}
function printLog(message){
    var str = ''

    message.forEach(function (everyObj) {
        str += everyObj.number + "人学过" + everyObj.title + "\n"
    })


    message.forEach(function (everyObj) {
        str +=  "\n######" + everyObj.title + "\n"
        everyObj.videos.forEach(function (detaileObj) {


            str += "\n"+detaileObj.title + "\n"
            //console.log(everyObj.title + "\n")

            detaileObj.video.forEach(function (video) {
                //console.log("\n【"+ video.videoNum + "】" + video.videoTitle+"\n")
                str+="\n【编号"+ video.videoNum + "】" + video.videoTitle+"\n"

            })

        })

    })

    console.log(str)
}


