var alph = 256;
var endTime;
var startTime;

function getChars(str) {
    var table = new Array(alph);

    for (var i = 0; i < alph; i++) {
        table[i] = str.length;
    }

    for(i = 0; i < str.length - 1; i++) {
        table[str.charCodeAt(i)] = str.length - i - 1;
    }

    return table;
}

function isPrefix(str, i) {
    for (var k = 0; i < str.length; i++, k++) {
        if (str.charAt(i) !== str.charAt(k)) {
            return false;
        }
    }
    return true;
}

function suffixLength(str, i) {
    var k = 0;
    var j = str.length - 1;

    while (i >= 0  && str.charAt(i) == str.charAt(j)) {
        k += 1;
        i -= 1;
        j -= 1;
    }
    return k;
}

function getOffsets(str) {
    var lastPrefix = str.length;
    var table = new Array(str.length);

    for (var i = str.length - 1; i >= 0; i--) {
        if (isPrefix(str, i + 1)) {
            lastPrefix = i + 1;
        }
        table[str.length - i - 1] = lastPrefix - i + str.length - 1;
    }

    for (i = 0; i < str.length; i++) {
        var suffix = suffixLength(str, i);
        table[suffix] = str.length - 1 - i + suffix;
    }
    return table;
}

function searchString(str, req) {
    var result = [];
    startTime = new Date().getTime();
    if(req.length === 0) {
        return req.length;
    }

    var chars = getChars(req);
    var offsets = getOffsets(req);


    for (var i = req.length - 1; i < str.length;) {
        for (var k = req.length - 1; req.charAt(k) === str.charAt(i); i--, k--) {
            if (k === 0) {
                result.push(i + 1);
                break;
            }
        }
        i += Math.max(
            offsets[req.length - 1 - k], chars[str.charCodeAt(i)]
        );
    }

    endTime = new Date().getTime();
    return result;
}

try {
    var fs = require("fs");
    var s = fs.readFileSync(process.argv[2], "utf8");
    var t = fs.readFileSync(process.argv[3], "utf8");
    console.log(searchString(s, t).join(' '));
    console.log(endTime - startTime);
}
catch (e) {
    console.log("File is empty");
}