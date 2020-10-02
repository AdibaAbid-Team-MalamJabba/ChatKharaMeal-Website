let displayWishCart = document.querySelector('.displayWishCart')
const spanCart1 = document.querySelector('.span-cart')
const wishListSpan = document.querySelector('.span-wish')

document.addEventListener('DOMContentLoaded', () => {
    // onLoad addtocart number
    addToCartNumber()
    wishListSpan.style.opacity = 1
})

//this function never run on event listener, Load on windows Load.
function addToCartNumber(){
    let addToCartNumbers = localStorage.getItem('cartNumbers')
    spanCart1.innerHTML = addToCartNumbers;

    let wishCartNumbers = localStorage.getItem('wishList')
    wishListSpan.innerHTML = wishCartNumbers
}

showProducts()
async function showProducts() {
    try {
        let cart = await JSON.parse(localStorage.getItem("wishListObjs"))
        console.log('my wish cart items', cart)
        if (cart === null) {
            swal({
                title: "There is no ITEM in your Wish Cart!",
                icon: "info",
            })
        }
        else {
            let result = ""
            Object.values(cart).map((item, index) => {
                console.log("image ai???",item.image)
                let image = item.image.substring(3)
                console.log('image trim***', image)
                result += `
            <tr>
            <th>${index + 1}</th>
            <th scope="col"><img src=${image} alt="product-img" width="50" id="table-img"></th>
            <td data-label="Item Name" colspan="2">${item.title}</td>
            <td data-label="Price" colspan="2">${item.price} /-PKR</td>
           
            <td class= "remove-btn" ><i class="fas fa-trash-alt"></i></td>
            </tr>
            `
            })
            displayWishCart.innerHTML = result
        }
        removeItem()
}
catch (error) {
    console.log(error)
}
}

function removeItem() {
    let cartItems = JSON.parse(localStorage.getItem("wishListObjs"))
    let cartNumber = JSON.parse(localStorage.getItem('wishList'))
    const removeBtn = document.querySelectorAll('.fa-trash-alt')
    let productName;

    for (let i = 0; i < removeBtn.length; i++) {
        let button = removeBtn[i]
        button.addEventListener('click',()=> {
           productName = button.parentElement.parentElement.children[2].innerHTML
            console.log(productName)
            
            console.log('wishList***',  cartNumber -  1)
            wishListSpan.innerText = cartNumber -  1
            localStorage.setItem('wishList', cartNumber -  1 )

            delete cartItems[productName]
            localStorage.setItem('wishListObjs', JSON.stringify(cartItems))
           console.log('new cartlist', cartItems)

            
            showProducts()
        })
    }
}