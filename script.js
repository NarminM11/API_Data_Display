var row = document.querySelector(".loadProduct");

function loadProducts(data) {
    row.innerHTML += `
        <div class="blank">
            <a href="details.html?id=${data.id}" class="btn">
                <div class="cards">
                    <div class="product">
                        <img src="${data.images[0]}">
                        <h6 class="title">${data.title}</h6>
                        <div class="info"><span class="text">${data.description}</span></div>
                        <div class="price"><span>${data.price}</span></div>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function searchProducts() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    row.innerHTML = "";

    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            data.products.forEach(product => {
                if (product.title.toLowerCase().includes(searchInput)) {
                    loadProducts(product);
                }
            });
        })
        .catch(err => console.error(err));
}

let submitBtn = document.getElementsByClassName('sbutton')[0];
submitBtn.addEventListener('click', searchProducts);

fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        data.products.forEach(product => {
            loadProducts(product);
        });
    })
    .catch(err => console.error(err));
