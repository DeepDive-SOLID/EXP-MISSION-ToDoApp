// const data = [
//     {
//       id: 1,
//       title : "",
//       importance: 1         // 중요도 체크
//       moveCheck: true,  // 본문이동 체크
//       complete : false,    // 완료 체크(아래로 내려갈지)
//       date: "2025-04-07",
//       list: [
//         {
//           id: 101,
//           text: "할 일 1",
//           check: false
//         },

//           id: 102,
//           text: "할 일 2",
//           check: true
//         }
//       ]
//     }
//   ];

// 하위태스크 접기/펼치기 토글
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtns = document.querySelectorAll(".toggleSubtask");

  toggleBtns.forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", () => {
      const wrapper = toggleBtn.closest(".currentTaskWrapper");
      const subtaskContainer = wrapper.querySelector(".subtaskContainer");

      subtaskContainer.classList.toggle("hidden");

      toggleBtn.textContent = subtaskContainer.classList.contains("hidden")
        ? "▼"
        : "▲";

      // 펼쳐질 경우 자동 스크롤
      if (!subtaskContainer.classList.contains("hidden")) {
        subtaskContainer.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    });
  });
});


// 중요도 선택지 
document.querySelectorAll(".importanceDropdown").forEach((dropdown) => {
  const selected = dropdown.querySelector(".selected");
  const options = dropdown.querySelector(".dropdownOptions");

  selected.addEventListener("click", () => {
    options.classList.toggle("hidden");
  });

  options.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerHTML = option.innerHTML;
      options.classList.add("hidden");
    });
  });
});

// 다크모드
document.addEventListener("DOMContentLoaded", () => {
  const toggleCheckbox = document.getElementById("toggle");

  toggleCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", toggleCheckbox.checked);
  });
});

// 종료일 마감 임박시 이벤트
const highlightUrgentTasks = () => {
    const today = new Date();
    const tasks = document.querySelectorAll('.maintaskContainer');
  
    tasks.forEach(task => {
      const dateInput = task.querySelector('.finishDateContent');
      if (dateInput && dateInput.value) {
        const dueDate = new Date(dateInput.value);
  
        // 시/분/초 제거하여 날짜만 비교
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const dueOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  
        const diffTime = dueOnly - todayOnly;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
        // 조건에 따라 색상 설정
        if (diffDays <= 1 && diffDays >= 0) {
          task.style.backgroundColor = '#ffe0e9'; // 연핑크: 당일 ~ 1일 전
        } else if (diffDays === 2 || diffDays === 3) {
          task.style.backgroundColor = '#fff7cc'; // 연노랑: 2~3일 전
        } else {
          task.style.backgroundColor = ''; // 기본값
        }
      }
    });
  };
  
  // 페이지 로드 및 변경 시 실행
  window.addEventListener('DOMContentLoaded', highlightUrgentTasks);
  document.addEventListener('change', highlightUrgentTasks);
  
