const checkList = document.querySelector(".currentScrollArea");
const todos = JSON.parse(localStorage.getItem("todoList"));

// localStorage에 List 저장
const saveToLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todos));
};

// 본문 렌더링
const checkListBody = () => {
  todos
      .filter(todo => todo.moveCheck && !todo.complete)
      .forEach(todo => checkList.appendChild(addCheckListBodyElement(todo)));
};

// El 생성
const addEl = (tag, className = "", text = "") => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.innerText = text;
  return el;
};

// body 요소 그리기
const addCheckListBodyElement = (todo) => {

  const wrapper = addEl("div", "currentTaskWrapper");
  const container = addEl("div", "currentTaskContainer");
  const mainTask = addEl("div", "mainTaskEx");

  // 제목과 date 요소 기본 text와 input 두개 생성
  const titleSpan = addEl("span", "mainTaskName", todo.title);
  const titleInput = addEl("input");
  titleInput.type = "text";
  titleInput.value = todo.title;
  titleInput.style.display = "none";

  const dateSpan = addEl("span", "taskDueDate", todo.date);
  const dateInput = addEl("input");
  dateInput.type = "date";
  dateInput.value = todo.date;
  dateInput.style.display = "none";

  mainTask.append(titleSpan, titleInput, dateSpan, dateInput);

  const buttons = addEl("div", "taskButtons");
  const modBtnEl = addEl("button", "edit", "✎");
  const TaskBtnEl = addEl("button", "toggleSubtask", "▼");
  buttons.append(modBtnEl, TaskBtnEl);

  container.append(mainTask, buttons);
  wrapper.append(container);
  addEventListeners({ titleSpan, titleInput, dateSpan, dateInput, modBtnEl, TaskBtnEl, todo });
  return wrapper;
};

// 이벤트 함수
const addEventListeners = ({ titleSpan, titleInput, dateSpan, dateInput, modBtnEl, TaskBtnEl, todo }) => {
  // title, date 수정 모드 체크
  let isEditing = false;

  // 수정 버튼 클릭 시
  modBtnEl.addEventListener("click", (e) => {
    e.stopPropagation();
    isEditing = true;
    titleInput.style.display = "inline";
    dateInput.style.display = "inline";
    titleSpan.style.display = "none";
    dateSpan.style.display = "none";

    titleInput.style = "display: inline; padding: 8px; border-radius: 8px; border: 1px solid #ccc; font-size: 14px; width: 90%; margin-bottom: 6px;";
    dateInput.style = "display: inline; padding: 6px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px;";

    titleInput.focus();
  });

  // 외부 클릭 시 수정 종료
  document.addEventListener("click", (e) => {
    if (!isEditing) return;
    if (e.target !== titleInput && e.target !== dateInput && e.target !== modBtnEl) {
      finishEdit({ isEditing, titleSpan, titleInput, dateSpan, dateInput, todo });
    }
  });

  // 엔터 시 저장
  titleInput.addEventListener("keydown", (e) => {
     if (e.key === "Enter") finishEdit({ isEditing, titleSpan, titleInput, dateSpan, dateInput, todo });
  });

  dateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishEdit({ isEditing, titleSpan, titleInput, dateSpan, dateInput, todo });
  })

  // 하위태스크 접기/펼치기
  TaskBtnEl.addEventListener("click", (e) => {

    const wrapper = e.target.closest(".currentTaskWrapper");
    const subtaskContainer = wrapper.querySelector(".subtaskContainer");
    subtaskContainer.classList.toggle("hidden");

    e.target.textContent = subtaskContainer.classList.contains("hidden")
      ? "▼"
      : "▲";

    if (!subtaskContainer.classList.contains("hidden")) {
      subtaskContainer.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  });

};

// 수정 완료시 적용
const finishEdit = ({ isEditing, titleSpan, titleInput, dateSpan, dateInput, todo }) => {
  if (!isEditing) return;

  titleSpan.innerText = titleInput.value;
  dateSpan.innerText = dateInput.value;

  titleInput.style.display = "none";
  dateInput.style.display = "none";
  titleSpan.style.display = "inline";
  dateSpan.style.display = "inline";

  todo.title = titleInput.value;
  todo.date = dateInput.value;
  saveToLocalStorage();
  isEditing = false;
};

// 하위태스크 접기/펼치기 토글
//const initToggleSubtasks = () => {
//  document.body.addEventListener("click", (e) => {
//    if (e.target.classList.contains("toggleSubtask")) {
//      const toggleBtn = e.target;
//      const wrapper = toggleBtn.closest(".currentTaskWrapper");
//      const subtaskContainer = wrapper.querySelector(".subtaskContainer");
//
//      subtaskContainer.classList.toggle("hidden");
//
//      toggleBtn.textContent = subtaskContainer.classList.contains("hidden")
//        ? "▼"
//        : "▲";
//
//      if (!subtaskContainer.classList.contains("hidden")) {
//        subtaskContainer.scrollIntoView({
//          behavior: "smooth",
//          block: "nearest"
//        });
//      }
//    }
//  });
//};

export default checkListBody;