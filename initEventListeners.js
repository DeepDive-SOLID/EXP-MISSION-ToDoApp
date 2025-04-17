import { finishEdit } from './currentTask.js';
import { toggleSubtask, initSubtaskAddButtons } from './subTask.js';
import { addEl } from './element.js';
import { todos, saveToLocalStorage } from './script.js';

// 체크리스트 본문 이벤트
const initCurrentTaskEvents = ({ titleSpan, titleInput, dateSpan, dateInput, modBtnEl, taskBtnEl, addBtnEl, todo, wrapper }) => {
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
  taskBtnEl.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSubtask(taskBtnEl);
  });

  // + 버튼
  addBtnEl.addEventListener("click", (e) => {
    const container = wrapper.querySelector('.subtaskContainer');
    initSubtaskAddButtons(todo.id, container, addBtnEl);
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


// 하위 태스크 이벤트
const initSubTaskEvents = ({ div, backlogId, subTask, textEl, checkbox, delBtn, input}) => {

  // 체크 박스
  checkbox.addEventListener('change', () => {
    subTask.check = checkbox.checked;
    const text = textEl || div.querySelector('.subtaskText');
    if (text) {
      text.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
      text.style.opacity = checkbox.checked ? '0.6' : '1';
    }
    const backlog = todos.find(b => b.id === backlogId);
    if (!backlog) return;

    const allChecked = backlog.list.every(sub => sub.check === true);
    backlog.complete = allChecked;
    saveToLocalStorage();
  });

  // 삭제 버튼
  delBtn.addEventListener('click', () => {
    const backlog = todos.find(item => item.id === backlogId);
    if (!backlog) return;
    backlog.list = backlog.list.filter(item => item.id !== subTask.id);
    saveToLocalStorage();
    div.remove();
  });

  // 입력 완료 후 변환
  if (input) {
    let isConfirmed = false;
    const confirm = () => {
      if (isConfirmed) return;
      isConfirmed = true;

      const value = input.value.trim();
      console.log(value);
       if (!value) {
         const backlog = todos.find(item => item.id === backlogId);
         if (backlog) {
           backlog.list = backlog.list.filter(item => item.id !== subTask.id);
           saveToLocalStorage();
         }
         div.remove();
         return;
       }
      subTask.text = value;

      const span = document.createElement('span');
      span.className = 'subtaskText';
      span.textContent = subTask.text;

      if (subTask.check) {
        span.style.textDecoration = 'line-through';
        span.style.opacity = '0.6';
      }

      input.replaceWith(span);
      initSubTaskEvents({ div, backlogId, subTask, textEl: span, checkbox, delBtn, input: null });
      saveToLocalStorage();
    };

    input.addEventListener('keydown', e => e.key === 'Enter' && confirm());
    input.addEventListener('blur', confirm);
  }
};

export { initCurrentTaskEvents, initSubTaskEvents };