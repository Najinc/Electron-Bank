import { calculateInterest } from "./interests.js";

function openTransactionPopup() {
    const transactionPopup = document.getElementById('transactionPopup');
    transactionPopup.showModal();
  }

  function closeTransactionPopup() {
    const transactionPopup = document.getElementById('transactionPopup');
    transactionPopup.close();
  }

  function addTransactionFromPopup() {
    const transactionDate = document.getElementById('transactionDate').value;
    const transactionType = document.getElementById('transactionType').value;
    const transactionAmount = document.getElementById('transactionAmount').value;
    const transactionContainer = document.getElementById('transactionContainer');
    const transactionDiv = document.createElement('div');
    transactionDiv.innerHTML = `
      <p>Date: ${transactionDate}, Type: ${transactionType}, Montant: ${transactionAmount}</p>
    `;
    transactionContainer.appendChild(transactionDiv);

    closeTransactionPopup();
  }

  function openRateChangePopup() {
    const rateChangePopup = document.getElementById('rateChangePopup');
    rateChangePopup.showModal();
  }

  function closeRateChangePopup() {
    const rateChangePopup = document.getElementById('rateChangePopup');
    rateChangePopup.close();
  }

  function applyRateChange() {
    const newRate = document.getElementById('newRate').value;
    const changeDate = document.getElementById('changeDate').value;

    // Validation des données et application du changement de taux
    // ...

    // Ajout du changement de taux à la liste affichée
    const rateChangeContainer = document.getElementById('rateChangeContainer');
    const rateChangeDiv = document.createElement('div');
    rateChangeDiv.innerHTML = `
      <p>Nouveau Taux: ${newRate}%, Date d'Effet: ${changeDate}</p>
    `;
    rateChangeContainer.appendChild(rateChangeDiv);

    // Fermeture du popup
    closeRateChangePopup();
  }

  function showInterestDetails() {
    const transactions = document.getElementById('transactionContainer').children;
    const rateChanges = document.getElementById('rateChangeContainer').children;
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    const initialRate = parseFloat(document.getElementById('initialRate').value);
    const duration = parseInt(document.getElementById('duration').value);

    const totalInterest = calculateInterest(transactions, initialAmount, initialRate, duration);
    const importantDates = getImportantDates(transactions, rateChanges);

    // Construire la frise chronologique
    const friseChronologique = importantDates.map(date => `<li>${date.toISOString().slice(0, 10)}</li>`).join('');

    const popupContent = `
      <p>Montant Initial Déposé: ${initialAmount.toFixed(2)}</p>
      <p>Frise Chronologique:</p>
      <ul>
        ${friseChronologique}
      </ul>
      <p>Montant des Intérêts Perçus: ${totalInterest.toFixed(2)}</p>
    `;
    console.log(totalInterest);
    alert(popupContent); // Vous pouvez utiliser un autre moyen d'afficher le popup, comme un modal ou un élément HTML dédié.
  }