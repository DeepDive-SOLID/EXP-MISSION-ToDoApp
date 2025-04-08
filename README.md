# subTaskController (하위 태스크 관리 / 생성 및 삭제)
- data (테스트를 위한 더미 데이터)
```
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
```

- 백로그 항목 1개를 나타내는 데이터 배열
- 각 항목은 고유 ID, 제목, 날짜, 완료 여부, 하위 태스크 목록 포함
- list는 백로그에 속한 하위 태스크 객체 배열
<br>
#js 파일 기능
1. renderInitialSubTasks

function renderInitialSubTasks() {
  data.forEach(backlog => {
    const backlogElement = document.querySelector(`.backlog[data-id="${backlog.id}"]`);
    const ul = backlogElement.querySelector('.sub-task-list');

    backlog.list.forEach(sub => {
      const li = createSubTaskElement(backlog.id, sub);
      ul.appendChild(li);

      //로그를 이용한 디버깅
      console.log("하위 태스크 ID: " + sub.id + " / 하위 태스크 내용: " + sub.text);
    });
  });
}
```
- data 배열을 순회하면서 각 백로그에 해당하는 DOM 요소를 찾고 랜더링
- 하위 태스크는 createSubTaskElement(backlog.id, sub)를 통해 <ul> 태그 하위 <li>로 생성되어 UI에 추가됨.
- 디버깅을 위해 기존 태스크 로그 출력 (현재는 더미 데이터를 넣어두어 콘솔 로그에 기존 더미 데이터 값 출력)
<br>
2. addSubTaskToUI
```
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

  const subTaskList = backlogElement.querySelector('.sub-task-list');
  const li = createSubTaskElement(backlogId,newSubTask);
  subTaskList.appendChild(li);

  //로그를 이용한 디버깅
  console.log("하위 태스크 ID: " + newSubTaskId + " / 하위 태스크 내용: " + subTaskText);
}
```
- 특정 백로그에 새로운 하위 태스크 추가
- Date.now()를 이용하여 고유 ID를 간단하게 생성하여 새로운 태스크 객체를 만들고 data에 저장.
- DOM에서도 해당 백로그의 하위 리스트(.sub-task-list)에 새로운 <li> 생성
<br>
3. createSubTaskElement
```
function createSubTaskElement(backlogId, subTask) {
  const li = document.createElement('li');
  li.textContent = subTask.text;
  li.setAttribute('data-sub-id', subTask.id);

  //삭제 버튼 (처음엔 숨겨둠)
  const delBtn = document.createElement('button');
  delBtn.textContent = '삭제';
  //삭제 버튼 임시 스타일 (추후 변경)
  delBtn.style.marginLeft = '10px';
  delBtn.style.display = 'none';
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
  });

  //li 클릭 시 삭제 버튼 토글 이벤트
  li.addEventListener('click', () => {
    delBtn.style.display = delBtn.style.display === 'none' ? 'inline-block' : 'none';
  });

  li.appendChild(delBtn);
  return li;
}
```
- 하위 태스크 <li> 요소를 생성하고, 삭제 버튼을 동적으로 포함 시킴 (삭제는 <li> 요소를 클릭하면 버튼이 나타나고 사라짐)
- 삭제 버튼 클릭하면 해당 태스가 data 배열에서 삭제, DOM에서도 삭제된 <li> 요소를 제거함.
<br>
4. 입력창과 버튼에 대한 이벤트
```
ocument.querySelectorAll('.backlog').forEach(backlogElement => {
  const input = backlogElement.querySelector('.sub-task-input');
  const button = backlogElement.querySelector('.add-sub-task-btn');
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
```
- 각 백로그 영역의 입력창과 추가 버튼 바인딩
- 버튼 클릭 또는 Enter키 입력 시 addSubTaskToUI()가 호출되어 하위 태스크 추가
- 입력 후 입력창의 데이터는 자동 초기화 (입력하고 clear됨)

5. 실행 시작
- 초기 로딩 시 기존 data의 내용을 기반으로 화면에 하위 태스크 랜더링 (현재는 더미 데이터)
