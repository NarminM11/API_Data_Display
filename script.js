var row = document.querySelector(".loadProduct");
var currentPage = 1;
var perPageProducts = 10;
var categorySelect = document.getElementById("categorySelect");

fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    displayProducts(data.products);
  })
  .catch((err) => console.error(err));

function loadProducts(data) {
  row.innerHTML += `
        <div class="blank">
          <a href="details.html?id=${data.id}" class="btn">
            <div class="cards">
              <div class="product" > 
                <img src="${data.images[0]}">
                <h6 class="title">${data.title}</h6>
                <div class="info"> <span class="text">${data.description}</span> </div>
                <div class="price"> <span>${data.price} </span></div> 
              </div>
            </div>
          </a>
        </div>`;
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
function displayProducts(products) {
  var startingPosition = (currentPage - 1) * perPageProducts;
  var endingPosition = startingPosition + perPageProducts;
  var displayedProducts = products.slice(startingPosition, endingPosition);

  row.innerHTML = "";
  displayedProducts.forEach((product) => {
    loadProducts(product);
  });
}

// function fetchProducts() {
//   fetch("https://dummyjson.com/products")
//     .then((response) => response.json())
//     .then((data) => {
//       displayProducts(data.products);
//     })
//     .catch((err) => console.error(err));
// }
// function nextPage() {
//   currentPage++;
//   fetchProducts();
// }

// function previPage() {
//   if (currentPage > 1) {
//     currentPage--;
//     fetchProducts();
//   }
// }


// // Fetch categories and populate the dropdown
// fetch('https://dummyjson.com/products/categories')
//   .then(response => response.json())
//   .then(categories => {
//     categories.forEach(category => {
//       var option = document.createElement("option");
//       option.value = category.toLowerCase();
//       option.text = category;
//       categorySelect.add(option);
//     });
//   })
//   .catch(err => console.error(err));
//   // fetchAndLoadProducts();

//   function filterProductsByCategory() {
//     var selectedCategory = categorySelect.value.toLowerCase();
  
//     fetch('https://dummyjson.com/products')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Fetched data:', data);
  
//         if (selectedCategory !== 'all') {
//           // Filter products based on the selected category
//           console.log('All products:', data.products);
//           var filteredProducts = data.products.filter(product =>
//             product.categories && product.categories.includes(selectedCategory)
//           );
//           console.log('Filtered products:', filteredProducts);
//           loadProducts(filteredProducts);
//         } else {
//           // Load all products if 'All Categories' is selected
//           loadProducts(data.products);
//         }
//       })
//       .catch(err => console.error(err));
//   }
  