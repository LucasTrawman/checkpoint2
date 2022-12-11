let btnAcessar = document.querySelector("#btn_acessar");
let inputEmail = document.querySelector("#inputEmail");
let emailErro = document.querySelector("#EmailErro");
let inputSenha = document.querySelector("#inputPassword");
let senhaErro = document.querySelector("#SenhaErro");

//Validar campo email vazio/nulo
function validarEmail() {

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail.value)) {
    inputEmail.classList.add("campo_correto");
    emailErro.classList.add("none");
  } else {
    inputEmail.classList.add("campo_incorreto");
    inputEmail.classList.remove("campo_correto");
    emailErro.classList.remove("none");
  }
}
inputEmail.addEventListener("keyup", function() {
  validarEmail();
  inputEmail.value.trim();
  validarAcessar();
});

//Validar campo senha vazio/nulo
function validarSenha() {
  if (!inputSenha.value) {
    inputSenha.classList.add("campo_incorreto");
    inputSenha.classList.remove("campo_correto");
    senhaErro.classList.remove("none");
  }

  if (inputSenha.value != "") {
    inputSenha.classList.add("campo_correto");
    senhaErro.classList.add("none");
  }
}
inputSenha.addEventListener("input", function() {
  validarSenha();
  inputSenha.value.trim();
  validarAcessar();
});

function btnRemoveDisabled() {
  btnAcessar.removeAttribute("disabled");
  btnAcessar.classList.remove("disabled");
}

function btnAddDisabled() {
  btnAcessar.setAttribute("disabled", "");
  btnAcessar.classList.add("disabled");
}

function validarAcessar(){
   if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail.value) && inputSenha.value.length > 0){
     btnRemoveDisabled()
   }else{
     btnAddDisabled()
   }
}