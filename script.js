//테스트를 위한 더미 데이터
const data = [
  {
    id: 1,
    title: "첫 번째 항목",
    moveCheck: true,
    complet: false,
    date: "2025-04-07",
    list: [
      { id: 101, text: "할 일 1", check: false },
      { id: 102, text: "할 일 2", check: true }
    ]
  }
];

//기존 데이터 기반으로 하위 태스크 렌더링
function renderInitialSubTasks() {
  data.forEach(backlog => {
    const backlogElement = document.querySelector(`.backlog[data-id="${backlog.id}"]`);
    const ul = backlogElement.querySelector('.subTaskList');

    backlog.list.forEach(sub => {
      const li = createSubTaskElement(backlog.id, sub);
      ul.appendChild(li);

      //로그를 이용한 디버깅
      console.log("하위 태스크 ID: " + sub.id + " / 하위 태스크 내용: " + sub.text + " / 체크박스 여부: " + sub.check);
    });
  });
}

//새로운 하위 태스크 추가
function addSubTaskToUI(backlogId, subTaskText) {
  const backlogElement = document.querySelector(`.backlog[data-id="${backlogId}"]`);
  const backlogData = data.find(item => item.id === backlogId);
  if (!backlogElement || !backlogData) {
    console.warn("백로그가 없거나 ID가 잘못됨");
    return;
  }

  //date를 이용하여 간단하게 하위 태스크 ID 생성
  const newSubTaskId = Date.now();
  const newSubTask = { id: newSubTaskId, text: subTaskText, check: false };
  backlogData.list.push(newSubTask);

  const subTaskList = backlogElement.querySelector('.subTaskList');
  const li = createSubTaskElement(backlogId,newSubTask);
  subTaskList.appendChild(li);

  //로그를 이용한 디버깅
  console.log("하위 태스크 ID: " + newSubTaskId + " / 하위 태스크 내용: " + subTaskText + " / 체크박스 여부: " + newSubTask.check);
}

//각 백로그의 입력창에 이벤트 연결
document.querySelectorAll('.backlog').forEach(backlogElement => {
  const input = backlogElement.querySelector('.subTaskInput');
  const button = backlogElement.querySelector('.addSubTaskBtn');
  const backlogId = parseInt(backlogElement.getAttribute('data-id'), 10);

  button.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      addSubTaskToUI(backlogId, text);
      input.value = '';
    }
  });

  input.addEventListener('keydown', (enter) => {
    if(enter.key === 'Enter') button.click();
  });
});

//태스크 요소 생성 및 삭제
function createSubTaskElement(backlogId, subTask) {
  const li = document.createElement('li');
  li.setAttribute('data-sub-id', subTask.id);
  
  //리스트 아이템 스타일 설정
  li.style.display = 'grid';
  li.style.gridTemplateColumns = 'auto 1fr auto'; // 체크박스 | 텍스트 | 삭제
  li.style.alignItems = 'center';                // 수직 가운데 정렬
  li.style.columnGap = '10px';
  li.style.padding = '8px 12px';
  li.style.borderBottom = '1px solid #444';


  //체크박스
  const checkboxEl = document.createElement('input');
  checkboxEl.type = 'checkbox';
  checkboxEl.checked = subTask.check;

  //텍스트
  const textSpan = document.createElement('span');
  textSpan.textContent = subTask.text;
  textSpan.style.textAlign = 'center';
  textSpan.style.width = '100%';
    
  if (subTask.check) {
    textSpan.style.textDecoration = 'line-through';
    textSpan.style.opacity = '0.6';
  }

  //체크 이벤트 분리 함수 사용
  SubTaskCheckbox(subTask, checkboxEl, textSpan);

  //삭제 버튼 (처음엔 숨겨둠)
  const delBtn = document.createElement('button');
  delBtn.textContent = '삭제';
  //삭제 버튼 임시 스타일 (추후 변경)
  delBtn.style.marginLeft = '10px';
  delBtn.style.visibility = 'hidden';
  delBtn.style.background = '#ff4d4d';
  delBtn.style.color = '#fff';
  delBtn.style.border = 'none';
  delBtn.style.padding = '4px 8px';
  delBtn.style.borderRadius = '4px';
  delBtn.style.cursor = 'pointer';

  //삭제 버튼 클릭 시: data와 UI 모두에서 제거 (배열 리스트에서 삭제)
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation(); //li 클릭 이벤트 막기

    const backlog = data.find(item => item.id === backlogId);
    backlog.list = backlog.list.filter(item => item.id !== subTask.id);
    li.remove();

    console.log(subTask.text + " 삭제");
  });

  //li 클릭 시 삭제 버튼 토글 이벤트
  li.addEventListener('click', (e) => {
    if(e.target.tagName.toLowerCase() === 'input') return;

    delBtn.style.visibility = delBtn.style.visibility === 'hidden' ? 'visible' : 'hidden';
  });

  li.appendChild(checkboxEl);
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}

//하위 태스크 체크 이벤트 (체크박스를 통해 완료하면 text 밑줄)
function SubTaskCheckbox(subTask, checkboxEl, textEl) {
  checkboxEl.addEventListener('change', (e) => {
    e.stopPropagation(); //체크박스가 클릭되면 li 클릭으로 전달되지 않게 막음.
    subTask.check = checkboxEl.checked;
    if(!subTask.check)  console.log(subTask.text + " 태스크 미완료");
    else                console.log(subTask.text +" 태스크 완료");
    

    if (checkboxEl.checked) {
      textEl.style.textDecoration = 'line-through';
      textEl.style.opacity = '0.6';
    } else {
      textEl.style.textDecoration = 'none';
      textEl.style.opacity = '1';
    }
  });
}

//초기 렌더링 실행
renderInitialSubTasks();