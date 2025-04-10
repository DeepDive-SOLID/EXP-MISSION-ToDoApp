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


// backLogContainer에 마우스 hover 이벤트 설정
export const moveCheckEvent = (backLogContainer, items) => {
    backLogContainer.addEventListener("mouseenter", () => {
        // 이미 .move-btn이 있는 경우 중복 생성을 막기 위해 함수 종료
        if (backLogContainer.querySelector(".move-btn")) return;
        
        // 우선 "이동" 버튼으로 생성
        const moveBtn = document.createElement("button");
        moveBtn.classList.add("move-btn");
        moveBtn.innerText = "이동";
    
        moveBtn.addEventListener("click", () => {
            // 버튼 클릭 시 moveCheck = true로 변경
            items.moveCheck = true;
            console.log("moveCheck:", items);
        });
        
        // 이동 버튼을 backLogContainer에 추가함
        backLogContainer.appendChild(moveBtn);
    });
  
    // 마우스가 backLogContainer에서 벗어났을 때 이벤트
    backLogContainer.addEventListener("mouseleave", () => {
        // .move-btn이 있는지 확인 후 있다면 제거
        const btn = backLogContainer.querySelector(".move-btn");
        if (btn) btn.remove();
    });
  };


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