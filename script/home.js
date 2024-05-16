const url = "https://go-wash-api.onrender.com/api/auth/address";

async function listAddresses() {
    try {
        let token = JSON.parse(localStorage.getItem('user')).access_token;

        let responseApi = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Cookie": "gowash_session=0hGqRHf0q38ETNgEcJGce30LcPtuPKo48uKtb7Oj"
            },
        });

        let response = await responseApi.json();

        const corpoTabela = document.getElementById("corpo-tabela");

        if (response.hasOwnProperty('data')) {
            response.data.forEach(item => {
                const row = document.createElement("tr");
                let dadosApi = ['title', 'cep', 'address', 'number', 'complement']
                dadosApi.forEach(key => {
                    const cell = document.createElement("td");
                    cell.textContent = item[key] || ''; 
                    row.appendChild(cell);
                });

                corpoTabela.appendChild(row);
            });
        } else {
            console.error('A resposta não contém a propriedade "data".', response);
        }
    } catch (error) {
        console.error("Erro ao listar endereços:", error);
    }
}

listAddresses();