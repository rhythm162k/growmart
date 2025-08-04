document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

document.querySelector('.lang-btn').addEventListener('click', () => {
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn.textContent === 'EN') {
        langBtn.textContent = 'BN';
    } else {
        langBtn.textContent = 'EN';
    }
});

document.querySelector('.add-btn').addEventListener('click', () => {
    window.location.href = 'add-product.html';
});

window.addEventListener('load', () => {
    // Mock category (replace with actual category from another page, e.g., via localStorage or query param)
    const category = localStorage.getItem('selectedCategory') || 'Potato';
    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="Product Image">
            <div class="details">
                <div>image</div>
                <div>name: ${category}</div>
                <div>Quantity: ${product.quantity}</div>
            </div>
        `;
        document.querySelector('.product-list').appendChild(productItem);
    });
});