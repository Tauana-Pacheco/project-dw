const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user';

async function cadastroUsuario(){   
    var name = document.getElementById('name');     
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
    
    
    if(data.data.statusCode != 200){
        alert(data.data.errors?.cpf_cnpj[0]);
        return;
    }
    alert("Cadastro feito com sucesso");
    window.location.href = "login.html";
}