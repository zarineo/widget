function AboutUsPage() {
  const AboutUsPageMain = document.querySelector('.about-us-page')
  if (AboutUsPageMain) {
    const animatedMainPageSections =
      document.querySelectorAll(".animated-section");

    const favoriteSwiperOptionsMobile = {
      effect: "coverflow",
      slidesPerView: 1,
      loop: true,
      speed: 2000,
      direction: "horizontal",
      centeredSlides: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3.5,
        slideShadows: false,
      },
      pagination: {
        el: ".create .swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 0,
        pauseOnMouseEnter: true,
      },
    };

    const favoriteSwiperOptionsDesktop = {
      slidesPerView: 1,
      direction: "vertical",
      pagination: {
        el: ".create .swiper-pagination",
        clickable: true,
      },
    };

    let favoritesSwiper;

    function favoritesSwiperMode() {
      let screenWidth = window.innerWidth;
      let options =
        screenWidth < 800
          ? favoriteSwiperOptionsMobile
          : favoriteSwiperOptionsDesktop;

      if (!favoritesSwiper) {
        favoritesSwiper = new Swiper(".create .swiper", options);
        return;
      }

      if (favoritesSwiper && favoritesSwiper.destroy) {
        favoritesSwiper.destroy(true, true);
      }
      favoritesSwiper = new Swiper(".create .swiper", options);
    }

    window.addEventListener("resize", () => {
      favoritesSwiperMode();
      eventsSwiperMode();
      changeHeaderStyle();
    });

    document.addEventListener("DOMContentLoaded", () => {
      favoritesSwiperMode();
      eventsSwiperMode();
      setTimeout(() => {
        ActiveBrandHistoryAnimate();
      }, 600);

      const textBlocks = document.querySelectorAll(
        ".create__swiper-text-block"
      );
      const bullets = document.querySelectorAll(
        ".create .swiper-pagination-bullet"
      );

      for (let i = 0; i < textBlocks.length; i++) {
        favoritesSwiper.on("slideChange", () => {
          if (
            bullets[i].classList.contains("swiper-pagination-bullet-active")
          ) {
            textBlocks.forEach((block) => {
              block.classList.remove("is--active");
            });
            textBlocks[i].classList.add("is--active");
          }
        });
      }
    });

    //swiper for articles and events
    let eventsSwiper;

    function eventsSwiperMode() {
      let screenWidth = window.innerWidth;
      if (screenWidth > 800) {
        if (!eventsSwiper) {
          eventsSwiper = new Swiper(".events .swiper", {
            slidesPerView: "auto",
            loop: false,
            spaceBetween: 30,
          });
        }
      } else {
        if (eventsSwiper && eventsSwiper.destroy) {
          eventsSwiper.destroy(true, true);
          eventsSwiper = null;
        }
      }
    }

    new Swiper(".articles .swiper", {
      slidesPerView: "auto",
      breakpoints: {
        320: {
          spaceBetween: 80,
        },
        580: {
          spaceBetween: 120,
        },
        720: {
          spaceBetween: 100,
        },
        880: {
          spaceBetween: 100,
        },
      },
      spaceBetween: 156,
      effect: "coverflow",
      centeredSlides: true,
      initialSlide: 1, //центральный слайд активный
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1.2,
        slideShadows: false,
      },
      pagination: {
        el: ".articles .swiper-pagination",
      },
    });

    window.addEventListener("scroll", () => {
      const windowHeight = window.innerHeight;
      animatedMainPageSections.forEach((block) => {
        const blockPosition = block.getBoundingClientRect().top;
        if (blockPosition <= 0.4 * windowHeight) {
          const transfromAnimatedItems = block.querySelectorAll(
            ".transform-text__animated"
          );
          const blockAnimatedItems = block.querySelectorAll(".block__animated");

          transfromAnimatedItems.forEach((item) => {
            item.classList.add("is--active");
          });
          blockAnimatedItems.forEach((item) => {
            item.classList.add("is--active");
          });
        }
      });
    });

    // header block
    const brandHistory = document.querySelector(".brand-history");

    function ActiveBrandHistoryAnimate() {
      brandHistory.classList.add("is--active");
      changeHeaderStyle();
    }

    function changeHeaderStyle() {
      const width = window.innerWidth;
      if (width <= 1024) {
        mainHeader.classList.add("white--v");
      } else {
        mainHeader.classList.remove("white--v");
      }
    }
  }
}

AboutUsPage();
