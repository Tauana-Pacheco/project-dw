const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user'
async function cadastroUsuario() {

  var name = document.getElementById('name')
  var email = document.getElementById('email')
  var password = document.getElementById('password')
  var cpf_cnpj = document.getElementById('cpf_cnpj')
  


  let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify (
        {
        'name': name.value,
        'email': email.value,
        'user_type_id': 1,
        'password': password.value,
        'cpf_cnpj': cpf_cnpj.value,
        'terms': 1,
        'birthday': validarCampos().dataFormatada
        }
    ),
    headers: {'Content-Type': 'application/json'}
  })

  let data = await response.json()
  
  if (data.data || data.data.statusCode ==! 200) {
    if(data.data.errors && data.data.errors?.cpf_cnpj) {
        return alert(data.data.errors.cpf_cnpj[0]);
    }
     if(data.data.errors && data.data.errors?.birthday) {
        return alert(data.data.errors.birthday[0]);
    }
    if(data.data.errors && data.data.errors?.email) {
        return alert(data.data.errors.email[0]);
    }
    if(!data.data.errors) {
        window.location.href = "login.html"
    }
}
  console.log('Cadastro realizado com sucesso')
}

function validarCampos() {
  var nome = form.name
  var email = form.email
  var password = form.password
  var cpf_cnpj = form.cpf_cnpj
  var birthday = form.birthday
  var checkbox = form.checkbox

  if (nome.value == "") {
    alert('Inserir o nome')
    nome.focus()
    return false
  }

  if (email.value == "") {
    alert('Inserir o email')
    email.focus()
    return false
  } else {
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(email.value)) {
      alert('Por favor insera um email válido')
      return false
    }
  }

  if (password.value == "") {
    alert('Inserir a senha')
    password.focus()
  }

  if (cpf_cnpj.value == "") {
    alert('Inserir o CPF ou CNPJ')
    cpf_cnpj.focus()
  }

  if (birthday.value == "") {
    alert('Inserir o Data de nascimento')
    birthday.focus()
  } else {
    var regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(birthday.value)) {
      alert('Insira a data nesse formato 16/01/1990')
      return false
    }
  }

  var partesData = birthday.value.split('/')
  var dia = partesData[0];
  var mes = partesData[1];
  var ano = partesData[2];
  var dataFormatada = ano + '-' + mes + '-' + dia;
  console.log(dataFormatada)

  

  if ( checkbox.checked) {
    console.log('termos aceito')
  }else {
    alert('Aceitar os termos de uso')
    checkbox.focus()
  }

  return true
}



