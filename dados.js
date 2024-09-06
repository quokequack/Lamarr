// const  { Language } = require('@google-cloud/language');
import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import showndown from "  https://unpkg.com/showdown/dist/showdown.min.js";

const API_KEY = "AIzaSyC0nbdIIqwxQi8MRuIuy-mo-eQS_NKcR7M";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

const dadosPrimeiroFormulario = JSON.parse(localStorage.getItem('dadosPrimeiroFormulario'))
let comoOrganizaIdeias;
let gostaDeMusica;
let comoAprendeMelhor;
let comoLidaComProblemas;
const formasAprender = [];

function getDados(){
    gostaDeMusica = document.querySelector('input[name="ouvir-musicas"]:checked');
    comoAprendeMelhor = document.querySelectorAll('input[name="aprende-melhor"]');
    comoOrganizaIdeias = document.querySelector('input[name="organiza-ideias"]:checked');
    comoLidaComProblemas = document.querySelector('input[name="abordagem-problemas"]:checked');

    const arrayFormas = [...comoAprendeMelhor];
    arrayFormas.forEach(forma => {
        if (forma.checked) {
            formasAprender.push(forma.value);
        }
    });
};

function getGostaDeMusica(){
    
    if(gostaDeMusica.value == "sim"){
        return " Recomende playlists no spotify e youtube de estudos para que a pessoa possa estudar ouvindo musica."
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
    + comoOrganizaIdeias.value + ", prefere lidar com problemas de forma " 
    + comoLidaComProblemas.value + ". Recomende para essa pessoa, materiais de apoio de acordo com as melhores formas que ela tem de aprender. Sugira exercicios e revisoes da forma que ela prefere lidar com problemas."
    + musica
}


async function run() {
    const prompt = geraPrompt();
    const resultado = await model.generateContent(prompt);
    const response = await resultado.response;
    const texto = response.text();
    const showdown = require('showdown');
    const converter = new showdown.Converter();
    const textoHTML = converter.makeHtml(texto);
    localStorage.setItem('resultados', JSON.stringify(textoHTML));
}

const botaoEnviar = document.querySelector(".finalizar");
botaoEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    run();
    window.location.href = './resultados.html'
});