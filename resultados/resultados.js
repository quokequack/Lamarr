const botaoRefazer = document.querySelector(".refazer");
botaoRefazer.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "./questionario1.html";
});

            document.addEventListener('DOMContentLoaded', function()   {
            const resultado = JSON.parse(localStorage.getItem('resultados'));
            const resultadoLimpo = marked.parse(resultado);
            document.querySelector('#resultado').innerHTML = resultadoLimpo;
            const confettiContainer = document.querySelector('#confetti-container');
            const showConfetti = () => {
                const confetti = document.createElement('div');
                confetti.textContent = '🎉';
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * innerWidth + 'px';
                confettiContainer.appendChild(confetti);
                setTimeout(() => {
                    confetti.remove();
                }, 200);
            };
            let elapsedTime = 0;
            setInterval(() => {
                showConfetti();
            }, 50);

        });