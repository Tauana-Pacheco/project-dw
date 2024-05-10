const url = "https://go-wash-api.onrender.com/api/login";

async function accessEmail(email, password) {
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
  
  localStorage.setItem("user", JSON.stringify(data));

  const dataError = data && data.data && data.data.errors
  if (!response.ok) {
    if (dataError === "Usuário não esta ativo") {
      alert("Erro de login: Usuário não está ativo");
      return false
    } else if(dataError === "Usuário não foi encontrado") {
      alert("Erro de login: Usuário não está cadastrado");
      return false
    }
    loginButton.disabled = false
    alert("Erro ao realizar o login do usuario. Tente novamente");
    return false; 
  }
  return true;
}

function fieldValidation(email, password) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    alert("Insira o email");
    return false;
  } else if (!regexEmail.test(email)) {
    alert("Por favor insira um email válido");
    return false;
  }

  if (!password) {
    alert("Insira a senha");
    return false;
  } else if (password.length < 6) {
    alert("Senha com no mínimo 6 caracteres");
    return false;
  }

  return true;
}

async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (fieldValidation(email, password)) {
    const success = await accessEmail(email, password);

    if (success) {
      alert("Login realizado com sucesso!");
      window.location.href = "home.html";
    } else {
      loginButton.disabled = false
    }
  }
}