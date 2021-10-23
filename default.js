itemCount = 0;
stockItems = [];

window.onload=add_eventhandlers;

function add_eventhandlers() {
  var buttons = document.getElementById("add_form");
  buttons.addEventListener("click", createAddForm);
}

function createAddForm() {
    let writing1 = document.createElement("label");
    let writing2 = document.createElement("label");
    let writing3= document.createElement("label");

    writing1.appendChild(document.createTextNode("Item Code: "))
    writing2.appendChild(document.createTextNode("Item Name: "))
    writing3.appendChild(document.createTextNode("Item Price: "))

    let itemNumber = document.createElement("input");
    itemNumber.setAttribute("value",itemCount);
    itemNumber.setAttribute("disabled", "disabled");
    itemNumber.setAttribute("id", "itemNumber" );
    itemNumber.setAttribute("number", itemCount);
    let itemName = document.createElement("input");
    itemName.setAttribute("id", "itemName" );
    let itemPrice = document.createElement("input");
    itemPrice.setAttribute("id", "itemPrice" );

    let SubmitButton = document.createElement("button");
    SubmitButton.appendChild(document.createTextNode("Add Item"));

    SubmitButton.addEventListener("click", addItem);
    let form = document.getElementById("add_item");
    form.appendChild(writing1);
    form.appendChild(itemNumber);
    form.appendChild(writing2);
    form.appendChild(itemName);
    form.appendChild(writing3);
    form.appendChild(itemPrice);
    form.appendChild(SubmitButton);
    form.appendChild(document.createElement("br"));


}

function addItem() {
  itemCount++;
  let itemNumber = document.getElementById("itemNumber").value;
  let itemName = document.getElementById("itemName").value;
  let itemPrice = document.getElementById("itemPrice").value;

  stockItems[itemNumber] = [];
  stockItems[itemNumber][0] = itemName;
  stockItems[itemNumber][1] = itemPrice;

   generateTable();
  let itembox = document.getElementById("itemNumber");
  itembox.value = itemCount;

  document.getElementById("itemName").value="";
  document.getElementById("itemPrice").value="";
 
}

function generateTable() {
  let table = document.getElementById("table_items");

  let bbody = document.getElementById("bbody");
  table.removeChild(bbody);
  
  let body = document.createElement("tbody");
  body.setAttribute("id", "bbody");
  table.appendChild(body);

  if (itemCount ==1) {  
    table.removeAttribute("class");
}

for (let i=0; i < stockItems.length ; i++) {
  let itemNumber = i;
  let item = document.createElement("tr");

  let Code = document.createElement("td");
  Code.appendChild(document.createTextNode(i));

  let Name = document.createElement("td");
  Name.appendChild(document.createTextNode(stockItems[itemNumber][0]))

  let Price = document.createElement("td");
  Price.appendChild(document.createTextNode(stockItems[itemNumber][1]));

  let Edit_cell = document.createElement("td");
  let Edit = document.createElement("button");
  Edit.appendChild(document.createTextNode("Edit"));
  Edit.addEventListener("click", function() {createEditForm(itemNumber)});
  Edit_cell.appendChild(Edit);

  let Delete_cell = document.createElement("td");
  let Delete = document.createElement("button");
  Delete.appendChild(document.createTextNode("Delete"))
  Delete.addEventListener("click", function(){deleteItem(itemNumber)} );
  Delete_cell.appendChild(Delete);

  item.appendChild(Code);
  item.appendChild(Name);
  item.appendChild(Price);
  item.appendChild(Edit_cell);
  item.appendChild(Delete_cell);

  body.appendChild(item);
}
}

function createEditForm(itemNumber) {
  let writing1 = document.createElement("label");
  let writing2 = document.createElement("label");
  let writing3= document.createElement("label");

  writing1.appendChild(document.createTextNode("Item Code: "))
  writing2.appendChild(document.createTextNode("Item Name "))
  writing3.appendChild(document.createTextNode("Item Price: "))

  let itemNumberfield = document.createElement("input");
  itemNumberfield.setAttribute("value",itemNumber);
  itemNumberfield.setAttribute("disabled", "disabled");
  itemNumberfield.setAttribute("id", "itemNumber" );

  let itemName = document.createElement("input");
  itemName.setAttribute("id", "EditeditemName" );
  itemName.setAttribute("value", stockItems[itemNumber][0]);

  let itemPrice = document.createElement("input");
  itemPrice.setAttribute("id", "EditeditemPrice" );
  itemPrice.setAttribute("value", stockItems[itemNumber][1]);

  let SubmitButton = document.createElement("button");
  SubmitButton.appendChild(document.createTextNode("Add Item"));

  let form = document.getElementById("edit_item");
  form.appendChild(writing1);
  form.appendChild(itemNumberfield);
  form.appendChild(writing2);
  form.appendChild(itemName);
  form.appendChild(writing3);
  form.appendChild(itemPrice);
  form.appendChild(SubmitButton);

  SubmitButton.addEventListener("click", function() {editItem(itemNumber); 
  form.removeChild(writing1);
  form.removeChild(itemNumberfield);
  form.removeChild(writing2);
  form.removeChild(itemName);
  form.removeChild(writing3);
  form.removeChild(itemPrice);
  form.removeChild(SubmitButton);
  });
}

function editItem(itemNumber) {
  console.log(itemNumber);

  let itemName = document.getElementById("EditeditemName").value;
  let itemPrice = document.getElementById("EditeditemPrice").value;

  stockItems[itemNumber][0] = itemName;
  stockItems[itemNumber][1] = itemPrice;

   generateTable();
}


function deleteItem(itemNumber) {
  for (let i =itemNumber; i< stockItems.length-itemNumber ; i++) {

    stockItems[i] = stockItems[i+1];
  }
  stockItems.length--;
  
  for (let i =0; i< stockItems.length ; i++) {
    console.log(stockItems[i][0]);
  }

  generateTable();
  itemCount--;
  console.log(itemCount);

  let itembox = document.getElementById("itemNumber");

  itembox.value= itemCount;
}
