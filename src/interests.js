// src/interest.js

function parseDate(dateString) {
    // Fonction pour convertir la chaîne de date en objet Date
    // Vous pouvez ajuster cela en fonction du format de votre chaîne de date
    return new Date(dateString);
  }
  
  function calculateQuinzenesBetween(startDate, endDate) {
    // Fonction pour calculer le nombre de quinzaines entre deux dates
    const millisecondsInQuinzenes = 14 * 24 * 60 * 60 * 1000;
    return Math.floor((endDate - startDate) / millisecondsInQuinzenes);
  }
  
  function calculateInterestForPeriod(amount, rate, quinzenes) {
    // Fonction pour calculer l'intérêt pour une période donnée
    return (amount * rate * quinzenes) / 36000;
  }
  
  export function calculateInterest(transactions, initialAmount, initialRate, duration) {
    // Initialisation des variables
    let currentAmount = initialAmount;
    let currentRate = initialRate;
    let currentDate = null; // Date de la dernière transaction
    let totalInterest = 0;
  
    // Parcourez les transactions
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      const transactionDate = parseDate(transaction.querySelector('.transaction-date').innerText);
      const transactionType = transaction.querySelector('.transaction-type').innerText;
      const transactionAmount = parseFloat(transaction.querySelector('.transaction-amount').innerText);
  
      // Calcul de la période en quinzaines entre les transactions
      const quinzenesBetween = calculateQuinzenesBetween(currentDate, transactionDate);
      
      // Calcul de l'intérêt pour la période entre les transactions
      const interest = calculateInterestForPeriod(currentAmount, currentRate, quinzenesBetween);
  
      // Ajout de l'intérêt au total
      totalInterest += interest;
  
      // Mise à jour des variables pour la prochaine itération
      currentAmount = transactionType === 'Versement' ? currentAmount + transactionAmount : currentAmount - transactionAmount;
      currentDate = transactionDate;
    }
  
    // Calcul de l'intérêt pour la période restante (jusqu'à la durée spécifiée)
    const remainingQuinzenes = calculateQuinzenesBetween(currentDate, currentDate + duration);
    const remainingInterest = calculateInterestForPeriod(currentAmount, currentRate, remainingQuinzenes);
  
    // Ajout de l'intérêt restant au total
    totalInterest += remainingInterest;
  
    // Retourne le total des intérêts perçus
    return totalInterest;
  }

  function getImportantDates(transactions, rateChanges) {
    // Extraction des dates importantes à partir des transactions et des changements de taux
    const dates = Array.from(transactions).map(transaction => parseDate(transaction.querySelector('.transaction-date').innerText));
    const rateChangeDates = rateChanges.map(rateChange => parseDate(rateChange.querySelector('.rate-change-date').innerText));
  
    // Fusionner et trier les dates
    const allDates = [...dates, ...rateChangeDates].sort((a, b) => a - b);
  
    return allDates;
  }
  