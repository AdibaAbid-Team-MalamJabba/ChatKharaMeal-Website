const cartBtn = document.querySelector('.prod-cart-btn')
const spanCartItems = document.querySelector('.span-cart')
const quantityBtn = document.querySelector('.qty-btn > input')
console.log(quantityBtn.value)
let productObj = {}

document.addEventListener('DOMContentLoaded', () => {
    // onLoad addtocart number
    addToCartNumber()

})

//this function never run on event listener, Load on windows Load.
function addToCartNumber(){
    let addToCartNumbers = localStorage.getItem('cartNumbers')
    spanCartItems.innerHTML = addToCartNumbers;
}

cartBtn.addEventListener('click',(e)=>{
    // debugger
   const title = cartBtn.parentElement.parentElement.children[1].innerHTML
   let image = cartBtn.parentElement.parentElement.parentElement.children[0].children[0].attributes[0].nodeValue
   image = image.substring(3)
   const price = parseInt (cartBtn.parentElement.parentElement.children[4].children[0].innerHTML)
    productObj={
        title,
        price,
        image
    }
console.log(cartBtn.parentElement.parentElement.children[1].innerHTML)
console.log(cartBtn.parentElement.parentElement.parentElement.children[0].children[0].attributes[0].nodeValue)

console.log(cartBtn.parentElement.parentElement.children[4].children[0].innerHTML)

addToCart(productObj)
})

function addToCart(product){
    
let inCart = parseInt(quantityBtn.value)
console.log( 'Quantity', inCart)
console.log({...product, inCart})

 //sent clicked item data
 cartNumber({...product, inCart})

}
// set numbers on addtocart span
function cartNumber(product) {
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'))
    console.log('productNumbers', productNumbers)
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + product.inCart)
        spanCartItems.innerHTML = productNumbers + product.inCart
    }
    else {
        localStorage.setItem('cartNumbers', 1)
        spanCartItems.innerHTML = 1
    }
    setItems(product)
}

function setItems(products){
    let cartItem = localStorage.getItem('productsCart')
    cartItem = JSON.parse(cartItem)
    console.log('my product is', products)

    if(cartItem != null ){
        if(cartItem[products.title] == undefined){
            cartItem ={
                ...cartItem,
                [products.title] : products
            }
        }
        cartItem[products.title].inCart += products.inCart
    }
    else{
        products.inCart = 1
        cartItem = {
            [products.title]: products
        }
    }
   localStorage.setItem('productsCart', JSON.stringify(cartItem) )

   totalCost(products)
}
//Set total cost in local storage  
function totalCost(product){
    // const price = parseInt(product.price)
    console.log('price of product', product.price)
    let totalCost = localStorage.getItem('totalCost')
    console.log('my total cost is ', totalCost)

    if(totalCost != null){
        totalCost = parseInt(totalCost)
        localStorage.setItem('totalCost', totalCost + product.price)
    } else{
        localStorage.setItem('totalCost', product.price)
    }
}