export default class Widget {

  constructor() {
    this.popoverTitle = this.#createPopoverTitle();
    this.popoverBody = this.#createPopoverBody();
    this.arrowElement = this.#createArrowElement();
    this.widget = this.#createWidget();
  }

  #createWidget() {
    const widgetBox = document.createElement("div");
    widgetBox.classList.add("popover");
    widgetBox.append(this.popoverTitle);
    widgetBox.append(this.popoverBody);
    widgetBox.append(this.arrowElement);
    return widgetBox;
  }

  #createPopoverTitle() {
    const titleElement = document.createElement("h3");
    titleElement.classList.add("popover-header");
    titleElement.textContent = this.title;
    return titleElement;
  }

  #createPopoverBody() {
    const bodyElement = document.createElement("div");
    bodyElement.classList.add("popover-body");
    bodyElement.textContent = this.text;
    return bodyElement;
  }

  #createArrowElement() {
    const arrowElement = document.createElement("div");
    arrowElement.classList.add("arrow");
    return arrowElement;
  }

  widgetShow(element) {
    const cord = element.getBoundingClientRect();
    this.popoverTitle.textContent = element.dataset.title;
    this.popoverBody.textContent = element.dataset.text;
    this.arrowElement.style.left = "45%";
    this.widget.classList.toggle("show");
    const position = this.#calculatePosition(
      cord.top, cord.left, cord.width
    );
    this.widget.style.top = `${position.top}px`;
    this.widget.style.left = `${position.left}px`;
  }

  #calculatePosition(elementTop, elementLeft, elementWidth) {
    let top = elementTop - this.widget.offsetHeight - this.arrowElement.offsetHeight;
    let left = elementLeft + (elementWidth - this.widget.offsetWidth) / 2;
    top = top < 0 ? 0 : top;
    left = left < 0 ? 0 : left;
    return { top, left };
  }
}
