const productContainer = document.querySelector('.product-container')
const spanCartItems = document.querySelector('.span-cart')
const wishListSpan = document.querySelector('.span-wish')


document.addEventListener('DOMContentLoaded', () => {
    //get all Products
    getProducts()
    // onLoad addtocart number
    addToCartNumber()
    wishListSpan.style.opacity = 1
})


// Getting The Products 
async function getProducts() {
    try {
        let result = await fetch('../db.json')
        let data = await result.json()

        // Display Product dynamically
        displayProduct(data)

        // set Listener to add to cart button and set numbers to addtocart icon
        let cartButton = document.querySelectorAll('.cart-btn')
        let wishListButton = document.querySelectorAll('.wishlist')

        for (let i = 0; i < cartButton.length; i++) {
            cartButton[i].addEventListener('click', () => {
                let products = data.chatkharaMealProducts
               //sent clicked item data
                cartNumber({...products[i], inCart: 0})
                
            })
        }
        for (let j = 0; j < wishListButton.length; j++) {
            wishListButton[j].addEventListener('click', () => {
                
                let products = data.chatkharaMealProducts
                let wishListObjs = JSON.parse(localStorage.getItem('wishListObjs'))
                let title = wishListButton[j].parentElement.parentElement.children[0].innerHTML

                // Check wishList item is already exist
                if (wishListObjs != null) {
                    if (wishListObjs[title] === undefined) {
                        cartNumber({ ...products[j], isWishList: true})
                    }
                    else {
                        swal("Ooppss!", "Already Added to WishList ♥!", "info");
                    }
                }
                else {
                    cartNumber({ ...products[j], isWishList: true })
                }
            })
        }
    } 
    catch (error) {
        console.log(error)
    }
}

//Display Products
function displayProduct(products) {
    console.log(products)
    let result = '';
    products.chatkharaMealProducts.forEach(item => {
        result += `
            <div class="product-item">
            <div class="img-wrapper">
                <img 
                src=${item.image}
                alt="img"
                >
            </div>
            <div class="product-desc">
                <h2 class="product-title">${item.title}</h2>
                <p class="product-price">Rs: ${item.price}.00/-</p>
                <div class="product-btn-container">
                    <a class="product-btn wishlist" data-id=${item.id}><i class="fas fa-list-ul"></i> Wishlist</a>
                    <a href="${item.view}" target = "_blank" class="product-btn"><i class="fas fa-eye"></i> View</a>
                </div>
                <div class="add-container">
                    <a class="product-btn cart-btn" ><i class="fas fa-cart-plus"></i> Add to Cart</a>
                </div>
            </div>
        </div>
            `;
    });
    productContainer.innerHTML = result;
}

//this function never run on event listener, Load on windows Load.
function addToCartNumber() {
    let addToCartNumbers = localStorage.getItem('cartNumbers')
    spanCartItems.innerHTML = addToCartNumbers;
    let wishCartNumbers = localStorage.getItem('wishList')
    wishListSpan.innerHTML = wishCartNumbers
}

// set numbers on addtocart span
function cartNumber(products) {
    if (!products.isWishList) {
        let productNumbers = localStorage.getItem('cartNumbers')
        productNumbers = parseInt(productNumbers)
        if (productNumbers) {
            localStorage.setItem('cartNumbers', productNumbers + 1)
            spanCartItems.innerHTML = productNumbers + 1
        } else {
            localStorage.setItem('cartNumbers', 1)
            spanCartItems.innerHTML = 1
        }
        setItems(products)
    }
    else {
        let wishListNumber = parseInt(localStorage.getItem('wishList'))
        if (wishListNumber) {
            localStorage.setItem('wishList', wishListNumber + 1)
            wishListSpan.innerHTML = wishListNumber + 1
            console.log('my wishlist if already exist*****', parseInt(wishListNumber) + 1)
            setItems(products)
            swal("Added to WishList ♥!", "Successfully added to your WishList", "success")
        }
        else {
            let storedWishCartNumber = localStorage.setItem('wishList', 1)
            wishListSpan.innerHTML = 1
            console.log('my wishlist*****', parseInt(storedWishCartNumber) + 1)
            setItems(products)
            swal("Added to WishList ♥!", "Successfully added to your WishList", "success")
        }
    }
}

function setItems(products) {
    if (!products.isWishList) {
        let cartItem = localStorage.getItem('productsCart')
        cartItem = JSON.parse(cartItem)
        console.log('my product is', products)

        if (cartItem != null) {
            if (cartItem[products.title] == undefined) {
                cartItem = {
                    ...cartItem,
                    [products.title]: products
                }
            }
            cartItem[products.title].inCart += 1
        } else {
            products.inCart = 1
            cartItem = {
                [products.title]: products
            }
        }
        localStorage.setItem('productsCart', JSON.stringify(cartItem))
        totalCost(products)
    }
    else {
        let wishListItem = JSON.parse(localStorage.getItem('wishListObjs'))
        console.log('my wishlistobjects is', wishListItem)

        if (wishListItem != null) {
            if (wishListItem[products.title] == undefined) {
                wishListItem = {
                    ...wishListItem,
                    [products.title]: products
                }
            }
        } else {
            wishListItem = {
                ...wishListItem,
                [products.title]: products
            }
        }
        localStorage.setItem('wishListObjs', JSON.stringify(wishListItem))
    }
}


//Set total cost in local storage  
function totalCost(product){
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

function checkValidation(){
    let userName = localStorage.getItem("userName")
    let userEmail = localStorage.getItem("userEmail")
    if(userName || userEmail){
        window.location.href = '../wishList.html';
    }
    else{
        swal({
            title:"Please Login First to use this Feature!",
            icon: "warning",
        })
    }

}