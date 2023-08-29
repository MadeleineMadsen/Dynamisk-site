fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then(showCategories);

function showCategories(cats) {
  cats.forEach(showCategory);
}

function showCategory(cat) {
  //Fanger vores template
  const template = document.querySelector("template").content;
  //Cloner
  const clone = template.cloneNode(true);
  //Ændrer indhold
  clone.querySelector("a").textContent = cat.category;
  clone.querySelector("a").href = `produktliste.html?category=${cat.category}`;
  //Appender
  document.querySelector(".letterGroup ol").appendChild(clone);
}
