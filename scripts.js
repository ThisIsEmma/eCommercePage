import data from './data.js'

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartTotal = document.getElementById('cart-total')
const cartquantity = document.getElementById('cart-qty')
itemList.innerHTML = '<li>Your cart is empty</li>'
cartTotal.innerHTML = '<h5></h5>'
cartquantity.innerHTML = '<h5></h5>'


for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
    //Added Title to each cards
    const titleParagraph = document.createElement('h2')
    titleParagraph.innerText = data[i].name;
    //Create paragraph element for description and price:
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.innerText = data[i].desc;
    const priceParagraph = document.createElement('p');
    priceParagraph.innerText = data[i].price;
    //create a button element for 'Add to cart'
    const addToCartBtn = document.createElement('button')
    //Add an ID to each btn
    addToCartBtn.id = data[i].name;
    addToCartBtn.dataset.price = data[i].price;
    addToCartBtn.innerHTML = 'Add to cart';
    
	// Add the image to the div
	newDiv.appendChild(img);
    //Add to H2 to the div
    newDiv.appendChild(titleParagraph)
    // Add the price p to the div
    newDiv.appendChild(descriptionParagraph);
    // Add the price p to the div
    newDiv.appendChild(priceParagraph);
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
    //Add the button 'Add to Cart' to the div
    newDiv.appendChild(addToCartBtn);
    
};

const all_items_button = Array.from(document.querySelectorAll("button"));

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItem()
  }))


let cart = [];

//Handle Change evts to update input
itemList.onchange = function(evt) {
    if(evt.target && evt.target.classList.contains('update-quantity')) {
        const name = evt.target.dataset.name;
        const qty = parseInt(evt.target.value);
        updateCart(name,qty);
    }
}


//Handle cart events
itemList.onclick = function(evt) {
    if (evt.target && evt.target.classList.contains('remove')){
        const name = evt.target.dataset.name;
        removeItem(name);
    } else if (evt.target && evt.target.classList.contains('add-one')) {
        const name = evt.target.dataset.name;
        addItem(name);
    } else if (evt.target && evt.target.classList.contains('remove-one')) {
        const name = evt.target.dataset.name;
        removeItem(name, 1);
    }
}

//Functions
function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if(cart[i].name === name) {
            cart[i].quantity += 1;
            showItem()
            return
        }
    }
    const item = {
        name,
        price,
        quantity: 1
    };
    cart.push(item); 
    console.log(`One ${item.name} has been added`)
}

function showItem() {

   const totalQuantity = getQuantity();
   cartquantity.innerHTML = `You have ${totalQuantity} items in your cart: `;

   let itemStr = '';
   for (let i = 0; i < cart.length; i++) {
        const {name, price, quantity} = cart[i];
        itemStr += `<li>
            ${name} 
            $${price} x ${quantity} = 
            $${(price*quantity)}
            <button class= "remove" data-name="${name}">remove item</button>
            <button class= "add-one" data-name="${name}">+</button>
            <button class= "remove-one" data-name="${name}">-</button>
            <input class= "update-quantity" type="number" data-name="${name}">
            </li>`;

   }
   itemList.innerHTML = itemStr;
   const totalPrice = getTotal();
   cartTotal.innerHTML = `Cart total: ${totalPrice}`

}

function getQuantity() {
    let totalItems = 0;
    cart.forEach((item) => totalItems += item.quantity);
    return totalItems;
}

function getTotal() {
    let totalPrice = 0;
    cart.forEach((item) => totalPrice += (item.quantity * item.price));
    return totalPrice.toFixed(2);
}

function removeItem(name, qty = 0) {
    for(let i = 0; i<cart.length; i++){
        if(cart[i].name === name){
            if(qty > 0){
                cart[i].quantity -= 1;
                console.log(`1 ${name} has been removed.`)
            }
            if(cart[i].quantity < 1 || qty === 0){
                cart.splice(i,1)
            }
            showItem();
            return
        }
    }
}

function updateCart(name,qty) {
    for(let i = 0; i<cart.length; i++){
        if(cart[i].name === name){
            if(qty < 1){
                removeItem(name);
                return
            }
            cart[i].quantity = qty;
            showItem()
            return
        }
    }
}

