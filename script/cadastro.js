const url = "https://go-wash-api.onrender.com/api/user";

async function registerUser() {
  try {
    let registerButton = document.getElementById("registerButton");

    if (!fieldValidation()) {
      registerButton.disabled = false;
      return false;
    }

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpf_cnpj = document.getElementById("cpf_cnpj").value;
    let birthday = document.getElementById("birthday").value;

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

    if (!response.ok) {
      if (response.status === 400) {
        // Bad Request - Validation errors
        const data = await response.json();
        const errors = data.data.errors;
        for (const field in errors) {
          alert(`Erro para '${field}': ${errors[field][0]}`);
        }
      } else if (response.status === 401) {
        // Unauthorized
        alert("Você não está autorizado a acessar este recurso.");
      } else if (response.status === 404) {
        // Not Found
        alert("A API não encontrou o recurso solicitado.");
      } else {
        // Other errors
        alert(
          "Ocorreu um erro durante o registro. Por favor, tente novamente mais tarde."
        );
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
  } else if (nome.value.length < 3) {
    alert("Insira o nome completo");
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
    alert("Senha com no mínimo 6 caracteres");
    nome.focus();
    return false;
  }

  if (cpf_cnpj.value == "") {
    alert("Inserir o CPF ou CNPJ");
    cpf_cnpj.focus();
    return false;
  }

  if (checkbox.checked === false) {
    alert("Aceitar os termos de uso");
    checkbox.focus();
    return false;
  }

  return true;
}

async function handleRegister() {
  try {
    let registrationSuccessful = await registerUser();
    if (registrationSuccessful) {
      alert(
        "Registro realizado com sucesso! Acesse seu e-mail e ative o seu cadastro pelo link enviado!"
      );
      window.location.href = "login.html";
    }
  } catch (error) {
    const e = new Error(alert("Erro durante o registro: ", error.message));
    throw e;
    // n tenho ctz se isso aqui funfa
  }
}
