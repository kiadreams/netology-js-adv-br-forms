import Widget from "./Widget";

const widget = new Widget();
const form = document.querySelector('.form-example');
document.querySelector('body').appendChild(widget.widget);
form.addEventListener('click', showWidget);



function showWidget(event) {
  const element = event.target;
  if (element.tagName === 'BUTTON') {
    widget.widgetShow(element);
  }
}
