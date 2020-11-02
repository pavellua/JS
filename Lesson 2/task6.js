var firstNumber = 25; //Первое число
var secondNumber = 15; // Второе число
var leastNumber = firstNumber; //Наименьшее число из двух заданных (Для того чтобы начать перебить делители из наименьшего)
if (firstNumber > secondNumber) {
  leastNumber = secondNumber; //Если первое число больше чем второе, то присвоить наименьшее для второго числа
}
for (i = leastNumber; i > 0; i--) { //Цикл который проверяет делится ли первое и второе число без остатка на i начиная с наименьшего числа
  if (firstNumber % i == 0 && secondNumber % i == 0) {
    console.log(i);
    break;
  }
}
