import { openMypageModalEvents, closeMypageModalEvents } from "./initEventListeners.js";

export const mypageModal = () => {
  const icon = document.getElementById("userIcon");
  const modal = document.getElementById("mypageModal");
  const closeBtn = document.getElementById("closeBtn");

  openMypageModalEvents(icon);
  closeMypageModalEvents(modal, closeBtn);
}
