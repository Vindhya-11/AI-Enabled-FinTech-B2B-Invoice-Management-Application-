// Cross buttons
var editModalCrossBtn = document.querySelector(".editModalCrossBtn");
var addModalCrossBtn = document.querySelector(".addModalCrossBtn");
var deleteModalCrossBtn = document.querySelector(".deleteModalCrossBtn");

// Modals
var editModal = document.querySelector(".editModal");
var addModal = document.querySelector(".addModal");
var deleteModal = document.querySelector(".deleteModal");

// Tbale buttons
var tableEditBtn = document.querySelector(".editBtn"); 
var tableAddBtn = document.querySelector(".addBtn"); 
var tableDeleteBtn = document.querySelector(".deleteBtn"); 

// Event listener to table buttons
editModalCrossBtn.addEventListener("click", () => modalCrossEvent(editModal))
tableEditBtn.addEventListener("click", () => modalCrossEvent(editModal))

addModalCrossBtn.addEventListener("click",() => modalCrossEvent(addModal))
tableAddBtn.addEventListener("click",() => modalCrossEvent(addModal))

deleteModalCrossBtn.addEventListener("click", () => modalCrossEvent(deleteModal))
tableDeleteBtn.addEventListener("click", () => modalCrossEvent(deleteModal))


function modalCrossEvent(m){
    m.classList.toggle("hide");
}


