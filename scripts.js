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
    // Add the price p to the div
    newDiv.appendChild(descriptionParagraph);
    // Add the price p to the div
    newDiv.appendChild(priceParagraph);
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
    //Add the button 'Add to Cart' to the div
    newDiv.appendChild(addToCartBtn);
};