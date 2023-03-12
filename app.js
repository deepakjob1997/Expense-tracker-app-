const form = document.getElementById('expense-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalExpenses = document.getElementById('total-expenses');

let expenses = [];

// Get expenses from local storage
if (localStorage.getItem('expenses') !== null) {
  expenses = JSON.parse(localStorage.getItem('expenses'));
  showExpenses();
}

// Event listener for form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  addExpense();
});

// Function to add expense
function addExpense() {
  const text = textInput.value;
  const amount = parseFloat(amountInput.value);

  if (text !== '' && !isNaN(amount) && amount > 0) {
    const expense = {
      id: generateId(),
      text: text,
      amount: amount
    };

    expenses.push(expense);

    textInput.value = '';
    amountInput.value = '';

    showExpenses();

    saveExpenses();
  }
}

// Function to generate ID
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to show expenses
function showExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach(function(expense) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.innerHTML = `
      <span>${expense.text}</span>
      <span>$${expense.amount.toFixed(2)}</span>
      <button type="button" class="btn btn-danger delete-btn" data-id="${expense.id}">X</button>
    `;

    expenseList.appendChild(li);
  });

  showTotalExpenses();
}

// Function to show total expenses
