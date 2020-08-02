function init() {
    var canvas = document.getElementById('mycanvas');
    W = canvas.width = 800;
    H = canvas.height = 800;
    pen = canvas.getContext('2d');
    cs = 66;
    food = getRandomFood();
    game_over = false;
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],   // 2d matrix of x and y {x:val,y:val}
        directions: "right",


        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 3, cs - 3);
            }
        },
        updateSnake: function () {
           
            var head_x = this.cells[0].x;
            var head_y = this.cells[0].y;
            if(head_x==food.x && head_y==food.y){
            console.log("food eaten");
            food = getRandomFood();
            }
            else{
                this.cells.pop();
            }
            var new_head_x, new_head_y;
            if (snake.directions == "down") {
                new_head_x = head_x;
                new_head_y = head_y + 1;
            }

            else if (snake.directions == "left") {
                new_head_x = head_x - 1;
                new_head_y = head_y;
            }
            else if (snake.directions == "up") {
                new_head_x = head_x;
                new_head_y = head_y - 1;
            }
            else {
                new_head_x = head_x + 1;
                new_head_y = head_y;
            }

            this.cells.unshift({ x: new_head_x, y: new_head_y });
            /*Write a Logic that prevents snake from going out*/
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}
        }
    };
    snake.createSnake();
    function keyPressed(e) {
        console.log("key is pressed", e.key);
        if (e.key == "ArrowRight") {
            snake.directions = "right";
        }
        else if (e.key == "ArrowDown") {
            snake.directions = "down";
        }
        else if (e.key == "ArrowUp") {
            snake.directions = "up";
        }
        else {
            snake.directions = "left";
        }
        console.log(snake.directions);
    }
    document.addEventListener('keydown', keyPressed);
}

function draw() {
    //erase the old frame
    pen.clearRect(0, 0, W, H);
    // create new frame
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
}


function update() {
    snake.updateSnake();
    
}
function getRandomFood(){
    
    // var foodX = Math.round(Math.random()*(W-cs)/cs); //devison to make sure that we get it inside the cell only
    // var foodY =  Math.round(Math.random()*(H-cs)/cs);

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food
}
function gameloop() {
    if(game_over){
        clearInterval(f);
        alert("Game over !");
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);