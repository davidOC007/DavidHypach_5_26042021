
const params = new URLSearchParams(window.location.search)
const itemId = params.get("id")

const descriptionProduit = document.getElementById("produit")

const listeProduits = 'http://localhost:3000/api/cameras' 

fetch(listeProduits + '/' + itemId)
    .then(response => 
        response.json())
    .then(data => {
        //--Ecriture du HTML dans le DOM
        descriptionProduit.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                </div>
                <div class="card col-12 col-lg-4 pb-3">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <form>
                        <div class="col-auto my-1 pb-5 mt-4">
                        <label for="lense-select">Objectif: </label>
                        <select class="options__select" name="lenses" id="lense_select" required >
                            <option value="">--Taille de lentille--</option>
                        </select>       
                        </div>
                        <p><strong>Prix total</strong> : <span id="totalPrice">${data.price /100}</span> .00€</p>
                        <button id="boutonAjout" type="button" class="btn btn-secondary">Ajouter au panier</button>
                    </form>   
                </div>
                `;

// Ajout de l'option lentilles
  for (let i = 0; i < data.lenses.length ; i++ ){
    const option = document.createElement("option");              
    option.value = `${data.lenses[i]}`;                           
    option.innerHTML = `${data.lenses[i]}`;                     
    document.getElementById("lense_select").appendChild(option);
  };
  


        const ajoutPanier = document.getElementById('boutonAjout');
        ajoutPanier.addEventListener('click', function() {
            ajoutAuPanier()
        });

    function ajoutAuPanier() { 

// variable produit ajouté au panier 
                    let produitAjoute = {
                        name: data.name,
                        id: data._id,
                        quantity: 1,
                        image: data.imageUrl,
                        price: data.price / 100,
                        total: data.price / 100
                    };
                                           
// creation de l'evenement 'ajouter au panier'  
        let panier = JSON.parse(localStorage.getItem("monPanier"));
        if (!panier) { console.log(panier = []) } ;  //initialisation du panier s'il n'exite pas encore
         
// fonction popup confirmation
        const popupConfirmation =() => {
            if(window.confirm(`L'appareil ${data.name} a été ajouté au panier. Cliquez sur OK pour consulter le panier ou ANNULER pour revenir à l'accueil`)){
            window.location.href = "panier.html";
             } else {
            window.location.href = "index.html";
             }
            }

        let produitPresent = panier.find(data => data.name == produitAjoute.name); 
        if (produitPresent){ 
            produitPresent.quantity ++;
            produitAjoute.total = produitAjoute.price * produitPresent.quantity
            localStorage.setItem('monPanier', JSON.stringify(panier));
          //  alert (`Votre produit a bien été ajouté au panier`)
            console.log (panier)
            popupConfirmation();          
                                    
        } else { 
            panier.push(produitAjoute);  
            localStorage.setItem('monPanier', JSON.stringify(panier));                                
            //alert (`Votre produit a bien été ajouté au panier`)
            console.log(panier) 
            popupConfirmation();         
        };                                
    }
});


