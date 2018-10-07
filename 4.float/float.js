var number = process.argv[2];
var mantissaLeng = process.argv[3];
var orderLeng = Math.pow(2, process.argv[4]);
if (number.indexOf('-') > 0) {
    var number = number.split('-');
    operation = "-"
} else {
    var number = number.split('+');
    operation = "+"
}
var firstNumber = number[0];
if (number.length === 2) {
    var secondNumber = number[1];
}
else {
    magic(firstNumber, mantissaLeng, orderLeng);
    process.exit(-1);

}

function magic(number, matissaLeng, orderLeng) {
//SIGN STATEMENT
    if (number[0] === '-') {
        sign = 1;
        number = number.slice(1, number.length + 1);
    }
    else
        sign = 0;

    array = number.split('.');
    firstpart = parseInt(array[0]).toString(2);
    if (array[1] === undefined)//получение десятичной части
        secondpart = 0;
    else
        secondpart = array[1] / Math.pow(10, array[1].length);

    function dectohex(secondpart) {
        result = "";
        for (var i = 0; i < parseInt(mantissaLeng) + 10; i++) {
            secondpart = secondpart * 2;
            if (secondpart >= 1) {
                result += secondpart.toString().charAt(0);
                secondpart -= 1;
            } else result += "0";
        }
        return result;
    }

    transformationResult = firstpart + "." + dectohex(secondpart);
    console.log(transformationResult);


    orderForCalc = orderLeng / 2 - 1;
    readyResult = 0;

    var witoutDot = firstpart + dectohex(secondpart);
    // var transArray = transformationResult.split('');

    order = firstpart.length - 1;
    readyResult = witoutDot.slice(1, parseInt(mantissaLeng) + 1);
    // if (transArray[0] > 0) {
    //     order = firstpart.length - 1;
    //     readyResult = witoutDot.slice(1, parseInt(mantissaLeng) + 1);
    // } else {
    //     console.log(transArray[0]);
    //     pos = 0;
    //     while (transArray[pos] !== 1) {
    //         order = -pos;
    //         pos += 1;
    //     }
    //     readyResult = witoutDot.slice(pos, parseInt(mantissaLeng) + pos);
    // }
    orderResult = orderForCalc + order;
    orderToDec = orderResult.toString(2);

    splittedHex = transformationResult.split('.');
    firstsplit = splittedHex[0].split('').reverse();
    first = 0;
    doubler = 1;

    for (var i = 0; i < firstsplit.length; i++) {
        first += parseInt(firstsplit[i]) * doubler;
        doubler *= 2;
    }

    secondsplit = splittedHex[1].split('');
    var doubler = 1 / 2;
    second = 0;
    for (var i = 0; i < secondsplit.length; i++) {
        second += parseInt(secondsplit[i]) * doubler;
        doubler /= 2;
    }
    second = second.toString().slice(1, second.length);
    if (sign === 1) {
        done = "-" + first + second;
    } else {
        done = first + second.toString();
    }
    if (number > (2 - Math.pow(2, -mantissaLeng)) * Math.pow(2, (orderLeng / 2) - 1)) {
        var mantissaArray = new Array(parseInt(mantissaLeng)).fill(0);
        var orderArray = new Array(parseInt(process.argv[4])).fill(1);
        orderToDec = orderArray.join('');
        readyResult = mantissaArray.join('');
        if (sign == 0) {
            done = "+infinity";
        } else {
            done = "-infinity";
        }
    }


    console.log("Float implementation: " + sign + " " + orderToDec + " " + readyResult);
    console.log("Transformed from Float: " + done)
    console.log();
    return exp = [transformationResult, orderResult, readyResult];
}

var res1 = magic(firstNumber, mantissaLeng, orderLeng);
witoutDot1 = '1' + res1[2];
order1 = res1[1];
var res2 = magic(secondNumber, mantissaLeng, orderLeng);
witoutDot2 = '1' + res2[2];
order2 = res2[1];
if (order1 !== order2) {
    if (order1 > order2) {
        while (order1 !== order2) {
            witoutDot2 = "0" + witoutDot2;
            order2++;
        }

    }
    if (order1 < order2) {
        while (order1 !== order2) {
            witoutDot1 = "0" + witoutDot1;
            order1++;
        }
    }
}
shit = 0;
array1 = witoutDot1.split("");
array2 = witoutDot2.split("");
if (operation === '+') {
    if (secondNumber > firstNumber) {
        array1 = witoutDot2.split("");
        array2 = witoutDot1.split("");
        sign = '0'
    }
}
if (operation === '-') {
    if (secondNumber > firstNumber) {
        array1 = witoutDot2.split("");
        array2 = witoutDot1.split("");
        var sign = '1'
    }
}
result = [];

