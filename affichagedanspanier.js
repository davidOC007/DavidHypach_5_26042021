let cart = JSON.parse(localStorage.getItem("cart"));

const itemsInCart = () => {
    let nbrProductInCart = document.getElementById("navcartcounter");
    if (cart == null) {
        nbrProductInCart.innerHTML = "(" + "0" + ")";
    } else {
        nbrProductInCart.innerHTML = "(" + cart.length + ")";
    };
};
itemsInCart();
