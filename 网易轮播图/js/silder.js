/**
 * Created by zdx on 2016/8/17.
 */
window.onload = function () {

    var m_box = document.getElementById("m_box");
    var pics = m_box.children;
    var b_box = document.getElementById("b_box");
    //添加span ，并加上序号
    for(var i=0; i<pics.length;i++){
        var span = document.createElement("span")
        b_box.insertBefore(span,b_box.children[1]);
        span.innerHTML = pics.length -i;
    }
    //给span加上背景 和额外一个 的颜色
    var spans = b_box.children;
    for(var i=1;i<spans.length-1;i++){
        spans[i].className = "num"
    }
    spans[1].className = "num point";
    //定义每一个的滚动的宽度
    var scrollwidth = b_box.clientWidth;

    //把所有图片定位到旁边，除了第一张,也就是i=1 开始
    for (var i=1 ;i<pics.length;i++){
        pics[i].style.left = scrollwidth + "px";
    }
    //定义当前图片的张数
    var inow = 0;
    //遍历josn 获得里面的span
    for(var i in spans){
        spans[i].onclick = function () {
            //判断操作的哪个span
            if(this.className == "right"){
                ////先让当前的图跑到左边
                //animate(pics[inow],{left:-scrollwidth})
                ////判定图片是否还有。 先判断 再操作++ 。
                //++inow>pics.length-1? inow = 0 : inow;
                ////让当前图片inow+1 后，的那一张 直接跳到最右边。
                //pics[inow].style.left = scrollwidth +　"px";
                ////然后再从右边缓慢进入
                //animate(pics[inow],{left:0})
                ////调用spancolor函数，变类名
                //spancolor()
                ////效果等同于定时器，直接调用即可
                autoplay();

            }else if(this.className == "left"){
                //先让当前的图跑到右边
                animate(pics[inow],{left:scrollwidth})
                //判定图片是否还有。 先判断 再操作-- 。
                --inow < 0 ? inow = pics.length -1: inow;
                //让当前图片inow-1 后，的那一张 直接跳到最左边。
                pics[inow].style.left = -scrollwidth + "px";
                //然后再从左边缓慢进入
                animate(pics[inow],{left:0});
                //调用spancolor函数，变类名
                spancolor()

            }else{
                //定义当前点击的 序号， 与开始填入的有关
                var that = this.innerHTML - 1;
                //判断点击的在当前的右边
                if(that>inow){
                    //让当前的从左边出去
                    animate(pics[inow],{left:-scrollwidth});
                    //让点击的瞬间移动到右边
                    pics[that].style.left = scrollwidth + "px";
                    //让点击的从右边缓慢进入
                    animate(pics[that],{left:0});
                    //判断点击的在当前的左边
                }else if(that<inow){
                    //让当前的从右边出去
                    animate(pics[inow],{left:scrollwidth});
                    //让点击的瞬间移动到左边
                    pics[that].style.left = -scrollwidth + "px";
                    //让点击的从左边缓慢进入
                    animate(pics[that],{left:0});
                }
                //让inow变成点击的那一个
                inow =that;
                spancolor()

            }
        }
    }
    //定义spancolor函数
    function spancolor(){
        //遍历 ，使spans的类名还原， 注意 从 第2 个 span开始，到倒第二个结束
        for(var i=1;i<spans.length-1;i++){
            spans[i].className = "num";
        }
        //inow是从0开始的，所以要加 1
        spans[inow+1].className = "num point"
    }
    //开启定时器
    var timer = null;
    timer = setInterval(autoplay,1000)
    //其实 定时器 的效果 等同于点右箭头
    function autoplay(){
        //先让当前的图跑到左边
        animate(pics[inow],{left:-scrollwidth})
        //判定图片是否还有。 先判断 再操作++ 。
        ++inow>pics.length-1? inow = 0 : inow;
        //让当前图片inow+1 后，的那一张 直接跳到最右边。
        pics[inow].style.left = scrollwidth +　"px";
        //然后再从右边缓慢进入
        animate(pics[inow],{left:0})
        //调用spancolor函数，变类名
        spancolor();
    }
    //开启关闭定时器
    b_box.parentNode.onmouseover = function () {
        clearInterval(timer);
    }
    b_box.parentNode.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(autoplay,1000)
    }




}