/**
 * Created by zdx on 2016/9/4.
 */
var r = 8;
var LEFT = 20;
var TOP = 10;
var WIDTH = 1000;
var HEIGHT = 600;
var balls = [];
var colors=["#51F511","#66FAD5","#EF1C3E","#FFFA5F","#DE48CD","#310CF2"];
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    nowtime = time();
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    setInterval(function () {
        drew(context);
        update();

    },50)

};
function update(){
    var nexttime = time();
    var nexthours = parseInt(nexttime / 60 /60 % 24);
    var nextminutes = parseInt(nexttime / 60 % 60)
    var nextseconds = parseInt(nexttime % 60);


    var nowhours = parseInt(nowtime / 60 /60 % 24);
    var nowminutes = parseInt(nowtime / 60 %60)
    var nowseconds = parseInt(nowtime % 60);



    if(nextseconds!=nowseconds){
        if(parseInt(nowhours/10)!=parseInt(nexthours/10)){
            addballs(LEFT,TOP,parseInt(nowhours/10));
        }
        if(parseInt(nowhours%10)!=parseInt(nexthours%10)){
            addballs(LEFT+15*(r+1),TOP,parseInt(nowhours%10));
        }
        if(parseInt(nowminutes/10)!=parseInt(nextminutes/10)){
            addballs(LEFT+39*(r+1),TOP,parseInt(nowminutes/10));
        }
        if(parseInt(nowminutes%10)!=parseInt(nextminutes%10)){
            addballs(LEFT+54*(r+1),TOP,parseInt(nowminutes%10));
        }
        if(parseInt(nowseconds/10)!=parseInt(nextseconds/10)){
            addballs(LEFT+78*(r+1),TOP,parseInt(nowseconds/10));
        }
        if(parseInt(nowseconds%10)!=parseInt(nextseconds%10)){
            addballs(LEFT+93*(r+1),TOP,parseInt(nowseconds%10));
        }
            nowtime=nexttime;
    }

    updateballs();
}
function updateballs(){
    for (var i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx;
        balls[i].vy += balls[i].g;
        balls[i].y += balls[i].vy;

        if(balls[i].y >=  HEIGHT - r){
            balls[i].y = HEIGHT - r;
            balls[i].vy = -balls[i].vy*0.75;
            //if(balls[i].vy>=-10 && balls[i].vy<=10){
            //    balls[i].vy = 0;
            //}

        }



    }
}
function addballs(x,y,num){
        for (var i=0;i<digit[num].length;i++){
            for(var j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j]==1){
                  var oneball = {
                      x : x+j*2*(r+1)+(r+1),
                      y : y+i*2*(r+1)+(r+1),
                      g : 1.5+Math.random(),
                      vx: Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                      vy: -5,
                      color:colors[Math.floor(Math.random()*colors.length)]
                  }
                    balls.push(oneball);

                }
            }
        }
}
//function addballs(x,y,num){
//        for(var i=0;i<digit[num].length;i++)
//            for(var j=0;j<digit[num][i].length;j++)
//                if(digit[num][i][j]==1){
//                    var newball={
//                        x : x+(r+1)+j*2*(r+1),
//                        y : y+(r+1)+i*2*(r+1),
//                        g : 1.5+Math.random(),
//                        vx :Math.pow(-1,Math.floor(Math.random()*100))*5,
//                        vy : -Math.ceil(Math.random()*10),
//                        color :colors[Math.floor(Math.random()*colors.length)]
//                    }
//             balls.push(newball);
//        }
//}


function drew(cont){
    cont.clearRect(0,0,WIDTH,HEIGHT);

    var nowhours = parseInt(nowtime / 60 /60 % 24);
    var nowminutes = parseInt(nowtime / 60 %60)
    var nowseconds = parseInt(nowtime % 60);


    drewcont(LEFT,TOP,parseInt(nowhours/10),cont);
    drewcont(LEFT+15*(r+1),TOP,parseInt(nowhours%10),cont);

    drewcont(LEFT+30*(r+1),TOP,10,cont);

    drewcont(LEFT+39*(r+1),TOP,parseInt(nowminutes/10),cont);
    drewcont(LEFT+54*(r+1),TOP,parseInt(nowminutes%10),cont);

    drewcont(LEFT+69*(r+1),TOP,10,cont);

    drewcont(LEFT+78*(r+1),TOP,parseInt(nowseconds/10),cont);
    drewcont(LEFT+93*(r+1),TOP,parseInt(nowseconds%10),cont);

   for(var i=0;i<balls.length;i++){
       cont.fillStyle = balls[i].color;

           cont.beginPath();
           cont.arc(balls[i].x,balls[i].y,r,0,2*Math.PI,true);
           cont.closePath();

           cont.fill();

   }


}

function drewcont(beginx,beginy,num,cont){
    cont.fillStyle = "orange";

    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cont.beginPath();
                cont.arc(beginx+j*2*(r+1)+(r+1),beginy+i*2*(r+1)+(r+1),r,0,2*Math.PI);
                cont.closePath();
                cont.fill();
            }
        }
    }
}


function time(){
    var date = new Date();
    var re = Math.round(date.getTime()/1000)
    return re >=0? re : 0;
    //switch (obj){
    //    case "hours":
    //        return date.getHours();
    //        break;
    //    case "minutes":
    //        return date.getMinutes();
    //        break;
    //    case "seconds":
    //        return date.getSeconds();
    //        break;
    //}

}
