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
