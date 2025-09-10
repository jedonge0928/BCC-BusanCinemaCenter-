🎬 영화의전당 홈페이지 리디자인 프로젝트

# 영화의 전당

## 사용 기술

HTML

CSS

JavaScript (Vanilla JS)

## 주요 기능

## 캐러셀 애니메이션 (IntersectionObserver 활용)

* 카드가 화면에 60% 이상 진입 시 active 클래스 적용

* 클릭 시 해당 카드로 부드럽게 스크롤 이동

* 사용자 시각 흐름에 맞춰 강조 효과 및 이동 기능 개선

```
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

```

<img width="403" height="561" alt="image" src="https://github.com/user-attachments/assets/95bbd316-f9ef-4a4c-8efa-15f35c7dcdd9" />

## 캘린더 기능

현재 날짜 기준 동적 렌더링

월 초 시작 요일 맞춰 빈 칸 출력

오늘 날짜 강조, 이전/다음 월로 이동 기능 포함

```
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

```
<img width="1552" height="425" alt="image" src="https://github.com/user-attachments/assets/6e32ab2b-703c-47ee-b4dd-65644da646a9" />


## 비평가 소개 및 비평 작품 렌더링

criticsData.js에서 데이터 불러와 비평가 정보와 작품 리스트 출력


클릭 시 해당 비평가 정보와 작품을 PC/모바일에 맞게 자동 렌더링

비평 작품 없을 경우 예외 처리 메시지 출력



드래그 스크롤 기능 (가로 스크롤)

마우스 드래그를 통해 비평 작품 리스트 좌우 이동

PC/모바일: 항상 드래그 가능, 비평가 목록: 태블릿 이하 해상도만 적용

```
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

```

<img width="814" height="697" alt="image" src="https://github.com/user-attachments/assets/320c6242-745b-43da-82b8-de5f0095338e" />





 프로젝트 회고

이 프로젝트를 통해 Vanilla JS만으로 다양한 UI 기능을 구현하며 실력을 크게 향상시킬 수 있었습니다.
특히, IntersectionObserver를 활용한 스크롤 애니메이션과 마우스 드래그 기능은 사용자 경험 향상에 핵심적인 역할을 했습니다.

또한 캘린더, 카드 이동, 동적 렌더링 등의 기능을 직접 구현하며 실무 감각과 JS 구조화에 대한 이해도 함께 키웠습니다.
단순 디자인 리디자인이 아닌, 기능 중심의 인터랙티브 웹사이트를 구현한 점에서 큰 의미가 있었습니다.

 배포 링크

▶ 사이트 바로가기
프로젝트 링크

 배포된 사이트 바로가기(http://jedongkim.dothome.co.kr/)



# 모아보기






https://github.com/user-attachments/assets/dad538f5-26f0-4b0f-9286-300686daff34




https://github.com/user-attachments/assets/6e669438-e998-4685-81c8-bdfdb38c4d43




https://github.com/user-attachments/assets/3de94a5b-65e2-42b9-ba44-7e41778ddb39






https://github.com/user-attachments/assets/85eb4b4c-8e69-417b-a548-6815d12f1bc1



