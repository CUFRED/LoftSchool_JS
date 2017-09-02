/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn, thisArg) {
    for (var i = 0; i < array.length; i++) {
        fn.call(thisArg, array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn, thisArg) {
    var results =[];

    for (var i = 0; i < array.length; i++) {

        results[i] = fn.call(thisArg, array[i], i, array);

        // results.push(fn.call(thisArg, array[i], i, array)); /* возможен  и такой вариант */
    }

    return results;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var prev = initial;

    for (let i = 0; i < array.length; i++) {
        if (typeof initial === 'undefined' && i === 0) {
            prev = array[0];
        } else if (typeof initial === 'undefined' && i != 0) {
            prev = fn(prev, array[i], i, array);
        } else {
            prev = fn(prev, array[i], i, array);
        }
    }

    return prev;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    for (var props in obj) {
        if (props === prop) {
            delete obj[prop];
        }
    }
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    var bool=true;

    for (var props in obj) {
        if (props != prop) {
            bool=false;
        }
    }

    return bool;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var ArrayProps =[];

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ArrayProps.push(prop);
        }
    }

    return ArrayProps;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var ArrayProps =[];

    for (var prop in obj) {
        ArrayProps.push(prop.toUpperCase());
    }    

    return ArrayProps;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    if (from >0 && typeof to === 'undefined') {
        array.splice(0, from);
    } else if (from < 0 && typeof to === 'undefined') {
        array.splice(0, (array.length+from));
    } else if (from == 0 && to == 0) {
        array.splice(0, array.length);
    } else if (from == 0 && to > 0) {
        array.splice(to, array.length);
    } else if (from > 0 && to > 0 && from <= to) {
        array.splice(0, from);
        array.splice(to-from, array.length);
    } else if (from > 0 && to > 0 && from > to) {
        array.splice(0, from);
        array.splice(0, array.length);
    } else if (from >= 0 && to < 0) {
        array.splice(0, from);
        if (Math.abs(to) >=array.length) {
            array.splice(0, array.length);
        }
        array.splice((array.length + to), array.length);
    } else if (from < 0 && to < 0) {
        array.splice(0, from);
        if (Math.abs(to) >=array.length) {
            array.splice(0, array.length);
        }
        array.splice(0, (array.length+from));
        array.splice((array.length + to), array.length);
    }

    return array;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {

        set(obj, prop, value) {
            obj[prop] = value*value;

            return obj[prop];
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
