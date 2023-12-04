let productDetail = document.querySelector(".product-detail");
let apiurl = "https://dummyjson.com/products";
let id = window.location.search.slice(4);

async function GetProductsById(id) {
  let globalData;
  await axios.get(apiurl + `/${id}`).then((result) => {
    globalData = result.data;
  });
  return globalData;
}

async function GetProductsData() {
  let product = await GetProductsById(id);
  console.log(product);

  let galleryHTML = product.images.map((imageUrl) => {
    return `<img src="${imageUrl}" class="gallery-image">`;
  }).join('');

  productDetail.innerHTML += 
    `<div class="blank">
      <div class="cards">
        <div class="product"> 
          <div class="gallery">${galleryHTML}</div>
          <h6 class="title">${product.title}</h6>
          <div class="info"><span class="text">${product.description}</span></div>
          <div class="price"><span>${product.price}</span></div> 
        </div>
      </div>
    </div>`;
}

GetProductsData();
