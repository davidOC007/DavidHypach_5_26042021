let panier = JSON.parse(localStorage.getItem("monPanier"));

const itemsInCart = () => {
    let nombreArticleAjoutPanier = document.getElementById("navcartcounter");
    if (panier == null) {
        nombreArticleAjoutPanier.innerHTML = "(" + "0" + ")";
    } else {
        nombreArticleAjoutPanier.innerHTML = "(" + panier.length + ")";
    };
};
itemsInCart();