const balance = document.getElementById("balance");
const inflow = document.getElementById("income");
const outflow = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Get transactions from local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    document.getElementById("error_msg").innerHTML =
      "<span >Error: Please enter description and amount!</span>";
    setTimeout(
      () => (document.getElementById("error_msg").innerHTML = ""),
      3000
    );
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

//speech to text
function voiceO(text) {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-Us";
      recognition.start();
      recognition.onresult = function(e) {
          if(x=="phone" || x=="aadhar")
              {
        document.getElementById(x).value = parseInt(e.results[0][0].transcript);
        recognition.stop();
              }
          else{ 
              document.getElementById(x).value= e.results[0][0].transcript;
        recognition.stop();
          }
       };

      recognition.onerror = function(e) {
        recognition.stop();
      }

    }
  
  
  }
// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// All records
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

//   Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} - ${Math.abs(
    transaction.amount
  )} <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
  `;

  list.appendChild(item);
}

// Update the balance, inflow and outflow
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((bal, value) => (bal += value), 0).toFixed(2);

  const income = amounts
    .filter((value) => value > 0)
    .reduce((bal, value) => (bal += value), 0)
    .toFixed(2);

  const expense =
    amounts
      .filter((value) => value < 0)
      .reduce((bal, value) => (bal += value), 0) * -(1).toFixed(2);

  balance.innerText = ` ${total}`;
  inflow.innerText = ` ${income}`;
  outflow.innerText = ` ${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  start();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Start app
function start() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

start();

form.addEventListener("submit", addTransaction);

