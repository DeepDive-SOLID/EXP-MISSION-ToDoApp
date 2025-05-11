export function openMypageModal() {
  document.getElementById("mypageModal").classList.remove("hidden");
}

export function closeMypageModal() {
  document.getElementById("mypageModal").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("userIcon");
  const modal = document.getElementById("mypageModal");
  const closeBtn = document.getElementById("closeBtn");

  if (icon) icon.addEventListener("click", openMypageModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.id === "mypageModal") closeMypageModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeMypageModal);
});
