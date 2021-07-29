const table = document.querySelector(".main-table")
const pgRight = document.querySelector(".paginationRightBtn")
const pgLeft = document.querySelector(".paginationLeftBtn")

fetch("/H2HBABBA2718/fetch")
.then(function(res){
  return res.json();
})
.then(function(d){
  
  var data = d;

  var state = {
    querySet: data,
    page: 1,
    rows: 11,
    pages: Math.ceil(data.length/11)
  }
  

init();

  function init(){
      addTableHeaders();
      addTableData();
      checkboxSelection();
      checkDueDate();
      checkBoxSelected();
  }
  
  function pagination(querySet, page, rows){
    var trimStart = (page-1)*rows
    var trimEnd = trimStart + rows
  
    var trimmedData = querySet.slice(trimStart, trimEnd)
  
    var pages = Math.ceil(querySet.length / rows)

    return {
      'querySet': trimmedData,
      'pages': pages
    }
  }
  
  function addTableHeaders() {

    let tbHeaders = ["Customer Name", 
                      "Customer #",
                      "Invoice #",
                      "Invoice Amount",
                      "Due Date",
                      "Predicted Payment Date",
                      "Notes"]

    let tbhead = "<thead><tr><th><input type='checkbox' class='mainCheckBox'/></th>";

    let tbbody = "<tbody>"

    tbHeaders.forEach((h) => {
        let s = "<th>" + h + "</th>"
        tbhead += s
    })

    tbhead += "</tr></thead>"
    table.innerHTML = tbhead;
  }
  
  function addTableData(){
    var data = pagination(state.querySet, state.page, state.rows)
    var list = data.querySet
    let keys = ["name_customer", "cust_number", "invoice_id", "total_open_amount", "due_in_date", "delay_predicted", "notes"];
    let tbody = "<tbody>"
    list.forEach((row) => {
      tbody+= "<tr><td><input type='checkbox' class='dataCheckBox' /></td>";
      keys.forEach((key)=>{
        var value = row[key];
        if(!(value)) {
          value = '--'
        }
        tbody += `<td class="${key}">` + value + '</td>';
      })
      tbody += "</tr>"
    })
    tbody += "</tbody>";
    table.innerHTML += tbody;
  }

  pgRight.addEventListener("click", pageInc)
  pgLeft.addEventListener("click", pageDec)

  function pageInc(){
    if(state.page < state.pages){
      state.page+=1
      pgRight.classList.remove("btn-disabled")
      pgLeft.classList.remove("btn-disabled")
    } else {
      pgRight.classList.add("btn-disabled")
    }
    table.innerHTML = ""
    addTableHeaders()
    addTableData()
    checkboxSelection()
    checkDueDate();
  }

  function pageDec(){
    if(state.page > 1){
      state.page-=1
      pgRight.classList.remove("btn-disabled")
      pgLeft.classList.remove("btn-disabled")
    } else {
      pgLeft.classList.add("btn-disabled")
    }
    table.innerHTML = ""
    addTableHeaders()
    addTableData()
    checkboxSelection()
    checkDueDate();
  }



  // Checkboxes

function checkboxSelection(){
  const mainCheckBox = document.querySelector(".mainCheckBox")
  const dataCheckBoxes = document.querySelectorAll(".dataCheckBox")
  // console.log(mainCheckBox)
  // console.log(dataCheckBoxes)
  mainCheckBox.addEventListener("click", function(){
    console.log(mainCheckBox.checked)
    if(mainCheckBox.checked == true){
      dataCheckBoxes.forEach((row)=> {
        row.checked = true;
      })
    } else {
      dataCheckBoxes.forEach((row)=> {
        row.checked = false;
      })
    }
  })
}

function checkDueDate(){
  var today = new Date(Date.now());
  // console.log(today);
  var dueDates = document.querySelectorAll(".due_in_date");
  // console.log(dueDates)
  dueDates.forEach((date) => {
    // console.log(date.textContent)
    var dd = new Date(date.textContent);
    if(dd - today < 1){
      date.style.color = "#FF5E5E";
    }
  })
}

var selectedRows = [];

function checkBoxSelected(){
  var dataCheckboxes = document.querySelectorAll(".dataCheckBox");

  dataCheckboxes.forEach(function(ele){
    ele.addEventListener("change", function(){
      if(this.checked){
        selectedRows.push(ele.parentElement.parentElement);
      }
      console.log(selectedRows[0])
    
  


  if(selectedRows.length >= 1){
    var editBtn = document.querySelector(".editBtn");
    var deleteBtn = document.querySelector(".deleteBtn");

    editBtn.disabled = false;
    deleteBtn.disabled = false;
  }
})})

}
// const addInp = document.querySelectorAll(".addInp input")

const snackbar = () => {
    var x = document.querySelector(".snackbar");
    
    x.classList.remove("hide")
    x.classList.add("show")
    setTimeout(function(){
        x.classList.add("hide")
        x.classList.remove("show")
    }, 3000);
}



const add = () => {
  const name_customer =  document.getElementById("customerNameInp").value;
  const cust_number =  document.getElementById("customerNumberInp").value;
  const invoice_id =  document.getElementById("invoiceNoInp").value;
  const total_open_amount =  document.getElementById("invoiceAmountInp").value;
  const due_in_date = document.getElementById("dueDateInp").value;
  const notes =   document.getElementById("notesInp").value;
  console.log(due_in_date);
  if(name_customer == "" || cust_number == "" || invoice_id == "" || total_open_amount == "" || due_in_date == ""){
    snackbar();
  } else {

  

  fetch(`/H2HBABBA2718/add?name_customer=${name_customer}&cust_number=${cust_number}&invoice_id=${invoice_id}&total_open_amount=${total_open_amount}&due_in_date=${due_in_date}&notes=${notes}`,
  {
    method: 'POST'
  }
  ).then(function(){
    init();
  })
}
}


const addSaveBtn = document.getElementsByClassName("addSaveBtn")[0];
addSaveBtn.addEventListener("click", add);

const edit = () => {
 let total_open_amount = document.querySelector(".editModalForm #invoiceInput").value;
 let notes = document.querySelector(".editModalForm #editNotes").value;

  
  selectedRows.forEach((ele)=>{
console.log(total_open_amount, notes);

    let invoice_id =  ele.querySelector(".invoice_id").textContent;
    let toa =  ele.querySelector(".total_open_amount").textContent;
    let n =  ele.querySelector(".notes").textContent;

    if(total_open_amount == ""){
      total_open_amount = toa;
    }
    if(notes == ""){
      notes = n;
    }

    console.log(invoice_id, total_open_amount, notes);
  
    fetch(`/H2HBABBA2718/edit?invoice_id=${invoice_id}&total_open_amount=${total_open_amount}&notes=${notes}`, {
      method: 'POST'
    }
    ).then(function(){
      selectedRows = [];
      init();
    });
})
}

const editSaveBtn = document.getElementsByClassName("editSaveBtn")[0];
editSaveBtn.addEventListener("click", edit);


const deleteData = () => {
  selectedRows.forEach((ele) => {

     let invoice_id =  ele.querySelector(".invoice_id").textContent;

     fetch(`/H2HBABBA2718/delete?invoice_id=${invoice_id}`,
     {
      method: 'POST'
    }
     ).then(function(){
       selectedRows = [];
       init();
     });
     
  })
}

const ModalDeleteBtn = document.getElementsByClassName("ModalDeleteBtn")[0];
ModalDeleteBtn.addEventListener("click", deleteData);

})
.catch(function(){
  console.log("Error! Could not load data");
})