import { addEl } from "./element.js";

let data = [];
const completeContainer = document.querySelector(".modalComplete");

const completedDeleteListEl = () => {
  const completeTitle = addEl("p", "modalBodyHeader", "Complete Delete Data");
  const completeItemContainer = addEl("div", "modalCompleteItem");

  data.forEach((item) => {
    const completeTaskTitle = addEl("span", "CompleteTaskTitle", item.title);
    const completeTaskDue = addEl("span", "CompleteTaskDue", item.date);
    const completeCardEl = addEl("div", "CompleteDeleteCard");

    completeCardEl.append(completeTaskTitle, completeTaskDue);
    completeItemContainer.append(completeCardEl);
  });

  completeContainer.prepend(completeTitle, completeItemContainer);
};

const loadBackUpDate = () => {
  const backup = localStorage.getItem("backUpDataList");
  if (backup) {
    data = JSON.parse(backup);
  }
};

loadBackUpDate();

export { completedDeleteListEl };
