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

// 하위태스크 접기/펼치기
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggleSubtask");
  const subtaskContainer = document.querySelector(".subtaskContainer");

  toggleBtn.addEventListener("click", () => {
    subtaskContainer.classList.toggle("hidden");

    toggleBtn.textContent = subtaskContainer.classList.contains("hidden")
      ? "▼"
      : "▲";
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
