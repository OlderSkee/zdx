/**
 * Created by zdx on 2016/8/17.
 */
window.onload = function () {
    function $(id){return document.getElementById(id);}

    var m_box = $("m_box");
    var pics = m_box.children;
    var b_box = $("b_box");

    for(var i=0; i<pics.length;i++){
        var span = document.createElement("span");
        span.className = "num";
        span.innerHTML = pics.length - i;
        b_box.insertBefore(span,b_box.children[1]);
    }
    var spans = b_box.children;
    spans[1].className = "num point";

    var scrollwidth = b_box.clientWidth;

    for(var i=1;i<pics.length;i++){
        pics[i].style.left = scrollwidth + "px";
    }

    var iNow = 0;
    for(var i in spans) {
        //for(var i=0;i<spans.length;i++){
        spans[i].onclick = function () {

            if (this.className == "left") {

                animate(pics[iNow], {left: scrollwidth});
                --iNow < 0 ? iNow = pics.length - 1 : iNow;
                pics[iNow].style.left = -scrollwidth + "px";
                animate(pics[iNow], {left: 0});
                spancolor();

            } else if (this.className == "right") {

                animate(pics[iNow], {left: -scrollwidth});
                ++iNow > pics.length - 1 ? iNow = 0 : iNow;
                pics[iNow].style.left = scrollwidth + "px";
                animate(pics[iNow], {left: 0});
                spancolor();

            } else {
                var that = this.innerHTML - 1;
                if (that > iNow) {
                    animate(pics[iNow], {left: -scrollwidth});
                    pics[that].style.left = scrollwidth + "px";
                } else if (that < iNow) {
                    animate(pics[iNow], {left: scrollwidth});
                    pics[that].style.left = -scrollwidth + "px";

                }
                iNow = that;
                animate(pics[iNow], {left: 0});
                spancolor();


            }
        }


    }
    function spancolor() {
        for (var i = 1; i < spans.length - 1; i++) {
            spans[i].className = "num";
        }
        spans[iNow + 1].className = "num point"
    }
    var timer = null;
    timer = setInterval(autoplay,1000);
    function autoplay(){
        animate(pics[iNow], {left: -scrollwidth});
        ++iNow > pics.length - 1 ? iNow = 0 : iNow;
        pics[iNow].style.left = scrollwidth + "px";
        animate(pics[iNow], {left: 0});
        spancolor();
        console.log(iNow);
    }
    b_box.parentNode.onmouseover = function () {
        clearInterval(timer);
    }
       b_box.parentNode.onmouseout = function () {
           timer = setInterval(autoplay,1000);
    }








}