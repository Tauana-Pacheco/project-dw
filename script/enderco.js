const url = "https://go-wash-api.onrender.com/api/auth/address";

function fieldValidation() {
  let title = form.title;
  let cep = form.cep;
  let address = form.address;
  let number = form.number;

  if (title.value == "") {
    alert("Inserir o título");
    title.focus();
    return false;
  }

  if (cep.value == "") {
    alert("Inserir o CEP");
    cep.focus();
  } else if (cep.value.length < 8) {
    alert("CEP com  8 caracteres");
    cep.focus();
    return false;
  }

  if (address.value == "") {
    alert("Inserir o endereço");
    address.focus();
    return false;
  }

  if (number.value == "") {
    alert("Inserir o número");
    number.focus();
    return false;
  }

  return true;
}

async function registerAddress() {
  try {
    let title = document.getElementById("title").value;
    let cep = document.getElementById("cep").value;
    let address = document.getElementById("address").value;
    let number = document.getElementById("number").value;
    let complement = document.getElementById("complement").value;
    let registerAddress = document.getElementById("registerAddress");

    registerAddress.disabled = true;

    let token = JSON.parse(localStorage.getItem("user")).access_token;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title,
        cep,
        address,
        number,
        complement,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });

    let data = await response.json();

    if (!response.ok) {
      if (data && data.errors) {
        for (const field in data.errors) {
          alert(`Erro para '${field}': ${data.errors[field][0]}`);
          console.log(field, "fiels");
          console.log(data.errors[field][0], "xxx");
        }
      } else {
        alert("Erro desconhecido");
      }
      registerAddress.disabled = false;
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro durante o registro:", error);
    alert("Erro durante o registro. Por favor, tente novamente mais tarde.");
    registerAddress.disabled = false;
    return false;
  }
}

async function handleRegister() {
  if (fieldValidation()) {
    try {
      let registrationSuccessful = await registerAddress();
      console.log(registrationSuccessful, "let");
      if (registrationSuccessful) {
        alert("Cadastro concluido");
        window.location.href = "home.html";
      } else {
        alert("O registro falhou");
      }
    } catch (error) {
      alert("Erro durante o registro:", error);
    }
  }
}
