const nav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');
const srOnly = navToggle.querySelector(".sr-only");

navToggle.addEventListener('click', (e) => {
  // const visibility = nav.getAttribute("data-visible");
  // if (visibility === "false") {
  //     nav.setAttribute("data-visible", true);
  // } else {
  //     nav.setAttribute("data-visible", false);
  // }

  const isVisible = nav.getAttribute("data-visible") === "true";

  nav.setAttribute("data-visible", isVisible ? "false" : "true");
  navToggle.setAttribute("aria-expanded", isVisible ? "false" : "true");
  srOnly.textContent = isVisible ? "Menu" : "Close menu";

  // Stop the click from bubbling to the window
  e.stopPropagation();
});

// Click outside to close
window.addEventListener('click', (e) => {
  const isVisible = nav.getAttribute("data-visible") === "true";

  if (
    isVisible &&
    !nav.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    nav.setAttribute("data-visible", "false");
    navToggle.setAttribute("aria-expanded", "false");
    srOnly.textContent = "Menu";
  }
});