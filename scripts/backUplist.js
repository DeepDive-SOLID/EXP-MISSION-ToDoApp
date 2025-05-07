let backUpdata = [];

export const saveToBackUpStorage = (item) => {
  const backUpdata = {
    id: item.id,
    title: item.title,
    date: item.date,
  };

  // 기존 백업 데이터를 불러오거나 새 배열 생성
  const existing = JSON.parse(localStorage.getItem("backUpDataList")) || [];
  existing.push(backUpdata);

  // 다시 저장
  localStorage.setItem("backUpDataList", JSON.stringify(existing));
};

export const loadToBackUpStorage = () => {
  const data = localStorage.getItem("backUpDataList");
  if (data) {
    backUpdata = JSON.parse(data);
  }
};