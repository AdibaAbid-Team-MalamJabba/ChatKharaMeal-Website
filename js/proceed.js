// Target 
// Per Means Personal
const userPerName = document.getElementById('userfullname');
const userPerEmail = document.getElementById('userperemail');
const userPerAddress = document.getElementById('useraddress');
const userPerCity = document.getElementById('usercity');
const userPerState = document.getElementById('userstate');
const userPerPhone = document.getElementById('userphone');

const spanCart = document.querySelector('.span-cart')

document.addEventListener('DOMContentLoaded', () => {
   addToCartNumber()
});
        

//this function never run on event listener, Load on windows Load.
function addToCartNumber(){
    let addToCartNumbers = localStorage.getItem('cartNumbers')
    spanCart.innerHTML = addToCartNumbers;
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
        console.log('Success UserName');
    }

    if (userPerEmailVal === '') {
        setErrorFor(userPerEmail, "Email Field Can't Be Blank !!");
        return false;
    } else if (!emailCheck(userPerEmailVal)) {
        setErrorFor(userPerEmail, "Invalid E-mail !!");
        return false;
    } else {
        setSuccessFor(userPerEmail);
        console.log('sucess email')
    }

    if(userPerAddressVal === ''){
        setErrorFor(userPerAddress, 'Plz Enter Address !!');
        console.log('Error address');
        return false;
    }
    else{
        setSuccessFor(userPerAddress);
        console.log('Success addrss')
    }  

    if(userPerCityVal === ''){
        setErrorFor(userPerCity, 'Plz Enter Your City !!');
        console.log('Error city');
        return false;
    }
    else{
        setSuccessFor(userPerCity);
        console.log('Success city')
    }

    if(userPerStateVal === ''){
        setErrorFor(userPerState, 'Plz Enter Your State !!');
        console.log('Error state');
        return false;
    }
    else{
        setSuccessFor(userPerState);
        console.log('Success state')
    }

    if(userPerPhoneVal === ''){
        setErrorFor(userPerPhone, 'Plz Enter Your Phone Number !!');
        console.log('Error phone');
        return false;
    }
    else{
        setSuccessFor(userPerPhone);
        console.log('Success phone');
    }

    return true;
}

// Empty User Info
const emptyUserInputs = ()=>{   
    const userPerNameVal = userPerName.value;
    userPerNameVal.innerText = '';
    const userPerEmailVal = userPerEmail.value;
    userPerEmailVal.innerText = '';
    const userPerAddressVal = userPerAddress.value;
    userPerAddressVal.innerText = '';
    const userPerCityVal = userPerCity.value;
    userPerCityVal.innerText = '';
    const userPerStateVal = userPerState.value;
    userPerStateVal.innerText = '';
    const userPerPhoneVal = userPerPhone.value;
    userPerPhoneVal.innerText = '';
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


