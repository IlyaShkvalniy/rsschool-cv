import i18Obj from './translate.js';
/*===========vars===============================*/
console.log('часть 1\n110/100 \n\nВёрстка валидная, ,без ошибок и предупреждения +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css соблюдены + 12\nИнтерактивность, реализуемая через css соблюдена +20\n\n')
console.log('часть 2\n85/75\n\nВёрстка соответствует макету. Ширина экрана 768px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22\n\n')
console.log('часть 3\n80/75\n\nпри кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20\nкнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5\nпри клике по надписи ru англоязычная страница переводится на русский язык +10\nпри клике по надписи en русскоязычная страница переводится на английский язык +10\nнадписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5\nтёмная тема приложения сменяется светлой +10\nсветлая тема приложения сменяется тёмной +10\nпосле смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5\nДополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5\n')
let menuBtn = document.querySelector('.nav__burger');
let menu = document.querySelector('.nav__list');
let burgerLine = document.querySelectorAll('.nav__burger-line');
let navLink = document.querySelectorAll('.nav__list-link');
let portfolioBtn = document.querySelectorAll('.portfolio__button');
let portfolioGallery = document.querySelectorAll('.portfolio__gallery');
let langBtnRu = document.querySelector('.nav__langs-switcher-ru');
let langBtnEn = document.querySelector('.nav__langs-switcher-en');
let langElements = document.querySelectorAll('[data-18i]');
let lang = 'en';
let theme = 'dark';

/* ====================change-theme================================= */

let themeVars = ['.nav__logo', '.header__button', '.title__text', '.portfolio__button', '.price__columns-num','.price__columns-btn', '.contacts__btn', '.footer__social-icon', '.hero__bg','.contacts__bg','.contacts__input', '.contacts__message', '.body', '.main', '.footer', '.footer__rss-link', '.footer__github-link', '.nav__list', '.nav__langs-switcher', '.nav__burger-line'];
let themeButton = document.querySelector('.nav__theme-switcher');

themeButton.addEventListener('click', function (){
      changeThemeFunc();
})

function changeThemeFunc () {
      themeButton.classList.toggle('switch');
      themeVars.forEach( item => {
           document.querySelectorAll(item).forEach( item2 => {
           item2.classList.toggle('change-theme');
          })
            
      });
      if (themeButton.classList.contains('switch') === true){
            theme = 'light' ;
           } else {
                 theme = 'dark';
           }
}
/*========================storage=================================*/
function setLocalStorage() {
      localStorage.setItem('lang', lang);
      localStorage.setItem('theme', theme);
    }

 window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
      function langs () {
            if(localStorage.getItem('lang') === 'ru') {
                  langBtnRu.classList.remove('active-lang-btn');
                  langBtnEn.classList.remove('active-lang-btn');
                  langBtnRu.classList.toggle('active-lang-btn');
                  lang = 'ru'; 
                  translate(i18Obj.ru);
      
            } else {
                  langBtnEn.classList.remove('active-lang-btn');
                  langBtnRu.classList.remove('active-lang-btn');
                  langBtnEn.classList.toggle('active-lang-btn');
                  lang = 'en';
                  translate(i18Obj.en);
            }
      }
      function themes () {
            if(localStorage.getItem('theme') === 'light') {
                   changeThemeFunc();
            } else{
                   
            };
      }
      langs();
      themes();
    }
    window.addEventListener('load', getLocalStorage)
/* =====================translate================================ */
langBtnRu.addEventListener('click', function(){
      translate(i18Obj.ru);
      langBtnRu.classList.remove('active-lang-btn');
      langBtnEn.classList.remove('active-lang-btn');
      langBtnRu.classList.toggle('active-lang-btn');
      lang = 'ru'; 
      console.log(lang);
});

langBtnEn.addEventListener('click', function(){
      translate(i18Obj.en);
      langBtnEn.classList.remove('active-lang-btn');
      langBtnRu.classList.remove('active-lang-btn');
      langBtnEn.classList.toggle('active-lang-btn');
      lang = 'en';
      console.log(lang);
});


function translate (lang1) {
      langElements.forEach(item => {
            item.textContent = lang1[item.getAttribute('data-18i')]
      })
}

/*======================burger==========================*/



menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
    
    for (let i = 0; i < burgerLine.length; i++) { 
            burgerLine[i].classList.toggle('active');
      };
});
navLink.forEach( item => {
      item.addEventListener('click', function () {
            menuBtn.classList.toggle('active');
            menu.classList.toggle('active');
            for (let i = 0; i < burgerLine.length; i++) { 
                  burgerLine[i].classList.toggle('active');
            };
      })
});
/*==============portfolio-tabs=================*/
let tabName;
portfolioBtn.forEach( item => {
      item.addEventListener('click', function(){
            
            portfolioBtn.forEach( item => {
                  item.classList.remove('is-active')
            });
            this.classList.toggle('is-active');
            tabName = this.getAttribute('data-tab-name');
            selectTab(tabName);
      } );
      function selectTab (tabName) {
            // console.log(tabName);
            portfolioGallery.forEach( item => {
                  // console.log(item);
                  if ( item.classList.contains(tabName) === true ) {
                        item.classList.remove('is-active');
                        item.classList.toggle('is-active');
                        console.log(item)
                  }else {
                        item.classList.remove('is-active');
                  }
            })
      }
});



