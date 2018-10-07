var alphEng = 'abcdefghijklmnopqrstuvwxyz';
var alphRu = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
var tableEng = {
    "a": 0.08167,
    "b": 0.01492,
    "c": 0.02782,
    "d": 0.04253,
    "e": 0.12702,
    "f": 0.02228,
    "g": 0.02015,
    "h": 0.06094,
    "i": 0.06966,
    "j": 0.00153,
    "k": 0.00772,
    "l": 0.04025,
    "m": 0.02406,
    "n": 0.06749,
    "o": 0.07507,
    "p": 0.01929,
    "q": 0.00095,
    "r": 0.05987,
    "s": 0.06327,
    "t": 0.09056,
    "u": 0.02758,
    "v": 0.00978,
    "w": 0.02360,
    "x": 0.00150,
    "y": 0.01974,
    "z": 0.00074
};
// noinspection NonAsciiCharacters
var tableRu = {
    "о": 0.10983,
    "е": 0.08496,
    "а": 0.07998,
    "и": 0.07367,
    "н": 0.067,
    "т": 0.06318,
    "с": 0.05473,
    "р": 0.04343,
    "в": 0.04533,
    "л": 0.04343,
    "к": 0.03486,
    "м": 0.03203,
    "д": 0.02977,
    "п": 0.02804,
    "у": 0.02615,
    "я": 0.02001,
    "ы": 0.01898,
    "ь": 0.01735,
    "г": 0.01687,
    "з": 0.01641,
    "б": 0.01592,
    "ч": 0.0145,
    "й": 0.01208,
    "х": 0.00966,
    "ж": 0.0094,
    "ш": 0.00718,
    "ю": 0.00639,
    "ц": 0.00486,
    "щ": 0.00361,
    "э": 0.00331,
    "ф": 0.00267,
    "ъ": 0.00037
};
var toDo = process.argv[2];
var lang = process.argv[5];

GetLang();

function GetLang() {
    if (lang === 'en') {
        startCode = 97;
        alphTable = tableEng;
        alp = alphEng;
    }
    else if (lang === 'ru') {
        startCode = 144;
        alphTable = tableRu;
        alp = alphRu;
    } else
        throw Error('Unavailable language')
}

function mod(a, m) {
    return (a % m + m) % m;
}

var s;

try {
    var fs = require('fs');
    s = fs.readFileSync(process.argv[3], "utf-8")
}
catch (e) {
    console.log("File is empty");
}
s = s.toLowerCase();


function Code(shift, s) {
    var sAr = [];

    for (var i = 0; i < s.length; i++) {
        var charcode = s.charCodeAt(i) - startCode + shift;
        if (s.charAt(i) in alphTable)
            sAr.push(alp.charAt(mod(charcode, alp.length)));
        else
            sAr.push(s.charAt(i));
    }

    var s1 = sAr.join('');
    fs.writeFileSync(process.argv[4], s1, 'utf-8');
}

function Decode() {
    var alph = [];
    for (i = 0; i < s.length; i++)
        if (s.charAt(i) in alphTable)
            alph[s.charAt(i)] = 0;

    var count = 0;
    for (i = 0; i < s.length; i++)
        if (s.charAt(i) in alphTable) {
            alph[s.charAt(i)]++;
            count++;
        }

    for (var i in alph)
        alph[i] = alph[i] / count * 100;

    var minchange = 10000000000;
    var real_shift_after_decode;

    for (var shift = 0; shift < alp.length; shift++) {
       var change = 0;

        for (var i in alph) {
            var charcode = i.charCodeAt(0) - startCode + shift;
            var char_with_shift = alp.charAt(mod(charcode, alp.length));

            change += (alph[i] - alphTable[char_with_shift]) * (alph[i] - alphTable[char_with_shift])
        }
        if (minchange > change) {
            real_shift_after_decode = shift;
            minchange = change
        }
    }

    console.log('shift is: ' + (alp.length - real_shift_after_decode));
    Code(real_shift_after_decode, s);
}

if (toDo === 'code') {
    var real_shift = Number(process.argv[6]);
    Code(real_shift, s);
}
else if (toDo === 'decode') {
    Decode();
}