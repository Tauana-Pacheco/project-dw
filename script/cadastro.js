const url = "https://go-wash-api.onrender.com/api/user";

async function registerUser() {
  try {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpf_cnpj = document.getElementById("cpf_cnpj").value;
    let birthday = document.getElementById("birthday").value;
    let registerButton = document.getElementById("registerButton");

    registerButton.disabled = true;

    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        user_type_id: 1,
        password,
        cpf_cnpj,
        terms: 1,
        birthday,
      }),
      headers: { "Content-Type": "application/json" },
    });

    let data = await response.json();

    if (!response.ok) {
      const errors = data.data.errors;
      for (const field in errors) {
        alert(`Erro para '${field}': ${errors[field][0]}`);
      }
      registerButton.disabled = false;
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro durante o registro:", error);
    registerButton.disabled = false;
    return false;
    
  }
}

function fieldValidation() {
  let nome = form.name;
  let email = form.email;
  let password = form.password;
  let cpf_cnpj = form.cpf_cnpj;
  let checkbox = form.checkbox;

  if (nome.value == "") {
    alert("Inserir o nome");
    nome.focus();
    return false;
  } else if (nome.value.length <3) {
    alert('Insira o nome completo')
    nome.focus();
    return false;
  }

  if (email.value == "") {
    alert("Inserir o email");
    email.focus();
    return false;
  } else {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
      alert("Por favor insera um email válido");
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

  if (cpf_cnpj.value == "") {
    alert("Inserir o CPF ou CNPJ");
    cpf_cnpj.focus();
  }

  if (checkbox.checked) {
    console.log("termos aceito");
  } else {
    alert("Aceitar os termos de uso");
    checkbox.focus();
  }

  return true;
}

async function handleRegister() {
  if (fieldValidation()) {
    try {
      let registrationSuccessful = await registerUser();
      if (registrationSuccessful) {
        window.location.href = "login.html";
      } else {
        console.log("O registro falhou");
      }
    } catch (error) {
      console.error("Erro durante o registro:", error);
    }
  }
}