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

document.querySelector('.add-image-btn').addEventListener('click', () => {
    document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.image-upload').innerHTML = '<img src="' + e.target.result + '" style="width: 50px; height: 50px; margin-right: 10px;">';
        };
        reader.readAsDataURL(file);
    }
});

document.querySelector('.submit-btn').addEventListener('click', () => {
    const image = document.querySelector('.image-upload img');
    const quantity = document.getElementById('quantity').value;

    if (image && quantity) {
        const product = {
            image: image.src,
            quantity: quantity
        };
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        window.location.href = 'index.html';
    } else {
        alert('Please fill all fields including image');
    }
});