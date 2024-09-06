// const  { Language } = require('@google-cloud/language');
import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';
const API_KEY = "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

const dadosPrimeiroFormulario = JSON.parse(localStorage.getItem('dadosPrimeiroFormulario'))


function geraPrompt(){
    console.log("Gere uma trilha e uma rotina de aprendizados para " 
    + dadosPrimeiroFormulario.nomeUsuario + ", que quer aprender " 
    + dadosPrimeiroFormulario.oqueAprender + " em " 
    + dadosPrimeiroFormulario.emQuantoTempo + " sendo que essa pessoa possui "
    + dadosPrimeiroFormulario.porTantasHoras + " de disponibilidade diaria para estudar, e tem à mão os recursos: " 
    + dadosPrimeiroFormulario.recursosSelecionados + " e seu objetivo principal é " 
    + dadosPrimeiroFormulario.paraAlcancar + "."
    )
}


async function run() {
    const prompt = geraPrompt();
    const resultado = await model.generateContent(prompt);
    const response = await resultado.response;
    const texto = response.text();
    console.log(texto);
}

const botaoEnviar = document.querySelector(".finalizar");
botaoEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    run();
})