const url = "https://api-go-wash-efc9c9582687.herokuapp.com/api/user";

async function accessEmail(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      let data = await response.json();
}

function fieldValidation() {
    const email = form.email;
    const password = form.password;


    if (email.value == "") {
        alert("Inserir o email");
        email.focus();
        return false;
      } else {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value)) {
          alert("Por favor insira um email válido");
          return false;
        }
      }
    
      if (password.value == "") {
        alert("Inserir a senha");
        password.focus();
      } else if (password.value.length < 6) {
        alert('Senha com no mínimo 6 caracteres')
        nome.focus();
        return false;
      }
}