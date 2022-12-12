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

        // Buscar tarefas
        buscaTarefas();
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

/* BUSCA AS TAREFAS DO USUARIO LOGADO */

async function buscaTarefas() {
    let configRequest = {
        headers: {
            'Authorization': tokenJwt
        }
    }

    try {
        let respostaAPI = await fetch(`${apiBaseURL()}/tasks`, configRequest);
    
        if (respostaAPI.status == 200){
        let respostaFinal = await respostaAPI.json();
        manipulaListaTarefas(respostaFinal);
        }else{
            throw Error("Não foi possível buscar as tarefas")
        }
    }
}

function renderizaDadosUsuario(dadosUsuario) {
    console.log(dadosUsuario);

    let nomeUsuarioHeader = document.getElementById("nomeUsuarioHeader");
    nomeUsuarioHeader.innerText = `${dadosUsuario.firstName} ${dadosUsuario.lastName}`
}