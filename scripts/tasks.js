//Escopo global
let tokenJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2FzLmZlcnJlaXJhc29hcmVzQGhvdG1haWwuY29tIiwiaWQiOjkzNywiaWF0IjoxNjcwODkxMTgwfQ.qTioJmc5S3AZjOjFpzLGUsPGetZPvzwHBmSkgAkFpQY";

//Evento automático
onload = function () {
    // Busca o token no storage
    tokenJwt = sessionStorage.getItem("jwt");

    if (!tokenJwt) {
        //Caso o token seja inválido
        window.location = "index.html";
    } else {
        // Executa ações automáticas necessárias
        buscaDadosUsuario();
        // Buscar tarefas
        buscaTarefas();
    }
}

/* HEADER > Busca usuário */
async function buscaDadosUsuario() {
    // Cabeçalho GET
    let configRequest = {
        headers: { 'Authorization': tokenJwt }
    }

    try {
        let respostaAPI = await fetch(`${apiBaseURL()}/users/getMe`, configRequest);
        if (respostaAPI.status == 200) {
            let respostaFinal = await respostaAPI.json();
            modificaUsuarioDOM(respostaFinal);
        }else{
        throw Error("Usuário não encontrado")
        }
    } catch(error){
        alert(error);
    }
}

/* HEADER > Customização nome do usuário */
let modificaUsuarioDOM = (dadosUsuario) => {
    let nomeUsuario = document.querySelector("#nomeUsuarioHeader");

    // Altera o nome do usuário
    nomeUsuario.innerText = `${dadosUsuario.firstName} ${dadosUsuario.lastName}`;
}



// TAREFAS > Selecionando tarefas
let tarefasPendentes = document.querySelector(".tarefas-pendentes");
let tarefasTerminadas = document.querySelector(".tarefas-terminadas");

// TAREFAS > Buscando tarefas de um usuário logado
async function buscaTarefas() {
    let configRequest = {
        headers: {'Authorization': tokenJwt}
    }

    try {
        let respostaAPI = await fetch(`${apiBaseURL()}/tasks`, configRequest);
    
        if (respostaAPI.status == 200){
            let respostaFinal = await respostaAPI.json();
            ListaTarefas(respostaFinal);
        }else{
            throw Error("Não foi possível buscar as tarefas");
        }
    } catch (error){
        alert(error);
    }
}

// LISTA DE TAREFAS
let ListaTarefas = (tarefas) => {
    tarefas.forEach(tarefa => {
        if(tarefa.completed){
            // Lista de tarefas concluidas
            tarefaTerminada(tarefa);
        }else{
            // Lista de tarefas pendentes
            tarefaPendente(tarefa);
        }
    });
}

function tarefaPendente(tarefa){
    let li = document.createElement("li");
    li.classList.add("tarefa");
    li.innerHTML = `
        <div id="${tarefa.id}" class="not-done"></div>
        <div class="descricao">
          <p class="name">${tarefa.description}</p>
          <p class="timestamp">Criada em: ${tarefa.createdAt}</p>
        </div>
    `;
    tarefasPendentes.appendChild(li);
};

function tarefaTerminada(tarefa){
    let li = document.createElement("li");
    li.classList.add("tarefa");
    li.innerHTML = `
        <div class="done"></div>
        <div class="descricao">
          <p class="nome">${tarefa.description}</p>
          <p class="timestamp">Criada em: ${tarefa.createdAt}</p>
        </div>
    `;
    tarefasTerminadas.appendChild(li);
};


// TAREFAS > Editando tarefas
let checkbox = document.querySelector(".not-done");

checkbox.addEventListener("click", function() {
    checkbox.classList.remove("not-done");
    checkbox.classList.add("done");
});