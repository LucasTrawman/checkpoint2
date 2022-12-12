/* ADICIONADO DO PROF -> Retira espaços iniciais e finais de uma string informada */
function normalizaStringUsandoTrim(textoRecebido) {
  return textoRecebido.trim();
}

/* ADICIONADO DO PROF -> BASE-URL da API que o projeto realiza a conexão */
function apiBaseURL() {
  return "http://todo-api.ctd.academy:3000/v1"
}

// Sessão de LOGIN

let formulario = document.querySelector("form");
let btnAcessar = document.querySelector("#btn_acessar");
let inputEmail = document.querySelector("#inputEmail");
let emailErro = document.querySelector("#EmailErro");
let inputSenha = document.querySelector("#inputPassword");
let senhaErro = document.querySelector("#SenhaErro");
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Define um objeto JS para o usuário
let loginUsuario = {
  email: "",
  password: ""
}

// Define um objeto JSON para o usuário
let loginUsuarioJson = "";

// Validar campo email vazio/nulo
function validarEmail() {

  if (emailRegex.test(inputEmail.value)) {
    inputEmail.classList.add("campo_correto");
    emailErro.classList.add("hidden");
  } else {
    inputEmail.classList.add("campo_incorreto");
    inputEmail.classList.remove("campo_correto");
    emailErro.classList.remove("hidden");
  }
}

// Validar campo senha vazio/nulo
function validarSenha() {
  if (!inputSenha.value) {
    inputSenha.classList.add("campo_incorreto");
    inputSenha.classList.remove("campo_correto");
    senhaErro.classList.remove("hidden");
  }

  if (inputSenha.value != "") {
    inputSenha.classList.add("campo_correto");
    senhaErro.classList.add("hidden");
  }
}


// Validar botão
function validarAcessar() {
   if(emailRegex.test(inputEmail.value) && inputSenha.value.length > 0){
    btnAcessar.classList.remove("disabled");
   }else{
    btnAcessar.classList.add("disabled");
   }
}

// Validar campos de e-mail e senha
formulario.addEventListener("keyup", function() {
  validarEmail();
  inputEmail.value.trim();
  validarAcessar();
  validarSenha();
  inputSenha.value.trim();
  validarAcessar();
});



/* ADICIONADO DO PROF -> Adiciona um evento de click ao botão de acessar */
btnAcessar.addEventListener("click", function (evento) {

  if (validaLogin()) {

      evento.preventDefault();

      /* Normalizando os inputs da tela de login */
      inputEmail = normalizaStringUsandoTrim(inputEmail.value);
      inputSenha = normalizaStringUsandoTrim(inputSenha.value);

      //Atribui as informações normalizadas ao objeto JS
      loginUsuario.email = inputEmail;
      loginUsuario.password = inputSenha;

      //Converte o objeto JS para JSON
      loginUsuarioJson = JSON.stringify(loginUsuario);

      /* Chama a função que conecta com a API */
      loginApi(loginUsuarioJson);

  } else {
      console.log("Login inválido");
  }

});

/* ADICIONADO DO PROF -> Comunicando com a API utilizando Fetch e Promisses */
function loginApi(objetoUsuarioJson) {

  let configRequest = {
      method: "POST",
      body: objetoUsuarioJson,
      headers: {
          'Content-type': 'application/json'
      }
  }

  fetch(`${apiBaseURL()}/users/login`, configRequest)
      .then(resultado => {

          /* Verifica status de sucesso na execução da promisse */
          if (resultado.status == 201 || resultado.status == 200) {
              return resultado.json();
          } else {
              /* Caso o status não seja sucesso, retorna uma exceção com todo o objeto do "erro" */
              throw resultado;
          }
      }
      ).then(
          resultado => {
              //Chama função ao obter sucesso no login
              loginSucesso(resultado);
          }
      ).catch(
          erro => {
              //Chama função ao obter algum erro
              loginErro(erro);
          }
      );
}


function loginSucesso(respostaApi) {
  console.log(respostaApi);
  //Salvando o token do usuário na sessão do navegador (Usando Storage)
  sessionStorage.setItem("jwt", respostaApi.jwt)
  // Direcionar o usuário para a tela principal
  window.location.href = "tarefas.html";
}

function loginErro(respostaApi) {
  if (respostaApi.status == 400 || respostaApi.status == 404) {
      console.log("Email e/ou senha inválidos");
      alert("Email e/ou senha inválidos");
  }
}