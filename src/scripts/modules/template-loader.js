import headerTemplate from "/layouts/header.html?raw";
import footerTemplate from "/layouts/footer.html?raw";

function injectTemplate(id, html) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = html;
  }
}

export function loadLayoutTemplates() {
  injectTemplate("header", headerTemplate);
  injectTemplate("footer", footerTemplate);

  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = String(new Date().getFullYear());
  }
}
