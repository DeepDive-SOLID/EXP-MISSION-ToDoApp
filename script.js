let todos = [];

// 전체 backlog 리스트를 담을 div DOM
const backLogList = document.querySelector(".backlogScrollArea");
const addTask = document.querySelector(".addTask");

// addTask 버튼을 누를 시 이벤트 발생
addTask.addEventListener("click", () => {
  createTask();
});

// 기본 데이터 셋에 날짜를 현재 날짜로 만들기 위함
const year = new Date().getFullYear();
const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
const day = ("0" + new Date().getDate()).slice(-2);
const today = `${year}-${month}-${day}`;

// 새로운 Task 생성
const createTask = () => {
  // items(todo) 의 기본 데이터 구조
  const items = {
    // 일단 id를 고유한 new Date()로 나둠
    id: new Date(),
    title: "",
    moveCheck: false,
    complet: false,
    // 중요도도 데이터에 필요한 것 같음 기본적으로 (하)를 부여 ( 1 = 상, 2 = 중, 3 = 하)
    importance: 3,
    date: today,
    list: [],
  };
  todos.unshift(items);
  const { backLogContainer } = newElement(items);
  backLogList.prepend(backLogContainer);
};

// backLog 중요도 ( 상 중 하 ) 컨테이너 생성 함수
const importanceContainer = (items) => {
  const importanceDropdown = document.createElement("div");
  importanceDropdown.classList.add("importanceDropdown");

  const selected = document.createElement("div");
  selected.classList.add("selected");

  const selectedCircle = document.createElement("span");
  selectedCircle.classList.add("circle");

  const label = document.createElement("span");
  label.classList.add("label");
  // 처음 생성 시 중요도는 (하) 고정
  label.innerText = "하";
  selectedCircle.classList.add("low");

  const dropdownOptions = document.createElement("ul");
  dropdownOptions.classList.add("dropdownOptions");
  dropdownOptions.classList.add("hidden");

  const liOne = document.createElement("li");
  liOne.dataset.value = 1;
  liOne.innerHTML = `<span class="circle high"></span> 상`;

  const liTwo = document.createElement("li");
  liTwo.dataset.value = 2;
  liTwo.innerHTML = `<span class="circle medium"></span> 중`;

  const liThree = document.createElement("li");
  liThree.dataset.value = 3;
  liThree.innerHTML = `<span class="circle low"></span> 하`;

  dropdownOptions.appendChild(liOne);
  dropdownOptions.appendChild(liTwo);
  dropdownOptions.appendChild(liThree);

  selected.appendChild(selectedCircle);
  selected.appendChild(label);

  eventListener.clickImportant(selected, dropdownOptions);
  eventListener.changeImportant(dropdownOptions, label, selectedCircle, items);

  importanceDropdown.appendChild(selected);
  importanceDropdown.appendChild(dropdownOptions);

  return { importanceDropdown };
};

// 달력 컨테이너 생성 함수
const DateContainer = (items) => {
  const finishDateContainer = document.createElement("div");
  finishDateContainer.classList.add("finishDateContainer");

  const finishDateContent = document.createElement("input");
  finishDateContent.type = "date";
  finishDateContent.classList.add("finishDateContent");
  // todo list 특성 (오늘기준) 이전 날짜를 허용 안하기 위함
  finishDateContent.min = items.date;
  eventListener.changeDate(finishDateContent, items);

  finishDateContainer.appendChild(finishDateContent);

  return { finishDateContainer, finishDateContent };
};

