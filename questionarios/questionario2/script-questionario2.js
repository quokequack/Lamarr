// const  { Language } = require('@google-cloud/language');
import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(['foo', 'bar'],
    function   (foo,   bar) {
});

require('dotenv').config();

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

const dadosPrimeiroFormulario = JSON.parse(localStorage.getItem('dadosPrimeiroFormulario'))
let comoOrganizaIdeias;
let gostaDeMusica;
let comoAprendeMelhor;
let comoLidaComProblemas;
const formasAprender = [];
const organizaIdeias = [];

function getDados(){
    gostaDeMusica = document.querySelector('input[name="ouvir-musicas"]:checked');
    comoAprendeMelhor = document.querySelectorAll('input[name="aprende-melhor"]');
    comoOrganizaIdeias = document.querySelectorAll('input[name="organiza-ideias"]');
    comoLidaComProblemas = document.querySelector('input[name="abordagem-problemas"]:checked');

    const arrayOrganizaIdeias = [...comoOrganizaIdeias];
    arrayOrganizaIdeias.forEach(maneira => {
        if (maneira.checked) {
            organizaIdeias.push(maneira.value);
        }
    });

    const arrayFormas = [...comoAprendeMelhor];
    arrayFormas.forEach(forma => {
        if (forma.checked) {
            formasAprender.push(forma.value);
        }
    });
};

function getGostaDeMusica(){
    
    if(gostaDeMusica.value == "sim"){
        return " Recomende playlists no spotify e/ou youtube de estudos para que a pessoa possa estudar ouvindo musica."
    }
    return "";
}

function geraPrompt(){
    getDados();
    const musica = getGostaDeMusica();

    return "Gere uma trilha e uma rotina de aprendizados para " 
    + dadosPrimeiroFormulario.nomeUsuario + ", que quer aprender " 
    + dadosPrimeiroFormulario.oqueAprender + " em " 
    + dadosPrimeiroFormulario.emQuantoTempo + " sendo que essa pessoa possui "
    + dadosPrimeiroFormulario.porTantasHoras + " de disponibilidade diaria para estudar, e tem à mão os recursos: " 
    + dadosPrimeiroFormulario.recursosSelecionados + " e seu objetivo principal é " 
    + dadosPrimeiroFormulario.paraAlcancar + ". Em relação ao aprendizado, "
    + dadosPrimeiroFormulario.nomeUsuario + " aprende melhor do(s) jeito(s): "
    + formasAprender + ", organiza melhor as ideias fazendo " 
    + organizaIdeias + ", prefere lidar com problemas de forma " 
    + comoLidaComProblemas.value + ". Recomende para essa pessoa, materiais de apoio de acordo com as melhores formas que ela tem de aprender. Sugira exercicios e revisoes da forma que ela prefere lidar com problemas."
    + musica
}

function showLoadingModal() {
    document.querySelector('#loading-modal').style.display = 'block';
  }
  
  function hideLoadingModal() {
    document.querySelector('#loading-modal').style.display = 'none';
  }


async function run() {
    showLoadingModal();
    setTimeout(async () => {
        const prompt = geraPrompt();
        const resultado = await model.generateContent(prompt);
        const response = await resultado.response;
        const texto = response.text();
        localStorage.setItem('resultados', JSON.stringify(texto));
        hideLoadingModal();
        window.location.href = "../../resultados/resultados.html";
    }, 2000);
}

function validarFormulario() {
    if (!formasAprender.length === 0 || !organizaIdeias.length === 0 || !comoLidaComProblemas || !gostaDeMusica) {
        alert("Por favor, responda a todas as perguntas antes de continuar.");
        return false;
    }
    return true;
}

const botaoEnviar = document.querySelector(".finalizar");
botaoEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    getDados();
    if (validarFormulario()) {
        run();
    }
});