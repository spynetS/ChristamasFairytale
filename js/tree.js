let boxed = false;
let clickAmount = 0;

// set bulbs from cookie
if(getCookie('bulb')!=null){
    let bulbs = JSON.parse(getCookie("bulb"))
    for(let i = 0;i<bulbs.length;i++){
        console.log(bulbs[i].x)
        spawBall(bulbs[i].x,bulbs[i].y)
    }
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
 function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function boxClick(){
    boxed = true
}
function treeClick(e){
    console.log(e)
    if(boxed) spawBall(e.clientX,e.clientY)
    boxed = false;
}
function spawBall(x,y){
    let size = 50
    clickAmount = clickAmount < 13 ? clickAmount+1:clickAmount;
    let holder = document.getElementById('holder')
    let ball = document.createElement('img')
    ball.src = '../media/ball1.png'
    ball.style = 'position:absolute;left:'+(x-size/2)+'px;top:'+(y-size/2)+'px;width:'+size+'px'
    holder.appendChild(ball)
    if(getCookie('bulb')==null){
        setCookie('bulb',JSON.stringify([{"x":x,"y":y}]),0)
    }
    else{
        let balls = JSON.parse(getCookie("bulb"))
        balls.push({"x":x,"y":y})
        setCookie('bulb',JSON.stringify(balls),0)
    }
}
