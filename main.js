const NUM_PILLOWS = 50
const NUM_MICE = 7

const cat = document.querySelector('.cat')
const cat_pos = {
    x: parseInt(window.innerWidth / 2),
    y: parseInt(window.innerHeight / 2)
}
const cat_vel = {
    x: 0,
    y: 0
}
const mice = []
const sound = new Audio('assets/cat-meow.mp3')

function createPillows(){
    for(let i = 0; i < NUM_PILLOWS; i++){
        const div = document.createElement('div')
        div.classList.add('pillow')
        div.style.left = Math.random() * 100 + '%'
        div.style.top = Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}

function generateMouse(){
    const div = document.createElement('div')
    div.classList.add('mouse')
    let x = Math.random() * 100 + '%'
    let y = Math.random() * 100 + '%'
    div.style.left = x
    div.style.top = y
    mice.push({
        mouse: div,
        pos: {
            x,
            y
        }
    })
    document.body.appendChild(div)
}

function createMice(){
    for(let i = 0; i < NUM_MICE; i++){
        generateMouse()
    }
}

//to prevent mice from overlapping (from stack overflow)
function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function checkCollisions(){
    mice.forEach(mouse => {
        if(collision(mouse.mouse, cat)){
            sound.play()
            mouse.mouse.remove()
            // generateMouse()  //* removed regenerate
        }
    })
}

// TODO Send alert when all mice are removed

function run(){
    cat_pos.x += cat_vel.x
    cat_pos.y += cat_vel.y

    cat.style.left = cat_pos.x + 'px'
    cat.style.bottom = cat_pos.y + 'px'
    
    checkCollisions()

    requestAnimationFrame(run)
}

function init(){
    createPillows()
    createMice()
    run()
}

init()

window.addEventListener('keydown', function(e){
    if(e.key == "ArrowUp"){
        cat_vel.y = 3
        cat.style.backgroundImage = 'url("assets/cat_up.png")'
    }
    if(e.key == "ArrowDown"){
        cat_vel.y = -3
        cat.style.backgroundImage = 'url("assets/cat_down.png")'
    }
    if(e.key == "ArrowLeft"){
        cat_vel.x = -3
        cat.style.backgroundImage = 'url("assets/cat_left.png")'
    }
    if(e.key == "ArrowRight"){
        cat_vel.x = 3
        cat.style.backgroundImage = 'url("")' // TODO mirror cat left and insert
    }
    cat.classList.add('active')
})
window.addEventListener('keyup', function(){
    cat_vel.x = 0
    cat_vel.y = 0
    cat.classList.remove('active')
})