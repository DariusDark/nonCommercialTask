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
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnHome = document.getElementById('btnHome');
    const track = document.getElementById('track');

    const visibleArea = 1024;

    let clientTouchX;
    let swiperCount = 0;
    let isSwiperActive = false;

    descriptionScroll.addEventListener('scroll', function () {
        const scrollTop = this.scrollTop;

        descriptionContainer.scrollTop = scrollTop;
    });

    descriptionScroll.addEventListener('touchstart', (event) => {
        event.stopPropagation();
    });

    btnForward.addEventListener('touchend', () => handleTouch(1), false);
    btnHome.addEventListener('touchend', () => handleTouch(0), false);

    document.addEventListener('touchstart', touchStart, false);

    function handleTouch(value) {
        swiperCount = value;

        if (modalScreen.classList.contains('active')) {
            modalScreen.classList.remove('active');
        }

        changeTrackPos(swiperCount);
    }

    function touchStart(event) {
        isSwiperActive = true;
        clientTouchX = event.touches['0'].clientX;
    }

    document.addEventListener('touchmove', touchMove, false);

    function touchMove(event) {
        if (isSwiperActive) {

            let clientMoveX = event.touches['0'].clientX;
            
            if (clientMoveX > clientTouchX) {
                if (swiperCount > 0) --swiperCount;
            } else {
                if (swiperCount < 2) ++swiperCount;
            }

            isSwiperActive = !isSwiperActive;
            changeTrackPos(swiperCount);
        }
    }

    function changeTrackPos(value) {
        track.style.transform = `translateX(-${value * visibleArea}px)`;
    }

    function modalScreenInit() {
        modalScreen.addEventListener('touchstart', function (event) {
            event.stopPropagation();
        }, false);

        modalScreen.addEventListener('touchend', function (event) {
            if (this === event.target) {
                this.classList.remove('active');
            }
        }, false);

        btnCloseModal.addEventListener('touchend', () => {
            modalScreen.classList.remove('active');
        }, false);

        btnOpenModal.addEventListener('touchend', () => {
            modalScreen.classList.add('active');
        }, false);
    }

    function sliderInit() {
        let currentSlide = 0;
        let childrenQuantity = modalScreenSlider.children.length - 1;

        btnPrev.addEventListener('touchend', () => {
            if (currentSlide > 0) {
                currentSlide--;
                slideIteration(currentSlide, childrenQuantity);
            }
        });

        btnNext.addEventListener('touchend', () => {
            if (currentSlide < childrenQuantity - 1) {
                currentSlide++;
                slideIteration(currentSlide, childrenQuantity);
            }
        });

        function slideIteration(activeEl, elementsQuantity) {
            for (let i = 0; i < elementsQuantity; i++) {
                modalScreenSlider.children[i].classList.remove('show');
                modalScreenDots.children[i].checked = false;
            }
            modalScreenSlider.children[activeEl].classList.add('show');
            modalScreenDots.children[activeEl].checked = true;
        }
    }


    sliderInit();
    modalScreenInit();

    scrollItem.style.height = descriptionContainer.scrollHeight + 'px';
    descriptionScroll.style.height = descriptionContainer.offsetHeight + 'px';

    setInterval(() => {
        if (swiperCount >= 1) {
            thingsSecondPage.classList.add('active');
        } else {
            thingsSecondPage.classList.remove('active');
        }
    }, 100);

});