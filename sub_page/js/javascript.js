import critics from "./criticsData.js";

/* ---------------------------------------------------------------------
    [모바일 GNB 토글]
------------------------------------------------------------------------ */
const menuItems = document.querySelectorAll(".main_gnb li");
const subMenus = document.querySelectorAll(".mobile_sub_gnb");
const gnbBtn = document.querySelector(".mobile_gnb_btn");
const mobileMenu = document.querySelector(".mobile_gnb_top");

gnbBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

/* ---------------------------------------------------------------------
    [모바일 메뉴 항목 클릭 시 서브메뉴 보이기]
------------------------------------------------------------------------ */
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    subMenus.forEach((menu) => menu.classList.remove("show"));
    subMenus[index].classList.add("show");
  });
});

/* ---------------------------------------------------------------------
    [TOP 버튼 노출 및 클릭 시 스크롤 위로 이동]
------------------------------------------------------------------------ */
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
------------------------------------------------------------------------ */
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
    [비평가 클릭 시 소개 및 비평작 렌더링]
------------------------------------------------------------------------ */
const fullName = document.querySelector(".full_name");
const fullText = document.querySelector(".full_text");

const reviewContainerPC = document.querySelector(".criticism_list");
const reviewContainerMobile = document.querySelector(".mobile_criticism_list");

// 비평가
const criticsElems = [
  document.querySelector(".critics01"),
  document.querySelector(".critics02"),
  document.querySelector(".critics03"),
  document.querySelector(".critics04"),
];

const mobileCriticsElems = document.querySelectorAll(".mobile_critics .critic");

const introductionList = [
  document.querySelector(".introduction01"),
  document.querySelector(".introduction02"),
  document.querySelector(".introduction03"),
  document.querySelector(".introduction04"),
];

const fullIntroduction = (index) => {
  const critic = critics[index];
  fullName.textContent = critic.name;
  fullText.textContent = critic.text;

  introductionList.forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  reviewContainerPC.innerHTML = "";
  reviewContainerMobile.innerHTML = "";

  if (critic.product && critic.product.length > 0) {
    critic.product.forEach((item) => {
      const html = `
        <div class="criticism">
          <div class="criticism_img">
            <img src="${item.img}" alt="${item.title}" />
          </div>
          <p class="criticism_title">${item.title}</p>
          <p class="criticism_name">${item.critic_name}</p>
        </div>
      `;
      reviewContainerPC.insertAdjacentHTML("beforeend", html);
      reviewContainerMobile.insertAdjacentHTML("beforeend", html);
    });
  } else {
    reviewContainerPC.innerHTML = `<p>등록된 비평 작품이 없습니다.</p>`;
    reviewContainerMobile.innerHTML = `<p>등록된 비평 작품이 없습니다.</p>`;
  }
};

criticsElems.forEach((elem, index) => {
  elem.addEventListener("click", () => fullIntroduction(index));
});

mobileCriticsElems.forEach((elem, index) => {
  elem.addEventListener("click", () => fullIntroduction(index));
});
window.addEventListener("DOMContentLoaded", () => {
  fullIntroduction(0);
});
/* ---------------------------------------------------------------------
    [슬라이드 - 마우스 드래그로 넘기기]
------------------------------------------------------------------------ */

function enableDragScroll(container) {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("dragging");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    container.scrollLeft = scrollLeft - walk;
  });
}

const alwaysDraggableContainers = [
  document.querySelector(".criticism_list"),
  document.querySelector(".mobile_criticism_list"),
];

alwaysDraggableContainers.forEach((container) => {
  if (container) enableDragScroll(container);
});

const criticsContainer = document.querySelectorAll(".critics");
let criticDragApplied = false;

function applyCriticDragIfTablet() {
  if (window.innerWidth <= 1024 && !criticDragApplied) {
    criticsContainer.forEach((el) => enableDragScroll(el));
    criticDragApplied = true;
  }
}
applyCriticDragIfTablet();
window.addEventListener("resize", applyCriticDragIfTablet);
