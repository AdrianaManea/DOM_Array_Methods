// Select DOM elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

/*
Where we want to put all of the people
It's going to be an array of objects that has: 
 - a name for the first and last name
 -  and then the money value which will be the wealth
*/
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
/* 
  fetch() is asynchronous so we have to wait for it to finish because it returns a promise once it's finished (await in front of it)
*/
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  // res.json() returns a promise too, await in front of it
  const data = await res.json();
  // console.log(data);
  const user = data.results[0];
  // console.log(user);
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    // random money property for wealth
    money: Math.floor(Math.random() * 1000000)
    // Math.floor() function returns the largest integer less than or equal to a given number.
  };
  // console.log(newUser);

  // pass newUser into a function addData() because we want to add the new obj to the data array
  addData(newUser);
}

// Double everyones money
// map()
function doubleMoney() {
  data = data.map((user) => {
    return {
      ...user,
      money: user.money * 2
    };
  });

  displayDOM();
}

// Sort by richest
// sort() 
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  displayDOM();
}

// Calculate the total wealth
// reduce()
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  // console.log(formatMoney(wealth));

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Filter only milionaires
// filter()
function showMilionaires() {
  data = data.filter(user => user.money > 1000000);

  displayDOM();
}

// Add the new obj to the data array
function addData(obj) {
  // push() method because it pushes something at the end of an array and that will add our obj
  data.push(obj);

  displayDOM();
}

// Display users in the DOM
/* 
 - in displayDOM() we're not actually passing anything
 - so if we don't pass in anything we want to default value of just the default data array 
 - to set a default value in a function -> providedData=data
 - so what is saying, if nothing is past in then it's just going to use that data array
 - of ES6 or 2015
*/
function displayDOM(providedData = data) {
  // clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // forEach() method
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    // Each of these person is an object with a name and a money value
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    // Insert into the DOM
    main.appendChild(element);
  });
}

// Format number as money 
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '€ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMilionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

















































// const main = document.getElementById('main');
// const addUserBtn = document.getElementById('add-user');
// const doubleBtn = document.getElementById('double');
// const showMillionairesBtn = document.getElementById('show-millionaires');
// const sortBtn = document.getElementById('sort');
// const calculateWealthBtn = document.getElementById('calculate-wealth');

// let data = [];

// getRandomUser();
// getRandomUser();
// getRandomUser();

// // Fetch random user and add money
// async function getRandomUser() {
//   const res = await fetch('https://randomuser.me/api');
//   const data = await res.json();

//   const user = data.results[0];

//   const newUser = {
//     name: `${user.name.first} ${user.name.last}`,
//     money: Math.floor(Math.random() * 1000000)
//   };

//   addData(newUser);
// }

// // Double eveyones money
// function doubleMoney() {
//   data = data.map(user => {
//     return { ...user, money: user.money * 2 };
//   });

//   updateDOM();
// }

// // Sort users by richest
// function sortByRichest() {
//   console.log(123);
//   data.sort((a, b) => b.money - a.money);

//   updateDOM();
// }

// // Filter only millionaires
// function showMillionaires() {
//   data = data.filter(user => user.money > 1000000);

//   updateDOM();
// }

// // Calculate the total wealth
// function calculateWealth() {
//   const wealth = data.reduce((acc, user) => (acc += user.money), 0);

//   const wealthEl = document.createElement('div');
//   wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
//     wealth
//   )}</strong></h3>`;
//   main.appendChild(wealthEl);
// }

// // Add new obj to data arr
// function addData(obj) {
//   data.push(obj);

//   updateDOM();
// }

// // Update DOM
// function updateDOM(providedData = data) {
//   // Clear main div
//   main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

//   providedData.forEach(item => {
//     const element = document.createElement('div');
//     element.classList.add('person');
//     element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
//       item.money
//     )}`;
//     main.appendChild(element);
//   });
// }

// // Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
// function formatMoney(number) {
//   return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
// }

// // Event listeners
// addUserBtn.addEventListener('click', getRandomUser);
// doubleBtn.addEventListener('click', doubleMoney);
// sortBtn.addEventListener('click', sortByRichest);
// showMillionairesBtn.addEventListener('click', showMillionaires);
// calculateWealthBtn.addEventListener('click', calculateWealth);