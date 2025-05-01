// "use strict"

document.addEventListener('click', documentClick);

function documentClick(e) {
    const targetItem = e.target;
    if (targetItem.closest('.burger-header')) {
        document.documentElement.classList.toggle('burger__open');
    }
}

const swiper = new Swiper('.members__swiper', {
    // Optional parameters
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    speed: 700,

    breakpoints: {
        0:{
            slidesPerView: 1,
        },
        650: {
            slidesPerView: 2,
        },
        990.98: {
            slidesPerView: 3,
        }
    },
});

const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // Отримання звичайних спойлерів
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    // Ініціалізація спойлері що містять значення
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }

    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
        return item.dataset.spollers.split(",")[0];
    });

    // Ініціалізація спойлера з медіа запитами
    if (spollersMedia.length > 0){
        const breakpointsArray = [];
        spollersMedia.forEach (item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        // Отримуємо унікальні брекпоїнти
        let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter(function (item, index, self){
            return self.indexOf(item) === index;
        });

        // Робота з кожним брейкпоінтом
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            // Об'єкти з потрібними умовамиg
            const spollersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });
            // Подія
            matchMedia.addListener(function (e) {
                initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }

    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        });
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if(spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                let parentIdElement = spollerTitle.parentElement;
                let lastIdElement = parentIdElement.nextElementSibling;
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        lastIdElement.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    lastIdElement.hidden = false;
                }
            });
        }
    }

    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')){
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_active');
                let parentIdElement = spollerTitle.parentElement;
                let lastIdElement = parentIdElement.nextElementSibling;
                _slideToggle(lastIdElement, 500);
            }
            e.preventDefault();
        }
    }

    function hideSpollersBody(spollersBlock){
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if(spollerActiveTitle){
            spollerActiveTitle.classList.remove('_active');
            let parentIdElement = spollerActiveTitle.parentElement;
            let lastIdElement = parentIdElement.nextElementSibling
            _slideUp(lastIdElement, 500);
        }
    }
}

// -----------------------------------

let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('paddingT-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-property');
            target.style.removeProperty('transition-duration');
            target.classList.remove('_slide');
        }, duration);
    }
}

let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}

let _slideToggle = (target, duration = 500) => {
    if (target.hidden){
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}

// ---------------------- Випадаюче меню -------------------------------------------
// let body = document.querySelector('body');
// let arrow = document.querySelectorAll('.item-questions__button');
// for(i=0; i<arrow.length; i++){
//     // let parentElement = arrow[i].previousElementSibling;
//     let parentElement = arrow[i].parentElement;
//     let lastElement = parentElement.nextElementSibling;

//     let nextElement = arrow[i].nextElementSibling;
//     let thisArwow = arrow[i];
//     arrow[i].addEventListener('click', function(){
//         lastElement.classList.toggle('open');
//         thisArwow.classList.toggle('active');
//     });
// }

// let arrowLanguech = document.querySelector('.languech-detalis-footer__button');
//     // let parentElement = arrowLanguech.parentElement;
//     // let lastElement = parentElement.nextElementSibling;

// let languechList = document.querySelector('.languech-detalis-foote__hiddenList')
// arrowLanguech.addEventListener('click', function(){
//     languechList.classList.toggle('open');
//     arrowLanguech.classList.toggle('active');
// });
// ---------------------------------------------------------------------------------------


// let isMobile = {
// 	Android: function() {return navigator.userAgent.match(/Android/i);},
// 	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
// 	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
// 	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
// 	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
// 	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
// };

// let body = document.querySelector('body');
// if(isMobile.any()){
// 	body.classList.add('touch');
// 	let arrow = document.querySelectorAll('.arrow');
// 	for(i=0; i<arrow.length; i++){
// 		let thisLink=arrow[i].previousElementSibling;
// 		let subMenu=arrow[i].nextElementSibling;
// 		let thisArrow=arrow[i];

// 		thisLink.classList.add('parent');
// 		arrow[i].addEventListener('click', function(){
// 			subMenu.classList.toggle('open');
// 			thisArrow.classList.toggle('active');
// 		});
// 	}
// }else{
// 	body.classList.add('mouse');
// }
 