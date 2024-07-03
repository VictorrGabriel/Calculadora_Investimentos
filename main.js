import { generateReturnsArray } from "./src/investmentGoals.js";


const form = document.getElementById('investment-form');

/* Obtendo um campo dentro de um form com o formato form['nome dado ao elemento'] */

function renderProgression(e){
    e.preventDefault();
    const startingAmount = Number(document.getElementById('starting-amount').value);
    const addtionalContribution = Number(document.getElementById('additional-contribution').value);
    const timeAmount = Number(document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRate = Number(document.getElementById('return-rate').value);
    const returnRatePeriod = document.getElementById('evaluation-period').value;
    const taxRate = Number(document.getElementById('tax-rate').value);

    generateReturnsArray(startingAmount, timeAmount, timeAmountPeriod, addtionalContribution, returnRate, returnRatePeriod)

    console.log(   generateReturnsArray(startingAmount, timeAmount, timeAmountPeriod, addtionalContribution, returnRate, returnRatePeriod));

}

form.addEventListener('submit', renderProgression); 