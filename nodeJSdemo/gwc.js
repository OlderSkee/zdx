/**
 * Created by zdx on 2016/9/13.
 */
/**
 * Created by zdx on 2016/9/13.
 */
var https = require("https");
//var url = "http://www.imooc.com/learn/348"
var cheerio = require('cheerio');

var urls = ["https://buy.taobao.com/auction/buy_now.jhtml?spm=2013.1.20140002.d1.EcTN8Y",
    //"https://item.taobao.com/item.htm?spm=2013.1.1998246703.3.9sgEBI&id=38975285118&taskid=55395930",
    //"https://item.taobao.com/item.htm?spm=a217z.7278713.1998876887-0.3.Ulm93l&id=41211738159&scm=13003.1.5170000.ba314a6aa3327bd7fa2d8522c2138aae"
]

//var fs = require("fs");
//
//var options = {
//    key : fs.readFileSync("ssh_key.pem"),
//    cert : fs.readFileSync("ssh_cert.pem")
//}


var iconv = require('iconv-lite')

for(var j=0;j<urls.length;j++) {


    https.get(urls[j], function (res) {

        var html = '';

        res.on('data', function (data) {
            data = iconv.decode(data,'gbk');
            html += data;
            // var data = JSON.stringify(data)
        })
        //console.log( 'statusCode:' + res.statusCode);

        res.on('end', function () {

            var message = filterChapters(html);

            printLog(message);

            //console.log("-------------------分隔符---------------------")

        })

    }).on('error', function () {
        console.log("获取失败!")
    })

}


function filterChapters(html){
    // decode the content of the website

    var $ = cheerio.load(html);

    var detail = $( '#detail');
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
            nowPrice:nowPrice,
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
        str +=  "动态"+everyObj.z+ "元\n"
    })
    console.log(str)
}