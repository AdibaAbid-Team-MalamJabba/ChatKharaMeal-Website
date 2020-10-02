// Get Data From LocalStorage & Show It
function userNameDisplay(){
    let userName = document.getElementById('userGreetingName');
    userName.innerText = localStorage.getItem('userName'); 

}

userNameDisplay();