const url = "https://go-wash-api.onrender.com/api/login";

async function accessEmail() {
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
  console.log(data, "tratar erros");
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

function handleLogin() {
  fieldValidation();
  accessEmail();
}
