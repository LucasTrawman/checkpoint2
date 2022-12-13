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
            throw Error("Não foi possível buscar as tarefas");
        }
    } catch (error){
        alert(error);
    }
}

/* Customização nome do usuário no HEADER */
let modificaUsuarioDOM = (dadosUsuario) => {
    let nomeUsuario = document.querySelector("#nomeUsuarioHeader");

    // Altera o nome do usuário
    nomeUsuario.innerText = `${dadosUsuario.firstName} ${dadosUsuario.lastName}`;
}

// LISTA DE TAREFAS
let manipulaListaTarefas = (tarefas) => {
    tarefas.forEach(tarefa => {
        
        if(tarefa.completed == true){
            // Lista de tarefas concluidas
        }else{
            // Lista de tarefas pendentes
            tarefaPendente(tarefa)
        }
    });
}


// Renderiza tarefas pendentes
let tarefasPendentes = document.querySelector(".tarefas-pendentes");

function tarefaPendente(tarefa){
    console.log(tarefa);

    let li = document.createElement("li");
    li.classList.add("tarefa");
    li.innerHTML = `
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${tarefa.description}</p>
          <p class="timestamp">Criada em: ${tarefa.createdAt}</p>
        </div>
    `;
    tarefasPendentes.appendChild(li);

};