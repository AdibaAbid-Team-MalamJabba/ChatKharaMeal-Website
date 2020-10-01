// Get Data From LocalStorage & Show It
function userNameDisplay(){
    let userName = document.getElementById('userGreetingName');
    userName.innerText = JSON.parse(localStorage.getItem('userName')); 
    console.log(userName);
}

userNameDisplay();