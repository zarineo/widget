const mainHeader = document.querySelector(".main-header");
const backdrop = document.querySelector(".backdrop");
const body = document.querySelector("body");

// content loaded
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", HeaderHandleScroll);

  if (mainHeader.classList.contains("animated")) {
    mainHeader.classList.add("is--active");
  }
});

function HeaderHandleScroll() {
  let scrollTop = window.scrollY;
  if (scrollTop === 0) {
    // Прокрутка вниз
    mainHeader.classList.remove("white-bg--v");
  } else {
    mainHeader.classList.add("white-bg--v");
    // Прокрутка вверх
  }
  return scrollTop;
}

// header
const menuButton = document.querySelector(".main-nav__item--mobile");
const hamburger = document.querySelector(".hamburger");
const menuMobile = document.querySelector(".mobile-menu");
const headerCollectionsItem = document.querySelector(
  ".main-nav__item--collections"
);
const headerCollectionsSubmenu = document.querySelector(
  ".main-header .submenu"
);
const menuMobileToggleItem = document.querySelector(
  ".mobile-nav__item--collection"
);
const menuMobileSubmenu = document.querySelector(".mobile-nav__item--submenu");

headerCollectionsItem.addEventListener("click", () => {
  headerCollectionsSubmenu.classList.toggle("is--active");
  mainHeader.classList.toggle("menu-active--submenu");
});

menuButton.addEventListener("click", () => {
  mainHeader.classList.toggle("menu-active");
  hamburger.classList.toggle("is--active");
  document.body.classList.toggle("overflow-hidden");
});

menuMobileToggleItem.addEventListener("click", () => {
  menuMobileSubmenu.classList.toggle("is--active");
});

// footer
const arrowUp = document.querySelector("#arrow-up");
const footerDesktopItems = document.querySelectorAll(".footer-info__item");
const footerDesktopItemsBody = document.querySelectorAll(
  ".footer-info__body--item"
);

arrowUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

footerDesktopItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    footerDesktopItems.forEach((otherItem, i) => {
      if (otherItem !== item) {
        otherItem.classList.remove("is--active");
        footerDesktopItemsBody[i].classList.remove("is--active");
      }
    });
    item.classList.toggle("is--active");
    footerDesktopItemsBody[index].classList.toggle("is--active");
  });
});

// modals

// search
const modalSearch = document.querySelector("#modal-search");
const modalSearchClose = modalSearch.querySelector(".modal-header__button");
const searchButton = document.querySelector(
  ".main-nav__item--icon.icon-search"
);

// favorites
const modalFavorites = document.querySelector("#modal-favorites");
const modalFavoritesClose = modalFavorites.querySelector(
  ".modal-header__button"
);
const favoritesButton = document.querySelector(
  ".main-nav__item--icon.icon-favor"
);

const modalCart = document.querySelector("#modal-cart");
const modalCartClose = modalCart.querySelector(".modal-header__button");
const cartButton = document.querySelector(".main-nav__item--icon.icon-bag");

searchButton.addEventListener("click", () => OpenModal(modalSearch));
favoritesButton.addEventListener("click", () => OpenModal(modalFavorites));
cartButton.addEventListener("click", () => OpenModal(modalCart));

modalSearchClose.addEventListener("click", () => CloseModal(modalSearch));
modalFavoritesClose.addEventListener("click", () => CloseModal(modalFavorites));
modalCartClose.addEventListener("click", () => CloseModal(modalCart));
backdrop.addEventListener("click", () => {
  CloseModal(modalSearch);
  CloseModal(modalFavorites);
  CloseModal(modalCart);
});

function CloseModal(item) {
  item.classList.remove("is--active");
  backdrop.classList.remove("is--active");
  document.body.classList.remove("overflow-hidden");
}

function OpenModal(item) {
  item.classList.add("is--active");
  backdrop.classList.add("is--active");
  document.body.classList.add("overflow-hidden");
}

// Счетчик на товары в корзине
const counters = document.querySelectorAll("[data-counter]");

