

const botaoRefazer = document.querySelector(".refazer");

botaoRefazer.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.clear();
  window.location.href = "../questionarios/questionario1/questionario1.html";
});

function processarResultados() {
  const resultado = JSON.parse(localStorage.getItem('resultados'));
  const resultadoLimpo = marked.parse(resultado);
  document.querySelector('#resultado').innerHTML = resultadoLimpo;
}

function showConfetti() {
    const confetti = document.createElement('div');
    confetti.textContent = '🎉';
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * innerWidth + 'px';
    const confettiContainer = document.querySelector('#confetti-container');
    confettiContainer.appendChild(confetti);
  
    const timeoutId = setTimeout(() => {
        const confettiContainer = document.querySelector('#confetti-container');
        confettiContainer.style.display = 'none';
      confetti.remove();
    }, 3000); 
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    processarResultados();
  
    let intervalId = setInterval(showConfetti, 20);
    setTimeout(() => {
      clearInterval(intervalId); 
    }, 3000);
  });
