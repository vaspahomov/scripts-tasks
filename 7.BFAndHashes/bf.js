var fs = require('fs')
var line = fs.readFileSync(process.argv[2], 'utf8');
var text = fs.readFileSync(process.argv[3], 'utf8');
var count = 0;

//BF
var search_bf = function(string, substring) {
    console.time('BF time running')
    var result = [];
    for (var i = 0; i < string.length; i++) {
        for (var j = 0; j < string.length; j++) {
            if(substring.charAt(j)!=string.charAt(i+j)){
                i+=j;
                break;
            }
            if(substring.length == j + 1) {
                result.push(i);
                i+=j;
                break;
            }
        }
    }

    console.timeEnd('BF time running');
    return result;
}
console.log('BF')
var result0 = search_bf(text, line);
if (result0.length > 0)
    console.log('ID of mathing symbol: ' + result0);
else
    console.log('ID of mathing symbol: ' + '-1');
console.log();


//Fast Variant
var search_rabin_karp = function (string, substring) {
    console.time('Rabin Karp time running')
    if (substring.length > string.length) {
        return -1;
    }
    var byte = 256;
    var q = 1337; //Случайное число
    var length = substring.length; //Длина подстроки
    var digit = 1;

    digit = (byte * digit) % q;	//Высчитывается, для того чтобы убирать нужный эллемент.
    var substringHash = hash_rabin_karp(substring, length, q, byte); //Хеш-значение для подстроки
    var stringHash = hash_rabin_karp(string, length, q, byte); //Хеш-значение для строки

    var result = [];
    for (var i = 1; i + length - 1 <= string.length - 1; i++) {
        var resultHash = (stringHash + q - string.charCodeAt(i - 1) * digit % q) % q; //Удаление начальной цифры
        resultHash = (resultHash * byte % q + string.charCodeAt(i + length - 1)) % q; //Добавление конечной цифры
        if (resultHash === substringHash) //Сравнение двух хеш-функций.
            result.push(i);
        stringHash = resultHash;
    }

    console.timeEnd('Rabin Karp time running');
    return result;
};

var hash_rabin_karp = function (string, length, q, byte) { //Расчет некой хеш функции.
    var h = 0;
    for (var i = 0; i < length; i++) {
        h = (h * byte + string.charCodeAt(i)) % q;
    }
    return h;
};

console.log('Hashes Rabin Karp');
var result1 = search_rabin_karp(text, line);
if (result1.length > 0)
    console.log('ID of mathing symbol: ' + result1);
else
    console.log('ID of mathing symbol: ' + '-1');
console.log();

var hash_sum = function (string, length) { //Расчет некой хеш функции.
    var h = 0;
    for (var i = 0; i < length; i++) {
        h += string.charCodeAt(i);
    }
    return h;
};
var search_sum = function (string, substring) {
    console.time('sum time running')
    if (substring.length > string.length) {
        return -1;
    }
    var length = substring.length; //Длина подстроки

    var substringHash = hash_sum(substring, length); //Хеш-значение для подстроки
    var stringHash = hash_sum(string, length); //Хеш-значение для строки

    var result = [];
    for (var i = 1; i + length - 1 <= string.length - 1; i++) {
        stringHash -= string.charCodeAt(i); //Удаление начальной цифры
        stringHash += string.charCodeAt(i + length - 1); //Добавление конечной цифры
        if (stringHash === substringHash) //Сравнение двух хеш-функций.
            result.push(i);
    }

    console.timeEnd('sum time running')
    return result;
};

console.log('Hashes Sum');
var result2 = search_sum(text, line);
if (result2.length > 0)
    console.log('ID of mathing symbol: ' + result2);
else
    console.log('ID of mathing symbol: ' + '-1');
console.log();


var hash_sum_2 = function (string, length, q, byte) { //Расчет некой хеш функции.
    var h = 0;
    for (var i = 0; i < length; i++) {
        h += Math.pow(string.charCodeAt(i), 2);
    }
    return h;
};

var search_sum_2 = function (string, substring) {
    startTime = console.time('sum_2 time running')
    if (substring.length > string.length) {
        return -1;
    }
    var length = substring.length; //Длина подстроки

    var substringHash = hash_sum_2(substring, length); //Хеш-значение для подстроки
    var stringHash = hash_sum_2(string, length); //Хеш-значение для строки

    var result = [];
    for (var i = 1; i + length - 1 <= string.length - 1; i++) {
        stringHash -= Math.pow(string.charCodeAt(i), 2); //Удаление начальной цифры
        stringHash += Math.pow(string.charCodeAt(i + length - 1), 2); //Добавление конечной цифры
        if (stringHash === substringHash) //Сравнение двух хеш-функций.
            result.push(i);
    }
    console.timeEnd('sum_2 time running')
    return result;
};

console.log('Hashes Sum');
var result3 = search_sum_2(text, line);
if (result3.length > 0)
    console.log('ID of mathing symbol: ' + result3);
else
    console.log('ID of mathing symbol: ' + '-1');
console.log();