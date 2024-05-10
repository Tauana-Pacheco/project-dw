const url = "https://go-wash-api.onrender.com/api/auth/address";

let token = JSON.parse(localStorage.getItem('user')).access_token;

let responseApi = await fetch( url,{
    method:"GET",
    headers:{
        "Authorization": "Bearer "+token,
        'Content-Type': 'application/json'
    },
   
})

let response = await responseApi.json();