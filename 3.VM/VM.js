function readFromDocument(name) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile(name);
	var s = fh.readAll();
	fh.Close();
	return s;
}


function toInc(commandArray) {
    memorySlots[commandArray[1]]++;
}

function toAdd(commandArray) {
    memorySlots[commandArray[3]] = parseInt(memorySlots[commandArray[1]]) + parseInt(memorySlots[commandArray[2]]);
}

function minus(commandArray) {
    memorySlots[commandArray[3]] = parseInt(memorySlots[commandArray[1]]) - parseInt(memorySlots[commandArray[2]]);
}

function toInput(commandArray) {
    WSH.Echo(commandArray[2] + ' inputted in ' + commandArray[1] + ' cell of memory');
    memorySlots[commandArray[1]] = commandArray[2];
}

function mod(commandArray) {
    memorySlots[commandArray[3]] = memorySlots[commandArray[1]] % memorySlots[commandArray[2]];
}

function toOutput(commandArray) {
    WSH.Echo('your value is ' + memorySlots[commandArray[1]]);
}

function toSwitch(commandArray) {
    var tempo = +memorySlots[commandArray[1]];
    memorySlots[commandArray[1]] = +memorySlots[commandArray[2]];
    memorySlots[commandArray[2]] = +tempo;
}

function toRepeat(commandArray) {
    switch (serviceMemory[0]) {
        case 0:
            serviceMemory[0] = -2;
            serviceMemory[1] = +serviceMemory[3];
            serviceMemory[2] = 0;
            serviceMemory[3] = 0;
            break;
        case -2:
            serviceMemory[0] = +commandArray[1];
            serviceMemory[2] = +serviceMemory[1];
            break;
        default:
            break;
    }
}

function toRepeatEnd() {
    serviceMemory[0]--;
    serviceMemory[3] = serviceMemory[1];
    serviceMemory[1] = serviceMemory[2] - 1;
}

function goTo(commandArray) {
    serviceMemory[1] = commandArray[1] + 2;
}

function conditionIf(commandArray) {
    if(+memorySlots[commandArray[1]] === +memorySlots[commandArray[2]])
    	serviceMemory[1]++;
}

function cycleWhile(commandArray) {
    if(serviceMemory[0] === -2) {
        serviceMemory[0] = 100000;
        serviceMemory[2] = serviceMemory[1];
        serviceMemory[4] = commandArray[1];
        serviceMemory[5] = commandArray[2];
    } else if(+memorySlots[serviceMemory[4]] === +memorySlots[serviceMemory[5]]) {
        serviceMemory[0] = -2;
        serviceMemory[1] = serviceMemory[3];
        serviceMemory[2] = 0;
        serviceMemory[3] = 0;
        serviceMemory[4] = 0;
        serviceMemory[5] = 0;
    }
}

function cycleWhileEnd() {
    serviceMemory[3] = serviceMemory[1];
    serviceMemory[1] = serviceMemory[2] - 1;
}

function div(commandArray) {
    memorySlots[commandArray[3]] = +memorySlots[commandArray[1]] / +memorySlots[commandArray[2]] >> 0;
}
function i(commandArray) {
    memorySlots[commandArray[1]] = WScript.StdIn.ReadLine();
}
function toProcessTheCommand(commandArray) {
    switch (commandArray[0]) {
        case 'add':
            break;
        case 'i':
            WSH.Echo('ss')
            i(commandArray);
            break;

        case 'input':
            toInput(commandArray);
            break;

        case 'output':
            toOutput(commandArray);
            break;

        case 'switch':
            toSwitch(commandArray);
            break;

        case 'repeat':
            toRepeat(commandArray);
            break;

        case 'inc':
            toInc(commandArray);
            break;

        case 'while':
            cycleWhile(commandArray);
            break;

        case 'mod':
            mod(commandArray);
            break;

        case 'div':
            div(commandArray);
            break;

        case 'minus':
            div(commandArray);
            break;

        case 'endWhile':
            cycleWhileEnd();
            break;

        case 'endRepeat':
            toRepeatEnd();
            break;

        case 'goto':
            goTo(commandArray);
            break;

        case 'if':
            conditionIf(commandArray);
            break;

        default:
            WSH.Echo('Invalid command in ' + (serviceMemory[1] + 1).toString() + ' line');
            break;

    }
    serviceMemory[1]++;

}

function nextCommand() {
    var commandsArray = instructionArray[serviceMemory[1]].split(' ');
    toProcessTheCommand(commandsArray);
    if(serviceMemory[1] < instructionArray.length)
        nextCommand();
}


var nameOfFile = WSH.Arguments(0);
var textOfProgram = readFromDocument(nameOfFile);
var instructionArray = textOfProgram.split('\n');

var serviceMemory = [];
serviceMemory[0] = -2;//cycle counter
serviceMemory[1] = 0;//instruction pointer
serviceMemory[2] = 0;//cycle entry
serviceMemory[3] = 0;//end position of cycle
serviceMemory[4] = 0;
serviceMemory[5] = 0;
var memorySlots = [];

nextCommand();