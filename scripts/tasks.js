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
        headers: { 
            "Content-type": "application/json",
            'Authorization': tokenJwt }
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
        headers: {
            "Content-type": "application/json",
            'Authorization': tokenJwt}
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
        <div id="${tarefa.id}" class="not-done" onclick="atualizaTarefa(${tarefa.id})"></div>
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

//////////////////////////////////

// LOG OUT

let finalizarSessao = document.getElementById("closeApp")

finalizarSessao.addEventListener("click", function(){
    logout()
})

function logout(){
    sessionStorage.removeItem('jwt')
    window.location.href = "index.html";
}

//////////////////////////////////

// TAREFAS > Incluir tarefa
let criarTarefa = document.querySelector(".nova-tarefa");
let inputTarefa = document.querySelector("#novaTarefa");
// TAREFAS > Incluindo tarefas
criarTarefa.addEventListener("submit", incluirTarefa(inputTarefa));

async function incluirTarefa(parametro){

    alert(inputTarefa)
    let novaTarefa = normalizaStringUsandoTrim(inputTarefa.value);
    
    let tituloTarefa = {
        "description": parametro,
        "completed": false
    }

    let tarefaJSON = JSON.stringify(tituloTarefa);

    let tarefaRequest = {
        method: "POST",
        body: tarefaJSON,
        headers: {
            "Content-type": "application/json",
            'Authorization': tokenJwt
        }
    }

    try {
        let request = await fetch(`${apiBaseURL()}/tasks`, tarefaRequest)

        if (request.status == 200 || request.status == 204){
            let response = await request.json();
            console.log(response)
        }else{
            throw Error("Deu erro aqui")
        }
    } catch(error) {
        alert(error);
    }
}


// TAREFA > Atualizar tarefa

async function atualizaTarefa(id){

    let taskBody = {
        "completed": true
    }

    let taskBodyJSON = JSON.stringify(taskBody);

    let config = {
        method: "PUT",
        body: taskBodyJSON,
        headers: {
            "Content-type": "application/json",
            'Authorization': tokenJwt
        }
    }
    try {
        let request = await fetch(`${apiBaseURL()}/tasks/${id}`, config)

        if (request.status == 200 || request.status == 204){
            let response = await request.json();
            location.reload();
            console.log(response)
        }else{
            throw Error("Não foi possível atualizar as tarefas")
        }
    } catch(error) {
        console.log(error);
    }
}

