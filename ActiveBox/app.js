$(function () { /*Дозволяє дочекатися завантаження цілого документу, перед тим як розпочати роботу*/

    let header = $("#header");
    /*В перемінній header знаходиться клас header*/
    let intro = $("#intro");
    /*Переміна intro з назвою інтро "#intro"*/
    let introH = intro.innerHeight();
    /*"introH висота intro (перемінна), звертаємось до інтро через intro."*/
    /*console.log(introH) - виводимо в консоль, що є в блоці intro*/
    /*Height - без padding. innerHeigh - з padding*/
    let scrollPos = $(window).scrollTop();
    /*Перемінна "scrollPos" звертаємось до нашого вікна (window) скльки ми проскролили від верху сторінки (.scrollTop)*/
    /*console.log(scrollPos) - виводимо в консоль скільки ми проскролили*/
    let navToggle = $("#navToggle");
    let nav = $("#nav");

    checkScroll(scrollPos, introH);

    $(window).on("scroll resize", function () {
        /*Ми прцюємо з вікном ($(window) слідкуємо за вікном (.on) при події скрол ("scroll") та при події ("load") ми хочемо щось робити (function)*/
        introH = intro.innerHeight();
        /*Перезаписуємо при переходу одного екрану на інший*/
        scrollPos = $(this).scrollTop();
        /*переміна scrollTop звертаємось до window через "this" бо ми зараз знаходимось у ньому і хочемо утримува позицію скрола (scrollTop)*/
        checkScroll(scrollPos, introH);

        
    });

    function checkScroll(scrollPos, introH) {
        /*Ми визиваємо цю функцію при певних обставинах*/ 
        if( scrollPos > introH ) {
            /*якщо "if" позиція скрола "scrollPos" більша ">" за позицію інтро "introH" товиконуватимуть так дії "{...}"" а інакше "else" іншу дію "{...}" */
            header.addClass("fixed");
            /*Якщо більше за intro то видаємо клас (addClass) "#fixed"*/
        } else {
            header.removeClass("fixed");
            /*Якщо менше то забираємо клас "fixed"*/
        }
        /*При запуску ми отримуємо позицію introH (висоту інтро) і scrollPos (позицію скрола). Відправляємо їх в функцію checkScroll. При скролі сторінки або зміні розміру екрану, ми теж відправляє їх в checkScroll. В фунції checkScroll він отримує introH (висоту інтро) і scrollPos (позицію скрола). Виконує дію перевірки чи scrollPos(позиція скрола) більший за introH(висоту інтро), якщо так то видає клас .fixed, якщо менше то забирає клас .fixed. В CSS якщо блок має клас .fixed то він залишається на своєму місті при скролі. */ 
    }

/*----------------------------SCROLL-----------------------------------------*/ 

    $("[data-scroll]").on("click", function (event) {
        /*Вибираємо елемент з атрибутом "data-scroll" дивимось за ним (on) при натисканні (click)*/
        event.preventDefault();
        /*Відміняємо стандартну поведінку при натискані*/
        let elementId = $(this).data('scroll');
        /*Перемінна назва "elementID" отримуємо доступ до елементу по якому натиснули (this) отримуємо його атрибут data (scroll)*/
        /* console.log(elementID); */
        let elementOffset = $(elementId).offset().top;

        nav.removeClass("show");

        $("html, body").animate({
            scrollTop: elementOffset -70
            /*Даємо анімацію скролу зверху, на 50 пікселів скрол менший*/ 
        }, 750)
        /*час анімації в мілі секудах (1=1000)*/ 

    });

/*------------------------------------------------------------------------*/

    navToggle.on("click", function(event) {
        event.preventDefault();

        nav.toggleClass("show");
    });

/*------------------------------------------------------------------------*/
    let slider = $("#reviewsSlider");

    slider.slick({
        /*slider метод slick*/ 
        infinite: true,
        /*Буде скролитись по колоу*/ 
        slidesToShow: 1,
        /*Кількість показуючих слайдів*/ 
        slidesToScroll: 1,
        /*Кількість слайдів які будемо скролити*/ 
        fade: true,
        /*Затемнення при зміні*/ 
        arrows: false,
        /*Прибрати кнопки*/
        dots: true,
        /*Кількість слайдів*/ 
    });

});