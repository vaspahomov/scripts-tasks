var priorities = {
	'$': 0,
	'#': 1,
	'+': 2,
	'-': 2,
	'*': 3,
	'/': 3,
	'^': 4,
	'(': -1
};

function calculate(s) {
	var s = s.split(' ');
	var stack = [];
	for(j = 0; j < s.length; j++) {
		if (s[j] == '')
			continue;
		
		i = s[j]
		if (i in priorities) {
			if (stack.length < 2) {
				throw new Error("No element for operation");
			}
			
			a = stack.pop()
			b = stack.pop()
			
			if (i == '+')
				stack.push(a + b);
			if (i == '*')
				stack.push(a * b);
			if (i == '-')
				stack.push(b - a);
			if (i == '/')  {
				if (a == 0) {
					throw new Error("Division by zero");
				}
				stack.push(b / a);
				
			}
			if (i == '^')
				stack.push(Math.pow(b, a));
			
		} else {
			stack.push(Number(i));
		}
	}; 
	if (stack.length != 1) {
		throw new Error("Too few operations");
	}
	return stack[0];
}

function code(s) {
	s += '$';
	var s = s.split('');
	var stack = ['#'];
	var result = '';
	var num = 0;
	k = 1;
	for(j = 0; j < s.length; j++) {
		i = s[j]
		if (j == 0 && i == '-') {
			k = -1;
			continue;
		}
		
		if (i === '(') {
			stack.push('(');
			
			if (j + 1 >= s.length) {
				throw new Error("Wrong brackets balance");
			}
			
			if (s[j+1] == '-') {
				j++;
				k = -1;
				continue;
			}
		} else if (i === ')') {
			result += ' ';
			while (stack[stack.length - 1] !== '(') {
				if (stack[stack.length - 1] === '#') {
					throw new Error("Wrong brackets balance");
				}
				if (num < 2) {
					throw new Error("Unexpected operation");
				}
				
				result += stack[stack.length - 1];
				result += ' ';
				num--;
				stack.pop();
			}
			stack.pop();
		} else if (i in priorities) {
			result += ' ';
			while (
				priorities[stack[stack.length - 1]] > priorities[i] ||
                (i !== '^' && priorities[stack[stack.length - 1]] === priorities[i])
			) {
				if (i === '$') {
					if (stack[stack.length - 1] === '#') {
						break;
					}
					if (stack[stack.length - 1] === '(') {
						throw new Error("Wrong brackets balance");
					}
				}
				if (num < 2) {
					throw new Error("Unexpected operation");
				}
				
				result += stack[stack.length - 1];
				result += ' ';
				num--;
				stack.pop();
			}
			stack.push(i);
		} else {
			if (k == -1)
				result += '-';
			k = 1;
			result += i;
			num++;
		}
	};
	if (stack.length !== 2) {
		throw new Error("Wrong brackets balance");
	}
	console.log(result)
	return result;
}	

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input your expression \n', (str) => {
  console.log(`Answer is: ${calculate(code(str))}`);

  rl.close();
});
