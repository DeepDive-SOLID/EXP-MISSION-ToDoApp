import { initSubTaskEvents } from './initEventListeners.js';
import { addEl } from './element.js';
import { todos } from './currentTask.js';

// 렌더링
const renderInitialSubTasks = () => {
  document.querySelectorAll('.currentTaskWrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.subtaskContainer');
    const backlogId = parseInt(wrapper.dataset.id, 10);
    const backlog = todos.find(b => b.id === backlogId);
    if (!backlog) return;

    backlog.list.forEach(sub => {
      const taskElement = createSubTaskElement(backlogId, sub);
      const btn = container.querySelector('.addSubtaskBtn');
      container.insertBefore(taskElement, btn);
    });
  });
};

// 하위 태스크 요소 생성
const createSubTaskElement = (backlogId, subTask) => {
  const div = addEl('div', 'subtaskItem');
  div.setAttribute('data-sub-id', subTask.id);

  const textSpan = addEl('span', 'subtaskText', subTask.text);
  if (subTask.check) {
    textSpan.style.textDecoration = 'line-through';
    textSpan.style.opacity = '0.6';
  }

  const checkbox = addEl('input', 'subtaskCheck', '', '', 'checkbox');
  checkbox.checked = !!subTask.check;

  const delBtn = addEl('button', 'subtaskDelete', '🗑︎');

  div.append(checkbox, textSpan, delBtn);
  initSubTaskEvents(div, backlogId, subTask, textSpan);
  return div;
};

// 입력 가능한 새 하위 태스크 요소 생성
const createEditableSubTaskElement = (backlogId, subTask) => {
  const div = addEl('div', 'subtaskItem');
  div.setAttribute('data-sub-id', subTask.id);

  const checkbox = addEl('input', 'subtaskCheck', '', '', 'checkbox');
  checkbox.checked = !!subTask.check;

  const style = 'width: 100%; text-align: center; border: none; outline: none; background: transparent;';
  const input = addEl('input', 'subtaskText', '', '', 'text', style);

  const delBtn = addEl('button', 'subtaskDelete', '🗑︎');

  div.append(checkbox, input, delBtn);
  initSubTaskEvents(div, backlogId, subTask);
  return div;
};

// 버튼 이벤트 연결
const initSubtaskAddButtons = () => {
  document.querySelectorAll('.currentTaskWrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.addSubtaskBtn');
    const container = wrapper.querySelector('.subtaskContainer');
    const backlogId = parseInt(wrapper.dataset.id, 10);

    btn.addEventListener('click', () => {
      const backlog = todos.find(b => b.id === backlogId);
      if (!backlog) return;

      const newId = Date.now();
      const newTask = { id: newId, text: '', check: false };
      backlog.list.push(newTask);

      const div = createEditableSubTaskElement(backlogId, newTask);
      container.insertBefore(div, btn);
      const input = div.querySelector('input[type="text"]');
      if (input) input.focus();
    });
  });
};

// 토글 버튼 연결
const toggleSubtask = (toggleBtn) => {
  const container = toggleBtn.closest(".currentTaskWrapper").querySelector(".subtaskContainer");
  if (!container) return;
  const isHidden = container.classList.contains("hidden");
  container.classList.toggle("hidden");
  toggleBtn.innerText = isHidden ? "▲" : "▼";
};

export { renderInitialSubTasks, initSubtaskAddButtons, toggleSubtask };