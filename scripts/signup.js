let form   = document.getElementById ('form');
let campos = document.querySelectorAll ('.required');
let spans  = document.querySelectorAll ('.span-required');
let nomeValida      = document.getElementById ('nome');
let sobrenomeValida = document.getElementById ('sobrenome');
let emailValida     = document.getElementById ('email');
let senhaValida     = document.getElementById ('senha');
let senhaRepValida  = document.getElementById ('senhaRep');
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function setError (index){
        campos[index].style.border = '2px solid #e63636';
        spans[index].style.display = 'block';
    }

    function removeError (index){
        campos[index].style.border = '';
        spans[index].style.display = 'none';
    }


    function nomeValidacao(){
        if (campos[0].value.length < 4)
        {
            setError(0);
        } else {
            removeError(0);
        }
    }

    function sobrenomeValidacao(){
        if (campos[1].value.length < 4)
        {
            setError(1);
        } else {
            removeError(1);
        }
    }

    function emailValidacao(){
        if(!emailRegex.test(campos[2].value))
        {
            setError(2);
        } else {
            removeError(2);
        }

    }

    function senhaValidacao(){
        if (campos[3].value.length < 8)
        {
            setError(3);
        } else {
            removeError(3);
            compareSenhas();
        }
    }

    function senhaRepValidacao(){
        if (campos[4].value.length <8)
        {
            setError(4);
        } else {
            removeError(4);
            compareSenhas();
        }
    }


    function compareSenhas(){
        if(campos[4].value == campos[3].value && campos[4].value.length >= 8)
        {
            removeError(4);
        } else {
            setError(4);
        }
    }    
 
