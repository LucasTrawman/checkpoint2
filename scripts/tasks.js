//Escopo global
let tokenJwt;

//Evento automático
onload = function () {

    tokenJwt = sessionStorage.getItem("jwt");

    if (!tokenJwt) {
        //Usuário não tem o token
        location.href = "index.html";
    } else {
        buscaDadosUsuarioApi();
    }
}

async function buscaDadosUsuarioApi() {

    let configRequest = {
        headers: {
            'Authorization': tokenJwt
        }
    }

    let resposta = await fetch(`${apiBaseURL()}/users/getMe`, configRequest);
    let respostaJs = await resposta.json();
    renderizaDadosUsuario(respostaJs);
}

function renderizaDadosUsuario(dadosUsuario) {
    console.log(dadosUsuario);

    let nomeUsuarioHeader = document.getElementById("nomeUsuarioHeader");
    nomeUsuarioHeader.innerText = `${dadosUsuario.firstName} ${dadosUsuario.lastName}`
}