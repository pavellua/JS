let activeCursor = false; //Переменная которая показывает должна сейчас прилипать буква к курсору или нет

document.querySelector("#button").addEventListener("click", function() { //Прослушивание кнопки на клик

  let formText = document.querySelector("#formText").value; //Переменная которая будет хранить в себе текст из формы
  document.querySelector(".activeText").innerHTML = ""; //Очистка переносимого текста после каждого нажатия на кнопку
  for (let i = 0; i < formText.length; i++) { //Цикл по тексту введенному в форму для вывода каждого символа отдельно на экран
    let activeText = document.createElement("span");
    activeText.innerHTML = formText[i];
    document.querySelector(".activeText").append(activeText);
  }
})

document.querySelector(".activeText").addEventListener("click", function(e) { //прослушивание блока со спанами на клик
  if (e.target.localName != "div") { //Проверка на клик по общему блоку , а не конкретно по спану
    let activeLetter = e.target; //Переменная указывающая на текущий элемент который будем двигать

    let activeLetterFunc = function(e) { //Переменная равная функции изменения положения спана с буквой за движением курсора
      activeLetter.style.left = e.clientX - activeLetter.offsetWidth / 2 + "px";
      activeLetter.style.top = e.clientY - activeLetter.offsetHeight / 2 + "px";
      if (activeCursor == false) { //Как только переменная activeCursor становится фолс - у нас удаляется прослушивание события на движение курсора
        document.removeEventListener("mousemove", activeLetterFunc)

        activeLetter.finishX = activeLetter.getBoundingClientRect().x; //Сохраняем в свойства координаты по Х для выбранной буквы для того чтобы потом могли вернуть её на место при пересечении
        activeLetter.finishY = activeLetter.getBoundingClientRect().y; //Сохраняем в свойства координаты по Y для выбранной буквы для того чтобы потом могли вернуть её на место при пересечении
        checkPosition(activeLetter); //Запускаем функцию которая проверяет есть ли пересечение с какой либо другой буквой
      }
    }
    if (activeCursor == false) { //Если activeCursor фолс - значит после клика нам нужно переключить на тру и включить прослушивание события на движение курсора
      activeCursor = true; //Переключаем переменную activeCursor на тру чтобы
      activeLetter.style.position = "fixed"; //Изменяем позишн чтобы спан мог перемещаться по координатам
      activeLetter.startX = activeLetter.getBoundingClientRect().x; //Сохраняем стартовые координаты перемещаемого блока
      activeLetter.startY = activeLetter.getBoundingClientRect().y; //Сохраняем стартовые координаты перемещаемого блока
      document.addEventListener("mousemove", activeLetterFunc)
    } else { //Если activeCursor тру - переключаем его на фолс

      activeCursor = false;

    }
  }

})

function checkPosition(activeLetter) { //Функция для определения пересечения. Можно считать что фигуры пересекаются если хоть 1 угол попадает на плосктость другой фигуры

  let firstInjectionX = activeLetter.finishX; //Координаты спана который мы отпускаем 1го края по Х
  let secondInjectionX = activeLetter.finishX + activeLetter.getBoundingClientRect().width; //Координаты спана который мы отпускаем 2го края по Х
  let firstInjectionY = activeLetter.finishY; //Координаты спана который мы отпускаем 1го края по У
  let secondInjectionY = activeLetter.finishY - activeLetter.getBoundingClientRect().height; //Координаты спана который мы отпускаем 2го края по У

  let allSpans = document.querySelector(".activeText").querySelectorAll("span"); //Переменная которая указывает на массив со всеми спанами
  for (let j = 0; j < allSpans.length; j++) { //Цикл по всем спанам для проверки есть ли пересечение хоть с 1
    let width = allSpans[j].getBoundingClientRect().width; //Ширина спана с которым сравниваем
    let height = allSpans[j].getBoundingClientRect().height; //Высота спана с которым сравниваем
    let crossingX = false; //Переменная которая показывает есть пересечение или нет с другими буквами по оси Х
    let crossingY = false; //Переменная которая показывает есть пересечение или нет с другими буквами по оси Y

    for (let pointX = firstInjectionX; pointX < secondInjectionX; pointX = pointX + (activeLetter.getBoundingClientRect().width) * 0.05) { //Цикл по ширине спана так как могут быть блоки разной ширины и по углам не всегда корректно
      //Если хоть одна координата Х спана больше чем координата Х 1го угла другого спана и меньше чем координата 2го угла и это не наш активный спан и у буквы есть координаты (она была сдвинута с исходного места)
      if ((pointX >= allSpans[j].finishX) && (pointX <= (allSpans[j].finishX + width)) && (allSpans[j] != activeLetter) && (allSpans[j].finishX != undefined)) {
        crossingX = true;
      }

    }
    //Если координата Х 2го угла меньше чем координата Х 1го угла другого спана и больше чем координата 2го угла и это не наш активный спан и у буквы есть координаты (она была сдвинута с исходного места)
    if ((firstInjectionY <= allSpans[j].finishY) && (firstInjectionY >= (allSpans[j].finishY - height)) && (allSpans[j] != activeLetter) && (allSpans[j].finishY != undefined)) {
      crossingY = true;
    }
    //Если координата Y 2го угла меньше чем координата Y 1го угла другого спана и больше чем координата 2го угла и это не наш активный спан и у буквы есть координаты (она была сдвинута с исходного места)
    if ((secondInjectionY <= allSpans[j].finishY) && (secondInjectionY >= (allSpans[j].finishY - height)) && (allSpans[j] != activeLetter) && (allSpans[j].finishY != undefined)) {
      crossingY = true;
    }
    if (crossingY && crossingX && allSpans[j].finishX != undefined && activeLetter.finishX != undefined) { //Если есть пересечения по оси Х и У - значит блоки пересекаются (crossingY и crossingX стали тру за счет соблюдения условий пересечения)
      allSpans[j].style.left = activeLetter.startX + "px";
      allSpans[j].style.top = activeLetter.startY + "px";
      activeLetter.style.left = allSpans[j].finishX + "px";
      activeLetter.style.top = allSpans[j].finishY + "px";
      activeLetter.finishX = activeLetter.getBoundingClientRect().x; //Переписываем конечные координаты спанов
      activeLetter.finishY = activeLetter.getBoundingClientRect().y; //Переписываем конечные координаты спанов
      allSpans[j].finishX = allSpans[j].getBoundingClientRect().x; //Переписываем конечные координаты спанов
      allSpans[j].finishY = allSpans[j].getBoundingClientRect().y; //Переписываем конечные координаты спанов
      break; //Остановка цикла чтобы если пересечение идет сразу с несколькими буквами шла замена мест только с 1ой подходящей
    }
  }

}
