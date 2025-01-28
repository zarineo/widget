function CategoriesPageScript() {
  const CategoriesPageMain = document.querySelector(".category-page");
  if (CategoriesPageMain) {
    console.log("categories");
    const modalFilter = document.querySelector("#modal-filter");
    const modalFilterClose = modalFilter.querySelector(".modal-header__button");
    const filterButton = document.querySelector("#filter-button");

    filterButton.addEventListener("click", () => {
      modalFilter.classList.add("is--active");
      backdrop.classList.add("is--active");
      document.body.classList.add("overflow-hidden");
    });

    modalFilterClose.addEventListener("click", () => {
      modalFilter.classList.remove("is--active");
      backdrop.classList.remove("is--active");
      document.body.classList.remove("overflow-hidden");
    });

    new Swiper(".category-product__swiper.swiper", {
      loop: true,
      navigation: {
        nextEl: ".category-product__swiper .swiper-button-next",
        prevEl: ".category-product__swiper .swiper-button-prev",
      },
    });

    backdrop.addEventListener("click", () => {
      modalFilter.classList.remove("is--active");
      backdrop.classList.remove("is--active");
      document.body.classList.remove("overflow-hidden");
    });
  }
}

CategoriesPageScript();
