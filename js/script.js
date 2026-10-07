const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// ---------- modal de projetos ----------
function openModal(id) {
  const m = document.getElementById(id);
  m.classList.add("open");
  document.body.style.overflow = "hidden";
  m.querySelector(".modal-close").focus();
}

function closeModal(m) {
  m.classList.remove("open");
  document.body.style.overflow = "";
}

// botões "VER DETALHES" abrem o modal indicado no data-modal
document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});

// fecha no X ou clicando fora da caixa
document.querySelectorAll(".modal").forEach((m) => {
  m.addEventListener("click", (e) => {
    if (e.target === m || e.target.classList.contains("modal-close")) {
      closeModal(m);
    }
  });
});

// fecha com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.open").forEach(closeModal);
  }
});
