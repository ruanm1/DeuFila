const form = document.querySelector("#form");
if (!form) return;

form.addEventListener("submit", function (event) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");

    if (nameInput && nameInput.value.trim() === "") {
        event.preventDefault();
        alert("Preencha seu nome");
        return;
    }

    if (!emailInput || emailInput.value.trim() === "") {
        event.preventDefault();
        alert("Preencha seu e-mail");
        return;
    }

    if (!passwordInput || passwordInput.value.trim().length < 8) {
        event.preventDefault();
        alert("A senha deve ter pelo menos 8 dígitos");
        return;
    }
});
