
 
    
    var keys = [];
    let dead = new Audio();
    let eat = new Audio();
    let left = new Audio();
    let right= new Audio();
    let up= new Audio();
    let down= new Audio();
    dead.src = "dead.mp3";
    eat.src = "eat.mp3";
    up.src = "up.mp3";
    right.src = "right.mp3";
    left.src = "left.mp3";
    down.src = "down-2.mp3";
  
    
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: 
            case 32: e.preventDefault(); break; 
            default: break; 
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);

    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    
    var cw = 15;
    var d;
    var food;
    var score;
   
    var x =  document.getElementById("selectMode");
   

    var snake_array; 
   

    function init() {
        d = "right"; 
        create_snake();
        create_food(); 
        
        score = 0;

       
        if (typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, x.value);
    }
    init();

    function create_snake() {
        var length = 3; 
        snake_array = []; 
        for (var i = length - 1; i >= 0; i--) {
            
            snake_array.push({
                x: i,
                y: 0
            });
        }
    }



    function create_food() {
        food = {
            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw),
        };
        
    }
     const foodImg = new Image();
     foodImg.src = "assets/food.png";
   

    function paint() {
        
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        
        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        
        if (d == "right") nx++;
        else if (d == "left") nx--;
        else if (d == "up") ny--;
        else if (d == "down") ny++;

        
        if (nx == -1 || nx == w / cw || ny == -1 || ny == h / cw || check_collision(nx, ny, snake_array)) {
            
            init();
            dead.play();
           
            return;
        }

        if (nx == food.x && ny == food.y) {
            var tail = {
                x: nx,
                y: ny
            };
            eat.play();
            score++;
           
            create_food();
        }
        else {
            var tail = snake_array.pop(); 
            tail.x = nx;
            tail.y = ny;
        }
        
        snake_array.unshift(tail); 
        for (var i = 0; i < snake_array.length; i++) {
            var c = snake_array[i];
           
            paint_snake(c.x, c.y);
        }

        
        paint_food(food.x, food.y);
        
        var score_text = "Score: " + score;
         ctx.fillStyle = "yellow";
         ctx.font = "20px Verdana";
        ctx.fillText(score_text, 5, h - 5);
    }

   

     function paint_snake(x, y) {
      for (let i = 0; i < snake_array.length; i++) {
        ctx.fillStyle = ( i==0 ) ? "white":"blue";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        
    }}
    
    function paint_food(x,y){
      ctx.fillStyle = "red";
        ctx.fillRect(x * cw, y * cw, cw, cw);
    }
    function check_collision(x, y, array) {
       
        for (var i = 0; i < array.length; i++) {
            if (array[i].x == x && array[i].y == y) return true;
        }
        return false;
    }


    $(document).keydown(function(e) {
        var key = e.which;
        
        if (key == "37" && d != "right") {
          left.play();
          d = "left";}
        else if (key == "38" && d != "down"){ up.play(); d = "up";}
        else if (key == "39" && d != "left") {right.play();d = "right";}
        else if (key == "40" && d != "up") {down.play();d = "down";}
        
    })

    function leave(){
      alert("Press OK to Continue");
    }


