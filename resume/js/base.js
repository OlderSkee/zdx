/**
 * Created by zdx on 2016/8/21.
 */
$(document).ready(function () {

    //$(".box").first().show().siblings(".box").hide()

//            动态添加ul和li
    $(".box").parent().append("<ul></ul>");

    $(".box").each(function (i) {
        $("ul").append("<li>"+(i+1)+"</li>")
            .children()
            .addClass("mainlis")
    })
    $(".mainlis").eq(0).addClass("ullibg");
//            lis点击事件
    $(".mainlis").click(function () {
        index = $(this).index();
        $(this).addClass("ullibg")
            .siblings(".mainlis")
            .removeClass("ullibg")
        $(".box").eq(index)
            .stop()
            .slideDown(1000)
            .siblings(".box")
            .stop()
            .slideUp(1000);
    })

    //滚轮事件
    /*当鼠标滚轮事件发生时，执行一些操作*/
    function onMouseWheel(ev) {
        ev.stopPropagation();

        var ev = ev || window.event;
        // 定义一个标志，当滚轮向下滚时，执行一些操作
        var down = true;
        //获得鼠标所在盒子的索引值
//              var index = $(event.target).index();
        if($(ev.target).hasClass("box")){
            var index = $(ev.target).index();
        }else if($(ev.target).parents(".box")){
            var index = $(ev.target).parents(".box").index();
        //}else{
        //    var index = $(ev.target).parent().parents().index();
        }
        down = ev.wheelDelta?ev.wheelDelta<0:ev.detail>0;
        if(down){//鼠标下滑
            index >= $(".mainlis").length-1 ? index = -1: index;

            $(".mainlis").eq(index+1)
                .addClass("ullibg")
                .siblings(".mainlis")
                .removeClass("ullibg");

            $(".box").eq(index+1)
                .stop(true,false)
                .slideDown(1000)
                .siblings(".box")
                .stop(true,false)
                .slideUp(1000);


        }else{//鼠标上滑

            $(".mainlis").eq(index-1)
                .addClass("ullibg")
                .siblings(".mainlis")
                .removeClass("ullibg");

            $(".box").eq(index-1)
                .stop(true,false)
                .slideDown(1000)
                .siblings(".box")
                .stop(true,false)
                .slideUp(1000);

        }
        if(ev.preventDefault){/*FF 和 Chrox      /me*/
            ev.preventDefault();// 阻止默认事件
        }
        return false;
    }
    addEvent(document,'mousewheel',onMouseWheel);
    addEvent(document,'DOMMouseScroll',onMouseWheel);


    //封装添加事件函数；
    function addEvent(obj,xEvent,fn) {
        if(obj.attachEvent){
            obj.attachEvent('on'+xEvent,fn);
        }else{
            obj.addEventListener(xEvent,fn,false);
        }
    }

    var value = [];
    for(var i=0;i<6;i++){
        value[i] = $(".r-goodat>div").eq(i).children("span").text()/100*500;
    }

    $(".box").eq(2).mouseover(function () {
        for(var i=0;i<6;i++){
            $(".r-goodat>div").eq(i).children("img").animate({"left":value[i]-16});
            $(".r-goodat>div").eq(i).children("span").animate({"left":value[i]-8});
            $(".r-goodat>div").eq(i).children(".value").animate({"width":value[i]})
        }

    })



    $(".btn").click(function () {
        $(".btn").parent().hide();
        $(".s-connect").show();
    })


    console.log("请联系我：")
    console.log("电话：15907153146")
    console.log("邮箱：1090512768@qq.com")
    console.log("By：OlderSkee,2016/8/21")





})
