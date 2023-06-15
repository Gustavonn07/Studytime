const getTimeFromSeconds = (sec) => {
    // transforma em ms
    const data = new Date(sec * 1000);
    return data.toLocaleTimeString('pt-br', {
        hour12: false,
        timeZone: 'GMT',
    });
};

const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
let sec = 0;
let timer;

const startClock = () => {
    timer = setInterval(function () {
        sec++;
        salvarTempo(); // Salva o tempo ao sair da pagina
        relogio.innerHTML = getTimeFromSeconds(sec);
    }, 1000);
};

// Função para salvar o valor de sec no localStorage
const salvarTempo = () => {
    localStorage.setItem('tempo', sec);
};

// Função para carregar o valor de sec do localStorage
const carregarTempo = () => {
    const tempoSalvo = localStorage.getItem('tempo');
    if (tempoSalvo) {
        sec = parseInt(tempoSalvo);
        relogio.innerHTML = getTimeFromSeconds(sec);
    }
};

iniciar.addEventListener('click', function(event){
    relogio.classList.remove('pausado');
    clearInterval(timer);
    startClock();
});

pausar.addEventListener('click', function(event){
    relogio.classList.add('pausado')
    clearInterval(timer);
    salvarTempo(); // Salva o tempo ao pausar
});

zerar.addEventListener('click', function(event){
    relogio.classList.remove('pausado');
    sec = 0;
    clearInterval(timer);
    relogio.innerHTML = '00:00:00';
    salvarTempo(); // Salva o tempo ao zerar
});

// Chama a função para carregar o tempo ao carregar a página
carregarTempo();