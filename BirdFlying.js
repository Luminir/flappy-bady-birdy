let moveSpeed = 3;
let gravity = 0.25;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
// if (document.querySelector('.hard-mode')){
//     moveSpeed = 1.75;
//     console.log(moveSpeed)
// }
// else if (document.querySelector('.easy-mode')){
//     moveSpeed = 5;
//     console.log(moveSpeed);
// }
// else if(document.querySelector('.medium-mode')){
//     moveSpeed = 3;
// }
function easyMode(){
    moveSpeed = 5;
    // console.log(moveSpeed);
};
function mediumMode(){
    moveSpeed = 3
    // console.log(moveSpeed);
};
function hardMode(){
    moveSpeed = 1.75
    // console.log(moveSpeed);
};
let birdProps = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let scoreValue = document.querySelector('.score-value');
let scoreTitle = document.querySelector('.score-title');
let message = document.querySelector('.message');

let gameState = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (event) => {
    if(event.key == 'Enter' && gameState !='Play' || event.key =='ArrowUp' && gameState !='Play'){
        document.querySelectorAll('.pipe').forEach((ev) => {
            ev.remove();
        });
        img.style.display = 'block';
        bird.style.top='40vh';
        gameState = 'Play';
        message.innerHTML = '';
        scoreTitle.innerHTML = 'Score: ';
        scoreValue.innerHTML = '0';
        message.classList.remove('messageStyle');
        playGame();
    }
});

function playGame(){
    function move(){
        if (gameState != 'Play'){
            return;
        }
        let pipe = document.querySelectorAll('.pipe');
        pipe.forEach((element) => {
            let pipeProps = element.getBoundingClientRect();
            birdProps = bird.getBoundingClientRect();

            if(pipeProps.right <= 0){
                element.remove();
            }
            else{
                if(birdProps.left < pipeProps.left +  pipeProps.width && 
                   birdProps.left + birdProps.width > pipeProps.left &&
                   birdProps.top < pipeProps.top + pipeProps.height && 
                   birdProps.top + birdProps.height > pipeProps.top){

                    gameState = 'End';
                    if(moveSpeed == 5){
                        message.innerHTML = 'Game Over. GG'.fontcolor('darkred') + '<br>Press Enter or ArrowUp to Restart<br><div style="color: blue">- Easy MODE -</div>'
                    }
                    if(moveSpeed == 3){
                        message.innerHTML = 'Game Over. GG'.fontcolor('darkred') + '<br>Press Enter or ArrowUp to Restart<br><div style="color: green">- Medium MODE -</div>'
                    }
                    if(moveSpeed == 1.75){
                        message.innerHTML = 'Game Over. GG'.fontcolor('darkred') + '<br>Press Enter or ArrowUp to Restart<br><div style="color: red">- Hard MODE -</div>'
                    }
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    rerturn;
                }
                else{
                    if(pipeProps.right < birdProps.left &&
                       pipeProps.right + moveSpeed >= birdProps.left &&
                       element.increaseScore == '1'){
                        scoreValue.innerHTML =+ scoreValue.innerHTML + 1;
                    }
                    element.style.left = pipeProps.left - moveSpeed + 'px';
                }
            }
        });
        // run the function move
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let birdy = 0;
    function applyGravity(){
        if(gameState != 'Play'){
            return;
        }
        birdy = birdy + gravity;
        // Bird fly 'up' animation
        document.addEventListener('keydown', (event) => {
            if(event.key == 'ArrowUp' || event.key == ' '){
                img.src = 'img/mohawkBird2.png';
                birdy = - 7.6;
            }
        });
        // Bird fly 'down' animation
        document.addEventListener('keyup', (event) => {
            if(event.key == 'ArrowUp' || event.key == ' '){
                img.src = 'img/mohawkBird1.png';
            }
        });

        if(birdProps.top <= 0 || birdProps.bottom >= background.bottom){
            gameState = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }

        bird.style.top = birdProps.top + birdy + 'px';
        birdProps = bird.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);

    let pipeSeperation = 0;
    let pipeGap = 35;

    function createPipe(){
        if(gameState != 'Play'){
            return;
        }
        if(pipeSeperation > 115){
            pipeSeperation = 0;
            let pipePosition = Math.floor(Math.random() * 43) + 8;

            let pipeInverted = document.createElement('div');
            pipeInverted.className = 'pipe';
            pipeInverted.style.top = pipePosition - 70 + 'vh';
            pipeInverted.style.left = '100vw';

            document.body.appendChild(pipeInverted);
            let pipe = document.createElement('div');
            pipe.className = 'pipe';
            pipe.style.top = pipePosition + pipeGap + 'vh';
            pipe.style.left = '100vw';

            pipe.increaseScore = '1';

            document.body.appendChild(pipe);
        }
        pipeSeperation++;
        requestAnimationFrame(createPipe);
    }
    requestAnimationFrame(createPipe);
}