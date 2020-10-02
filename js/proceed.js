// Target 
// Per Means Personal
const userPerName = document.getElementById('userfullname');
const userPerEmail = document.getElementById('userperemail');
const userPerAddress = document.getElementById('useraddress');
const userPerCity = document.getElementById('usercity');
const userPerState = document.getElementById('userstate');
const userPerPhone = document.getElementById('userphone');



document.addEventListener('DOMContentLoaded', () => {
    // onLoad addtocart number
    setCartValue();
})


const setCartValue = ()=>{

    const noofItems = document.getElementById('numItem');

    let addToCartNumbers = localStorage.getItem('cartNumbers')
    noofItems.innerHTML = addToCartNumbers;

    let totalCost = JSON.parse(localStorage.getItem('totalCost'))
    const subTotal = document.querySelector('.Total');
    const grandTotalAmount = document.querySelector('.grandTotal')
    subTotal.innerText = totalCost + " /-PKR"
    grandTotalAmount.innerText = totalCost + 200 + " /-PKR"
}



// Target Checkout Button
const checkoutBtn = document.getElementById('usercheckout');

// Validation
checkoutBtn.addEventListener('click' , (e)=>{
    e.preventDefault();
  
    if(checkUserInputs()){
        swal("Good job!", "Placed Order Successfully !!!!", "success");
        emptyUserInputs();
    }
    else{
        return false;
    }
})

// Calidating User Inputs
const checkUserInputs = ()=>{
    const userPerNameVal = userPerName.value;
    const userPerEmailVal = userPerEmail.value;
    const userPerAddressVal = userPerAddress.value;
    const userPerCityVal = userPerCity.value;
    const userPerStateVal = userPerState.value;
    const userPerPhoneVal = userPerPhone.value;


    if(userPerNameVal === ''){
        setErrorFor(userPerName, "Can't Be Empty !!");
        return false;
    }
    else{
        setSuccessFor(userPerName);
    }

    if (userPerEmailVal === '') {
        setErrorFor(userPerEmail, "Email Field Can't Be Blank !!");
        return false;
    } else if (!emailCheck(userPerEmailVal)) {
        setErrorFor(userPerEmail, "Invalid E-mail !!");
        return false;
    } else {
        setSuccessFor(userPerEmail);
    }

    if(userPerAddressVal === ''){
        setErrorFor(userPerAddress, 'Plz Enter Address !!');
        return false;
    }
    else{
        setSuccessFor(userPerAddress);
    }  

    if(userPerCityVal === ''){
        setErrorFor(userPerCity, 'Plz Enter Your City !!');
        return false;
    }
    else{
        setSuccessFor(userPerCity);
    }

    if(userPerStateVal === ''){
        setErrorFor(userPerState, 'Plz Enter Your State !!');
        return false;
    }
    else{
        setSuccessFor(userPerState);
    }

    if(userPerPhoneVal === ''){
        setErrorFor(userPerPhone, 'Plz Enter Your Phone Number !!');
        return false;
    }
    else{
        setSuccessFor(userPerPhone);
    }

    return true;
}

// Empty User Info
const emptyUserInputs = ()=>{  

    document.getElementById('userfullname').value = ' ';
    document.getElementById('userperemail').value = ' ';
    document.getElementById('useraddress').value = ' ';
    document.getElementById('usercity').value = ' ';
    document.getElementById('userstate').value = ' ';
    document.getElementById('userphone').value = ' ';
    
}



// Sent Error TO User
const setError = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}

// Sent Success Message To User
const setSuccess = input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check Is Email Valid Or Not
const emailCheck = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


function getUserName() {
    const usernameValue = document.getElementById("userfullname");
    usernameValue.value = localStorage.getItem("userName");
    return usernameValue.value;
}

function getEmailofUser() {
    const useremail = document.getElementById("userperemail");
    useremail.value = localStorage.getItem("userEmail");
    return useremail.value;
}


function alreadyLogged() {
    if (getUserName() === localStorage.getItem("userName") || getEmailofUser() === localStorage.getItem("userEmail")) {
        let greet = document.querySelector('.usercreateacc');
        greet.innerHTML = `<p> Welcome <strong>${getUserName()}</strong> Plz Fill Required Fields to Check Out !!`;

    } else {
        greet.innerHTML = `<p>Don't Have Account ?? <button  onclick="document.getElementById('myModal').style.display='block'">Create It</button></p>`;
    }

}

getUserName();
getEmailofUser();
alreadyLogged();
// End Form


