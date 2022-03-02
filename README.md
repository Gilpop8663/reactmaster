## 배포 주소

## <a href="https://gilpop8663.github.io/reactmaster/">배포 사이트</a>

## 회고록

## <a href="https://hell-of-company-builder.tistory.com/237">블로그 회고록</a>

## 💻 설치 방법

    yarn install or npm install

    npm start

## 📂 파일 구조

src  
 ┣ Components  
 ┃ ┣ BannerScreen.tsx  
 ┃ ┣ ClickMovie.tsx  
 ┃ ┣ Footer.tsx  
 ┃ ┣ Header.tsx  
 ┃ ┗ NowMovies.tsx  
 ┣ Routes  
 ┃ ┣ Home.tsx  
 ┃ ┣ Search.tsx  
 ┃ ┗ Tv.tsx  
 ┣ api  
 ┃ ┗ api.ts  
 ┣ constant  
 ┃ ┗ constants.ts  
 ┣ styles  
 ┃ ┣ globalStyle.ts  
 ┃ ┣ styled.d.ts  
 ┃ ┗ theme.ts  
 ┣ utils  
 ┃ ┗ utils.ts  
 ┣ App.tsx  
 ┣ index.tsx  
 ┗ react-app-env.d.ts

---

## 📋프로젝트 사진

## 메인 화면

<img src="https://user-images.githubusercontent.com/80146176/147284354-96f4cb18-ce6e-4e52-b978-a59f13363754.png" alt="메인"/>

---

## 상세 정보 화면

<img src="https://user-images.githubusercontent.com/80146176/147284208-e826fa46-c54c-42ea-87fc-cae8764efa80.png" alt="상세 정보 1"/>
<img src="https://user-images.githubusercontent.com/80146176/156327396-de128102-8a32-4ea3-a0f6-6249e7e1744b.png" alt="상세 정보 2"/>

---

## 검색 화면

<img src="https://user-images.githubusercontent.com/80146176/147284258-ab5a6565-90e1-4d31-91d7-0fb17e411c79.png" alt="검색"/>

---

## 📝 기능

### Framer Motion을 이용한 애니메이션 구현

- Framer Motion 라이브러리를 사용하여 슬라이더 , 모달 창 , 로고 등에 부드러운 애니메이션을 구현했습니다.

### React-Query를 사용하여 API 통신 기능 구현

- React-Query를 사용하여 22개의 API 키를 통신하여 데이터를 얻었습니다.
- 검색 시 사용자의 검색 키워드를 매개변수로 받아서 API 키에 입력했습니다.

### React-router-dom을 활용하여 한번 받은 API 값을 디테일 페이지로 전달

- React-router-dom의 useLocation , useMatch 등을 이용해서 URL이 변할 때 기존의 api 값의 데이터를 보내 사용자가 기존의 데이터로 먼저 화면을 볼 수 있게 하였고 그동안 상세정보 API를 통신하여 화면에 표시하였습니다.

### 다른 상황에서 비슷한 디자인을 가진 컴포넌트를 재사용 컴포넌트로 만들어서 사용

- 영화 혹은 TV 에서 상세 정보 화면에서 비슷한 영화나 TV를 추천해주는 기능이 있습니다. 비슷한 영화를 누르면 똑같은 레이아웃으로 사용자에 화면에 표시해주도록 하였습니다.
