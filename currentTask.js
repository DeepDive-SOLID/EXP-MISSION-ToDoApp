import { initCurrentTaskEvents } from './initEventListeners.js';

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
  wrapper.dataset.id = todo.id;

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

  const subtaskContainer = addEl("div", "subtaskContainer hidden");
  const addBtn = addEl("button", "addSubtaskBtn", "+");
  subtaskContainer.appendChild(addBtn);

  wrapper.append(container, subtaskContainer);
  initCurrentTaskEvents({ titleSpan, titleInput, dateSpan, dateInput, modBtnEl, TaskBtnEl, todo });

  return wrapper;
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
};

export { checkListBody, finishEdit };