window.onload = function () {
  urlParams();
  renderExpenseView();

}
let ROW_ID = 1;
let ITEM_ID = 1;
let MONTH = null;
//make a function addNewDay and it will contain the whole box of new day with it's elements.when user click on add a new day btn this function will be called.
function addNewDay(date) {
  const container = document.querySelector("#container");
  let newDay = document.createElement("div");
  newDay.className = "border-white border-2 m-2 day-box";
  newDay.id = `list-${ROW_ID}`;
  ROW_ID = ROW_ID + 1;
  let dayBox = ` <div class="flex justify-between mt-4 p-2">
    <input type="number" min="1" max="31" step="1" placeholder="Date" value="${date ? date : ''}" class=" outline-none text-center text-slate-950 w-12 border-slate-800 date">
    <div class="flex gap-2 itmes-center">
      <button class="bg-green-600 text-3xl rounded-full text-white w-9 h-9"
      onClick="addItem('${newDay.id}')"
      >
        +</button>
    </div>
  </div>
`;
  newDay.innerHTML = dayBox;
  container.append(newDay);
  return newDay.id;
}

//make a function removeADay - it will remove the whole day box .when user clicks on remove a day btn this function will be called.
function removeADay() {
  const container = document.querySelector("#container");
  let elementToRemove = container.lastChild;
  elementToRemove.remove();
  saveToStorage()
}
//make a function addItems-it will have the item and cost box in it.when user clicks on + sign this function will be called a new row will be added for item and cost.
function addItem(listId, itemData) {
  let itemBox = document.createElement("div");
  itemBox.id = `item-${ITEM_ID}`
  ITEM_ID = ITEM_ID + 1;
  itemBox.className = "flex gap-2 p-2 expense-item";
  itemBox.innerHTML = `<input type="text" placeholder="Item" class=" outline-none text-slate-950  border-2 border-white p-2  w-2/3 expense-name" value="${itemData ? itemData.name : ''}"><input type="number" placeholder="Cost" class=" outline-none text-slate-950  border-2 border-white p-2  w-1/3 expense-cost" value="${itemData ? itemData.cost : ''}" onkeyup="totalExpense()"><button class=" bg-red-700 text-3xl rounded-full text-white w-9 h-9" onclick="removeItem('${itemBox.id}')">-</button></div>`;
  const itemList = document.querySelector(`#${listId}`);
  itemList.append(itemBox);
}

//make a function removeItems-it will remove the item and cost box when user clicks on the - sign.
function removeItem(itemId) {
  let itemRow = document.querySelector(`#${itemId}`);
  itemRow.remove();
  saveToStorage();

}

//make a function totalExpense- it will store all the costs of items ,sum the values and show the total.
function totalExpense() {
  let costElemenents = document.querySelectorAll(".expense-cost");
  let list = Array.from(costElemenents);
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += +list[i].value;
  }
  let totalCost = document.querySelector("#total-cost");
  totalCost.value = sum;
}
/*
let obj = {
  4: [{
    date: 1,
    expenses:
      [
        {
          name: "grocery",
          price: 400
        },
        {
          name: "fish",
          price: 120
        }
      ]

  }]
}
*/
function getAllExpenseData() {
  const dayContainers = document.querySelectorAll(".day-box");
  let dayArr = Array.from(dayContainers);
  const listIds = dayArr.map(d => d.id);
  const expenses = [];
  for (let i = 0; i < listIds.length; i++) {
    const expenseRow = {
      date: null,
      expenses: []
    }
    const dateNode = document.querySelector(`#${listIds[i]} .date`);
    expenseRow.date = dateNode.value;
    const expenseNodes = document.querySelectorAll(`#${listIds[i]} .expense-item`);
    const expenseElements = Array.from(expenseNodes);
    for (let i = 0; i < expenseElements.length; i++) {
      const element = expenseElements[i];
      const elementChildNodes = element.childNodes;
      let item = {
        name: elementChildNodes[0].value,
        cost: elementChildNodes[1].value,
      }
      expenseRow.expenses.push(item);
    }

    expenses.push(expenseRow);
  }
  return expenses;
}
function saveToStorage() {
  const savedData = localDataUtils.get("data");
  const expenses = getAllExpenseData();
  savedData[MONTH.id] = expenses;
  localDataUtils.set("data", savedData)
}
function renderExpenseView() {
  const data = localDataUtils.get("data");
  if (!(data && data[MONTH.id])) {
    return;
  }
  const monthData = data[MONTH.id];
  for (let i = 0; i < monthData.length; i++) {
    const item = monthData[i];
    const listId = addNewDay(item.date);
    for (let j = 0; j < item.expenses.length; j++) {
      let element = item.expenses[i];
      let name = element.name;
      let cost = element.cost;
      addItem(listId, { name, cost })
    }
  }
  totalExpense();
}

function urlParams() {
  const params = new URLSearchParams(window.location.search);
  let name = params.get("name");
  let id = params.get("id");
  MONTH = { name, id }
  let headerBox = document.querySelector(".header-box");
  let header = document.createElement("h1");
  header.className = "text-white text-xl pt-2 heading";
  header.innerHTML = `Expense Of ${name}`;
  let spanEle = document.createElement("span");
  spanEle.className = "border-2 w-40 mt-1 mb-2";
  headerBox.append(header, spanEle);
}

