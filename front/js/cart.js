if (localStorage.getItem("produit")) {
  ProduitEnregistrelocalstrorage = JSON.parse(localStorage.getItem("produit"));

    let arrayQuantity = [];
    let arrayPrice = [];
    // On crée les fiches produits dans le panier
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
        carItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");

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

        arrayQuantity.push(parseInt(ProduitEnregistrelocalstrorage[i].quantité));
      
        //quantité d'articles dans le panier et prix total
        totalQuantité = arrayQuantity.reduce(function (a, b) {
            return a + b;
        });

        arrayPrice.push(
            parseInt(ProduitEnregistrelocalstrorage[i].prix) *
            parseInt(ProduitEnregistrelocalstrorage[i].quantité)
        );

        totalPrix = arrayPrice.reduce(function (a, b) {
            return a + b;
        });

        let totalQuantity = document.getElementById("totalQuantity");
        totalQuantity.innerHTML = totalQuantité;
        let totalPrice = document.getElementById("totalPrice");
        totalPrice.innerHTML = totalPrix;

        // Supprimer un element
        supprimerSelection = Array.from(document.querySelectorAll(".deleteItem"));
        let tab = [];
        for (let i = 0; i < supprimerSelection.length; i++) {
            supprimerSelection[i].addEventListener("click", () => {
            tab = ProduitEnregistrelocalstrorage;
            tab.splice([i], 1);
            console.log(tab);

            ProduitEnregistrelocalstrorage = localStorage.setItem(
                "produit",
                JSON.stringify(tab)
            );

            window.location.href = "cart.html";
            });
        }

        // Changer la quantité
        itemQuantity.addEventListener("change", function () {
            let r2 = itemQuantity.closest("article");
            console.log(r2.getAttribute("data-id"));
            dom_id = r2.getAttribute("data-id");

            for (let k = 0; k < ProduitEnregistrelocalstrorage.length; k++) {
            const produit = ProduitEnregistrelocalstrorage[k];
            console.log(produit.quantité);
            console.log(produit.id_Produit);
                if (dom_id == produit.id_Produit) {
                produit.quantité = itemQuantity.value;

                newQuantity = JSON.stringify(ProduitEnregistrelocalstrorage);
                localStorage.setItem("produit", newQuantity);

                window.location.href = "cart.html";
                }
            }
        });

        // Formulaire
        let inputName = document.getElementById('firstName');
        let inputNameErreur = document.getElementById('firstNameErrorMsg');

        let inputLastName = document.getElementById('lastName');
        let inputLastErreur = document.getElementById('lastNameErrorMsg');

        let inputAdress = document.getElementById('address');
        let inputAdressErreur = document.getElementById('addressErrorMsg');

        let inputCity = document.getElementById('city');
        let inputCityErreur = document.getElementById('cityErrorMsg');

        let inputMail = document.getElementById('email');
        let inputMailErreur = document.getElementById('emailErrorMsg');

        // Fonction REGEX pour vérifier que l'email est valide
        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        const newOrder = document.querySelector("#order");

        newOrder.addEventListener("click", (e) => {
            // On reset les valeurs
            inputNameErreur.innerHTML = "";
            inputLastErreur.innerHTML = "";
            inputCityErreur.innerHTML = "";
            inputAdressErreur.innerHTML = "";
            inputMailErreur.innerHTML = "";
            // On vérifie les inputs du formulaire
            e.preventDefault();
            if (!inputName.value) {
                inputNameErreur.innerHTML = "Vous devez renseigner un prénom";
                e.preventDefault();
            } else if (!inputLastName.value) {
                inputLastErreur.innerHTML = "Vous devez renseigner un nom";
                e.preventDefault();
            } else if (!inputCity.value) {
                inputCityErreur.innerHTML = "Vous devez renseigner une ville";
                e.preventDefault();
            } else if (!inputAdress.value) {
                inputAdressErreur.innerHTML = "Vous devez renseigner une adresse";
                e.preventDefault();
            } else if (!inputMail.value) {
                inputMailErreur.innerHTML = "Vous devez renseigner un mail";
                e.preventDefault();
            } else if (!validateEmail(inputMail.value)) {
                inputMailErreur.innerHTML = "Vous devez renseigner un mail valide";
                e.preventDefault();
            } else {
                let produitAchete = [];
                let ProduitEnregistrelocalstrorage = JSON.parse(
                    localStorage.getItem("produit")
            );
            console.log(ProduitEnregistrelocalstrorage.id_Produit);

            for (let j = 0; j < ProduitEnregistrelocalstrorage.length; j++) {
                produitAchete.push(ProduitEnregistrelocalstrorage[j].id_Produit);
            }
      
            const order = {
                contact: {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    city: document.getElementById('city').value,
                    address: document.getElementById('address').value,
                    email: document.getElementById('email').value,
                    },
                    products: produitAchete,
            };
            localStorage.setItem(
                "newOrder",
                JSON.stringify(order)
            );
            console.log(order);

            // requete POST
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            console.log(JSON.stringify(order));
            console.log(order);

            fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    document.location.href = `confirmation.html?id=${data.orderId}`;
                })
                .catch((err) => {
                alert("Il y a eu une erreur : " + err);
                });
            }
        });
    }
}