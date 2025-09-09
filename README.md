# 영화의전당 홈페이지

## 프로젝트 소개

기존 '영화의 전당' 홈페이지는 콘텐츠에 비해 UI/UX가 낙후되어 있어, 영화라는 주제에 어울리지 않는 혼란스러운 구조를 가지고 있었습니다. 이에 따라 정보 전달력과 사용성을 높이기 위해 전체 디자인을 리디자인하고,
모바일 GNB 토글, 슬라이드 배너, 스크롤 시 상단 고정 메뉴, 키워드 롤링 애니메이션, 인터섹션 옵저버 캐러셀, 그리고 달력 기능 등 다양한 UI/UX 중심 기능을 직접 구현했습니다.

## 제작 목적

HTML, CSS, JavaScript만으로 영화관 홈페이지 전반 기능 구현

사용자 인터랙션 및 반응형 웹 경험 축적

스크롤 이벤트, 슬라이더, 인터섹션 옵저버, 달력 등 다양한 기능 구현

사용자 경험을 고려한 UI/UX 기능 직접 개발

## 사용 기술

HTML

CSS (Flexbox 및 반응형 레이아웃)

JavaScript (Vanilla JS)

## 주요 기능

### 캐러셀 아이템 화면 진입 시 활성화 클래스 적용

<img width="450" height="450" alt="image" src="https://github.com/user-attachments/assets/d2aaf561-c558-4cc2-9685-7869d9969ecb" />


- **`IntersectionObserver`**로 카드가 60% 이상 보이면 `active` 클래스 추가

- 카드 클릭 시 부드럽게 해당 카드로 스크롤 이동

- 활성 카드 강조 및 클릭 이동으로 사용자 경험 개선



### 캘린더 기능



- 현재 연도와 월을 기준으로 달력 렌더링
 
- 월 초 시작 요일에 맞춰 빈 칸 생성 후 날짜 출력
 
- 오늘 날짜에 `active` 클래스 적용해 강조 표시
  
- 이전/다음 버튼 클릭 시 월 이동 및 달력 자동 갱신
  

### 비평가 소개 및 비평작 렌더링

1)criticsData.js에서 비평가 정보 및 비평 작품 데이터를 불러와 사용합니다. 

비평가 데이터 

-const critic = critics[index];


https://github.com/user-attachments/assets/b611c6f0-345b-43b3-95e2-c284c13b049a



-isDown: 마우스 눌림 상태 (true=드래그 중)

-startX: 드래그 시작 시 마우스 x 위치

-scrollLeft: 드래그 시작 시 스크롤 위치

: 드래그 움직임을 계산하기 위한 기본 값

<img width="450" height="450" alt="image" src="https://github.com/user-attachments/assets/6c76da87-10c1-4289-a09b-ca304488ecd2" />

-mousedown: 마우스 눌리면 드래그 시작(isDown=true), 클래스 추가, 시작 위치(startX)와 현재 스크롤 위치(scrollLeft) 저장

-mouseleave, mouseup: 마우스 떼거나 영역 벗어나면 드래그 끝(isDown=false), 클래스 제거

-mousemove: 드래그 중이면 이동 거리 계산(walk), 스크롤 위치를 시작 위치에서 이동 거리만큼 조정

: 마우스 드래그로 컨테이너 안 내용을 좌우로 부드럽게 스크롤하는 기능

<img width="450" height="450" alt="image" src="https://github.com/user-attachments/assets/c95c8f57-9f2f-4c16-827c-b1f1edf4047c" />

-alwaysDraggableContainers: PC와 모바일 비평 작품 리스트 컨테이너를 선택해 배열에 저장

-forEach로 존재하는 각 컨테이너에 드래그 스크롤 기능(enableDragScroll) 적용

-criticsContainer: 비평가 목록 컨테이너들을 선택

-criticDragApplied: 태블릿용 드래그 기능 적용 여부를 체크하는 플래그

-applyCriticDragIfTablet 함수: 화면 너비가 1024px 이하일 때 비평가 목록에 드래그 스크롤 기능을 적용


: PC/모바일 리스트는 항상 드래그 가능하고, 비평가 목록은 태블릿 이하에서만 드래그 가능하게 제어

회고

-이 프로젝트로 순수 JavaScript를 활용해 다양한 UI 기능과 인터랙션을 직접 구현하며 프론트엔드 실력을 크게 향상시켰습니다. 스크롤에 따른 메뉴 고정, 슬라이드, 무한 롤링 애니메이션, 그리고 동적 캘린더와 데이터 기반 콘텐츠 렌더링까지 경험하며 실무 감각을 익혔습니다. 특히 Intersection Observer와 마우스 드래그 기능으로 사용자 경험을 높이는 방법을 배웠습니다. 실제 웹사이트에 필요한 기능들을 한 프로젝트에서 체계적으로 다룰 수 있었던 뜻깊은 시간이었습니다.

프로젝트 링크

🔗 배포된 사이트 바로가기(http://jedongkim.dothome.co.kr/)
