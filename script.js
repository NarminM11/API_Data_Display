var row = document.querySelector(".loadProduct");
var currentPage = 1;
var productsPerPage = 10;
var select = document.querySelector("#select_option");

let productData;
fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    productData = data.products;

    productData.map((product) => {
      loadProducts(product);
    });
  })
  .catch((err) => console.error());

function loadProducts(data) {
  row.innerHTML += `
        <div class="blank">
            <a href="details.html?id=${data.id}" class="btn">
                <div class="cards">
                    <div class="product">
                        <img src="${data.images[0]}">
                        <h6 class="title">${data.title}</h6>
                        <div class="info"><span class="text">Description: ${data.description}</span></div>
                        <div class="discount">Discount:${data.discountPercentage}%<p>
                        <div class="category">Category: ${data.category}</div>
                        <div class="stock">Stock: ${data.stock}</div>
                        <div class="price"><span>Price: ${data.price}</span></div>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function searchProducts() {
  var searchInput = document.getElementById("searchInput").value.toLowerCase();
  row.innerHTML = "";

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      data.products.forEach((product) => {
        if (product.title.toLowerCase().includes(searchInput)) {
          loadProducts(product);
        }
      });
    })
    .catch((err) => console.error(err));
}

let submitBtn = document.getElementsByClassName("sbutton")[0];
submitBtn.addEventListener("click", searchProducts);

function displayProducts(products) {
  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  var currentProducts = products.slice(startIndex, endIndex);

  row.innerHTML = "";
  currentProducts.forEach((product) => {
    loadProducts(product);
  });
}

function fetchProducts() {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data.products);
    })
    .catch((err) => console.error(err));
}
function nextPage() {
  currentPage++;
  fetchProducts();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts();
  }
}

fetch("https://dummyjson.com/products/categories")
  .then((response) => response.json())
  .then((categorydata) => {
    categorydata.map((item) => {
      select.innerHTML += `
        <option class="opt" value="${item}">${item}</option>
        `;
    });
  })
  .catch((err) => console.error(err));

function getSelectedValue() {
  var selectElement = document.getElementById("select_option");
  var selectedValue = selectElement.value;
  var filteredData = productData.filter(
    (item) => item.category === selectedValue
  );
  row.innerHTML = "";
  if (selectedValue === "all") {
    productData.map((product) => {
      loadProducts(product);
    });
  } else {
    filteredData.map((product) => {
      loadProducts(product);
    });
  }

  console.log(selectedValue);
}