// 새로운 Task Element 생성 함수
const newElement = (items) => {
  const { importanceDropdown } = importanceContainer(items);
  const { finishDateContainer, finishDateContent } = DateContainer(items);
  // 하나의 backLog 를 담을 컨테이너
  const backLogContainer = document.createElement("div");
  backLogContainer.classList.add("taskContainer");

  // backLog의 컨텐츠들을 담을 main 컨테이너
  const backLogMainContainer = document.createElement("div");
  backLogMainContainer.classList.add("maintaskContainer");
  backLogMainContainer.style.backgroundColor = dDay(items);

  // backLog taskContent를 적을 input
  const backLogTaskContent = document.createElement("input");
  backLogTaskContent.classList.add("taskContent");
  backLogTaskContent.placeholder = "오늘 할 일을 적어주세요";
  backLogTaskContent.type = "text";
  backLogTaskContent.value = items.title;
  eventListener.createTitle(backLogTaskContent, items);
  eventListener.blurContent(backLogTaskContent);

  // 수정 버튼 생성
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerText = "✎";
  eventListener.clickEdit(editBtn, backLogTaskContent, finishDateContent);

  // 삭제 버튼 생성
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerText = "🗑︎";
  eventListener.clickDelete(deleteBtn, backLogContainer, items);

  backLogMainContainer.appendChild(backLogTaskContent);
  backLogMainContainer.appendChild(importanceDropdown);
  backLogMainContainer.appendChild(editBtn);
  backLogMainContainer.appendChild(deleteBtn);
  backLogMainContainer.appendChild(finishDateContainer);

  backLogContainer.appendChild(backLogMainContainer);

  return { backLogContainer };
};

// 이벤트리스너를 모아둔 객체
const eventListener = {
  // 날짜를 변경 했을 시
  changeDate: (dateInputElement, items) => {
    dateInputElement.addEventListener("change", (e) => {
      items.date = e.target.value;
      dateInputElement.setAttribute("disabled", "");
    });
  },
  // 제목을 입력 시
  createTitle: (taskInputElement, items) => {
    taskInputElement.addEventListener("input", (e) => {
      items.title = e.target.value;
    });
  },
  // input Element에서 blur 가 발생했을 떄
  blurContent: (taskInputElement) => {
    taskInputElement.addEventListener("blur", (e) => {
      taskInputElement.setAttribute("disabled", "");
    });
  },
  // edit 버튼 클릭 시
  clickEdit: (editBtn, taskInputElement, dateInputElement) => {
    editBtn.addEventListener("click", () => {
      taskInputElement.removeAttribute("disabled");
      dateInputElement.removeAttribute("disabled");
      taskInputElement.focus();
    });
  },
  // delete 버튼 클릭 시
  clickDelete: (deleteBtn, backLogContainer, items) => {
    deleteBtn.addEventListener("click", (e) => {
      backLogList.removeChild(backLogContainer);
      todos = todos.filter((item) => item.id !== items.id);
    });
  },
  // 중요도 클릭 시
  clickImportant: (selectedElement, dropDownElement) => {
    selectedElement.addEventListener("click", () => {
      // display에 따른 3항 연산자
      dropDownElement.style.display =
        dropDownElement.style.display === "none" ? "block" : "none";
    });
  },
  // 중요도 변경 시
  changeImportant: (dropDownElement, label, selectedCircle, items) => {
    // dropDownElement ( ul ) 안에 있는 li 를 가져온다
    const importanceList = dropDownElement.querySelectorAll("li");
    importanceList.forEach((li, index) => {
      li.addEventListener("click", () => {
        // li 가 리스트 형식으로 들어오기 때문에 index 0-2 존재
        // 0 - 상, 1 - 중, 2 - 하
        items.importance = index + 1;
        dropDownElement.style.display = "none"; // 클릭 시 드롭다운 메뉴 닫기
        selectedCircle.classList.remove("low");
        selectedCircle.classList.remove("medium");
        selectedCircle.classList.remove("high");
        // 중요도 1, 2, 3 에 대해 그때에 해당하는 스타일을 보여주는 삼항 연산자
        items.importance === 1
          ? ((label.innerText = "상"), selectedCircle.classList.add("high"))
          : items.importance === 2
          ? ((label.innerText = "중"), selectedCircle.classList.add("medium"))
          : ((label.innerText = "하"), selectedCircle.classList.add("low"));
      });
    });
  },
};
