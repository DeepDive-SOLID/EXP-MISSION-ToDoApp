import { checkListBody } from './currentTask.js';
import { renderInitialSubTasks } from './subTask.js';

let todos = [
    {
            id: "1",
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
            id: "2",
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
            id: "3",
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

// localStorage에 List 저장
const saveToLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", () => {
    // localStorage 생성
    //  addLocalStorage();

    // currentTask.js의 함수
    checkListBody(); // 메인 태스크 렌더링

    // subTask.js의 함수
    renderInitialSubTasks();    // 하위 태스크 그리기

    // completedTask.js의 함수
    renderCompletedTasks(data);

});

export { todos, saveToLocalStorage };
