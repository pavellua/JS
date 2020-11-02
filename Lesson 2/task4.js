var number = 1122;
var result = 0;
var secondNumber = String (number);
for (i=0; i<secondNumber.length; i++) {
  if (secondNumber[i]%2==0) {
    var preob = parseFloat (secondNumber[i]);
    result = preob + result;

  }
}
console.log (result);
