import data from './data.js'

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartTotal = document.getElementById('cart-total')
const cartquantity = document.getElementById('cart-qty')
itemList.innerHTML = '<li>Your cart is empty</li>'
cartTotal.innerHTML = '<h5> Hello World</h5>'
cartquantity.innerHTML = '<h5> Hello World</h5>'


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

function addItem(name, price) {

    for (let i = 0; i < cart.length; i += 1) {

        if(cart[i].name === name) {
            cart[i].quantity += 1;
            return
        }
    }

    const item = {
        name,
        price,
        quantity: 1
    };
    cart.push(item);
    
}

/*
addItem('shoe', 0.99);
addItem('guitar', 100.99);
addItem('pastry', 3.99);
addItem('shoe', 0.99)*/

function showItem() {

   const totalQuantity = getQuantity();
   cartquantity.innerHTML = `You have ${totalQuantity} items in your cart: `;

   let itemStr = '';
   for (let i = 0; i < cart.length; i++) {
        const {name, price, quantity} = cart[i];
        /*itemStr += `<li>
            ${cart[i].name} 
            $${cart[i].price} x ${cart[i].quantity} = 
            $${(cart[i].price*cart[i].quantity)}
            </li>`;*/
        itemStr += `<li>
            ${name} 
            $${price} x ${cart[i].quantity} = 
            $${(price*quantity)}
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
            return
        }
    }

}

showItem();
removeItem('shoe');
showItem();


