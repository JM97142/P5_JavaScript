// On récupère l'id du produit dans l'URL de l'API
function getProduct() {
  var str = document.URL;
  var url = new URL(str);
  var search_params = new URLSearchParams(url.search);
  if (search_params.has("id")) {
    var ProductUrl =
      "http://localhost:3000/api/products/" + search_params.get("id");
  }
  fetch(ProductUrl)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      // si il n'y a pas de produit dans le panier
      let productsContainer = document.querySelector(".item");
      productsContainer.innerHTML =
        "Nous n'avons pas réussi à afficher les canapés";
      productsContainer.style.textAlign = "center";
      productsContainer.style.padding = "30vh 0";
    })

    // DOM
    .then(function (resultatAPI) {
      // On crée la fiche du produit correspondant
      const articles = resultatAPI;
      let productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.src = articles.imageUrl;
      productImg.alt = articles.altTxt;

      let productTitle = document.getElementById("title");
      productTitle.innerHTML = articles.name;

      let productPrice = document.getElementById("price");
      productPrice.innerHTML = articles.price;

      let productDescription = document.getElementById("description");
      productDescription.innerHTML = articles.description;

      select = document.getElementById("colors");
      // On récupère chaque valeur de couleur disponible
      for (let index in articles.colors) {
        i = articles.colors[index];
        var opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
      }

      const btn = document.getElementById("addToCart");
      // On ajoute l'évènement click au bouton
      btn.addEventListener("click", (e) => {
        // On récupère le choix de la couleur
        const choixFormulaire = select.value;

        quantity = document.getElementById("quantity");
        // On récupère le choix de la quantité
        const quantitéFormulaire = quantity.value;
        // On vérifie qu'une quantité et qu'une couleur a ont été sélectionnés
        if (quantitéFormulaire == 0) {
          alert("Tu n'a pas choisi la quantité");
        } else if (choixFormulaire == "") {
          alert("Tu n'a pas choisi la couleur");
        } else {
          //création de la variable locale de la sélection
          let optionsProduit = {
            nomProduit: articles.name,
            id_Produit: articles._id,
            option_produit: choixFormulaire,
            quantité: quantitéFormulaire,
            prix: articles.price,
            Produit_img: articles.imageUrl,
            Produit_alt: articles.altTxt,
          };
          console.log(optionsProduit);
          // Popup confirmation de l'ajout du produit
          const popupConfirmation = () => {
            if (
              window.confirm(`L'article ${articles.name} ${choixFormulaire} est ajouté au panier
Pour consulter votre panier, cliquez sur OK`)
            ) {
              window.location.href = "cart.html";
            }
          };

          let ProduitEnregistrelocalstrorage = JSON.parse(
            localStorage.getItem("produit")
          );
          console.log(ProduitEnregistrelocalstrorage);

          // On vérifie si il y deja des produits dans le localStorage
          if (ProduitEnregistrelocalstrorage) {
            const productFind = ProduitEnregistrelocalstrorage.find(
              (el) => el.id_Produit === articles._id && el.option_produit === choixFormulaire);

            if (productFind) {
              console.log(productFind);
              let newQuantity = parseInt(optionsProduit.quantité) + parseInt(productFind.quantité);
              productFind.quantité = newQuantity;
              console.log(productFind.quantiteProduit);
              localStorage.setItem(
                "produit",
                JSON.stringify(ProduitEnregistrelocalstrorage)
              );
              console.table(ProduitEnregistrelocalstrorage);
              popupConfirmation();
            } else {
              console.log("il n'y a pas deux fois le meme produit");
              ProduitEnregistrelocalstrorage.push(optionsProduit);
              localStorage.setItem(
                "produit",
                JSON.stringify(ProduitEnregistrelocalstrorage)
              );
              console.table(ProduitEnregistrelocalstrorage);
              popupConfirmation();
            }

            // S'il n'y a pas de produit dans le localStorage
          } else {
            ProduitEnregistrelocalstrorage = [];
            ProduitEnregistrelocalstrorage.push(optionsProduit);
            localStorage.setItem(
              "produit",
              JSON.stringify(ProduitEnregistrelocalstrorage)
            );
          }
        }
      });
    });
}
getProduct();