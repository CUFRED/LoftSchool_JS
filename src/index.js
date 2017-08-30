/* eslint-disable camelcase */
/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    var bool = true,
        ERROR_1 = 'empty array';
        // ERROR_2 = 'fn is not a function';

    if (array.length == 0 || Array.isArray(array) == false) {

        throw new Error(ERROR_1);
    }
    /* if (typeof(fn) === 'function') {
        throw new Error(ERROR_2);
    } */

    for (var i = 0; i < array.length; i++) {
        if (fn(array[i]) == false) {
            bool = false;
        }
    }

    return bool;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    var bool = false,
        ERROR_1 = 'empty array';
        // ERROR_2 = 'fn is not a function';

    if (array.length == 0 || Array.isArray(array) == false) {

        throw new Error(ERROR_1);
    }
    /* if (typeof(fn) === 'function') {
        throw new Error(ERROR_2);
    } */

    for (var i = 0; i < array.length; i++) {
        if (fn(array[i]) == true) {
            bool = true;
        }
    }

    return bool;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {

    if (typeof(fn(arguments[0])) != 'function') {
        throw new Error ('fn is not a function');
    }


    var array_error=[];

    for (var i = 1; i<arguments.length; i++) {
        try {
            fn(arguments[i]);
        }
        catch (e){
            //array_error[array_error.length]=arguments[i];
            array_er.push(arguments[i]);
        }
    }

    return array_error;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number=0) {
    var rez = 0;
    var act ={};

    if (typeof(number) != 'number') {
        throw new Error ('number is not a number');
    }
    
    act.sum = function() {
        rez = number;
        for (var i=0; i < arguments.length; i++) {
            rez = rez + arguments[i];
        }

        return rez;
    };
    act.dif = function() {
        rez = number;
        for (var i=0; i < arguments.length; i++) {
            rez = rez - arguments[i];
        }

        return rez;
    };
    act.div = function() {
        rez = number;
        for (var i=0; i < arguments.length; i++) {
            if (arguments[i] === 0) {
                throw new Error ('division by 0');
            }
            else {
                rez = rez / arguments[i];
            }
        }

        return rez;
    };
    act.mul = function() {
        rez = number;
        for (var i=0; i < arguments.length; i++) {
            rez = rez * arguments[i];
        }

        return rez;
    };

    return act;

}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
