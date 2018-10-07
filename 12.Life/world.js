var intervalID;

function drawCell(x, y, alive) {
    var cl = '';
    if (alive.alive) {
        cl = ' class="alive"'
    }
    return '<td><div' + cl + ' x=' + x + ' y=' + y + '" onclick="changeCell(this);">&nbsp;</div></td>';
}

function drawWorld() {
    var result = "<tbody>";
    var arr = getGeneration();
    for (var i = 0; i < arr.length; i++) {
        result += "<tr>";
        for (var j = 0; j < arr[i].length; j++) {
            result += drawCell(i, j, arr[i][j]);
        }
        result += "</tr>";
    }
    result += "</tbody>";
    return result;
}

function getGeneration() {
    return field;
}


function initGeneration(heig, widt) {
    field = Array(heig);
    for (var i = 0; i < heig; i++) {
        field[i] = Array(widt);
        for (var j = 0; j < heig; j++) {
            let cell = {}
            field[i][j] = cell;
            field[i][j].x = j;
            field[i][j].y = i;
            field[i][j].alive = false;
        }
    }
}

function newWorld() {
    var heig = parseInt(document.getElementById("heig").value);
    var widt = parseInt(document.getElementById("widt").value);
    initGeneration(heig, widt);
    refreshWorld();
}

function refreshWorld() {
    var table = document.getElementById("world");
    table.innerHTML = drawWorld();
}

function stop() {
    clearInterval(intervalID);
}

function go() {
    stop();
    intervalID = setInterval('next()', 100);
}

function next() {
    newGeneration();
    refreshWorld();
}

function random() {
    stop();
    for (var i = 0; i < heig.value; i++) {
        for (var j = 0; j < heig.value; j++) {
            var rand = Math.random();
            if (rand > 0.8)
                field[i][j].alive = true;
            else
                field[i][j].alive = false;
        }
    }
    refreshWorld();
}

function changeCell(elem) {
    changeGeneration(parseInt(elem.getAttribute("x")), parseInt(elem.getAttribute("y")));
    refreshWorld();
}

function changeGeneration(x, y) {
    field[x][y].alive = !field[x][y].alive;
}

function newGeneration() {
    var old = [];
    for (var k = 0; k < field.length; k++) {
        old[k] = [];
        for (var r = 0; r < field[k].length; r++) {
            old[k][r] = field[k][r].alive;
        }
    }
    var f = true;
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[Number(i)].length; j++) {
            var count = 0;
            for (var dy = -1; dy <= 1; dy++)
                for (var dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    try {
                        if (old[(i + dx)%field.length][(j + dy)%field[i].length]) {
                            if (dx == 0 && dy == 0) continue;
                            count++;
                        }
                    }
                    catch (err) {
                        //console.log(i+' '+dx+' '+j+' '+dy)
                    }
                }
            if (count === 3 && !old[i][j]) {
                field[i][j].alive = true;
            } else if (old[i][j] && (count === 2 || count === 3)) {
                field[i][j].alive = true;
            } else {
                field[i][j].alive = false;
            }
            f = false;

        }
    }
}

