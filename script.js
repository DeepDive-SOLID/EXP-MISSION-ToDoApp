let todos = [
    {
          id: 1,
          title: "첫 번째 항목",
          importance: 1,
          moveCheck: true,
          complete: false,
          date: "2025-04-07",
          list: [
            { id: 101, text: "할 일 1", check: false },
            { id: 102, text: "할 일 2", check: true },
          ],
        },
        {
          id: 2,
          title: "두 번째 항목",
          importance: 1,
          moveCheck: true,
          complete: true,
          date: "2025-04-08",
          list: [
            { id: 201, text: "할 일 A", check: true },
            { id: 202, text: "할 일 B", check: false },
          ],
        },
        {
          id: 3,
          title: "세 번째 항목",
          importance: 1,
          moveCheck: true,
          complete: false,
          date: "2025-04-09",
          list: [
            { id: 201, text: "할 일 A", check: true },
            { id: 202, text: "할 일 B", check: false },
          ],
        },
    ];

// LocalStorage 생성
const addLocalStorage = () => {
  const data = JSON.stringify(todos);
  localStorage.setItem("todoList", data);
};

// localStorage 생성
addLocalStorage();

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

