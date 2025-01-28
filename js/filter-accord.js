document.addEventListener('DOMContentLoaded', function () {
  // Находим все элементы с классом modal__item
  let accordionItems = document.querySelectorAll('.modal__item');

  // Обходим каждый элемент
  accordionItems.forEach(function (item) {
    // Навешиваем обработчик события на клик
    item.addEventListener('click', function () {
      // Находим следующий за текущим элемент modal__content
      let content = item.nextElementSibling;

      // Закрываем все modal__content, кроме текущего
      closeAllAccordions(content, item);

      // Если modal__content существует
      if (content) {
        // Переключаем его видимость
        content.style.display = content.style.display === 'flex' ? 'none' : 'flex';

        // Находим вложенный span:nth-child(1)
        let span = item.querySelector('.modal__cross span:nth-child(1)');

        // Если span существует
        if (span) {
          // Переключаем прозрачность
          span.style.opacity = span.style.opacity === '0' ? '1' : '0';
        }

        // Добавляем/удаляем класс .border-none у текущего modal__item
        item.classList.toggle('border-none');
      }
    });
  });

  // Функция для закрытия всех modal__content и восстановления бордера у modal__item, кроме указанного
  function closeAllAccordions(exceptContent, exceptItem) {
    let allContents = document.querySelectorAll('.modal__content');
    let allItems = document.querySelectorAll('.modal__item');

    allContents.forEach(function (content) {
      // Закрываем все, кроме указанного
      if (content !== exceptContent) {
        content.style.display = 'none';

        // Возвращаем в исходное положение span:nth-child(1)
        let parentItem = content.previousElementSibling;
        let spanToReset = parentItem.querySelector('.modal__cross span:nth-child(1)');
        if (spanToReset) {
          spanToReset.style.opacity = '1';
        }
      }
    });

    allItems.forEach(function (item) {
      // Восстанавливаем/удаляем класс .border-none у всех modal__item, кроме указанного
      if (item !== exceptItem) {
        item.classList.remove('border-none');
      }
    });
  }
});
