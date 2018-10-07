function readFromDocument()
{
	fso = new ActiveXObject("Scripting.FileSystemObject");
    fh = fso.OpenTextFile(secondArg);
	s = fh.readAll();
	fh.Close();
}


function writeInDocument(messange)
{
	fso = new ActiveXObject("Scripting.FileSystemObject");
	fh = fso.OpenTextFile(thirdArg, 2, true);
	fh.Write(messange);
	fh.Close();
}


//geting aruments
var firstArg = WSH.Arguments(0);
var secondArg = WSH.Arguments(1);
var thirdArg = WSH.Arguments(2);

readFromDocument();

//code
if (firstArg === "code") {
	var codedText = String();
	for (i = 0; i < s.length; i++) {
		for (j = 0; i + j <= s.length; j++) {
			if (s.charCodeAt(i+j) !== s.charCodeAt(i) || s.length === i+j || j === 127) {
				if (j > 2 || s.charAt(i) === '#') {
					codedText += "#";
					codedText += String.fromCharCode(j);
					codedText += s.charAt(i);
				} else {
					codedText += s.substr(i,j);
				}
				i += j - 1;
				break;
			}
		}
	}
	writeInDocument(codedText);
}

//decode
else if (firstArg === "decode") {
	var decodedText = new String();
	for (var i = 0; i < s.length; i++) {
		if (s.charAt(i) === '#') {
			for (var j = 0; j < s.charCodeAt(i + 1); j++)
				decodedText += s.charAt(i + 2);
			i += 2;
		} else {
			decodedText += s.charAt(i);
		}
	}
	writeInDocument(decodedText);
}