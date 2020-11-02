var delitel = 17;
var startNumber = 300;
var closeCycl = 0;
for (i = startNumber; closeCycl < 1; i++) {
  if (i % delitel == 0) {
    console.log(i);
    closeCycl++;
  }
}


// var delitel = 17;
// var closeCycl = 0;
// for (i = 0; closeCycl < 1; i++) {   ВТОРОЙ ВАРИАНТ РЕШЕНИЯ
//   if (i % delitel == 0 && i>300) {
//     console.log(i);
//     closeCycl++;
//   }
// }
