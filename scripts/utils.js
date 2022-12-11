let formulario = document.querySelector("form");
let btnAcessar = document.querySelector("#btn_acessar");
let inputEmail = document.querySelector("#inputEmail");
let emailErro = document.querySelector("#EmailErro");
let inputSenha = document.querySelector("#inputPassword");
let senhaErro = document.querySelector("#SenhaErro");
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
function btnRemoveDisabled() {
  btnAcessar.classList.remove("disabled");
}

function btnAddDisabled() {
  btnAcessar.classList.add("disabled");
}

function validarAcessar(){
   if(emailRegex.test(inputEmail.value) && inputSenha.value.length > 0){
     btnRemoveDisabled()
   }else{
     btnAddDisabled()
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



/* Validar acesso
formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  if (inputSenha.value < 3){
    alert("Verifique sua senha!")
  }
})

*/
