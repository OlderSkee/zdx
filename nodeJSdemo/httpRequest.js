/**
 * Created by zdx on 2016/9/13.
 */
var http=require('http')
var querystring=require('querystring');
var contentData = {
    'content':'试试测试测试',
    'cid':637
};
var pataData=querystring.stringify(contentData);

var options={
    hostname:'www.imooc.com',
    port:'80',
    path:'/course/docomment',
    method:'POST',
    headers:{
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4',
        'Connection':'keep-alive',
        'Content-Length':pataData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=76e16dc8-6893-46f6-a732-8a287d536c3c;imooc_isnew_ct=1468987904;loginstate=1;apsid=kwNWQwYTI5ZGMyYjliMzdlNjBlMDNkYjdmNmYwZTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzU0MzU5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1MDE4OTQxODhAcXEuY29tAAAAAAAAAAAAAAAAAAAAADNmYzc4YzgyMzI3NjM3YTQ5YjE5NDYzNzk1ZGU0YTQ4UaOmV1Gjplc%3DMj;last_login_username=501894188%40qq.com;bdshare_firstime=1471354375168;PHPSESSID=h396rj39qrggq61tr37qfejkj1;imooc_isnew=2;cvde=57c6df1ab5074-26;IMCDNS=0;Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1471961948,1472012268,1472031648,1472651040;Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1472654818',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Referer':'http://www.imooc.com/comment/637',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
}
//执行请求
var req = http.request(options,function(res){
    console.log('Status: '+res.statusCode);
    console.log('headers: '+JSON.stringify(res.headers));
    res.on('data',function(chunk){
        console.log(Buffer.isBuffer(chunk))//判断是否是buffer类型
        console.log(typeof chunk);
    })
    res.on('end',function(){
        console.log('评论成功');
    })
})
req.on('error',function(e){
    console.log('Error: '+e.message)
})
req.write(pataData)
req.end()