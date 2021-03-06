import userEvent from "@testing-library/user-event";
import { createObserver } from "../entry-helpers";
import { isIOS } from 'mobile-device-detect';

const MOBILE_MORE_ICON_BUTTON_ID = "mobile-more-icon-button";
const MOBILE_BACK_ICON_BUTTON_ID = "mobile-back-icon-button";

let previousActiveElement: HTMLElement;
const createMobileIcon = (id: string, iconType: string) => {
  const iconButton = document.createElement("button");
  iconButton.id = id;
  iconButton.className =
    "bp3-button bp3-minimal rm-mobile-button dont-unfocus-block";
  iconButton.style.padding = "6px 4px 4px;";
  const icon = document.createElement("i");
  icon.className = `zmdi zmdi-hc-fw-rc zmdi-${iconType}`;
  icon.style.cursor = "pointer";
  icon.style.color = "rgb(92, 112, 128)";
  icon.style.fontSize = "18px";
  icon.style.transform = "scale(1.2)";
  icon.style.fontWeight = "1.8";
  icon.style.margin = "8px 4px";
  iconButton.appendChild(icon);
  iconButton.onmousedown = () => {
    previousActiveElement = document.activeElement as HTMLElement;
  };
  return iconButton;
};

const moreIconButton = createMobileIcon(MOBILE_MORE_ICON_BUTTON_ID, "menu");
const backIconButton = createMobileIcon(
  MOBILE_BACK_ICON_BUTTON_ID,
  "arrow-left"
);
const todoIconButton = createMobileIcon(
  "mobile-todo-icon-button",
  "check-square"
);
let menuItems: Element[] = [];

moreIconButton.onclick = () => {
  const mobileBar = document.getElementById("rm-mobile-bar");
  menuItems = Array.from(mobileBar.children);
  Array.from(mobileBar.children).forEach((n) => mobileBar.removeChild(n));
  mobileBar.appendChild(todoIconButton);
  mobileBar.appendChild(backIconButton);
  if (previousActiveElement.tagName === "TEXTAREA") {
    previousActiveElement.focus();
  }
};

backIconButton.onclick = () => {
  const mobileBar = document.getElementById("rm-mobile-bar");
  Array.from(mobileBar.children).forEach((n) => mobileBar.removeChild(n));
  menuItems.forEach((n) => mobileBar.appendChild(n));
  if (previousActiveElement.tagName === "TEXTAREA") {
    previousActiveElement.focus();
  }
};

todoIconButton.onclick = () => {
  if (previousActiveElement.tagName === "TEXTAREA") {
    const modifier = isIOS ? "meta" : "ctrl";
    userEvent.type(previousActiveElement, `{${modifier}}{enter}{/${modifier}}{backspace}`);
  }
};

createObserver(() => {
  if (
    !document.getElementById(MOBILE_MORE_ICON_BUTTON_ID) &&
    !document.getElementById(MOBILE_BACK_ICON_BUTTON_ID)
  ) {
    const mobileBar = document.getElementById("rm-mobile-bar");
    if (mobileBar) {
      mobileBar.appendChild(moreIconButton);
    }
  }
});
