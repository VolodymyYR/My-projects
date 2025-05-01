"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const heightSectionB = document.querySelector('.banana');
    const scrollItem = document.querySelectorAll('.contentBody, .imgBody');

    const animation = () => {
        let windowCenter = (window.innerHeight / 2) + window.scrollY;
        scrollItem.forEach(el => {
            let scrollOffset = el.offsetTop - (el.offsetHeight / 1.5);
            if (windowCenter >= scrollOffset) {
                el.classList.add('animationScroll');
            } else {
                el.classList.remove('animationScroll');
            }
        });
    }

    const headerFixed = () =>{
        let ScrollYPx = window.scrollY;
        let endSection = heightSectionB.offsetHeight;
        console.log(header.offsetHeight)
        if (ScrollYPx >= endSection) {
            header.classList.add('fixed');
            heightSectionB.style.marginTop = `${header.offsetHeight}px`;
        } else {
            header.classList.remove('fixed');
            heightSectionB.style.marginTop = `0px`;
        }
    }

    headerFixed();
    window.addEventListener('scroll', () => {
        headerFixed();
        animation();
    });
});
