/**
 * Created by zdx on 2016/9/13.
 */
var http=require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write("res.write内容\r\n")
    res.end("hello Node.js\n");

})
    .listen(2016)
//.listen(1337,'127.0.0.1');

console.log("Server running ......");