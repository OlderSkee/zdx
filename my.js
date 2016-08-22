/**
 * Created by zdx on 2016/8/15.
 */

//获得兼容性的classname
function getClass(classname){
//                if(document.getElementsByClassName){
//                    return document.getElementsByClassName(classname)
//                }
    var all = document.getElementsByTagName("*");
    var arr = [];
    for(var i=0;i<all.length;i++){

        var txtarr = all[i].className.split(" "); //重点   将all的每一个分开！
        for(var j=0; j<txtarr.length; j++){
            if(txtarr[j]  == classname){        //重点2
                arr.push(all[i]);
            }

        }
    }
    return arr;
}

//获得id class 和 div 带#或者.
function $(str){
    var s = str.charAt(0);     //重点3
//              var s = str.substr(0,1);
    var ss = str.substr(1);
    switch(s){
        case "#":
            return document.getElementById(ss);   //重点4   返回的不仅仅是ss
            break;
        case ".":
            return getClass(ss);            //重点5    与绑定类关联
            break;
        default :
            return document.getElementsByTagName(str);  //重点6    返回的不仅仅是str
    }


}
//或者屏幕滚动后距离顶部距离  需要配合window.onchange
function scroll(){
    if (window.pageXOffset != null) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compa"){
        return {
            left : document.documentElement.scrollLeft,
            top  : document.documentElement.scrollTop
        }
    }
    return {
        left : document.body.scrollLeft,
        top  : document.body.scrollTop
    }
}

//获得屏幕宽度 （响应式）
function client(){
    if(window.innerWidth != null) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat") {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return {
        width : document.body.clientWidth,
        heigth: document.body.clientHeight
    }


}

// []方式获得属性和值
function getStyle(obj,attr) {  //  谁的      那个属性
    if(obj.currentStyle)  // ie 等
    {
        return obj.currentStyle[attr];  // 返回传递过来的某个属性
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
    }
}

 //动画封装 animate
function animate(obj,json,fn) {  // 给谁    json
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  // 用来判断是否停止定时器   一定写到遍历的外面
        for(var attr in json){   // attr  属性     json[attr]  值
            //开始遍历 json
            // 计算步长    用 target 位置 减去当前的位置  除以 10
            // console.log(attr);
            var current = 0;
            if(attr == "opacity")
            {
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
            }
            else
            {
                current = parseInt(getStyle(obj,attr)); // 数值
            }
            // console.log(current);
            // 目标位置就是  属性值
            var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断透明度
            if(attr == "opacity")  // 判断用户有没有输入 opacity
            {
                if("opacity" in obj.style)  // 判断 我们浏览器是否支持opacity
                {
                    // obj.style.opacity
                    obj.style.opacity = (current + step) /100;
                }
                else
                {  // obj.style.filter = alpha(opacity = 30)
                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = current  + step + "px" ;
            }

            if(current != json[attr])  // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
            {
                flag =  false;
            }
        }
        if(flag)  // 用于判断定时器的条件
        {
            clearInterval(obj.timer);
            //alert("ok了");
            if(fn)   // 很简单   当定时器停止了。 动画就结束了  如果有回调，就应该执行回调
            {
                fn(); // 函数名 +  （）  调用函数  执行函数
            }
        }
    },10)
}
