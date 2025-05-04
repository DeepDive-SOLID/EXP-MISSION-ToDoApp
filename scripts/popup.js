// popup.js
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

    // ✅ ESC 키 눌렀을 때 팝업 닫기
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            hidePopup();
        }
    });
}
