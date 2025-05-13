import { todos } from './script.js';
import { addEl } from './element.js';
const modalBacklogList = document.querySelector(".modalBacklogItem");

export const modalBacklogListBody = () => {
    modalBacklogList.innerHTML = "";
    todos
        .filter(todo => !todo.complete)
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return a.importance - b.importance;
        })
        .forEach(todo => modalBacklogList.appendChild(addModalBacklogListBodyElement(todo)));
};

// body 요소 그리기
const addModalBacklogListBodyElement = (todo) => {

    // 카드 요소 생성
    const container = addEl("div", "backlogCard");

    // 제목
    const titleSpan = addEl("p", "taskTitle", todo.title);

    // 중요도
    const importanceSpan = addEl("p", "taskImportance");
    const importanceValue = todo.importance === 1 ? "상" : todo.importance === 2 ?  "중" : "하";
    const importanceStyle = todo.importance === 1 ? "circle high" : todo.importance === 2 ?  "circle medium" : "circle low";
    const importanceCircle = addEl("span", importanceStyle);
    const importanceLabel = addEl("span", "label", importanceValue);
    importanceSpan.append(importanceCircle, importanceLabel);

    // 종료일자
    const dateSpan = addEl("p", "taskDue", todo.date);

    container.appendChild(titleSpan);
    container.appendChild(importanceSpan);
    container.appendChild(dateSpan);

    return container;
};