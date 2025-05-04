# EXP-MISSION-ToDoApp

## 기능 개선 내역 및 변경 사항
📂 폴더 구조 변경 요약
```
/scripts
  ├── script.js       # 메인 로직
  └── popup.js        # 팝업 모듈 분리
/css
  ├── style.css       # 기본 스타일
  └── darkMode.css    # 다크모드 스타일
/images
  └── profile.png     # 프로필 이미지
─ index.html          # 팝업 및 레이아웃 보완

```
---
1. 프로필 이미지 추가
   - 헤더 오른쪽에 profile.png를 추가하여 사용자 인터페이스 개선.
   - 클릭 시 사용자 설정 팝업을 띄우도록 기능 구현.
---
2. 프로필 UI 및 동작 구현
   1) profile-popup 클래스를 가진 팝업 요소 추가
      ```
      <div class="profile-popup hidden">
            <!-- 나영님 팝업 html 추가 -->
        </div>
      ```
   2) 외부 클릭 또는 ESC 키 입력 시 팝업 자동 닫힘
      ```
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          hidePopup();
        }
      });
      ```
   3) 프로필 이미지 배치 및 자연스러운 효과
      ```
      .header {
          position: relative;
          height: 60px;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          border-bottom: 1px solid #ddd;
      }

      .profile-image {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s ease;
      }

      .profile-image:hover {
          transform: scale(1.1);
      }
      ```
---
3. 팝업 전용 JavaScript 모듈 추가 (popup.js)
    - 팝업 동작을 전담하는 popup.js 모듈 작성
      ```
            export function initProfilePopup() {
             const profileImg = document.querySelector(".profile-image");
             const popup = document.querySelector(".profile-popup");

             if (!profileImg || !popup) return;

             const showPopup = () => {
                 popup.classList.remove("hidden");
                 // 브라우저 렌더링 이후에 클래스 추가해야 transition 적용됨
                 requestAnimationFrame(() => {
                     popup.classList.add("visible");
                 });
             };

             const hidePopup = () => {
                 popup.classList.remove("visible");
                 // transition 끝난 후 display: none 처리
                 setTimeout(() => {
                     popup.classList.add("hidden");
                 }, 200); // transition 시간과 동일
             };

             profileImg.addEventListener("click", () => {
                 if (popup.classList.contains("hidden")) {
                     showPopup();
                 } else {
                     hidePopup();
                 }
             });

             document.addEventListener("click", (e) => {
                 if (!profileImg.contains(e.target) && !popup.contains(e.target)) {
                     hidePopup();
                 }
             });

             // ESC 키 눌렀을 때 팝업 닫기
             document.addEventListener("keydown", (e) => {
                 if (e.key === "Escape") {
                     hidePopup();
                 }
             });
            }

      ```
      - initProfilePopup() 함수로 초기화
        ```
        // script.js
         import { initProfilePopup } from "./popup.js";
         document.addEventListener("DOMContentLoaded", () => {
           initProfilePopup();
         });
        ```
4. 팝업 css 스타일링
   - 정중앙 배치: position: fixed + transform
   - 애니메이션 효과: opacity와 scale 활용
   - .visible, .hidden 클래스를 통해 열기/닫기 전환
     ```
     /* 팝업 스타일 */
      .profile-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9); /* 처음에 살짝 작게 */
          opacity: 0; /* 처음엔 투명하게 */
          transition: transform 0.2s ease, opacity 0.2s ease; /* 부드럽게 변화 */
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          padding: 20px;
          z-index: 100;
          min-width: 200px;
          text-align: center;
          pointer-events: none; /* 안 보일 땐 클릭도 차단 */
      }
      ```
   - .dark-mode 클래스 감지 시 다크모드 스타일 적용
     ```
     /* 팝업 다크모드 */
      .dark-mode .profile-popup {
          background-color: #1e1e1e;
          color: #f1f1f1;
          border: 1px solid #444;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }
      ```

---
5. 헤더 레이아웃 변경
   - 기존 다크모드 토글 영향으로 헤더에서 프로필이 우측으로 붙지 않는 문제점
     - 기존 코드
        ```
        <header class="header">
             <input type="checkbox" id="toggle" hidden />
             <label for="toggle" class="toggleSwitch">
                 <span class="toggleButton"></span>
             </label>
             <h2 class="title">No More Tomorrow Me🔥</h2>
         </header>
   
        ```
     - 변경 후
        ```
       <header class="header">
            <div class="header-left">
                <input type="checkbox" id="toggle" hidden />
                <label for="toggle" class="toggleSwitch">
                    <span class="toggleButton"></span>
                </label>
            </div>
            <h2 class="title">No More Tomorrow Me🔥</h2>
            <img
                src="./images/profile.png"
                alt="Profile"
                class="profile-image"
            />
        </header>
        ```
