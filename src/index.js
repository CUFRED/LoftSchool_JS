/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    seconds = 1000;

    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, seconds);
    })
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns(url) {
    return new Promise(function(resolve) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.send();
        xhr.response.Type ='json';
        xhr.addEventListener('load', function() {
            resolve(xhr.response);
        });
    })
}

loadAndSortTowns('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
    .then(function(list) {
        let array = [];

        list.forEach((sity) => {
            array.push(sity.name);
        });

        return array.sort();
    });

export {
    delayPromise,
    loadAndSortTowns
};
