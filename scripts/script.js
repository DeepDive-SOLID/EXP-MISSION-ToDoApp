import { highlightUrgentTasks, initBackLogButtons } from "./initEventListeners.js";
import { sortTodos } from "./backlogTask.js";
import { checkListBody } from "./currentTask.js";
import { renderInitialSubTasks } from "./subTask.js";
import { renderCompletedTasks } from "./completedTask.js";
import { mypageModal } from "./mypage.js";
import { saveToBackUpStorage, loadToBackUpStorage } from "./backUplist.js";
import { modalBacklogListBody } from './modalBackLog.js';


let todos = [];

// localStorage에 List 저장
const saveToLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todos));
};

// 리로드 했을 시 localStorage에 todoList 가 있다면 불러와서 JSON 형태로 만든 후 todos 에 초기화
const loadLocalStorage = () => {
  const data = localStorage.getItem("todoList");
  if (data) {
    todos = JSON.parse(data);
  }
};

// 처음 로드 되었을 때 localStorage 를 확인 후 있다면 todoList를 생성
const displayTodoList = () => {
  loadLocalStorage();
  loadToBackUpStorage();
  sortTodos();
  highlightUrgentTasks();
};
// initEventListener 에서 import 한 todo는 상수 취급을 하기에 todo 삭제 불가능
const todoDelete = (items) => {
  todos = todos.filter((item) => item.id !== items.id);
  saveToLocalStorage();
};

// 완료태스크 삭제 기능
const completeDelete = (items) => {
  todos = todos.filter((item) => item.id !== items.id);
  saveToLocalStorage();
  saveToBackUpStorage(items);
}

document.addEventListener("DOMContentLoaded", () => {
  // 초기 렌더링 시 localStorage 에 있는 데이터를 렌더링
  displayTodoList();
  initBackLogButtons();
  // currentTask.js의 함수
  checkListBody(); // 메인 태스크 렌더링

  // subTask.js의 함수
  renderInitialSubTasks(); // 하위 태스크 그리기
  // completedTask.js의 함수
  renderCompletedTasks(todos);

  // mypage.js의 함수
  mypageModal();
  // modalProfileBackLog.js의 함수
  modalBacklogListBody();
});

export { todoDelete, todos, saveToLocalStorage, displayTodoList, completeDelete };
