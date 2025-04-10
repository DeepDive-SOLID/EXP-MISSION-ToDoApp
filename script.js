// 코드 테스트를 위한 데이터 하드코딩
// const data = [
//     {
//         id: 1,
//         title: "첫 번째 할 일",
//         importance: 1,
//         moveCheck: false,
//         complete: false,
//         date: "2025-04-07",
//         list: [
//             { id: 101, text: "", check: false },
//             { id: 102, text: "", check: false }
//         ]
//     },
//     {
//         id: 2,
//         title: "두 번째 할 일",
//         importance: 2,
//         moveCheck: false,
//         complete: false,
//         date: "2025-04-08",
//         list: [
//             { id: 201, text: "", check: false },
//             { id: 202, text: "", check: false }
//         ]
//     }
// ];


// 할 일 항목들을 넣기 위해 todo-container라는 div를 가져옴
const container = document.getElementById("todo-container");

// data 배열의 각 요소 todo(각 항목당)에 대한 반복 작업
data.forEach((todo) => {

    // 각 todo 항목을 todoDiv로 설정
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";
    todoDiv.innerHTML = `
    <strong>${todo.title}</strong><br>
    날짜: ${todo.date}
    `;

    // 마우스 올렸을 때 버튼 생성
    todoDiv.addEventListener("mouseenter", () => {

        // 이미 버튼이 있다면 또 만들지 않고 return. 버튼 중복 생성을 막음
        if (todoDiv.querySelector(".move-btn")) return;

        // 새 버튼 생성 (임시로 텍스트 "이동"으로 설정)
        const moveBtn = document.createElement("button");
        moveBtn.textContent = "이동";
        moveBtn.className = "move-btn";
    
        // 이동 버튼 클릭 시 moveCheck = true로 바뀜
        moveBtn.addEventListener("click", () => {
            todo.moveCheck = true;
            console.log(todo);
        });
    
        // 만들어진 버튼을 todoDiv(각 todo 항목)에 붙여 화면에 보여준다
        todoDiv.appendChild(moveBtn);
    });

    // 마우스 벗어날 때 버튼 제거
    todoDiv.addEventListener("mouseleave", () => {
        // move-btn 클래스를 가진 버튼이 있는지 확인하고, 있다면 DOM에서 완전히 제거
        const btn = todoDiv.querySelector(".move-btn");
        if (btn) btn.remove();
    });

    // 할 일 항목(todoDiv)을 전체 컨테이너에 추가
    container.appendChild(todoDiv);
});


// 완료된 태스크 아래로 옮기는 함수
const renderCompletedTasks = () => {
    // .completedTaskContainer라는 클래스를 가진 요소를 찾아서 container 변수에 저장
    const container = document.querySelector(".completedTaskContainer");
    // 중복 생성 방지를 위해 화면 초기화
    container.innerHTML = "";

    // complete: true인 항목을 completed 베열에 넣기
    const completed = data.filter(item => item.complete);

    // 배열을 하나씩 순회하면서 item이라는 이름으로 꺼내옴
    completed.forEach(item => {
        // div, className 만든다
        const taskItem = document.createElement("div");
        taskItem.className = "completedTaskItem";

        // 완료된 항목에 하이픈 처리
        const titleDiv = document.createElement("div");
        titleDiv.className = "completedTaskTitle";
        titleDiv.innerHTML = `<del>${item.title || "(제목 없음)"}</del>`;
        
        const dateDiv = document.createElement("div");
        dateDiv.className = "completedTaskDate";
        dateDiv.textContent = item.date;
        
        taskItem.appendChild(titleDiv);
        taskItem.appendChild(dateDiv);
        container.appendChild(taskItem);
    });
};

renderCompletedTasks();