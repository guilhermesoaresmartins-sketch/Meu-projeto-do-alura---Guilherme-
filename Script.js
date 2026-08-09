// Array que armazena os desejos
let desejos = [];

// Seleciona os elementos do HTML
const campoDesejo = document.getElementById("campoDesejo");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const botaoLimpar = document.getElementById("botaoLimpar");
const botaoConcluir = document.getElementById("botaoConcluir");
const listaDesejos = document.getElementById("listaDesejos");
const mensagemVazia = document.getElementById("mensagemVazia");
const contador = document.getElementById("contador");

// Função para adicionar um novo desejo
function adicionarDesejo() {
const texto = campoDesejo.value.trim();

if (texto === "") {
    alert("Digite um desejo antes de adicionar!");
    return;
}

const novoDesejo = {
    texto: texto,
    concluido: false
};

desejos.push(novoDesejo);

campoDesejo.value = "";

atualizarLista();

}

// Função responsável por mostrar os desejos na tela
function atualizarLista() {
listaDesejos.innerHTML = "";

desejos.forEach(function(desejo, indice) {

    const item = document.createElement("li");
    item.classList.add("item-desejo");

    const texto = document.createElement("span");
    texto.textContent = desejo.texto;
    texto.classList.add("texto-desejo");

    if (desejo.concluido) {
        texto.classList.add("concluido");
    }

    const botoes = document.createElement("div");
    botoes.classList.add("botoes-item");

    const botaoConcluir = document.createElement("button");
    botaoConcluir.textContent = desejo.concluido
        ? "Desfazer"
        : "Concluir";

    botaoConcluir.classList.add("botao-concluir");

    botaoConcluir.addEventListener("click", function() {
        alternarConclusao(indice);
    });

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("botao-remover");

    botaoRemover.addEventListener("click", function() {
        removerDesejo(indice);
    });

    botoes.appendChild(botaoConcluir);
    botoes.appendChild(botaoRemover);

    item.appendChild(texto);
    item.appendChild(botoes);

    listaDesejos.appendChild(item);
});

atualizarContador();
verificarListaVazia();

}

// Função para concluir ou desfazer um desejo
function alternarConclusao(indice) {
desejos[indice].concluido = !desejos[indice].concluido;

atualizarLista();

}

// Função para remover um desejo
function removerDesejo(indice) {
desejos.splice(indice, 1);

atualizarLista();

}

// Função para limpar todos os desejos
function limparLista() {
if (desejos.length === 0) {
return;
}

const confirmar = confirm("Tem certeza que deseja apagar todos os desejos?");

if (confirmar) {
    desejos = [];
    atualizarLista();
}

}

// Função para concluir todos os desejos
function concluirTodos() {
desejos.forEach(function(desejo) {
desejo.concluido = true;
});

atualizarLista();

}

// Função para atualizar o contador
function atualizarContador() {
const quantidade = desejos.length;

if (quantidade === 1) {
    contador.textContent = "1 desejo";
} else {
    contador.textContent = quantidade + " desejos";
}

}

// Função para verificar se a lista está vazia
function verificarListaVazia() {
if (desejos.length === 0) {
mensagemVazia.style.display = "block";
} else {
mensagemVazia.style.display = "none";
}
}

// Eventos dos botões
botaoAdicionar.addEventListener("click", adicionarDesejo);
botaoLimpar.addEventListener("click", limparLista);
botaoConcluir.addEventListener("click", concluirTodos);

// Permite adicionar apertando Enter
campoDesejo.addEventListener("keydown", function(evento) {
if (evento.key === "Enter") {
adicionarDesejo();
}
});

// Atualiza a tela quando o programa começa
atualizarLista();
