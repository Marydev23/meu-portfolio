// ---------- reveal ao rolar ----------
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
  );
  reveals.forEach((el) => obs.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

// ---------- modal de projetos ----------
let lastTrigger = null;
let scrollY = 0;

function lockScroll() {
  scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
}

function unlockScroll() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollY);
}

function openModal(id, trigger) {
  const m = document.getElementById(id);
  if (!m) return;
  lastTrigger = trigger;
  if (!document.querySelector(".modal.open")) lockScroll();
  m.classList.add("open");
  m.querySelector(".modal-box").scrollTop = 0;
  m.querySelector(".modal-close").focus();
}

function closeModal(m) {
  m.classList.remove("open");
  if (!document.querySelector(".modal.open")) {
    unlockScroll();
    if (lastTrigger) lastTrigger.focus();
  }
}

// botões "VER DETALHES"
document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal, btn));
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
