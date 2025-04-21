const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

// Change the tab focus when focus by keyboard
tabList.addEventListener("keydown", changeTabFocus);

// Change the tab when it clicked
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
}

function changeTabPannel(event) {
  const targetTab = event.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  // Hiding the previous tab
  // Article
  //   mainContainer
  //     .querySelectorAll('[role="tabpanel"]')
  //     .forEach((panel) => panel.setAttribute("hidden", true));
  //   mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden"); // ex: #mars-tab

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  // Image
  //   mainContainer
  //     .querySelectorAll("picture")
  //     .forEach((picture) => picture.setAttribute("hidden", true));
  //   mainContainer.querySelector([`#${targetImage}`]).removeAttribute("hidden");

  hideContent(mainContainer, "picture");
  showContent(mainContainer, [`#${targetImage}`]);

  // Only show large image if we're on the technology page
  if (window.location.pathname.includes("technology")) {
    const targetLargeImage = targetTab.getAttribute("data-image-lg");
    showContent(mainContainer, [`#${targetLargeImage}`]);
  }

  // active tag
  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);
  targetTab.setAttribute("aria-selected", true);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden"); // ex: #mars-tab
}
