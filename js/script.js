const areaForm = document.querySelector("#areaForm");
const baseInput = document.querySelector("#base");
const heightInput = document.querySelector("#height");
const clearButton = document.querySelector("#clearButton");
const areaResult = document.querySelector("#areaResult");
const calculationText = document.querySelector("#calculationText");
const errorMessage = document.querySelector("#errorMessage");
const menuButton = document.querySelector("#menuButton");
const menuPanel = document.querySelector("#menuPanel");

function formatNumber(value) {
  return new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 6
  }).format(value);
}

function showError(message) {
  errorMessage.textContent = message;
  areaResult.textContent = "— cm²";
  calculationText.textContent = "Revisa los datos e inténtalo de nuevo.";
}

areaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const base = baseInput.value.trim() === "" ? NaN : Number(baseInput.value);
  const height = heightInput.value.trim() === "" ? NaN : Number(heightInput.value);

  if (!Number.isFinite(base) || !Number.isFinite(height)) {
    showError("Por favor, ingresa la base y la altura.");
    if (!Number.isFinite(base)) baseInput.focus();
    else heightInput.focus();
    return;
  }

  if (base < 0 || height < 0) {
    showError("Los valores no pueden ser negativos.");
    (base < 0 ? baseInput : heightInput).focus();
    return;
  }

  const area = base * height;
  if (!Number.isFinite(area)) {
    showError("El número es demasiado grande. Intenta con valores menores.");
    return;
  }

  areaResult.textContent = `${formatNumber(area)} cm²`;
  calculationText.textContent = `${formatNumber(base)} × ${formatNumber(height)} = ${formatNumber(area)}`;
});

clearButton.addEventListener("click", () => {
  areaForm.reset();
  errorMessage.textContent = "";
  areaResult.textContent = "— cm²";
  calculationText.textContent = "Ingresa los valores para comenzar.";
  baseInput.focus();
});

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuPanel.hidden = isExpanded;
});

document.addEventListener("click", (event) => {
  if (!menuPanel.hidden && !menuPanel.contains(event.target) && !menuButton.contains(event.target)) {
    menuPanel.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
  }
});
