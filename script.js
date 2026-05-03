const els = {
  days: document.querySelectorAll(".days"),
  hours: document.querySelectorAll(".hours"),
  minutes: document.querySelectorAll(".minutes"),
  seconds: document.querySelectorAll(".seconds"),
  sidebar: document.getElementById("sidebar"),
  mainContent: document.querySelector('.main-content'),
  openBtn: document.getElementById('sidebar-open-btn'),
  closeBtn: document.querySelector("#btn"),
  pages: document.querySelectorAll(".page-section")
};

const eventDate = new Date("July 31, 2026 00:00:00").getTime();

const setAll = (nodeList, value) => {
  nodeList.forEach(el => { el.textContent = value; });
};

const updateCountdown = () => {
  const distance = eventDate - Date.now();

  if (distance <= 0) {
    clearInterval(countdownInterval);
    setAll(els.days, "00");
    setAll(els.hours, "00");
    setAll(els.minutes, "00");
    setAll(els.seconds, "00");
    return;
  }

  setAll(els.days, String(Math.floor(distance / 86400000)).padStart(2, "0"));
  setAll(els.hours, String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0"));
  setAll(els.minutes, String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0"));
  setAll(els.seconds, String(Math.floor((distance % 60000) / 1000)).padStart(2, "0"));
};

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

const toggleSidebarBtn = (show) => {
  if (els.openBtn) els.openBtn.style.display = show ? 'block' : 'none';
};

const closeSidebar = () => {
  els.sidebar?.classList.remove("active");
  toggleSidebarBtn(true);
  if (els.mainContent) els.mainContent.style.filter = "none";
};

toggleSidebarBtn(true);

els.closeBtn?.addEventListener('click', (e) => {
  closeSidebar();
  e.stopPropagation();
});

els.openBtn?.addEventListener('click', (e) => {
  els.sidebar?.classList.add("active");
  toggleSidebarBtn(false);
  if (els.mainContent) els.mainContent.style.filter = "blur(2px)";
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if (els.sidebar?.classList.contains('active') && !els.sidebar.contains(e.target) && e.target !== els.openBtn) {
    closeSidebar();
  }
});

window.switchPage = (pageId) => {
  els.pages.forEach(section => section.classList.remove("active"));
  document.getElementById(pageId)?.classList.add("active");
};