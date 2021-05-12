const displayCart = document.getElementById("panierachat") 
let cart = JSON.parse(localStorage.getItem("cart"));


if (cart.length > 0) {
for (let produit of cart) { 

            displayCart.innerHTML += `
            <div class="row m-2 ligne-produit pt-2 border-top border-dark">
                <div class="col-lg-3">
                    <img alt="${produit.name}" class="img-fluid img-thumbnail" src="${produit.image}">
                </div>
                <div class="col-lg-5">
                    <h2 class="mb-2">${produit.name}</h2>
                    <p class="prixProduitPanier" id='${produit.name}total'><strong>Prix unitaire : <span class='chiffre-prix'>${produit.price.toFixed(2)} €</span></strong></p>   
                    <i class="fa fa-trash"></i> 
                </div>
                
        `; 
       

    }

// Disparition du formulaire si le panier est vide
} else {
    document.getElementById("formulaire").style.display = "none";
    displayCart.innerHTML = `
    <p class="emptycartmsg"> Votre panier de commande est vide. Vous pouvez retourner à l'accueil pour effectuer votre sélection.</p>
    `;  
};

// Suppression d'un article
let boutonSuppressionArticle = document.getElementsByClassName ("fa-trash")
for (let i = 0; i < boutonSuppressionArticle.length; i++) {
    let supprimer = boutonSuppressionArticle[i]
    supprimer.addEventListener ("click", function(event) {
        let supprimerArticle = event.target
        supprimerArticle.parentElement.parentElement.remove()
        suppressionArticle(event.target.id)
    });
}

// Fonction de suppression d'un article
function suppressionArticle(i) {
    cart.splice(i, 1);  
    localStorage.clear();
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

  // Total de la commande
  let total = [];

  if (cart == null) {
  } else {
    for (let j = 0; j < cart.length; j++) {
      let productPrice =
        cart[j].price;
      total.push(productPrice);
    }
  }

 
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = total.reduce(reducer, 0);

let prixTotal = document.getElementsByClassName("prix-total")[0];
 prixTotal.innerText = "Total de votre commande : " + totalPrice  + ".00 €"; 



// FORMULAIRE

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");


let regexName = /^[a-zA-ZÀ-ÿ-\s]+$/;
let regexAddress = /[0-9a-zA-Z]{1,3}[a-z ,.'-]+$/;
let regexCity = /^^[a-zA-Z ,.'-]+$/;
let regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;

// Conditions de validation des champs du formulaire 
form.addEventListener("submit", function(event) {
    if(regexName.test(firstName.value) == false) {
        event.preventDefault();
        document.getElementById("invalid_firstname").innerHTML = "Veuillez saisir un prénom valide";
        
    } else if (regexName.test(lastName.value) == false) {
        event.preventDefault();
        document.getElementById("invalid_lastname").innerHTML = "Veuillez saisir un nom valide";

    } else if (regexAddress.test(address.value) == false) {
        event.preventDefault();
        document.getElementById("invalid_address").innerHTML = "Veuillez saisir une adresse valide";

        
    } else if (regexCity.test(city.value) == false) {
        event.preventDefault();
        document.getElementById("invalid_city").innerHTML = "Veuillez saisir un nom de ville valide";
           
    } else if (regexEmail.test(email.value) == false) {
            event.preventDefault();
            document.getElementById("invalid_email").innerHTML = "Veuillez saisir une adresse mail valide";
            
    // Validation du panier
    } else if (cart < 1 || cart == null) {
        event.preventDefault();
        alert("Votre panier est vide");
        return false;
    } else {
        event.preventDefault();
        // ENREGISTREMENT DU FORMULAIRE DANS L'API
        // Récupération id produits sous forme de tableau
        let products = [];
        for (var i = 0; i < cart.length; i++) {
            products.push(cart[i].id);
        };

        //Objet contact
        const commandeUser = {
            contact: {},
            products: products,
        }
        commandeUser.contact = {
            firstName : firstName.value,
            lastName : lastName.value,
            address : address.value,
            city :  city.value,
            email : email.value
        };

        // Les infos à envoyer dans l'API
        const optionsFetch = {
                headers : {
                    'Content-type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(commandeUser),
        }
        console.log(commandeUser)
        fetch("http://localhost:3000/api/cameras/order", optionsFetch).then(function(response) {
            response.json().then(function(text) {
                console.log(text.orderId);
                window.location = `confirmation.html?id=${text.orderId}&name=${firstName.value}&prix=${totalPrice}`
            });
        });
        localStorage.clear()
    }
})


