window.addEventListener('load', () => {

const descriptionContainer = document.getElementById('descriptionContainer');
const descriptionScroll = document.getElementById('descriptionScroll');
const modalScreenSlider = document.getElementById('modalScreenSlider');
const thingsSecondPage = document.getElementById('thingsSecondPage');
const modalScreenDots = document.getElementById('modalScreenDots');
const btnCloseModal = document.getElementById('closeModal');
const modalScreen = document.getElementById('modalScreen');
const btnOpenModal = document.getElementById('openModal');
const btnForward = document.getElementById('btnForward');
const scrollItem = document.getElementById('scrollItem');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const btnHome = document.getElementById('home');
const track = document.getElementById('track');

const visibleArea = 1024;

let clientTouchX;
let swiperCount = 0;

descriptionContainer.addEventListener('touchmove', (event) => {
    event.stopPropagation();
    event.preventDefault();
})

descriptionScroll.addEventListener('scroll', function (event) {
    const scrollTop = this.scrollTop;

    descriptionContainer.scrollTop = scrollTop;
});

descriptionScroll.addEventListener('touchstart', (event) => {
    event.stopPropagation();
})

btnForward.addEventListener('click', () => handleClick(1), false);
btnHome.addEventListener('click', () => handleClick(0), false);

document.addEventListener('touchstart', touchStart, false)


function handleClick(value) {
    swiperCount = value;
    
    if (modalScreen.classList.contains('active')) {
        modalScreen.classList.remove('active');
        document.addEventListener('touchstart', touchStart);
    }
    
    changeTrackPos(swiperCount);
}

function touchStart(event) {
    console.log('start')
    clientTouchX = event.touches['0'].clientX;
    document.addEventListener('touchmove', touchMove, false)

}

function touchMove(event) {
    console.log('move')
    let clientMoveX = event.touches['0'].clientX;
    if (clientMoveX > clientTouchX) {
        decrementValue(swiperCount);

        changeTrackPos(swiperCount);
    } else {
        incrementValue(swiperCount);

        changeTrackPos(swiperCount);
    }

    document.removeEventListener('touchmove', touchMove);
}

function changeTrackPos(value) {
    track.style.transform = `translateX(-${value * visibleArea}px)`;
}

function decrementValue(value) {
    if (value > 0) --swiperCount
}

function incrementValue(value) {
    if (value < 2) ++swiperCount
}

function modalScreenInit() {
    modalScreen.addEventListener('touchstart', function (event) {
        event.stopPropagation();
        console.log('modalScreen')
        if (this === event.target) {
            this.classList.remove('active');
        }
    }, false);

    btnCloseModal.addEventListener('click', () => {
        modalScreen.classList.remove('active');
    }, false);

    btnOpenModal.addEventListener('click', () => {
        modalScreen.classList.add('active');
    }, false);
}

function sliderInit() {
    let i = 0;

    prevBtn.addEventListener('click', () => {
        if (i <= 0) {
            i = 0;
        } else {
            modalScreenSlider.children[i].classList.remove('show');
            modalScreenDots.children[i].checked = false;
            modalScreenSlider.children[--i].classList.add('show');
            modalScreenDots.children[i].checked = true;
        }
    })

    nextBtn.addEventListener('click', () => {
        if (i >= 1) {
            i = 1
        } else {
            modalScreenSlider.children[i].classList.remove('show');
            modalScreenDots.children[i].checked = false;
            modalScreenSlider.children[++i].classList.add('show');
            modalScreenDots.children[i].checked = true;
        }
    })
}

sliderInit();
modalScreenInit();

setTimeout(() => {
    scrollItem.style.height = descriptionContainer.scrollHeight + 'px';
    descriptionScroll.style.height = descriptionContainer.offsetHeight + 'px';
}, 0)

setInterval(() => {
    if (swiperCount >= 1) {
        thingsSecondPage.classList.add('active');
    } else {
        thingsSecondPage.classList.remove('active');
    }
}, 100)

let f = new FontFace('DIN pro', 'url(../assets/fonts/DINpro/fonts/din_pro_condensed_regular.woff)'); // << remove this after test

});

// test