# subTaskController (하위 태스크 관리 / 생성 및 삭제)
- data (테스트를 위한 더미 데이터)
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

- 백로그 항목 1개를 나타내는 데이터 배열