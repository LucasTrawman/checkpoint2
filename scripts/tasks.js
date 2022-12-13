//Escopo global
let tokenJwt;

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
            capturaUsuarioID(respostaFinal);
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

// TAREFAS > Editando tarefas

function atualizaTarefa(id){

    let dados = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "authorization": tokenJwt,
      },
      body: {
        "completed": true,
      },
    };

    let dadosJSON = JSON.stringify(dados)

    fetch(`${apiBaseURL()}/tasks/${id}`, dadosJSON);
}

function capturaUsuarioID(dadosUsuario) {
    console.log(`${dadosUsuario.id}`);
}

function capturaTarefaID(tarefa){
    console.log(`${tarefa.completed}`);
}

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
let novaTarefa = normalizaStringUsandoTrim(inputTarefa.value);

// TAREFAS > Incluindo tarefas
criarTarefa.addEventListener("submit", function(){
    let tituloTarefa = {
        description: novaTarefa,
        completed: false
    }
    let tarefaJSON = JSON.stringify(tituloTarefa);

    console.log(tarefaJSON);
    tarefaAPI(tarefaJSON);
})

function tarefaAPI(jsonRecebido){
    let tarefaRequest = {
        method: 'POST',
        body: jsonRecebido,
        headers:{
            'Authorization': tokenJwt
        }
    }

    fetch(`${apiBaseURL()}/tasks`, tarefaRequest)
    .then(resultado => {resultado.json()})
    .then(resultado => {console.log(resultado)})
    .catch(erro => {
        loginErro(erro);
      });

    console.log(tarefaRequest);
    // location.reload();
}


// TAREFA > Atualizar tarefa

function atualizaTarefa(){
    
}