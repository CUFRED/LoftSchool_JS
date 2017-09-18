/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

cleanerCookie();



filterNameInput.addEventListener('keyup', function() {
    let cookieObj= readCookie ();
    let FilteredObj = new Object();
    for (var key in cookieObj) {
        console.log('cookieObj-filter=', cookieObj);
        if (filterNameInput.value.length == 0) {
            FilteredObj[key] = cookieObj[key];
            console.log('FilteredObj-0=', FilteredObj);
        } else {
            if (isMatching(key, filterNameInput.value) == true) {
            //if (key == filterNameInput.value) {
                FilteredObj[key] = cookieObj[key];
                console.log('FilteredObj-1=', FilteredObj);
            } else {
                if (isMatching(cookieObj[key], filterNameInput.value) == true) {
                //if (cookieObj[key] == filterNameInput.value) {
                    FilteredObj[key] = cookieObj[key];
                    console.log('FilteredObj-2=', FilteredObj);
                } //end if-3
            }// end if-2
        } // end if-1
    }
    console.log('FilteredObj=', FilteredObj);

    createTab(listTable, FilteredObj);
    console.log('document.cookie=', document.cookie);
    console.log('cookieObj=', cookieObj);
    console.log('FilteredObj=', FilteredObj);

    return FilteredObj;

});


/*  // ---- Пытался примнить промис, но непонятно когдо его переводить в - разрешенное состояние
filterNameInput.addEventListener('keyup', function() {
    return new Promise(function (resolve) {
         let cookieObj= readCookie ();
         let FilteredObj = new Object();
            for (var key in cookieObj) {
                console.log('cookieObj-filter=', cookieObj);
                if (filterNameInput.value.length == 0) {
                    FilteredObj[key] = cookieObj[key];
                    console.log('FilteredObj-0=', FilteredObj);
                } else {
                    if (isMatching(key, filterNameInput.value) == true) {
                        FilteredObj[key] = cookieObj[key];
                        console.log('FilteredObj-1=', FilteredObj);
                    } else {
                        if (isMatching(cookieObj[key], filterNameInput.value) == true) {
                            FilteredObj[key] = cookieObj[key];
                            console.log('FilteredObj-2=', FilteredObj);
                        } //end if-3
                    }// end if-2
                } // end if-1
            }
         console.log('FilteredObj=', FilteredObj);
         resolve(FilteredObj);
    })
});
*/

// --- Обработчик- добаляет новые куки в таблицу и в браузер
addButton.addEventListener('click', () => {
    if (filterNameInput.value =='') {
        createCookie(addNameInput.value, addValueInput.value);
        editRow(listTable, addNameInput.value, addValueInput.value);
    } else {
        createCookie(addNameInput.value, addValueInput.value);

        if (comparedTabAndCooki(listTable, addNameInput.value, addValueInput.value ) == 1) {
            editRow(listTable, addNameInput.value, addValueInput.value);
            console.log('cookie-!!!=', document.cookie);
        } else if (comparedTabAndCooki(listTable, addNameInput.value, addValueInput.value ) == 0){
            //console.log('False =', comparedTabAndCooki(listTable, addNameInput.value, addValueInput.value ));
            addRow(listTable, addNameInput.value, addValueInput.value);
        } else if (comparedTabAndCooki(listTable, addNameInput.value, addValueInput.value ) == 2) {
            rowDel(listTable, addNameInput.value );
        }
    }
    readCookie();
});

// --- Функция создания куки ---
function createCookie(name, value) {
    return document.cookie = `${name}=${value}`;
}
// ---- Функция удаления кукии ---
function deleteCookie(name) {
    var date = new Date(0);
    document.cookie = `${name}` + '=; expires=' + date.toUTCString();
}

// ----- Функция  чтения куки в массив ------
function readCookie () {
    let params = document.cookie;
    let paramsObj;

    params = params.split('; ');
    params = params.splice(1);
    //console.log('params=', params);

    paramsObj = params.reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev[name] = value;

        // console.log('prev=', prev);

        return prev;
    }, {});
    // console.log('paramObj-readCookie =', paramsObj);

    return paramsObj;
}

