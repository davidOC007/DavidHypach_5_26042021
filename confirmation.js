let paramsConfirmation = new URLSearchParams(window.location.search);

let nameConfirmation = document.getElementById("ordername");
let prixConfirmation = document.getElementById("orderprice");
let idConfirmation = document.getElementById("orderid");

nameConfirmation.textContent = paramsConfirmation.get("name");
prixConfirmation.textContent = paramsConfirmation.get("prix");
idConfirmation.textContent = paramsConfirmation.get("id");