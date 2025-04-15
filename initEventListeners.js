import { finishEdit } from './currentTask.js';
import { toggleSubtask } from './subTask.js';

// 하나의 태스크에 대한 이벤트 리스너 초기화
export const initEventListeners = ({ titleSpan, titleInput, dateSpan, dateInput, modBtnEl, TaskBtnEl, todo }) => {
  let isEditing = false;

  // 수정 버튼
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

  // toggle 버튼
  TaskBtnEl.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSubtask(TaskBtnEl);
  });

  // 외부 클릭 시 저장
  document.addEventListener("click", (e) => {
    if (isEditing && ![titleInput, dateInput, modBtnEl].includes(e.target)) {
      finishEdit({ isEditing, titleSpan, titleInput, dateSpan, dateInput, todo });
      isEditing = false;
    }
  });

  // 엔터 키 입력 시 저장
  titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      finishEdit({ isEditing, titleSpan, titleInput, dateSpan, dateInput, todo });
      isEditing = false;
    }
  });

  dateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      finishEdit({ isEditing, titleSpan, titleInput, dateSpan, dateInput, todo });
      isEditing = false;
    }
  });
};