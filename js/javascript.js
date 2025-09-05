document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------------------
    [모바일 GNB 토글]
  ---------------------------------------------------------------------- */
  const menuItems = document.querySelectorAll(".main_gnb li");
  const subMenus = document.querySelectorAll(".mobile_sub_gnb");
  const gnbBtn = document.querySelector(".mobile_gnb_btn");
  const mobileMenu = document.querySelector(".mobile_gnb_top");

  gnbBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
  /* ---------------------------------------------------------------------
    [모바일 메뉴 항목 클릭 시 서브메뉴 보이기]
  ---------------------------------------------------------------------- */
  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      subMenus.forEach((menu) => menu.classList.remove("show"));
      subMenus[index].classList.add("show");
    });
  });

  /* ---------------------------------------------------------------------
    [TOP 버튼 노출 및 클릭 시 스크롤 위로 이동]
  ---------------------------------------------------------------------- */
  const topBtnBox = document.querySelector(".top_btn_box");
  const topBtn = document.querySelector(".top_btn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      topBtnBox.classList.add("show");
    } else {
      topBtnBox.classList.remove("show");
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ---------------------------------------------------------------------
    [스크롤 시 GNB 고정]
  ---------------------------------------------------------------------- */
  const headerEl = document.querySelector(".header_down_outer");

  const headerHandler = () => {
    const pageY = window.pageYOffset;

    if (pageY >= 100) {
      headerEl.classList.add("header_fix");
    } else {
      headerEl.classList.remove("header_fix");
    }
  };

  window.addEventListener("scroll", headerHandler);

  /* ---------------------------------------------------------------------
    [movies slide!]
  ---------------------------------------------------------------------- */
  const moviePrevBtn = document.querySelector(".prev-btn");
  const movieNextBtn = document.querySelector(".next-btn");

  let pageIndex = 0;

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1280) return 5;
    else if (width >= 1204) return 4;
    else return 1;
  }

  function getCurrentSlider() {
    return Array.from(document.querySelectorAll(".movies_box")).find(
      (box) => getComputedStyle(box).display !== "none"
    );
  }

  function getPageCount(slider, viewCount) {
    const total = slider.querySelectorAll(".movie").length;
    return Math.ceil(total / viewCount);
  }
  function update() {
    const slider = getCurrentSlider();
    if (!slider) return;

    const viewCount = getVisibleCount();
    const containerWidth = slider.parentElement.clientWidth;
    const pageCount = getPageCount(slider, viewCount);

    let translateX = 0;

    if (window.innerWidth >= 1204) {
      translateX = pageIndex * containerWidth;
    } else {
      const item = slider.querySelector(".movie");
      const itemWidth = item ? item.offsetWidth : 0;
      translateX = pageIndex * itemWidth * viewCount;
    }

    slider.style.transform = `translateX(-${translateX}px)`;

    moviePrevBtn.style.display = pageIndex === 0 ? "none" : "block";
    movieNextBtn.style.display = pageIndex >= pageCount - 1 ? "none" : "block";
  }
  moviePrevBtn.addEventListener("click", () => {
    if (pageIndex > 0) {
      pageIndex--;

      update();
    }
  });

  movieNextBtn.addEventListener("click", () => {
    const slider = getCurrentSlider();
    const viewCount = getVisibleCount();
    const pageCount = getPageCount(slider, viewCount);

    if (pageIndex < pageCount - 1) {
      pageIndex++;
      update();
    }
  });

  window.addEventListener("resize", () => {
    pageIndex = 0;
    update();
  });

  document.getElementById("best_movies").addEventListener("change", () => {
    pageIndex = 0;
    update();
  });
  document.getElementById("new_movies").addEventListener("change", () => {
    pageIndex = 0;
    update();
  });

  update();

  /* ---------------------------------------------------------------------
    [키워드 롤링 애니메이션]
  ---------------------------------------------------------------------- */
  const roller = document.querySelector(".roller .rolling_list");
  roller.id = "roller1";

  const clone = roller.cloneNode(true);
  clone.id = "roller2";

  document.querySelector(".roller").appendChild(clone);

  roller.classList.add("original");
  clone.classList.add("clone");

  /* ---------------------------------------------------------------------
    [캐러셀 카드 Intersection Observer + 클릭 이동]
  ---------------------------------------------------------------------- */
  const items = document.querySelectorAll(".carousel_item");
  const container = document.querySelector(".carousel_container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      root: container,
      threshold: 0.6,
    }
  );

  items.forEach((item) => {
    observer.observe(item);

    item.addEventListener("click", () => {
      item.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  /* ---------------------------------------------------------------------
    [캘린더 구현]
  ---------------------------------------------------------------------- */
  const monthText = document.querySelector(".month_text");
  const datesEl = document.querySelector(".dates");
  const prevBtn = document.querySelector(".calendar_prev");
  const nextBtn = document.querySelector(".calendar_next");

  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();

  function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthText.textContent = `${month + 1}월`;
    datesEl.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
      datesEl.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= lastDate; d++) {
      const date = new Date(year, month, d);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      datesEl.innerHTML += `<div class="${isToday ? "active" : ""}">${d}</div>`;
    }
  }

  renderCalendar(currentYear, currentMonth);

  prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });

  nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });
});
