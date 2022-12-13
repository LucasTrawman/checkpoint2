function normalizaStringUsandoTrim(textoRecebido) {
  return textoRecebido.trim();
}

function apiBaseURL() {
  return "http://todo-api.ctd.academy:3000/v1";
}



let formulario = document.querySelector("form");
let campos = document.querySelectorAll(".required");
let spans = document.querySelectorAll(".span-required");
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let btnCadastrar = document.querySelector("#btn_cadastrar");
let signupUsuarioJson = "";
let signupUsuario = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};



function setError(index) {
  campos[index].classList.remove("campo_correto");
  campos[index].classList.add("campo_incorreto");
  spans[index].classList.remove("hidden");
}

function removeError(index) {
  campos[index].classList.add("campo_correto");
  spans[index].classList.add("hidden");
}

function nomeValidacao() {
  if (campos[0].value.length < 4) {
    setError(0);
  } else {
    removeError(0);
  }
  return true;
}

function sobrenomeValidacao() {
  if (campos[1].value.length < 4) {
    setError(1);
  } else {
    removeError(1);
  }
  return true;
}

function emailValidacao() {
  if (!emailRegex.test(campos[2].value)) {
    setError(2);
  } else {
    removeError(2);
  }
  return true;
}

function senhaValidacao() {
  if (campos[3].value.length < 8) {
    setError(3);
  } else {
    removeError(3);
    compareSenhas();
  }
  return true;
}

function senhaRepValidacao() {
  if (campos[4].value.length < 8) {
    setError(4);
  } else {
    removeError(4);
    compareSenhas();
  }
  return true;
}

function compareSenhas() {
  if (campos[4].value == campos[3].value && campos[4].value.length >= 8) {
    removeError(4);
  } else {
    setError(4);
  }
}

// Validação botão
function ValidarDados() {
  if (
    nomeValidacao() == true &&
    sobrenomeValidacao() == true &&
    emailValidacao() == true &&
    senhaRepValidacao() == true
  ) {
    btnCadastrar.classList.remove("disabled");
  }
}



campos[4].addEventListener("keyup", function () {
  ValidarDados();
});



btnCadastrar.addEventListener("click", async function (evento) {
  evento.preventDefault();

  let inputNome = normalizaStringUsandoTrim(campos[0].value);
  let inputSobrenome = normalizaStringUsandoTrim(campos[1].value);
  let inputEmail = normalizaStringUsandoTrim(campos[2].value);
  let inputSenha = normalizaStringUsandoTrim(campos[3].value);

  signupUsuario.firstName = inputNome;
  signupUsuario.lastName = inputSobrenome;
  signupUsuario.email = inputEmail;
  signupUsuario.password = inputSenha;

  signupUsuarioJson = JSON.stringify(signupUsuario)

  signupAPI(signupUsuarioJson);

});

function signupAPI(body) {

  let signupContent = {
    method: "POST",
    body: body,
    headers: {
      "Content-type": "application/json",
    },
  };

  fetch(`${apiBaseURL()}/users`, signupContent)
    .then((resultado) => {
      if (resultado.status == 201 || resultado.status == 200) {
        return resultado.json();
      } else {
        throw resultado;
      }
    })
    .then(() => {
      window.location.href = "index.html";
      return true
    })
    .catch((erro) => {
      loginErro(erro);
      return false;
    });
}


function loginErro(respostaApi) {
  if (respostaApi.status == 400 || respostaApi.status == 404) {
    alert(
      "Usuário já registrado ou um dos dados está incompleto ou preenchido incorretamente"
    );
  }
}
