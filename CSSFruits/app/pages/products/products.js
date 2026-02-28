let cartButton;
let cartAmount;
const cartElement = document.querySelector('#cart')
const products = [
    {id: 0, name: 'Carotte', price: 1, img: '../../assets/img/products/carrot.png'},
    {id: 1, name: 'Pomme', price: 1.50, img: '../../assets/img/products/apple.png'},
    {id: 2, name: 'Banane', price: 3, img: '../../assets/img/products/banana.png'},
    {id: 3, name: 'Tomate', price: 1.75, img: '../../assets/img/products/tomato.png'},
    {id: 4, name: 'Orange', price: 2, img: '../../assets/img/products/orange.png'},
    {id: 5, name: 'Aubergine', price: 1.25, img: '../../assets/img/products/eggplant.png'},
    {id: 6, name: 'Raisin', price: 3.50, img: '../../assets/img/products/grapes.png'},
    {id: 7, name: 'Kiwi', price: 4, img: '../../assets/img/products/kiwi.png'},
    {id: 8, name: 'Onion', price: 0.50, img: '../../assets/img/products/onion.png'}
]

const productContainer = document.getElementById('product-container');
const searchbar = document.getElementById('searchbar');
searchbar.addEventListener('keyup', function (event){
    displayProduct(event.target.value);
});

/*
const searchBar = (input, product) => {
    if (input.length === 0){ return true }
    for (let i = 0; i <= input.length - 1; i++) {
        if (i > product.length) {
            return false;
        }
        if (input[i] !== product[i]) {
            return false;
        }
    }
    return true;
}
*/
const displayProduct = (input) => {
    productContainer.innerHTML = "";
    products.forEach(product => {
        if (product.name.toLowerCase().includes(input.toLowerCase())) {
            let productDiv = document.createElement('div');
            productDiv.className = 'product';

            let img = document.createElement('img');
            img.src = product.img;
            img.alt = product.name;
            productDiv.appendChild(img);

            let price = document.createElement('p');
            price.textContent = product.price + ' €';
            productDiv.appendChild(price);

            let button = document.createElement('button');
            button.onclick = function () {
                addToCart(product.id);
            };
            button.textContent = 'Ajouter au panier';
            productDiv.appendChild(button);

            productContainer.appendChild(productDiv);
        }
    });
    addInvisibleChildren(productContainer)
}

const addInvisibleChildren = (container) =>{
    let lines = container.children
    if (lines.length %3 === 0){
        return;
    }
    if (lines.length-2 %3 === 0 || lines.length-2 <= 0){
        let productDiv = document.createElement('div');
        productDiv.className = 'gap-product';
        let productDiv1 = document.createElement('div');
        productDiv1.className = 'gap-product';
        container.appendChild(productDiv);
        container.appendChild(productDiv1);
        return;
    }
    if (lines.length-1 %3 === 0 || lines.length-1 <= 0){
        let productDiv = document.createElement('div');
        productDiv.className = 'gap-product';
        container.appendChild(productDiv);
    }
}
displayProduct("");

// Cart Logic

let isLoggedOn = true;
let cartIcon = document.createElement('a');
cartIcon.href = "javascript:function()";
cartIcon.textContent = "Panier";
cartIcon.id="cartIcon";

id = sessionStorage.getItem("id");
//document.getElementById("connect-button").replaceWith(cartIcon);

let cart = [

];
const animateCart = () => {
    cartButton.classList.add('cartIconAnimation')
    setTimeout(() => {
        cartButton.classList.remove('cartIconAnimation')
    }, 300)
}

const updateCartAmount = () => {

}
let addToCart = (id) =>{
    if(isLoggedOn){
        let item = products.find(item => item.id === id);
        let cartItem = cart.find(cartItem => cartItem.id === id);
        if(cartItem){
            cartItem.quantity++;
            displayCart();
        } else {
            cart.push({...item, quantity: 1});

            displayCart();
        }
        animateCart();
        cartAmount.textContent = parseInt(cartAmount.textContent)+1
    } else {
        alert("Veuillez vous connecter pour ajouter des produits");
    }
}

let removeFromCart = (id) =>{
    let cartItem = cart.find(cartItem => cartItem.id === id);
    if(cartItem.quantity >= 1){
        cartItem.quantity--;
        displayCart();
        cartAmount.textContent = parseInt(cartAmount.textContent)-1
    }
    if(cartItem.quantity === 0){
        cart = cart.filter(item => item.id !== id);
        displayCart();
    }
}

function displayCart() {
    let tableBody = document.querySelector('#cart tbody');

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    if (cart.length === 0) {
        let row = document.createElement('tr');
        let cell = document.createElement('td');
        cell.textContent = 'Le panier est vide';
        cell.setAttribute('colspan', '3');
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    let totalCost = 0; // initialize total cost of all items in the cart

    for (let item of cart) {
        let row = document.createElement('tr');

        let nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        let priceCell = document.createElement('td');
        priceCell.textContent = item.price + "€";
        row.appendChild(priceCell);

        let quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        let buttonCell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.onclick = function() { removeFromCart(item.id)}
        removeButton.textContent = '-';
        buttonCell.appendChild(removeButton);
        row.appendChild(buttonCell);

        totalCost += item.price * item.quantity;

        tableBody.appendChild(row);
    }

    let totalRow = document.createElement('tr');

    let totalTextCell = document.createElement('td');
    totalTextCell.textContent = 'Total';
    totalTextCell.setAttribute('colspan', '2');
    totalRow.appendChild(totalTextCell);

    let totalValueCell = document.createElement('td');
    totalValueCell.textContent = '€' + totalCost.toFixed(2);
    totalRow.appendChild(totalValueCell);

    tableBody.appendChild(totalRow);
}

displayCart();
cartElement.hidden = true

setTimeout(() => {
    cartAmount = document.querySelector('#cartAmount');
    cartButton = document.querySelector('#cartIcon');
    cartAmount.hidden = false;
    cartButton.hidden = false;
    cartButton.addEventListener('click', () => {
        cartElement.hidden = !cartElement.hidden
    })
}, 100)
