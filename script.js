fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        console.log(data.products);
        data.products.forEach(product => {
            loadProducts(product);
        });
    })
    .catch(err => console.error(err));

function loadProducts(data) {
    var item = document.createElement('li');
    item.innerHTML = ` 
    <div class="cards">
    <div class="product" > 
        <img src="${data.images[0]}">
        <h6 class="info">${data.title}</h6>
        <div class="info"> <span class="text">${data.description}</span> </div>
        <div class="price"> <span>${data.price} </span></div> 
    </div>
</div>
`;

    document.getElementById('home_product').appendChild(item);
}

