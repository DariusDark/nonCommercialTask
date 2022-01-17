document.addEventListener('touchstart', touchStart, false)
const track = document.getElementById('track');
const area = document.body.offsetWidth;
const btnForward = document.getElementById('btnForward');
const btnHome = document.getElementById('home');


let clientTouchX; 
let swiperCount = 0;

btnForward.addEventListener('click', () => handleClick(1), false);
btnHome.addEventListener('click', () => handleClick(0), false);

function handleClick(value) {
    swiperCount = value;
    track.style.transform = `translateX(-${swiperCount * area}px)`;
}

function touchStart(event) {
    clientTouchX = event.touches['0'].clientX;
    document.addEventListener('touchmove', touchMove, false)
}

function touchMove(event) {
    let clientMoveX = event.touches['0'].clientX;
    if (clientMoveX > clientTouchX) {
        decrementValue(swiperCount);

        track.style.transform = `translateX(-${swiperCount * area}px)`;
    } else {
        incrementValue(swiperCount);
        
        track.style.transform = `translateX(-${swiperCount * area}px)`;
    }
    document.removeEventListener('touchmove', touchMove);
}

function decrementValue(value) {
    if (value <= 2 && value > 0) --swiperCount
}

function incrementValue(value) {
    if (value >= 0 && value < 2) ++swiperCount
}