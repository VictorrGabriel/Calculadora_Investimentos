import { generateReturnsArray } from "./src/investmentGoals.js";

const form = document.getElementById("investment-form");
const clearFormElement = document.getElementById("clear-form");

/* Obtendo um campo dentro de um form com o formato form['nome dado ao elemento'] */

function renderProgression(e) {
  e.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const addtionalContribution = Number(
    document.getElementById("additional-contribution").value
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    addtionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(
    generateReturnsArray(
      startingAmount,
      timeAmount,
      timeAmountPeriod,
      addtionalContribution,
      returnRate,
      returnRatePeriod
    )
  );
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  const errorInputConteiners = document.querySelectorAll(".error");

  for (const errorInputConteiner of errorInputConteiners) {
    errorInputConteiner.classList.remove("error");
    errorInputConteiner.parentElement.querySelector("p").remove();
  }
}

function validateInput(e) {
  if (e.target.value === "") {
    return;
  }

  const { parentElement } = e.target;
  const grandParentElement = e.target.parentElement.parentElement;
  const inputValue = e.target.value.replace(",", ".");

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor númerico e maior do que zero";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    !isNaN(inputValue) ||
    (Number(inputValue) >= 0 && parentElement.classList.contains("error"))
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}
form.addEventListener("submit", renderProgression);
clearFormElement.addEventListener("click", clearForm);
