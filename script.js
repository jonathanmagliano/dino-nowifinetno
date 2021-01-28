const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let isRunning = false;
let position = 0;

function handleKeyDown(event){
    if (event.keyCode === 32){
        if(!isJumping){
        jump();
    }
    }
}

function jump(){
    isJumping = true;
    //Código executado a cada 20ms
    let upInterval = setInterval(() => {
        if(position >= 130){
            clearInterval(upInterval);           
            let downInterval = setInterval(() => {
                if (position <= 0){
                    isJumping = false;
                    clearInterval(downInterval);
                }
                else{
                position -= 8;
                dino.style.bottom = position + 'px';  
                }
            },20);
        }
        else{
            position += 15;
            dino.style.bottom = position + 'px';
        }
    },20)
}

let score = 0;
let posi = 0;
function createCactus(){
    isRunning = true;
    const cactus = document.createElement('div');
    let cactusPosition = 900;
    let randomTime = Math.floor(Math.random() * 5000);
    console.log(randomTime);

    let dinoAndar = setInterval(() => {
        let dino1 = 'url(imgs/dino.png)';
        let dino2 = 'url(imgs/dino2.png)';

        if ( posi === 0){
            document.getElementById('dinoId').style.background = dino2;
            posi = 1;
        }else{
            document.getElementById('dinoId').style.background = dino1;
            posi = 0;
        }
    }, 200);


    cactus.classList.add('cactus');
    cactus.style.left = 900 + 'px';
    background.appendChild(cactus);

    let pontosInterval = setInterval(() => {
        score++;
        document.getElementById('scoreNumber').innerHTML = "Score: " + score;
        return score;
    }, 1000);


    let leftInterval = setInterval(() => {
        cactusPosition -= 5;
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -0){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //Game Over
            clearInterval(pontosInterval);
            clearInterval(leftInterval);
            clearTimeout(intervalo);
            background.removeChild(cactus);
            document.getElementById('idBack').style.animation = "none";
            const pontuação = score;
            gameStop(score);
            
        }    
        else{
            cactusPosition -= 5;
            cactus.style.left = cactusPosition + 'px';
        }
        
    }, 20);

    function gameStop(score){
        document.getElementById('esconder').style.display = 'none';
        document.getElementById('pagGameOver').style.display = 'block';
        document.getElementById('avisoPontos').innerHTML = "hum... você fez " + score + " pontos! =)";
        
    }

    var intervalo = setTimeout(createCactus, randomTime);


return score;
}
function gameOn(){
    if(isRunning === false){
        createCactus();
        document.getElementById('idBack').style.animation = "slideright 600s infinite linear";
    }
    else{

    }
}

function voltarIndex(){
    window.location.href = "index.html";
}

function acenderLuz(){
    document.body.style.backgroundColor = '#0d1117';
    document.getElementById('scoreNumber').style.color = 'white';
    document.getElementById('botao1').style.color = '#0d1117';
    document.getElementById('avisoGrande').style.color = 'white';
    document.getElementById('avisoPontos').style.color = 'white';
    document.getElementById('botaoVoltar').style.color = '#0d1117';
    document.getElementById('dark').style.display = 'none';
    document.getElementById('light').style.display = 'block';
    document.getElementById('off').style.display = 'none';
    document.getElementById('on').style.display = 'block';

}

function apagarLuz(){
    document.body.style.backgroundColor = 'white';
    document.getElementById('scoreNumber').style.color = 'black';
    document.getElementById('botao1').style.color = 'white';
    document.getElementById('avisoGrande').style.color = 'black';
    document.getElementById('avisoPontos').style.color = 'black';
    document.getElementById('botaoVoltar').style.color = 'white';
    document.getElementById('dark').style.display = 'block';
    document.getElementById('light').style.display = 'none';
    document.getElementById('off').style.display = 'block';
    document.getElementById('on').style.display = 'none';

}

document.addEventListener('keydown', handleKeyDown);
