var number = 25; //Наше число
var n = 4; //Количество делитедей
var kolDeliteley = 0; // Для того чтобы начало считать
for (i = 1; n > kolDeliteley; i++) {
  if (number % i === 0) {
    kolDeliteley++;
    console.log(i);
  }
  else if (i > number) {
    console.log("Количество делителей меньше чем задано");
    break;
  }
}
