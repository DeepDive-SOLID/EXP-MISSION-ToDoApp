const searchBtn = document.querySelector(".searchButton");
const backLogList = document.querySelector(".backlogScrollArea");
let todos = [];

// 백로그 렌더링에 배치
const backBody = (keyword) => {
  const filtered = keyword ? todos.filter((todo) => todo.title.includes(keyword)) : todos;
  backLogList.innerHTML = "";
  filtered.forEach((todo) => {
    const { itemEl } = addTodoBodyElement(todo);
    backLogList.prepend(itemEl);
  });
};

// 이벤트 함수
const addEventListeners = ({ itemEl, titleEl, titleInput, dateEl, dateInput, modBtnEl, viewTaskBtnEl }, item) => {
  // 검색 버튼 클릭시
  searchBtn.addEventListener("click", () => {
    const keyword = document.querySelector(".searchBar").value.trim();
    backBody(keyword);
  });
};

