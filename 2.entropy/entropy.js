function GetCharsArrayFromDocument() {

    try {
        var path = WSH.Arguments(0);
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var fh = fso.OpenTextFile(path);
        s = fh.ReadAll();
        fh.Close();
        return s.split('');
    }
    catch (e) {
        throw 'invalid file';
    }
}


function LogN(n, x) {
    return Math.log(x) / Math.log(n);
}


function GetBaseOfLog(n) {
    if (WSH.Arguments.count() === 2) {
        n = WSH.Arguments(1);
        if ((n === 1 || n <= 0) && !isNaN(n))
            throw 'invalid value';
    }
    return n;
}


try {
    var dictt = [];
    var chars = GetCharsArrayFromDocument();
    var count = 0;
    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        dictt[char] = 0;
        count++;
    }
    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        dictt[char]++;
    }
    var length = 0;
    for (var i in dictt) {
        dictt[i] = dictt[i] / count;
        length++;
    }
    var entropy = 0;
    var n = GetBaseOfLog(length);
    if (length === 1) {
        entropy = 0;
    } else {
        for (var i in dictt) {
            entropy -= dictt[i] * LogN(n, dictt[i]);
        }
    }
    WSH.Echo('Entropy of');
    WSH.Echo(s);
    WSH.Echo('is: ' + entropy);
} catch (err) {
    if (err === 'invalid file')
        WSH.Echo(err);
    else if (err === 'invalid value')
        WSH.Echo(err);
    else
        throw err;
}