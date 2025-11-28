const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if(nameInput.value ===""){
        alert("Por favor, preencha o seu nome");
        return;
    }
    form.submit();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();    
    if(emailInput.value ===""){
        alert("Por favor, preencha o seu e-mail");
        return;
    }
    if(!validatePassword(passwordInput.value, 8)){
        alert("A senha precisa ter no mínimo 8 dígitos");
        return;
    }
    form.submit();
})

function validatePassword(password, minDigit) {
    if (password.length >= minDigit) {
        return true

    }
    return false
};