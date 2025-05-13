import { addEl } from "./element.js";

let data = [];
const completeContainer = document.querySelector(".modalCompleteItem");

const modalCompletedList = () => {
  completeContainer.innerHTML = "";
  data.forEach((item) => completeContainer.appendChild(completedDeleteListEl(item)));
};

const completedDeleteListEl = (item) => {
  const completeTaskTitle = addEl("span", "CompleteTaskTitle", item.title);
  const completeTaskDue = addEl("span", "CompleteTaskDue", item.date);
  const completeCardEl = addEl("div", "CompleteDeleteCard");

  completeCardEl.append(completeTaskTitle, completeTaskDue);

  return completeCardEl;
};

const loadBackUpDate = () => {
  const backup = localStorage.getItem("backUpDataList");
  if (backup) {
    data = JSON.parse(backup);
  }
};

loadBackUpDate();

export { modalCompletedList };
