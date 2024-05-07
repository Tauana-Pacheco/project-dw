const url = "https://go-wash-api.onrender.com/api/user";

async function registerUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cpf_cnpj = document.getElementById("cpf_cnpj").value;
  let birthday = document.getElementById("birthday").value;

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

  const errors = data.data.errors;

  for (const field in errors) {
    switch (field) {
      case "name":
        alert(`Error for 'name': ${errors[field][0]}`);
        break;
      case "password":
        alert(`Error for 'password': ${errors[field][0]}`);
        break;
      case "email":
        alert(`Error for 'email': ${errors[field][0]}`);
        break;
      case "cpf_cnpj":
        alert(`Error for 'cpf_cnpj': ${errors[field][0]}`);
        break;
      case "birthday":
        alert(`Error for 'birthday': ${errors[field][0]}`);
        break;
      default:
        alert(`Unknown error for field '${field}'`);
        break;
    }
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
  }

  if (checkbox.checked) {
    console.log("termos aceito");
  } else {
    alert("Aceitar os termos de uso");
    checkbox.focus();
  }

  return true;
}

function handleRegister() {
  fieldValidation();
  registerUser();
  // redirect
}