function GetBinarySum(arr1, arr2, result) {
    complexOne = 0;
    for (i = arr1.length - 1; i >= 0; i--) {
        if (arr1[i] === 1 && arr2[i] === 1) {
            if (complexOne === 1)
                result.push(1);
            else
                result.push(0);
            complexOne = 1;
        }
        else if ((arr1[i] === 1 && arr2[i] === 0)
            || (arr1[i] === 0 && arr2[i] === 1)) {
            if (complexOne === 1) {
                result.push(0);
                complexOne = 1;
                continue;
            } else
                result.push(1);
            complexOne = 0;
        }
        else {

            if (complexOne === 1)
                result.push(1);
            else
                result.push(0);
            complexOne = 0;

        }
    }
    if (complexOne === 1) {
        result.push(complexOne);
    }
    result.reverse();
    return result;
}

function GetBinarySub(arr1, arr2, result) {
    complexOne = 0;
    for (i = arr1.length - 1; i >= 0; i--) {
        if (arr1[i] === 1 && arr2[i] === 1) {
            if (complexOne === 1) {
                result.push(1);
                complexOne = 1
            } else {
                result.push(0);
                complexOne = 0;
            }
        }
        else if (arr1[i] === 0 && arr2[i] === 0) {
            if (complexOne === 1) {
                result.push(1);
                complexOne = 1;
            }
            else {
                result.push(0);
                complexOne = 0;
            }
        }
        else if (arr1[i] === 0 && arr2[i] === 1) {
            if (complexOne !== 1)
                complexOne = 2;
            if (complexOne === 2) {
                result.push(1);
                complexOne = 1;
                continue;
            }
            else
                result.push(0);
            complexOne = 1;
        }
        else {
            if (complexOne === 1)
                result.push(0);
            else
                result.push(1);
            complexOne = 0;
        }
    }
    result.push(complexOne);
    result.reverse();
    return result;
}

if (operation === '-') {
    var result = GetBinarySub(array1, array2, result);
}
else {
    var result = GetBinarySum(array1, array2, result);
}
modorder = 0;
readyResult = 0;
zero = 0;
if (result[0] === 1) {
    modorder = 1;
    readyResult = result.slice(1, parseInt(result.length) + 1);
}
else {
    pos = 0;
    while (result[pos] !== 1 && pos < result.length) {
        pos++;
        modorder = (pos)
    }
    if (pos === result.length) {
        var readyResult = new Array(parseInt(result.length)).fill(0);
        zero = 1;
    }
    else readyResult = result.slice(pos + 1, parseInt(result.length) + pos + 1);
}
degree = readyResult.length - mantissaLeng;
maxOrder = parseInt(Math.max(order1, order2));
mantissa = readyResult.join('').slice(0, mantissaLeng); // mantissa
sumOrder = parseInt(maxOrder) + degree;
if (zero)
    sumOrder = (orderLeng / 2) - 1;
sumOrderHex = sumOrder.toString(2);
console.log("Float implementation: " + sign + " " + sumOrderHex + " " + mantissa);
if (!zero)
    mantissa = '1' + mantissa;
half = (orderLeng / 2) - 1;
degree = sumOrder - half;
if (sumOrder < (orderLeng / 2) - 1) {
    for (var i = 0; i < degree * -1; i++) {
        mantissa = "0" + mantissa;
        mantissa = mantissa.slice(0, mantissa.length - 1);
    }
    degree = 0;
}
numberHex = mantissa.split('');
numberHex.splice(degree + 1, 0, ".");
answer = numberHex.join('');

sumressplit = answer.split('.');
firstsplit = sumressplit[0].split('').reverse();
first = 0;
doubler = 1;
for (var i = 0; i < firstsplit.length; i++) {
    first += parseInt(firstsplit[i]) * doubler;
    doubler *= 2;
}
secondsplit = sumressplit[1].split('');
var doubler = 1 / 2;
second = 0;
for (var i = 0; i < secondsplit.length; i++) {
    second += parseInt(secondsplit[i]) * doubler;
    doubler /= 2;
}
second = second.toString().slice(1, second.length);
if (sign === 0) {
    done = "" + first + second;
}
else done = "-" + first + second.toString();
console.log("Transformed from Float: ~" + done);