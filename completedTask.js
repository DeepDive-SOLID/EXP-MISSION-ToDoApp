import { addEl } from "./element.js";

// 완료된 태스크 아래로 옮기는 함수
export const renderCompletedTasks = (todos) => {
    // .completedTaskContainer라는 클래스를 가진 요소를 찾아서 container 변수에 저장
    const container = document.querySelector(".completedTaskContainer");
    // 중복 생성 방지를 위해 화면 초기화
    container.innerHTML = "";

    // complete: true인 항목을 completed 베열에 넣기
    const completed = todos.filter(item => item.complete);

    // 배열을 하나씩 순회하면서 item이라는 이름으로 꺼내옴
    completed.forEach(item => {
        // div, className 만든다
        const taskItem = addEl("div", "completedTaskItem");
        const titleDiv = addEl("div", "completedTaskTitle");
        // 완료된 항목에 하이픈 처리
        titleDiv.innerHTML = `<del>${item.title || "(제목 없음)"}</del>`;

        const dateDiv = addEl("div", "completedTaskDate", item.date);

        taskItem.appendChild(titleDiv);
        taskItem.appendChild(dateDiv);
        container.appendChild(taskItem);
    });
};



// backLogContainer에 마우스 hover 이벤트 설정
// export const moveCheckEvent = (backLogContainer, items) => {
//     backLogContainer.addEventListener("mouseenter", () => {
//         // 이미 .move-btn이 있는 경우 중복 생성을 막기 위해 함수 종료
//         if (backLogContainer.querySelector(".move-btn")) return;
        
//         // 우선 "이동" 버튼으로 생성
//         const moveBtn = document.createElement("button");
//         moveBtn.classList.add("move-btn");
//         moveBtn.innerText = "이동";
    
//         moveBtn.addEventListener("click", () => {
//             // 버튼 클릭 시 moveCheck = true로 변경
//             items.moveCheck = true;
//             console.log("moveCheck:", items);
//         });
        
//         // 이동 버튼을 backLogContainer에 추가함
//         backLogContainer.appendChild(moveBtn);
//     });

//     // 마우스가 backLogContainer에서 벗어났을 때 이벤트
//     backLogContainer.addEventListener("mouseleave", () => {
//         // .move-btn이 있는지 확인 후 있다면 제거
//         const btn = backLogContainer.querySelector(".move-btn");
//         if (btn) btn.remove();
//     });
// };