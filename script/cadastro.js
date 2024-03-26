const url = "https://api-go-wash-efc9c9582687.herokuapp.com/api/user";

async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const cpf_cnpj = document.getElementById("cpf_cnpj").value;
  const birthday = document.getElementById("birthday").value;

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

  if (data.data || data.data.statusCode == !200) {
    if (data.data.errors && data.data.errors?.cpf_cnpj) {
      return alert(data.data.errors.cpf_cnpj[0]);
    }
    if (data.data.errors && data.data.errors?.birthday) {
      return alert(data.data.errors.birthday[0]);
    }
    if (data.data.errors && data.data.errors?.email) {
      return alert(data.data.errors.email[0]);
    }
    if (!data.data.errors) {
      window.location.href = "login.html";
    }
  }
  console.log("Cadastro realizado com sucesso");
}

function fieldValidation() {
  const nome = form.name;
  const email = form.email;
  const password = form.password;
  const cpf_cnpj = form.cpf_cnpj;
  const birthday = form.birthday;
  const checkbox = form.checkbox;

  const parts = birthday.value.split("/");
  const dateFormated = parts[2] + "-" + parts[1] + "-" + parts[0];

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

  if (birthday.value == "") {
    alert("Inserir o Data de nascimento");
    birthday.focus();
  } else {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regexData.test(dateFormated)) {
      alert("Insira a data nesse formato 16/01/1990");
      return false;
    }
  }

  if (checkbox.checked) {
    console.log("termos aceito");
  } else {
    alert("Aceitar os termos de uso");
    checkbox.focus();
  }

  return true;
}
