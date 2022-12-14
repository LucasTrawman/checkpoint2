function normalizaStringUsandoTrim(textoRecebido) {
  return textoRecebido.trim();
}

function apiBaseURL() {
  return "https://todo-api.ctd.academy:3000/v1";
}



let formulario = document.querySelector("form");
let btnAcessar = document.querySelector("#btn_acessar");
let inputEmail = document.querySelector("#inputEmail");
let emailErro = document.querySelector("#EmailErro");
let inputSenha = document.querySelector("#inputPassword");
let senhaErro = document.querySelector("#SenhaErro");
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let loginUsuarioJson = "";
let loginUsuario = {
  email: "",
  password: "",
};



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



function validarAcessar() {
  if (emailRegex.test(inputEmail.value) && inputSenha.value.length > 0) {
    btnAcessar.classList.remove("disabled");
    return true;
  } else {
    btnAcessar.classList.add("disabled");
    return false;
  }
}

formulario.addEventListener("keyup", function () {
  inputEmail.value.trim();
  validarAcessar();
});

inputEmail.addEventListener("blur", function(){
  validarEmail();
})



/////////////////////////////////////////////////////////////


// vinculação com a API

btnAcessar.addEventListener("click", async function (evento) {
  emailLogin = document.querySelector("#inputEmail");
  passwordLogin = document.querySelector("#inputPassword");

  if (validarAcessar()) {
    evento.preventDefault();

    emailLogin = normalizaStringUsandoTrim(emailLogin.value);
    passwordLogin = normalizaStringUsandoTrim(passwordLogin.value);

    loginUsuario.email = emailLogin;
    loginUsuario.password = passwordLogin;

    loginUsuarioJson = JSON.stringify(loginUsuario);

    loginApi(loginUsuarioJson);
  } else {
    console.log("Login inválido");
  }
});



function loginApi(objetoUsuarioJson) {
  
  let configRequest = {
    method: "POST",
    body: objetoUsuarioJson,
    headers: {
      "Content-type": "application/json",
    },
  };

  fetch(`${apiBaseURL()}/users/login`, configRequest)
    .then((resultado) => {
      if (resultado.status == 201 || resultado.status == 200) {
        return resultado.json();
      } else {
        throw resultado;
      }
    })
    .then((resultado) => {
      loginSucesso(resultado);
    })
    .catch((erro) => {
      loginErro(erro);
    });
}



function loginSucesso(respostaApi) {
  sessionStorage.setItem("jwt", respostaApi.jwt);
  window.location.href = "tarefas.html";
}



function loginErro(respostaApi) {
  if (respostaApi.status == 400 || respostaApi.status == 404) {
    alert("Email e/ou senha inválidos");
  }
}
