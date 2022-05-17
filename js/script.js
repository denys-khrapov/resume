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