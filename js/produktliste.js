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

  //Discount
  const price = product.price;
  const discount = product.discount;
  let finalPrice = price;

  if (discount && discount !== 0) {
    finalPrice = price - (price * discount) / 100;
    // Ændre HTML til at vise rabat og endelig pris
    copy.querySelector(".discounted").style.display = "block";
    copy.querySelector(
      ".discounted p:nth-child(2)"
    ).textContent = `${discount}% off`;
    copy.querySelector(".finalprice").textContent = `Now ${finalPrice.toFixed(
      0
    )},-`;
  } else {
    // "gemmer" rabatten, hvis den ikke er der
    copy.querySelector(".discounted").style.display = "none";
  }

  //Rund til et helt nummer
  const total = Math.round(
    product.price - (product.price / 100) * product.discount
  );

  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".articletype").textContent = product.articletype;
  copy.querySelector(".brandname").textContent = product.brandname;
  copy.querySelector(".price").textContent = product.price;
  copy.querySelector(".finalprice").textContent = `Now ${total},-`;
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  //produktet er udsolgt
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  copy
    .querySelector(".read-more")
    .setAttribute("href", `produkt.html?id=${product.id}`);
  //Appende
  document.querySelector("main").appendChild(copy);
}
