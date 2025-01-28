function ProductPageScript() {
  const ProguctPageMain = document.querySelector(".product-page");
  if (ProguctPageMain) {
    new Swiper(".recommendations .swiper", {
      slidesPerView: "auto",
      spaceBetween: 20,

      breakpoints: {
        1024: {
          spaceBetween: 20,
          grid: {
            rows: 1,
            fill: "rows",
          },
        },
        720: {
          spaceBetween: 24,
          grid: {
            rows: 2,
            fill: "rows",
          },
        },
      },
    });
    const productPhotoList = document.querySelector(".product-photos__list");
    const pagination = document.getElementById("pagination");
    const checkoutButton = document.querySelector(".product-checkout__button");
    const checkoutAddedMessage = document.querySelector(".added-message");

    for (let i = 0; i < productPhotoList.children.length; i++) {
      const dot = document.createElement("div");
      dot.classList.add("pagination-dot");
      pagination.querySelector(".pagination-dots").appendChild(dot);
    }

    const dots = document.querySelectorAll(".pagination-dot");

    // Обработчик скролла
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Получаем индекс элемента, который виден на экране
            const index = Array.from(productPhotoList.children).indexOf(
              entry.target
            );

            // Устанавливаем активную точку в соответствии с видимым элементом
            dots.forEach((dot, dotIndex) => {
              dot.classList.toggle(
                "pagination-dot__active",
                dotIndex === index
              );
            });
          }
        });
      },
      { threshold: 0.7 }
    );

    // Наблюдаем за каждым элементом списка фото
    Array.from(productPhotoList.children).forEach((photo) => {
      observer.observe(photo);
    });

    function productPhotosSlider() {
      const firstImg = productPhotoList.querySelectorAll(
        ".product-photos__item"
      )[0];
      let isDragStart = false,
        isDragging = false,
        prevPageX,
        prevScrollLeft,
        positionDiff;

      // докрутить слайд
      const autoSlide = () => {
        if (
          productPhotoList.scrollLeft -
            (productPhotoList.scrollWidth - productPhotoList.clientWidth) >
            -1 ||
          productPhotoList.scrollLeft <= 0
        )
          return;

        positionDiff = Math.abs(positionDiff);
        let firstImgWidth = firstImg.clientWidth;
        let valDifference = firstImgWidth - positionDiff;

        if (productPhotoList.scrollLeft > prevScrollLeft) {
          return (productPhotoList.scrollLeft +=
            positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
        }
        productPhotoList.scrollLeft -=
          positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
      };

      const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = productPhotoList.scrollLeft;
      };
      const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        productPhotoList.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        productPhotoList.scrollLeft = prevScrollLeft - positionDiff;
      };
      const dragStop = () => {
        isDragStart = false;
        productPhotoList.classList.remove("dragging");
        if (!isDragging) return;
        isDragging = false;
        autoSlide();
      };

      productPhotoList.addEventListener("mousedown", dragStart);
      productPhotoList.addEventListener("touchstart", dragStart);
      document.addEventListener("mousemove", dragging);
      productPhotoList.addEventListener("touchmove", dragging);
      document.addEventListener("mouseup", dragStop);
      productPhotoList.addEventListener("touchend", dragStop);
    }

    productPhotosSlider();

    // add to cart animation
    checkoutButton.addEventListener("click", () => {
      checkoutAddedMessage.classList.add("is--active");
      setTimeout(() => {
        checkoutAddedMessage.classList.remove("is--active");
      }, 2500);
    });

    // slider photo preview

    const productPhotoPreview = document.querySelector(".photos-preview");
    const previewPhotoList = document.querySelectorAll(
      ".photos-list .photos-list__item"
    );
    const previewPhotoCloseButton =
      productPhotoPreview.querySelector(".close-button");
    const previewPhotoWrapper = productPhotoPreview.querySelector(
      ".preview-photo__wrapper"
    );

    // open photo preview
    productPhotoList.addEventListener("click", () => {
      productPhotoPreview.classList.add("is--active");
      document.body.classList.add("overflow-hidden");
      showImage(0);
    });

    // close photo preview
    productPhotoPreview
      .querySelector(".close-button")
      .addEventListener("click", () => {
        productPhotoPreview.classList.remove("is--active");
        document.body.classList.remove("overflow-hidden");
      });

    // slider list

    let currentIndex = 0;

    previewPhotoList.forEach((item, index) => {
      item.addEventListener("click", () => {
        showImage(index);
        currentIndex = index;
      });
    });

    document
      .querySelector(".navigation-buttons .prev-button")
      .addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + previewPhotoList.length) %
          previewPhotoList.length;
        showImage(currentIndex);
      });

    document
      .querySelector(".navigation-buttons .next-button")
      .addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % previewPhotoList.length;
        showImage(currentIndex);
      });

    let previewPhotoZoomer;

    // показать изображение
    function showImage(index) {
      previewPhotoList.forEach((item, i) => {
        item.classList.remove("is--active");
        if (i === index) {
          item.classList.add("is--active");
          const img = item.querySelector("img");

          previewPhotoWrapper.querySelector("img").src = img.src;

          removeZoomerEvents();
          previewPhotoWrapper.classList.remove("zoomed");
          previewPhotoZoomer = createZoomer();
          addZoomerEvents();
        }
      });
    }

    // photo zoom
    const previewImage = previewPhotoWrapper.querySelector("img");
    let isDragging = false;

    function createZoomer() {
      let element,
        xStart,
        yStart,
        currentX = 0,
        currentY = 0;

      return {
        zoom: function () {
          previewPhotoWrapper.classList.toggle("zoomed");
          const previewImage = previewPhotoWrapper.querySelector("img");
          previewImage.style.left = 0 + "px";
          previewImage.style.top = 0 + "px";
          currentX = 0;
          currentY = 0;
        },

        start_drag: function () {
          element = previewPhotoWrapper.querySelector("img");

          if (window.event.type === "touchstart") {
            xStart = window.event.touches[0].clientX;
            yStart = window.event.touches[0].clientY;
          } else {
            xStart = window.event.clientX;
            yStart = window.event.clientY;
          }

          console.log(window.event.type);
        },

        stop_drag: function () {
          setTimeout(function () {
            isDragging = false;
            element = null;
          }, 0);
        },

        while_drag: function () {
          if (element) {
            isDragging = true;
            // текущее положение курсора
            let xCursor;
            let yCursor;

            if (window.event.type === "touchmove") {
              xCursor = window.event.touches[0].clientX;
              yCursor = window.event.touches[0].clientY;
            } else {
              xCursor = window.event.clientX;
              yCursor = window.event.clientY;
            }

            newX = xCursor - xStart;
            newY = yCursor - yStart;

            // new left and top
            currentX = currentX + newX;
            currentY = currentY + newY;

            // max left and top
            const rect = element.getBoundingClientRect();
            const containerRect = element.parentNode.getBoundingClientRect();

            let maxLeft = (rect.width - containerRect.width) / 2;
            if (maxLeft < 0) maxLeft = 0;
            let minLeft = -maxLeft;

            if (currentX > maxLeft) currentX = maxLeft;
            if (currentX < minLeft) currentX = minLeft;

            let maxTop = (rect.height - containerRect.height) / 2;
            if (maxTop < 0) maxTop = 0;
            let minTop = -maxTop;

            if (currentY > maxTop) currentY = maxTop;
            if (currentY < minTop) currentY = minTop;

            // update start position
            xStart = xCursor;
            yStart = yCursor;

            // update left and top for element
            element.style.left = currentX + "px";
            element.style.top = currentY + "px";
          }
        },
      };
    }

    function previewPhotoClick() {
      if (!isDragging) {
        previewPhotoZoomer.zoom();
      }
    }

    function previewPhotoDragStart() {
      previewPhotoZoomer.start_drag();
    }

    function previewPhotoDragStop() {
      previewPhotoZoomer.stop_drag();
    }

    function previewPhotoWhileDrag() {
      previewPhotoZoomer.while_drag();
    }

    function removeZoomerEvents() {
      const img = previewPhotoWrapper.querySelector("img");

      img.removeEventListener("click", previewPhotoClick);
      img.removeEventListener("mousedown", previewPhotoDragStart);
      img.removeEventListener("mousemove", previewPhotoWhileDrag);
      img.removeEventListener("mouseup", previewPhotoDragStop);
      img.removeEventListener("mouseout", previewPhotoDragStop);

      img.removeEventListener("touchstart", previewPhotoDragStart);
      img.removeEventListener("touchmove", previewPhotoWhileDrag);
      img.removeEventListener("touchend", previewPhotoDragStop);
      img.removeEventListener("touchcancel", previewPhotoDragStop);
    }

    function addZoomerEvents() {
      const img = previewPhotoWrapper.querySelector("img");

      img.addEventListener("click", previewPhotoClick);
      img.addEventListener("mousedown", previewPhotoDragStart);
      img.addEventListener("mousemove", previewPhotoWhileDrag);
      img.addEventListener("mouseup", previewPhotoDragStop);
      img.addEventListener("mouseout", previewPhotoDragStop);

      img.addEventListener("touchstart", previewPhotoDragStart);
      img.addEventListener("touchmove", previewPhotoWhileDrag);
      img.addEventListener("touchend", previewPhotoDragStop);
      img.addEventListener("touchcancel", previewPhotoDragStop);
    }

    // My crazy code for modals
    // Три переменные, по клику на которые будут открываться три окошка - выбор цвета, ткани и размера
    const chooseColor = document.querySelector(".property-item-color");
    const chooseSize = document.querySelector("#property-item-size");
    const chooseFabric = document.querySelector("#property-item-fabric");

    // Переменные-модалки
    const modalColor = document.querySelector("#modal-color");
    const modalSize = document.querySelector("#modal-size");
    const modalFabric = document.querySelector("#modal-material");

    // Переменные для кнопок закрытия модалок
    const modalColorClose = modalColor.querySelector(".modal-header__button");
    const modalSizeClose = modalSize.querySelector(".modal-header__button");
    const modalFabricClose = modalFabric.querySelector(".modal-header__button");

    // Три события для открытия модальных окон
    chooseColor.addEventListener("click", () => OpenModal(modalColor));
    chooseSize.addEventListener("click", () => OpenModal(modalSize));
    chooseFabric.addEventListener("click", () => OpenModal(modalFabric));

    modalColorClose.addEventListener("click", () => CloseModal(modalColor));
    modalSizeClose.addEventListener("click", () => CloseModal(modalSize));
    modalFabricClose.addEventListener("click", () => CloseModal(modalFabric));
    backdrop.addEventListener("click", () => {
      CloseModal(modalColor);
      CloseModal(modalSize);
      CloseModal(modalFabric);
    });

    // Выбираем цвет и окно закрывается
    const modalColorItems = modalColor.querySelectorAll(
      ".modal-color__product-container"
    );

    for (let item of modalColorItems) {
      item.addEventListener("click", () => {
        for (let item2 of modalColorItems) {
          item2.classList.remove("is--active");
        }
        item.classList.add("is--active");
        CloseModal(modalColor);
      });
    }

    // Выбираем размер и модальное окно закрывается
    const modalSizeItems = modalSize.querySelectorAll(".modal__item");

    for (let item of modalSizeItems) {
      item.addEventListener("click", () => {
        for (let item2 of modalSizeItems) {
          item2.classList.remove("is--active");
        }
        item.classList.add("is--active");
        CloseModal(modalSize);
      });
    }

    // Выбираем материал и окно закрывается
    const modalFabricItems = modalFabric.querySelectorAll(".modal__item");

    for (let item of modalFabricItems) {
      item.addEventListener("click", () => {
        for (let item2 of modalFabricItems) {
          item2.classList.remove("is--active");
        }
        item.classList.add("is--active");
        CloseModal(modalFabric);
      });
    }
  }
}

ProductPageScript();
