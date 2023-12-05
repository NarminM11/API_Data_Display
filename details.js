let productDetail = document.querySelector(".product-detail");
let apiurl = "https://dummyjson.com/products";
let id = window.location.search.slice(4);

async function loadProductDataById(id) {
  let productData;
  await axios.get(apiurl + `/${id}`).then((result) => {
    productData = result.data;
  });
  return productData;
}

async function loadProductDetails() {
  let product2 = await loadProductDataById(id);
  console.log(product2);

  let galleryHTML = product2.images
    .map((imageUrl) => {
      return `<img src="${imageUrl}" class="gallery-image">`;
    })
    .join("");

  productDetail.innerHTML += `<div class="blank">
      <div class="cards">
        <div class="product"> 
          <div class="gallery">${galleryHTML}</div>
          <h6 class="title">${product2.title}</h6>
          <p class="discount">Discount:${product2.discountPercentage}%<p>
          <p class="category">Category: ${product2.category}</p>
          <p class="stock">Stock: ${product2.stock}</p>
          <div class="info"><span class="text">${product2.description}</span></div>
          <div class="price"><span>${product2.price}</span></div> 
        </div>
      </div>
    </div>`;
}

loadProductDetails();
