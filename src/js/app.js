import Widget from "./Widget";

const widget = new Widget();
const form = document.querySelector(".form-example");
document.querySelector("body").appendChild(widget.widget);
form.addEventListener("click", showWidget);

function showWidget(event) {
  const element = event.target;
  if (element.tagName === "BUTTON" && widget.isShow) {
    widget.hide();
  } else if (element.tagName === "BUTTON") {
    widget.show(element);
    form.addEventListener("mouseout", hideWidget);
  }
}

function hideWidget(event) {
  const element = event.target;
  if (element.tagName === "BUTTON") {
    setTimeout(() => {
      widget.hide();
      form.removeEventListener("mouseout", hideWidget);
    }, 200);
  }
}
