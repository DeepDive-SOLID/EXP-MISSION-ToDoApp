import { finishEdit } from './currentTask.js';
import { toggleSubtask } from './subTask.js';
import { addEl } from './element.js';
import { saveToLocalStorage } from './currentTask.js';

// 체크리스트 본문 이벤트
const initCurrentTaskEvents  = ({ titleSpan, titleInput, dateSpan, dateInput, modBtnEl, TaskBtnEl, todo }) => {
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


// 하위 태스크 이벤트
const initSubTaskEvents = (el, backlogId, subTask, textEl = null) => {
  const checkbox = el.querySelector('.subtaskCheck');
  const delBtn = el.querySelector('.subtaskDelete');
  const input = el.querySelector('input[type="text"]');

  // 체크 박스
  if (checkbox) {
    checkbox.addEventListener('change', () => {
      subTask.check = checkbox.checked;
      const text = textEl || el.querySelector('.subtaskText');
      if (text) {
        text.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        text.style.opacity = checkbox.checked ? '0.6' : '1';
      }
      saveToLocalStorage();
    });
  }

  // 삭제 버튼
  if (delBtn) {
    delBtn.addEventListener('click', () => {
      const data = JSON.parse(localStorage.getItem('todoList')) || [];
      const backlog = data.find(item => item.id === backlogId);
      if (!backlog) return;
      backlog.list = backlog.list.filter(item => item.id !== subTask.id);
      localStorage.setItem('todoList', JSON.stringify(data));
      el.remove();
      saveToLocalStorage();
    });
  }

  // 입력 완료 후 변환
  if (input) {
    let isConfirmed = false;
    const confirm = () => {
      if (isConfirmed) return;
      isConfirmed = true;

      const value = input.value.trim();
       if (!value) {
         el.remove();
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
      initSubTaskEvents(el, backlogId, subTask, span);
      saveToLocalStorage();
    };

    input.addEventListener('keydown', e => e.key === 'Enter' && confirm());
    input.addEventListener('blur', confirm);
  }
};

export { initCurrentTaskEvents, initSubTaskEvents };