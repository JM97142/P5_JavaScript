fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .catch((error) => {
        let productsContainer = document.querySelector(".cart__items");
        productsContainer.innerHTML = "Nous n'avons pas réussi à afficher le panier";
        productsContainer.style.textAlign = "center";
        productsContainer.style.padding = "30vh 0";
    })

.then(function (resultatAPI) {
    let ProduitEnregistrelocalstrorage;

if (localStorage.getItem("produit")) {
  ProduitEnregistrelocalstrorage = JSON.parse(localStorage.getItem("produit"));

    for (var i = 0; i < ProduitEnregistrelocalstrorage.length; i++) {
        let productArticle = document.createElement("article");
        document.getElementById("cart__items").appendChild(productArticle);
        productArticle.dataset.id = ProduitEnregistrelocalstrorage[i].id_Produit;
        productArticle.classList.add("cart__item");

        let productCardItemImg = document.createElement("div");
        productArticle.appendChild(productCardItemImg);
        productCardItemImg.classList.add("cart__item__img");

        let productImg = document.createElement("img");
        productCardItemImg.appendChild(productImg);
        productImg.src = ProduitEnregistrelocalstrorage[i].Produit_img;
        productImg.alt = ProduitEnregistrelocalstrorage[i].Produit_alt;

        let cartItemContent = document.createElement("div");
        productArticle.appendChild(cartItemContent);
        cartItemContent.classList.add("cart__item__content");

        let carItemContentTitlePrice = document.createElement("div");
        cartItemContent.appendChild(carItemContentTitlePrice);
        carItemContentTitlePrice.classList.add("cart__item__content__titlePrice");

        let ProductName = document.createElement("h2");
        carItemContentTitlePrice.appendChild(ProductName);
        ProductName.innerHTML = ProduitEnregistrelocalstrorage[i].nomProduit;

        let ProductPrice = document.createElement("p");
        carItemContentTitlePrice.appendChild(ProductPrice);
        ProductPrice.innerHTML = ProduitEnregistrelocalstrorage[i].prix + " €";

        let carItemContentSettings = document.createElement("div");
        cartItemContent.appendChild(carItemContentSettings);
        carItemContentSettings.classList.add("cart__item__content__settings");

        let carItemContentSettingsQuantity = document.createElement("div");
        carItemContentSettings.appendChild(carItemContentSettingsQuantity);
        carItemContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
        );

        let Quantité = document.createElement("p");
        carItemContentSettingsQuantity.appendChild(Quantité);
        Quantité.innerHTML = "Qté : ";

        let itemQuantity = document.createElement("input");
        carItemContentSettingsQuantity.appendChild(itemQuantity);
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.type = "number";
        itemQuantity.name = "itemQuantity";
        itemQuantity.min = "1";
        itemQuantity.max = "100";
        itemQuantity.value = ProduitEnregistrelocalstrorage[i].quantité;

        let carItemContentSettingsDelete = document.createElement("div");
        carItemContentSettings.appendChild(carItemContentSettingsDelete);
        carItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

        let buttonDelete = document.createElement("p");
        carItemContentSettingsDelete.appendChild(buttonDelete);
        buttonDelete.classList.add("deleteItem");
        buttonDelete.innerHTML = "Supprimer";

        buttonDelete.addEventListener("click", (e) => {
            let idProduitDelete = ProduitEnregistrelocalstrorage[i].id_Produit;
            let optionProduitdelete = ProduitEnregistrelocalstrorage[i].choixFormulaire;

        });
    }

} else {

}
});