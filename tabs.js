const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPannel);
});

let tabFocus = 0;

function changeTabFocus(event) {
  const keydownLeft = 37;
  const keydownRight = 39;

  // change the tabindex of the current tab to -1
  if (event.keyCode === keydownLeft || event.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);
  }
  // if the right key is pushed, move to the next tab on the right
  if (event.keyCode === keydownRight) {
    tabFocus++;
    if (tabFocus >= tabs.length) tabFocus = 0;
  }
  // if the left key is pushed, move to the next tab on the left
  if (event.keyCode === keydownLeft) {
    tabFocus--;
    if (tabFocus < 0) tabFocus = tabs.length - 1;
  }

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

function changeTabPannel(event) {
  const targetTab = event.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  // Hiding the previous tab
  // Article
  mainContainer
    .querySelectorAll('[role="tabpanel"]')
    .forEach((panel) => panel.setAttribute("hidden", true));
  mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden"); // ex: #mars-tab
 
}
