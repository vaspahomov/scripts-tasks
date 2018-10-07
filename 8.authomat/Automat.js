var fs = require('fs')

var start = new Date().getTime();

var pathToStr = process.argv[2];
var pathToSubStr = process.argv[3];

var input = fs.readFileSync(pathToStr, "utf8");
var t = fs.readFileSync(pathToSubStr, "utf8");

alphabet = [];

m=t.length;
alph=new Array();
//Определяем алфавит строки t
for(i=0;i<m;i++)
    alph[t.charAt(i)]=0;
    //В двумерном массиве del будем хранить таблицу переходов
    del=new Array(m+1);
for(j=0;j<=m;j++)
    del[j]=new Array();

//Инициализируем таблицу переходов
for(i in alph)
    del[0][i]=0;

//Формируем таблицу переходов
for(j=0;j<m;j++){
    prev=del[j][t.charAt(j)];
    del[j][t.charAt(j)]=j+1;
    for(i in alph)
        del[j+1][i]=del[prev][i];
}

//Выводим таблицу переходов
for(j=0;j<=m;j++){
    out='';
    var s ='';
    for(i in alph)
    {
        out+=del[j][i]+'';
        s+= i.toString()+' (' + j.toString() +' ' + del[j][i] +') ';
    }
    //console.log(out);
    console.log(s);
}
console.log('')

temporary = del[0][input.charAt(0)];
result = [];
 
for (i = 0; i < input.length; i++){
	if (del[temporary][input.charAt(i)] == undefined)
		del[temporary][input.charAt(i)] = 0;
	console.log(del[temporary][input.charAt(i)], input.charAt(i));
	temporary = del[temporary][input.charAt(i)];

	if (temporary == m)
		result.push(i - m + 2);
}

console.log('');
console.log('ID of mathing symbol: ' +result);

var elapsed = new Date().getTime() - start; // рассчитаем время выполнения
console.log('Time of runing =', elapsed, 'milliseconds'); // выведем в консоль время выполнения скрипта
// time = performance.now() - time;
// console.log('Time of runing = ', time);