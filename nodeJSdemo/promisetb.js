/**
 * Created by zdx on 2016/9/14.
 */
/**
 * Created by zdx on 2016/9/13.
 */
var https = require("https");
//var url = "http://www.imooc.com/learn/348"
var cheerio = require('cheerio');
var Promise = require("bluebird")
var superagent = require("superagent")
var urls = ["https://item.taobao.com/item.htm?spm=a219r.lm893.14.1.gWAYwm&id=44812337467&ns=1&abbucket=17",
    "https://item.taobao.com/item.htm?spm=2013.1.1998246703.3.9sgEBI&id=38975285118&taskid=55395930",
    "https://item.taobao.com/item.htm?spm=a217z.7278713.1998876887-0.3.Ulm93l&id=41211738159&scm=13003.1.5170000.ba314a6aa3327bd7fa2d8522c2138aae",
    "https://item.taobao.com/item.htm?spm=a219r.lm893.14.1.gWAYwm&id=44812337467&ns=1&abbucket=17/service/getData/1/p1/item/detail/sib.htm?itemId=44812337467&sellerId=1076153643&modules=qrcode,viewer,price,contract,duty,xmpPromotion,dynStock,delivery,upp,sellerDetail,activity,fqg,zjys,coupon,soldQuantity&callback=onSibRequestSuccess",
]

//var fs = require("fs");
//
//var options = {
//    key : fs.readFileSync("ssh_key.pem"),
//    cert : fs.readFileSync("ssh_cert.pem")
//}
var iconv = require('iconv-lite')


function getInfo(url){

        return new Promise(function (resolve,reject) {

    https.get(url, function (res) {
        superagent.get(res);
        var html = '';

        res.on('data', function (data) {
            data = iconv.decode(data,'gbk');
            html += data;
            //console.log(JSON.stringify(data))
        })
        //console.log( 'statusCode:' + res.statusCode);

        res.on('end', function () {
            resolve(html)
            //
            //var message = filterChapters(html);
            //
            //printLog(message);

            //console.log("-------------------分隔符---------------------")

        })

    }).on('error', function (e) {
        reject(e)
        console.log("获取失败!")
    })
        })

}


var promiseInfo  = [];

urls.forEach(function (url) {
    promiseInfo.push(getInfo(url));
})


Promise
    .all(promiseInfo)
    .then(function (everyFn) {
        everyFn.forEach(function (html) {   //html是resolve传过来的
            var message = filterChapters(html);
            printLog(message)

        })
    })


function filterChapters(html){
    // decode the content of the website

    var $ = cheerio.load(html);

    var detail = $('#detail');
    var info = [];

    detail.each(function () {
        //var title = $(this).find("strong").text().replace(/\s/g,"");
        //
        //var price = $(this).find(".J-media-item");

        var title = $(this).find(".tb-main-title").text().replace(/\s/g,"");
        var price = $(this).find(".tb-rmb-num").eq(0).text().replace(/\s/g,"");
        var nowPrice = $(this).find(".tb-rmb-num").eq(1).text().replace(/\s/g,"");

        var everyInfo = {
            title:title,
            price:price,
            nowPrice:nowPrice
        }


        info.push(everyInfo)
    })

    return info

}
function printLog(message){
    var str = ''
    message.forEach(function (everyObj) {
        str += "\n" + everyObj.title + "  ";
        str +=  "原价"+everyObj.price+ "元  "
        str +=  "促销价"+everyObj.nowPrice+ "元\n"
    })
    console.log(str)
}