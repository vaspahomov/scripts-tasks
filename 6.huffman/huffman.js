var fs = require('fs');
var file = process.argv[3];
var input = fs.readFileSync(file, "utf8");

function Node(right, left) {

    this.right = right;
    this.left = left;
    this.text = left.text + "" + right.text;
    this.value = right.value + left.value;
}

function Leave(text, value) {
    this.text = text;
    this.value = value;
}

function IndexOfLeave(array, leave) {
    for (var i = 0; i < array.length; i++)
        if ((array[i].text === leave.text) && (array[i].value === leave.value))
            return i;
    return -1;
}

function TransformInput(input, result) {
    var charArray = input.split("");
    charArray.forEach(function (symbol) {
            var amount = input.split(symbol).length - 1;
            var leave = new Leave(symbol, amount);
            if (IndexOfLeave(result, leave) === -1)
                result.push(leave);
        }
    );
}

function MinLeave(input) {
    var minLeave = input[0];
    for (var i = 1; i < input.length; i++)
        if (input[i].value < minLeave.value)
            minLeave = input[i];
    return minLeave;
}

function SetCodes(tree) {
    if (tree.right && tree.left) {
        tree.right.code = 1;
        tree.left.code = 0;
        SetCodes(tree.right);
        SetCodes(tree.left);
    }
}

function GetCode(tree, symbol, code) {

    if (tree.right.text.split("").indexOf(symbol) !== -1) {
        code.push(tree.right.code);
        if (tree.right.right && tree.right.left)
            GetCode(tree.right, symbol, code);
        else
            return;
    }
    if (tree.left.text.split("").indexOf(symbol) !== -1) {
        code.push(tree.left.code);
        if (tree.left.right && tree.left.left)
            GetCode(tree.left, symbol, code);
    }
}

function GetCodes(tree, codes) {
    for (var i = 0; i < tree.text.length; i++) {
        var symbol = tree.text.split("")[i];
        var code = [];
        GetCode(tree, symbol, code);
        codes[i] = [symbol, code];
    }
}

function Draw(codes) {
    var s = '';
    codes.forEach(function (element) {
        var shifted = element.shift();
        s += shifted + element[0].join('') + '--';
        console.log("\"" + shifted + "\": " + element[0].join(""));
    });
    s = s.substring(0, s.length - 2);
    fs = require("fs");
    fs.writeFileSync("table.txt", s, "utf8");
}

function GetTree(str) {
    var input = [];
    TransformInput(str, input);
    while (input.length > 1) {
        var minLeave = MinLeave(input);
        input.splice(IndexOfLeave(input, minLeave), 1);
        var minLeave2 = MinLeave(input);
        input.splice(IndexOfLeave(input, minLeave2), 1);
        var node = new Node(minLeave, minLeave2);
        input.unshift(node);
    }
    return input[0];
}

function Output(input, codes) {
    var newString = "";
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < codes.length; j++) {
            if (input[i] === codes[j][0]) {
                newString += codes[j][1].join("");
            }
        }
    }
    return newString;
}


if (process.argv[2] === 'code') {
    var tree = GetTree(input);
    SetCodes(tree);
    codes = [];
    GetCodes(tree, codes);
    var output = Output(input, codes);
    console.log("Alphabet of symbols:");
    console.log();
    Draw(codes);
    console.log();
    console.log("Byte representation:");
    console.log();
    console.log(output);
    fs.writeFileSync(process.argv[4], output, "utf8");

} else if (process.argv[2] === 'decode') {
    var table = fs.readFileSync('table.txt', "utf8");
    var codes = table.split('--');

    var dict = {};
    var max = 0;
    codes.forEach(function (item) {
        //console.log(item);
        console.log(item[0] + ' ' + item.substring(1));
        //console.log(item.substring(1));
        dict[item.substring(1)] = item[0];
        if (item.length > max) {
            max = item.length - 1;
        }
    });
    var stack = [];
    var result = '';
    //try {
        input.split('').forEach(function (char) {
                stack.push(char);
                var f = false;
                if(dict.length!=0) {
                    codes.forEach(function (item) {
                        item= item.substring(1);
                        console.log(item+' ' + dict[item]+' '+ stack.join(''));
                        if (item == stack.join(''))
                            f = true;
                    });
                }
                if (f ) {
                    result += dict[stack.join('')];
                    stack = [];
                }  else {
                    //throw new Error('incorrect');
                }
            }
        )
        ;
        fs.writeFileSync(process.argv[4], result, "utf8");
    //}
    //catch
    //     (e) {
    //     console.log('Impossible to decode!');
    // }
} else {
    console.log('Incorrect command!')
}