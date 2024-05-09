const url = "https://go-wash-api.onrender.com/api/login";

async function accessEmail() {
  try{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user_type_id = 1
    
    let loginButton = document.getElementById("loginButton");
    loginButton.disabled = true;

    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        user_type_id
      }),
      headers: { "Content-Type": "application/json" },
    })

    let data = await response.json();

    if (!response.ok) {
      if (data && data.data && data.data.errors === "Usuário não esta ativo") {
        alert("Erro de login: Usuário não está ativo");
        return false
      } 
      const errors = data.data.errors;
      for (const field in errors) {
        alert(`Erro para '${field}': ${errors[field][0]}`);
      }
      loginButton.disabled = false
      return false; 
    }
    return true;
  }catch (error) {
    console.error("Erro durante o login:", error);
    loginButton.disabled = false
    return false;
  }

}

function fieldValidation() {
  const email = form.email;
  const password = form.password;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.value == "") {
    alert("Inserir o email");
    email.focus();
    return false;
  } else if (!regexEmail.test(email.value)) {
    alert("Por favor insira um email válido");
  } else {
    return false;
  }

  if (password.value == "") {
    alert("Inserir a senha");
    password.focus();
  } else if (password.value.length < 6) {
    alert("Senha com no mínimo 6 caracteres");
    nome.focus();
  } else {
    return false;
  }
}

async function handleLogin() {
  if (accessEmail()) {
    try {
      let loginSuccessful = await accessEmail();
      if (loginSuccessful) {
        window.location.href = "home.html";
      } else {
        console.log("O login falhou");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  }
}