if (counters) {
  counters.forEach((counter) => {
    counter.addEventListener("click", (e) => {
      const target = e.target;

      if (target.closest(".counter__button")) {
        let value = parseInt(
          target.closest(".counter").querySelector("input").value
        );

        if (target.classList.contains("counter__button--plus")) {
          value++;
        } else {
          --value;
        }

        if (value <= 1) {
          value = 1;
        }
        target.closest(".counter").querySelector("input").value = value;
      }
    });
  });
}

// удаляем из корзины товар

// Получаем все элементы с классом "cart__product-delete"
let deleteButtons = document.querySelectorAll(".cart__product-delete");

// Добавляем обработчик клика к каждой кнопке удаления
deleteButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Получаем родительский элемент (в данном случае, блок .cart__item)
    let cartItem = this.closest(".cart__item");

    // Проверяем, что родительский элемент найден, прежде чем удалять
    if (cartItem) {
      // Удаляем родительский элемент
      cartItem.remove();
    }
  });
});

// Модалки уход за изделиями, доставка и оплата, возврат, faq

const modalProductCareBtn = document.querySelector("#product-care-btn");
const modalProductCare = document.querySelector("#modal-product-care");
const modalProductCareCloseBtn = modalProductCare.querySelector(
  ".modal-header__button"
);
const modalFaq = document.querySelector("#modal-faq");

const openFavoriteBtn = document.querySelector("#open-favorite-btn");
const openFaqBtn = document.querySelector("#faq");
const closeFaqBtn = modalFaq.querySelector(".modal-header__button");
const modalContacts = document.querySelector(".modal-contacts");
const openContactsBtn = document.querySelector("#open-contacts-btn");
const closeContactsBtn = modalContacts.querySelector(".modal-header__button");
const openAddressBtn = document.querySelector("#open-address");
const modalAddress = document.querySelector("#modal-address");
const closeModalAddress = modalAddress.querySelector(".modal-header__button");

modalProductCareBtn.addEventListener("click", () =>
  OpenModal(modalProductCare)
);
modalProductCareCloseBtn.addEventListener("click", () =>
  CloseModal(modalProductCare)
);
openFavoriteBtn.addEventListener("click", () => OpenModal(modalFavorites));
openFaqBtn.addEventListener("click", () => OpenModal(modalFaq));
closeFaqBtn.addEventListener("click", () => CloseModal(modalFaq));
openContactsBtn.addEventListener("click", () => OpenModal(modalContacts));
closeContactsBtn.addEventListener("click", () => CloseModal(modalContacts));
openAddressBtn.addEventListener("click", () => OpenModal(modalAddress));
closeModalAddress.addEventListener("click", () => CloseModal(modalAddress));


// accordions
const productAccordionItems = document.querySelectorAll(
  ".product-description__accordion > .accordion-item"
);
const footerInfoAccordionItems = document.querySelectorAll(
  ".footer-info__mobile > .accordion-item"
);
const filterAccordionItems = document.querySelectorAll(
  ".modal-filter__accordion .accordion-item"
);
const sdekPointsItems = document.querySelectorAll(".points-list__item");

filterAccordionItems.forEach((item) => accordionAnimate(item, [], false));
productAccordionItems.forEach((item) => accordionAnimate(item, []));
footerInfoAccordionItems.forEach((item) =>
  accordionAnimate(item, footerInfoAccordionItems, false)
);
sdekPointsItems.forEach((item) =>
  accordionAnimate(item, sdekPointsItems, false)
);

function accordionAnimate(item, items, scroll = true) {
  item.querySelector(".accordion-header").addEventListener("click", () => {
    items.forEach((accItem) => {
      if (accItem !== item) {
        accItem.classList.remove("is--active");
        accItem.querySelector(".accordion-description").style.height = "";
      }
    });

    item.classList.toggle("is--active");
    const description = item.querySelector(".accordion-description");
    if (description.style.height) {
      description.style.height = "";
    } else {
      const bodyHeight = description.querySelector(
        ".accordion-description__body"
      ).offsetHeight;
      description.style.height = `${bodyHeight}px`;

      if (scroll) {
        setTimeout(() => {
          const scrollToPosition = item.offsetTop - 120;
          window.scrollTo({
            top: scrollToPosition,
            behavior: "smooth", // Добавляет плавность скролла
          });
        }, 250);
      }
    }
  });
}
