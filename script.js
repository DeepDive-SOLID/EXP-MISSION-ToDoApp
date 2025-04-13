const checkList = document.querySelector(".currentTaskContainer");
let todos = [];

// 본문 렌더링 -> 옮기기 버튼 클릭 시 렌더링
const todoBody = () => {
  // dump data -> 합칠 때 제거 예정
  const item = [
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

  todos.unshift(...item);

  todos.forEach((todo) => {
    if (todo.moveCheck && !todo.complete) {
      const { itemEl } = addTodoBodyElement(todo);
      checkList.prepend(itemEl);
    }
  });
};

// body 요소 그리기
const addTodoBodyElement = (item) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("mainTaskEx");

  // 제목과 date 요소 기본 text와 input 두개 생성
  const titleEl = document.createElement("span");
  titleEl.className = "mainTaskName";
  titleEl.innerText = item.title;

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = item.title;
  titleInput.style.display = "none";

  const dateEl = document.createElement("span");
  dateEl.className = "taskDueDate";
  dateEl.innerText = item.date;

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = item.date;
  dateInput.style.display = "none";

  const actionsEl = document.createElement("div");
  actionsEl.classList.add("taskButtons");

  const modBtnEl = document.createElement("button");
  modBtnEl.className = "edit";
  modBtnEl.innerText = "수정";

  const viewTaskBtnEl = document.createElement("button");
  viewTaskBtnEl.classList = "toggleSubtask";
  viewTaskBtnEl.innerText = "▼";

  itemEl.append(titleEl);
  itemEl.append(titleInput);
  itemEl.append(dateEl);
  itemEl.append(dateInput);
  itemEl.append(actionsEl);
  actionsEl.append(modBtnEl);
  actionsEl.append(viewTaskBtnEl);

  addEventListeners({ itemEl, titleEl, titleInput, dateEl, dateInput, modBtnEl, viewTaskBtnEl }, item);
  return { itemEl };
};

// 이벤트 함수
const addEventListeners = ({ itemEl, titleEl, titleInput, dateEl, dateInput, modBtnEl, viewTaskBtnEl }, item) => {
  // title, date 수정 모드 체크
  let isEditing = false;
  modBtnEl.addEventListener("click", () => {
    // 수정 버튼 클릭 시
    if (!isEditing) {
      isEditing = true;
      modBtnEl.innerText = "저장";

      titleEl.style.display = "none";
      titleInput.style.display = "inline";

      dateEl.style.display = "none";
      dateInput.style.display = "inline";

    // 저장 버튼 클릭 시
    } else {
      isEditing = false;
      modBtnEl.innerText = "수정";

      const newTitle = titleInput.value;
      const newDate = dateInput.value;

      titleEl.innerText = newTitle;
      dateEl.innerText = newDate;

      titleEl.style.display = "inline";
      titleInput.style.display = "none";

      dateEl.style.display = "inline";
      dateInput.style.display = "none";

      item.title = titleInput.value;
      item.date = dateInput.value;

      saveToLocalStorage();
    }
  });
};

todoBody();


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

