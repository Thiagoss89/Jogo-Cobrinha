let canvas = document.getElementById("cobrinha")
let context = canvas.getContext("2d")
let box = 32
let cobrinha = []
cobrinha[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha(){
    for(i=0; i < cobrinha.length; i++){
        context.fillStyle = "brown";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "green";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if (event.keyCode == 37 && direction != "right") direction = "left"
    if (event.keyCode == 38 && direction != "down") direction = "up"
    if (event.keyCode == 39 && direction != "left") direction = "right"
    if (event.keyCode == 40 && direction != "up") direction = "down"
}

function iniciarJogo() {
    if(cobrinha[0].x > 15 * box && direction == "right") cobrinha[0].x = 0;
    if(cobrinha[0].x < 0 && direction == "left") cobrinha[0].x = 16 * box;
    if(cobrinha[0].y > 15 * box && direction == "down") cobrinha[0].y = 0;
    if(cobrinha[0].y < 0 && direction == "up") cobrinha[0].y = 16 * box;

    for(i = 1; i < cobrinha.length; i++){
        if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let cobraX = cobrinha[0].x;
    let cobraY = cobrinha[0].y;

    if(direction == "right") cobraX += box;
    if(direction == "left") cobraX -= box;
    if(direction == "up") cobraY -= box;
    if(direction == "down") cobraY += box;

    if(cobraX != food.x || cobraY != food.y){
        cobrinha.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    

    let newHead = {
        x: cobraX,
        y: cobraY
    }

    cobrinha.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); // 100 milisegundos