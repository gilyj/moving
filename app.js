const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let movingX, movingY;

init();

addEventListener('resize', init);

function init(){
    canvas.width = innerWidth - 180;
    canvas.height = innerHeight;
};

class Draw{
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.vx = 5;
        this.vy = 2;
    }

    line(prevX, prevY, currentX, currentY){
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(prevX + 1, prevY + 1);
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    circle(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.x + this.vx > canvas.width || this.x + this.vx < 0){
            this.vx = -this.vx;
        }

        if(this.y + this.vy > canvas.height || this.y + this.vy < 0){
            this.vy = -this.vy;
        }

        movingX = this.x;
        movingY = this.y;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    update(x, y){
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, false);
        ctx.stroke();
    }
};

let draw1;
let mouse = {x: 0, y: 0};
let movingAni;

let moving = false;
let tracking = false;


document.querySelector('.spider_web').addEventListener('click', e => {
    // let x = e.clientX;
    // let y = e.clientY;
    tracking = true;

    let radius = 10;
    let x, y;

    if(!pos.length){
        x = innerWidth / 2;
        y = innerHeight / 2;
    } else {
        x = pos[pos.length -1].x
        y = pos[pos.length -1].y
    };

    ctx.clearRect(0,0,canvas.width, canvas.height);
    draw1 = new Draw(x, y, radius);


    if(tracking) movingAnimate();
    
});

function movingAnimate(){
    movingAni = requestAnimationFrame(movingAnimate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw1.circle();
};

let isClick = false;
let lineDraw = [];
let pos = [];

let prevX, prevY, currentX, currenY;
let move;
let draw2;

let MouseEvent = function(callback){
    function ondown(e){
        callback('down');
    }

    function onmove(e){
        callback('move', e);
    }

    function onup(e){
        callback('up');
    }

    canvas.onmousedown = ondown;
    canvas.onmousemove = onmove;
    canvas.onmouseup = onup;

    canvas.ontouchstart = ondown;
    canvas.ontouchmove = onmove;
    canvas.ontouchend = onup;
};

let mouseType = new MouseEvent(function(type, e){
    switch(type){
        case 'down' :
            isClick = true;
            pos = [];
            break;
        case 'move' :
            if(isClick){ findPos(e)};
            break;
        case 'up' :
            if(isClick){
                trackingAnimation();
                isClick = false;
            }
            break;
    }
});

document.querySelector('.bugs').addEventListener('click', e => {
    cancelAnimationFrame(movingAni);
    draw2 = new Draw();
    tracking = true;
});

function findPos(e){
    prevX = e.clientX;
    prevY = e.clientY;
    currentX = prevX - e.clientX;
    currentY = prevY - e.clientY;

    if(!tracking) return; 
    pos.push({
        x: prevX,
        y: prevY
    })
    draw2.line(prevX, prevY);
};

function trackingAnimation(){
    let i = 0;
    if(tracking){
        move = setInterval(function(){
            if(i<pos.length -1){
                ctx.clearRect(0,0,canvas.width, canvas.height);
                i++;
                draw2.update(pos[i].x, pos[i].y);
    
                return;
            } else {
                clearInterval(move);
            }
        }, 40)

    }
};

