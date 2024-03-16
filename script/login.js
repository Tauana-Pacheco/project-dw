const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user';

async function loginUsuario(){   
    var email = document.getElementById('email');     
    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
                "email":"teste@teste.com", 
                "senha": senha.value
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
    alert("Segue email");
    window.location.href = "login.html";
}