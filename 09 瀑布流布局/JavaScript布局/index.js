/**
 * Created by zdx on 2016/9/8.
 */
window.onload = function () {
    //var json = {
    //    "pic":[
    //        {"src":"1.jpg"},
    //        {"src":"2.jpg"},
    //        {"src":"3.jpg"},
    //        {"src":"4.jpg"},
    //        {"src":"5.jpg"},
    //        {"src":"6.jpg"},
    //    ]
    //
    //}
    waterFall("main","box");
    window.onscroll = function () {
        var main =document.getElementById("main")
        var all = getClassName(main,"box");
        var lastTop = all[all.length-1].offsetTop;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientW = document.documentElement.clientWidth||document.body.clientWidth;

        if(lastTop<scrollTop+clientW&&scrollTop<5000){
            for (var i=0;i<96;i++){
                var outBox =document.createElement("div");
                outBox.className = "box";
                main.appendChild(outBox);
                var inBox =document.createElement("div");
                inBox.className = "pic";
                outBox.appendChild(inBox);
                var inPic =document.createElement("img");
                inPic.src = "images/"+i+".jpg"
                //inPic.src = "images/" +json.pic[i].src
                inBox.appendChild(inPic)
            }
            waterFall("main","box");

        }
    }

}


function waterFall(parentId,childName){
    var parentId = document.getElementById(parentId);

    var allbox = getClassName(parentId,childName);

    var clientW = document.documentElement.clientWidth||document.body.clientWidth;

    var picW = allbox[0].offsetWidth;

    var cols = Math.floor(clientW/picW);

    parentId.style.cssText = "width:"+cols*picW+"px;margin:0 auto";

    var head = [];
    for(var i=0;i<allbox.length;i++){
        if(i<cols){
            head.push(allbox[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null,head);
            var index = getIndex(minH,head);
            allbox[i].style.position = "absolute";
            allbox[i].style.left = allbox[index].offsetLeft + "px";
            allbox[i].style.top = minH + "px";
            head[index]+=allbox[i].offsetHeight;
        }
    }
}

function getClassName(parentId,childName){
    var all = [];

    var allChild = parentId.getElementsByTagName("*");
    for(var i=0;i<allChild.length;i++){
        if(allChild[i].className == childName ){
            all.push(allChild[i])
        }
    }
    return all;
}
function getIndex(min,arr){
    for(var i in arr){
        if(min==arr[i]){
            return i;
        }
    }

}