// ---- Функция очисти куки ---
function cleanerCookie() {
    let cookieObj = readCookie();

    console.log('cookieArray-cleaner=', cookieObj, 'length=', cookieObj.length);

    for (let key in cookieObj) {
        deleteCookie(key);
    }
    /*
    for (var i = 0; i < cookieArray.length; i++ ) {
        console.log('i=', i, cookieArray[2*i]);
        deleteCookie(cookieArray[2*i]);
        i = 2 * i;
    } */

}
// ---- Функция добавления строки в таблицу
function addRow(id, tname, tvalue) {

    var tbody = id;
    var row = document.createElement('TR');
    var td1 = document.createElement('TD');
    var td2 = document.createElement('TD');
    var td3 = document.createElement('TD');
    var buttonRemove = document.createElement('button');

    buttonRemove.innerText = 'Удалить';
    buttonRemove.setAttribute('id', 'buttonRemove');
    td1.appendChild(document.createTextNode(tname));
    td2.appendChild (document.createTextNode(tvalue));
    td3.appendChild (buttonRemove);

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);

}

// ---- Функция редактирования таблицы с куки - добаляет новые и обновляет значения старых куки
function editRow(id, tname, tvalue, filter = false) {

    var rows = id.rows;

    if (rows.length == 0) {
        addRow(id, tname, tvalue);
    } else {
        let booledit = false;
        console.log('rows=', rows, 'lenght=', rows.length);
        for (var i = 0; i < rows.length; i++) {
            var td = rows[i].cells;
            //console.log('i=', i, 'td=', td);
            //console.log('td[0]=', td[0].innerText, 'td[1]=', td[1].innerText, 'tname=', tname, 'tvalue=', tvalue);

            if (td[0].innerText == tname) {

                td[1].innerText = tvalue;
                booledit = true;
            }

        }
        if (booledit == false) {
            addRow(id, tname, tvalue);
        }
    }
}

// --- Функция сравнения данных таблицы с  данными вводимого куки ----
function  comparedTabAndCooki(id, key, value) {
    var rows = id.rows;
    var boolcomp = 0;
    if (rows.length == 0) {
        boolcomp = 0;
    } else {
        console.log('rows-Comp=', rows, 'lenght=', rows.length);
        for (var i = 0; i < rows.length; i++) {
            var td = rows[i].cells;
            //console.log('i=', i, 'td=', td);
            //console.log('td[0]=', td[0].innerText, 'td[1]=', td[1].innerText, 'tname=', tname, 'tvalue=', tvalue);

            //if (isMatching(key, td[0].innerText) == true) {
            if (td[0].innerText == key && td[1].innerText == value) { // && td[1].innerText != value)
                boolcomp = 1;
                console.log('boolcomp-true', boolcomp);
                break;
            }
            else if (td[0].innerText == key && td[1].innerText != value) {
                console.log('key=', key, 'value=', value);

                //addRow(id, key, value);
                boolcomp = 2; // удалить строку из  таблицы
                console.log('Таблица=', id);
                console.log('Удаляем строку=', i, 'rows[i]=', rows[i]);
                //id.deleteRow(i);
                console.log('Удаляем строку=', i, 'rows[i]=', rows[i]);
                break;
            }
            else if (td[0].innerText != key ) {
                console.log('key=', key, 'value=', value);
                boolcomp = 2;
                console.log('boolcomp-false', boolcomp);
            }

        }
    }
    console.log("boolcomp=", boolcomp);
    return boolcomp;
}
// --- Функция  удаление строки из таблицы
function rowDel(id, key) {
    var rows = id.rows;

    for ( var i =rows.length-1; i > -1; i-- ) {
        var td = rows[i].cells;

        if (td[0].innerText == key) {
            id.deleteRow(i);

        }
    }

}
// --- Функция создания -пересоздания таблицы по отфильтрованным параметрам
function createTab (id, obj) {

    var rows = id.rows;
    console.log ('rows-creareTab=', rows, 'length=', rows.length);
    for (var i =rows.length-1; i > -1; i-- ) {

        id.deleteRow(i);
    }

    for (var key in obj) {
        addRow(id, key, obj[key]);
    }
}

// ----- Обработчик - удаления строки с куки из таблицы и браузера
listTable.addEventListener('click', (e) => {

    let action=e.target.getAttribute('id');

    if (action == 'buttonRemove') {
        let rIndex =e.target.parentElement.parentElement.rowIndex-1;

        listTable.deleteRow(rIndex);
    }

    let tname =e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    // let tvalue =e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    deleteCookie(tname);

    // deleteCookie(tvalue);
    console.log('cookie-delete=', document.cookie);

});



/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    let bool = true;

    //full = full.toLowerCase();
    //chunk = chunk.toLowerCase();

    if (full.indexOf(chunk) < 0 || full.indexOf(chunk) < 0) {
        bool = false;
    }

    return bool;
}