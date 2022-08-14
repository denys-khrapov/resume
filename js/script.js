/* jshint -W097 */
// 'use strict';

// импортирую объект
import langObj from './lang.js';

const select = document.querySelector('.change-lang');
// объект всех языков, которые допустимы
const allLang = ['en', 'ua'];

// перенаправить на url с указанием языка
select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
   let lang = select.value;
   // добавляю в адресную строку #en или #ua
   // в зависимости от выбранного option у select
   location.href = window.location.pathname + '#' + lang;
   // перезагружаю страницу
   location.reload();
}

function changeLanguage() {
   let hash = window.location.hash;
   //теперь hash являеться двумя символами в адресной строке, ua/en
   hash = hash.substring(1);
   // проверяю наличие двух символов(hash) в объекте допустимых языков
   //если я ненахожу такого hash в объекте допустимых языков
   // то выполняються определенные действия
   if (!allLang.includes(hash)) {
      // беру текущий href и присваиваю принудительно язык по умолчанию
      location.href = window.location.pathname + '#ua';
      // перезагружаю страницу
      location.reload();
   }
   select.value = hash;

   // перебираю объект
   for (let key in langObj) {
      let elem = document.querySelector('.lng-' + key);
      if (elem) {
         elem.innerHTML = langObj[key][hash];
      }
   }
}

changeLanguage();

// dark-white mode

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
   document.body.classList.toggle('dark');
});

// svg animation

let btnP = document.querySelector('#button-play');
let btnS = document.querySelector('#button-stop');

var tl = gsap.timeline({
   paused: true,
   defaults: { duration: 0.5, ease: 'none' },
});

var tl2 = gsap.timeline({ paused: true, defaults: { duration: 1, delay: 3 } });

tl.from('.svg', { y: 0 })
   .from('#screen', { opacity: 0, y: 100 }, '+=0.2')
   .from('#line-1', { opacity: 0, y: 100 }, '-=0.2')
   .from('#line-2', { opacity: 0, x: 80 }, '-=0.1')
   .from('#line-3', { opacity: 0, x: 60 }, '-=0.1')
   .from('#line-4', { opacity: 0, x: 40 }, '-=0.1')
   .from('#btn', { opacity: 0, y: 100 }, '-=0.2');

tl2.to('.svg', {
   x: 'random(-15, 15, 5)',
   y: 'random(-15, 15, 5)',
   repeat: -1,
   yoyo: true,
   repeatRefresh: true,
});

btnP.onclick = function (e) {
   event.preventDefault();
   tl.play(), tl2.play();
};

btnS.onclick = function (e) {
   event.preventDefault();
   tl2.pause(), tl.pause();
};
