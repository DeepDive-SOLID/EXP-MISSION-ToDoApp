import { backUpdata } from "./backUplist.js";
import { addEl } from "./element.js";

const completeContainer = document.querySelector(".modalCompleteItem");

const modalCompletedList = () => {
  completeContainer.innerHTML = "";
  backUpdata
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
    })
    .forEach((item) => completeContainer.appendChild(completedDeleteListEl(item)));
};

const completedDeleteListEl = (item) => {
  const completeTaskTitle = addEl("span", "CompleteTaskTitle", item.title);
  const completeTaskDue = addEl("span", "CompleteTaskDue", item.date);
  const completeCardEl = addEl("div", "CompleteDeleteCard");

  completeCardEl.append(completeTaskTitle, completeTaskDue);

  return completeCardEl;
};

export { modalCompletedList };
