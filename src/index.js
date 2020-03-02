function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let pattern = / /;

  let array = stringtoarray(expr.split(""));

  if (brackets(expr.split("")) == false) {
    console.log("Brackets must be paired");

    throw "ExpressionError: Brackets must be paired";
  }

  let n = 0;
  let m = 0;

  for (let i = 0; i < array.length || array.length == 0; i++) {
    n = 0;
    m = 0;
    for (let value in array) {
      if (array[value] === "(") {
        n = value;
      }

      if (array[value] === ")") {
        m = value;
        break;
      }
    }

    if (n != 0 || m != 0) {
      array.splice(n, m - n + 1, searchFirst(array.slice(n, m), true));
      i = 0;
    }
  }
  if (n == 0) {
    return parseFloat(searchFirst(array));
  }
}

// write your solution here
function brackets(mas) {
  let a = 0;
  let b = 0;
  for (let value in mas) {
    if (mas[value] === "(") {
      a++;
    }
    if (mas[value] === ")") {
      b++;
    }
  }

  if (a == b) {
    return true;
  } else return false;
}

function searchFirst(mas, more) {
  if (more == true && mas[0] === "(") {
    mas.shift();
  }

  for (let a = 1; a < mas.length; a++) {
    if (mas[a] === "/" || mas[a] === "*") {
      mas[a - 1] = calcul(mas[a - 1], mas[a], mas[a + 1]);

      mas.splice(a, 2);
      a = 0;
      a = 0;
    }
  }

  for (let a = 1; a < mas.length; a++) {
    mas[a - 1] = calcul(mas[a - 1], mas[a], mas[a + 1]);
    mas.splice(a, 2);
    a = 0;
  }
  return mas.join("");
}
function calcul(a, fun, b) {
  switch (fun) {
    case "+":
      return parseFloat(a) + parseFloat(b);
    case "-":
      return parseFloat(a) - parseFloat(b);
    case "*":
      return parseFloat(a) * parseFloat(b);
    case "/": {
      if (a == 0 || b == 0) {
        throw "TypeError: Division by zero.";
      } else return parseFloat(a) / parseFloat(b);
    }
  }
}

function stringtoarray(string) {
  let mas = [];
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (/[^0-9]/.test(string[i]) === false) {
      if (mas[count] == undefined) {
        mas[count] = string[i];
      } else mas[count] += string[i];
    }
    if (/(\+|\-|\*|\/)/.test(string[i]) === true) {
      count++;
      mas[count] = string[i];
      count++;
    }
    if (/(\(|\))/.test(string[i]) === true) {
      if (
        /[^0-9]/.test(mas[count]) === false ||
        /(\+|\-|\*|\/|\(|\))/.test(mas[count]) === true
      ) {
        count++;
        mas[count] = string[i];
      } else {
        mas[count] = string[i];
        count++;
      }
    }
  }
  return mas;
}

module.exports = {
  expressionCalculator
};
