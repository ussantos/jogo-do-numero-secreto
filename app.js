//variáveis:

//lista de numeros chutados, eles não devem ser repetir quando um novo jogo for iniciado
let listaDeNumerosSorteados = [];
//Numero maximo que pode ser sorteado
let numeroMaximo = 100;
//variável para armazenar o número de tentativas
let tentativas = 1;
//variável para armazenar o número secreto
let numeroSecreto = gerarNumeroAleatorio();


//funções:

//função criada para manipular tags HTML no front-end
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //vai falar cada texto que aparece na tela do jogo
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

//função que é executada quando o usuário clica no botão de chute
function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    console.log('Número secreto: ' + numeroSecreto);

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativas = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou com ${tentativas} ${palavraTentativas}.`;
        exibirTextoNaTela('p',mensagemTentativas);
        //muda status dos botões
        document.getElementById('verificar').setAttribute('disabled',true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } 
    else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor que o chute.');
        }
        else {
            exibirTextoNaTela('p','O número secreto é maior que o chute.');
        }
        tentativas++;
        limparCampo();
    }
}

//função para gerar um número aleatório inteiro entre 1 e numeroMaximo
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt((Math.random() * numeroMaximo) + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    //limpa a lista de numeros sorteados caso ela esteja cheia
    if (quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        //recursão, qunando a função chama ela mesma
        // se o número gerado já foi sorteado, gera um novo número
        return gerarNumeroAleatorio();
    } else { 
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//função para limpar o campo
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function exibirMensagemInicial(){
    //limpa o campo de chute
    limparCampo();
    //Define o título do jogo
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    //Define o texto de instrução para o usuário
    exibirTextoNaTela('p',`Forneça um número entre 1 e ${numeroMaximo}.`);
}

function reiniciarJogo(){
    //variável para armazenar o número secreto
    numeroSecreto = gerarNumeroAleatorio();
    //variável para armazenar o número de tentativas
    tentativas = 1;
    exibirMensagemInicial();
    //muda o status dos botões
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementById('verificar').removeAttribute('disabled');
}

//interações com o front-end:

//Primeira execução do jogo
exibirMensagemInicial();

