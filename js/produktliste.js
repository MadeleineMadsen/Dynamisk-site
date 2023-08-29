const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  // looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  //   console.log(product);
  //Fang template
  const template = document.querySelector("#smallProductTemplate").content;
  //Lav en kopi
  const copy = template.cloneNode(true);
  //Ændre indhold
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".subtle").textContent = product.subcategory;
  copy.querySelector(".price").textContent = product.price;
  copy.querySelector(".discounted").textContent = product.discount;
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  if (product.soldout) {
    //produktet er udsolgt
    copy.querySelector("article").classList.add("soldOut");
  }
  copy
    .querySelector(".read-more")
    .setAttribute("href", `produkt.html?id=${product.id}`);
  //Appende
  document.querySelector("main").appendChild(copy);
}
