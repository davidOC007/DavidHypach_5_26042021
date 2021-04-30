
const camera = document.getElementById("cameras"); 
let listeProduits = 'http://localhost:3000/api/cameras' 

fetch(listeProduits)
    .then(response => 
     response.json())
    .then(data => {
        data.forEach(article => {
            camera.innerHTML += `
                <div class="card card-body col-12 col-md-6 col-lg-4 mx-auto m-2">
                    <img alt="${article.name}" class="img-fluid" src="${article.imageUrl}">
                    <h2 class="text-center">${article.name}</h2>
                    <p class="text-center">${article.price / 100} .00€</p>  
                    <p class="text-center">${article.description}</p>
                    <a href="produit.html?id=${article._id}" class="text-center text-info">Choisir cet article</a>
                </div>
                `;
        });
    }).catch(function(error) {
  console.log("error");
  alert("Erreur de connexion au serveur");
  });