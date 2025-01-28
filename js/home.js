function HomePageScript() {
  const HomePageMain = document.querySelector(".home-page");
  if (HomePageMain) {
    const mainVideoBlock = document.querySelector(".home-video");
    const animatedMainPageSections =
      document.querySelectorAll(".animated-section");

    const mapLink = document.querySelector("#map-link");
    const map = document.querySelector(".about-amat__map");

    mapLink.addEventListener("click", () => {
      mapLink.classList.add("map--active");
      map.classList.add("is--active");
    });

    const favoriteSwiperOptionsMobile = {
      effect: "coverflow",
      slidesPerView: "auto",
      loop: true,
      speed: 1000,
      centeredSlides: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3.5,
        slideShadows: false,
      },
      pagination: {
        el: ".favorite-shawls__list .swiper-pagination",
      },
      autoplay: {
        delay: 0,
        pauseOnMouseEnter: true,
      },
    };

    const favoriteSwiperOptionsDesktop = {
      slidesPerView: "auto",
      loop: true,
      speed: 1000,
      spaceBetween: 8,
      autoplay: {
        delay: 0,
        pauseOnMouseEnter: true,
      },
    };

    let favoritesSwiper;
    let perSwiperEffect;

    function favoritesSwiperMode() {
      let screenWidth = window.innerWidth;
      let swiperEffect = screenWidth < 768 ? "coverflow" : "slide";
      let options =
        screenWidth < 768
          ? favoriteSwiperOptionsMobile
          : favoriteSwiperOptionsDesktop;

      if (!perSwiperEffect && !favoritesSwiper) {
        perSwiperEffect = swiperEffect;
        favoritesSwiper = new Swiper(".favorite-shawls__list .swiper", options);
        return;
      }

      if (perSwiperEffect !== swiperEffect) {
        perSwiperEffect = swiperEffect;
        if (favoritesSwiper && favoritesSwiper.destroy) {
          favoritesSwiper.destroy(true, true);
        }
        favoritesSwiper = new Swiper(".favorite-shawls__list .swiper", options);
      }
    }

    window.addEventListener("resize", () => {
      favoritesSwiperMode();
      mainPageVideoBlockActive();
      AmatVideSwiperMode();
    });

    document.addEventListener("DOMContentLoaded", () => {
      favoritesSwiperMode();
      AmatVideSwiperMode();

      setTimeout(() => {
        window.scrollTo(0, 0);
        MainPageHeaderAnimationOn();
      }, 600);
    });

    function MainPageHeaderAnimationOn() {
      mainVideoBlock.classList.add("is--active");
      mainPageVideoBlockActive();
      mainHeader.classList.add("is--active");
    }

    function mainPageVideoBlockActive() {
      let screenWidth = window.innerWidth;
      const video = mainVideoBlock.querySelector(".video");
      const description = mainVideoBlock.querySelector(
        ".home-video__description"
      );
      if (screenWidth < 769) {
        const height = description.offsetHeight;

        video.style.marginBottom = height + "px";
        video.style.height = `calc(100vh - ${height}px)`;
      } else {
        video.style.marginBottom = 0;
        video.style.height = "100%";
      }
    }

    window.addEventListener("scroll", () => {
      const windowHeight = window.innerHeight;
      animatedMainPageSections.forEach((block) => {
        const blockPosition = block.getBoundingClientRect().top;
        if (blockPosition <= 0.6 * windowHeight) {
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

    let amatVideoSwiper;
    function AmatVideSwiperMode() {
      let screenWidth = window.innerWidth;
      const options = {
        slidesPerView: "auto",
        spaceBetween: screenWidth < 1220 ? 16 : 40,
        direction: screenWidth < 1220 ? "horizontal" : "vertical",
      };

      if (amatVideoSwiper && amatVideoSwiper.destroy) {
        amatVideoSwiper.destroy();
      }

      amatVideoSwiper = new Swiper(".amat-video .swiper", options);
    }
  }
}

HomePageScript();
