import data from './data.js'

const itemsContainer = document.querySelector('#items');


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

addItem('shoe', 0.99);
addItem('guitar', 100.99);
addItem('pastry', 3.99);
addItem('shoe', 0.99)

function showItem() {

   const totalQuantity = getQuantity();
   console.log(`You have ${totalQuantity} items in your cart`);

   for (let i = 0; i < cart.length; i++) {
        console.log(`${cart[i].name} - ${cart[i].price} x ${cart[i].quantity}`);
   }

   const totalPrice = getTotal();
   console.log(`Your cart total is ${totalPrice}`);

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

showItem();

