

let nomeUsuario;
let oqueAprender;
let emQuantoTempo;
let porTantasHoras;
let paraAlcancar;
let comEssesRecursos;
const recursosSelecionados = [];

function getDados(){
    nomeUsuario = document.querySelector('#nome').value;
    oqueAprender = document.querySelector("#assunto-aprender").value;
    emQuantoTempo = document.querySelector('input[name="tempo"]:checked');
    porTantasHoras = document.querySelector('input[name="horas-diarias"]:checked');
    comEssesRecursos = document.querySelectorAll('input[name="recurso"]');
    paraAlcancar = document.querySelector('input[name="objetivo"]:checked');

    const recursosArray = [...comEssesRecursos];
    recursosArray.forEach(recurso => {
        if (recurso.checked) {
        recursosSelecionados.push(recurso.value);
    }
});

const dadosPrimeiroFormulario = {
    nomeUsuario,
    oqueAprender,
    emQuantoTempo: emQuantoTempo.value,
    porTantasHoras: porTantasHoras.value,
    paraAlcancar: paraAlcancar.value,
    recursosSelecionados
}

return localStorage.setItem("dadosPrimeiroFormulario", JSON.stringify(dadosPrimeiroFormulario));
}


function validarFormulario() {
    if (!nomeUsuario || !oqueAprender || !emQuantoTempo || !porTantasHoras || !paraAlcancar || recursosSelecionados.length === 0) {
        alert("Por favor, responda a todas as perguntas antes de continuar.");
        return false;
    }
    return true;
}

const botaoEnviar = document.querySelector(".enviar");
botaoEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    getDados();
    if (validarFormulario()) {
        window.location.href = "./questionario2.html";
    }
});