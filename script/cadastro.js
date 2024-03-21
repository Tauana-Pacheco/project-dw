const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user';

const fields = document.querySelectorAll('.required')
const spans = document.querySelectorAll('.span-required')

async function cadastroUsuario(){ 
    const name = document.getElementById('name');     
    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
                "name":name.value,
                "email":email.value,
                "user_type_id":1,
                "password": password.value,
                "cpf_cnpj": cpf_cnpj.value,
                "terms": user_type.value,
                "birthday": birthday.value    
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }        
    });

    let data = await resposta.json();

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
}

function setError(index){
    fields[index].style.border = '2px solid #e63636'
    spans[index].style.display = 'block'
}

function removeError(index) {
    fields[index].style.border = '';
    spans[index].style.display = 'none';
}

function nameValidate(){
    if(fields[0].value.length <3){
        setError(0)
    }
    else{
        removeError(0)
    }
}

function validateCpfCnpj() {
    const campo = document.getElementById('cpf_cnpj');
    const valor = campo.value.trim();
    const caracteresPermitidos = /[0-9]/;

    if (valor.length < 11) {
        setError(1);
    } else if (!caracteresPermitidos.test(valor)) {
        setError(1);
    } else {
        removeError(1);
    }
}

function emailValidate(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(fields[2].value)){
        setError(2)
    }
    else{
        removeError(2)
    }
}

function passwordValidate(){
    if(fields[3].value.length <8){
        setError(3)
    }
    else{
        removeError(3)
    }
}

const campo = document.getElementById('cpf_cnpj');
campo.addEventListener('keypress', function(event) {
    const char = event.key
    const caracteresPermitidos = /[0-9.-]/;
    if (!caracteresPermitidos.test(char)) {
        event.preventDefault();
    }
})
