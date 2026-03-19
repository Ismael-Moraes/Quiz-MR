// ================= COOKIES =================
function setCookie(nome, valor, dias) {
    const data = new Date()
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000))
    document.cookie = `${nome}=${encodeURIComponent(valor)};expires=${data.toUTCString()};path=/`
}

function getCookie(nome) {
    const cookies = document.cookie.split('; ')
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=')
        if (key === nome) return decodeURIComponent(value)
    }
    return null
}

// ================= PERGUNTAS =================
const perguntas = [
    {
    pergunta: "Qual é a forma correta de declarar uma variável em JavaScript?",
    resposta: ["x = 10;", "variável x = 10;", "let x = 10;"],
    correta: 2
    },
    {
    pergunta: "Qual dos seguintes não é um tipo de dado primitivo em JavaScript?",
    resposta: ["Número", "Matriz (Array)", "Booleano"],
    correta: 1
    },
    {
    pergunta: "O que o seguinte código imprimirá: console.log(2 + '2');?",
    resposta: ["4", "22", "Erro de Sintaxe"],
    correta: 1
    },
    {
    pergunta: "O que o operador '===' faz em JavaScript?",
    resposta: [
        "Verifica a igualdade, sem conversão de tipo",
        "Verifica a igualdade, com conversão de tipo",
        "Atribui um valor a uma variável"
    ],
    correta: 0
    },
    {
    pergunta: "Qual função é usada para analisar uma string e retorná-la como um número de ponto flutuante?",
    resposta: ["parseFloat()", "parseInt()", "toFixed()"],
    correta: 0
    },
    {
    pergunta: "Qual é o resultado de typeof null em JavaScript?",
    resposta: ["null", "objeto", "indefinido"],
    correta: 1
    },
    {
    pergunta: "Qual é a sintaxe correta para um loop 'for' em JavaScript?",
    resposta: [
        "for (i <= 5; i++)",
        "for (var i = 0; i < 5; i++)",
        "for (i = 0; i < 5)"
    ],
    correta: 1
    },
    {
    pergunta: "Qual método é usado para adicionar novos itens ao final de um array em JavaScript?",
    resposta: ["push()", "add()", "append()"],
    correta: 0
    },
    {
    pergunta: "Para que serve a palavra-chave 'this' em JavaScript?",
    resposta: [
        "Para referenciar a função atual",
        "Para referenciar o objeto global",
        "Para referenciar o objeto ao qual ela pertence"
    ],
    correta: 2
    },
    {
    pergunta: "Qual é o propósito da declaração 'break' em JavaScript?",
    resposta: [
        "Para encerrar um loop ou declaração switch",
        "Para pular o restante do bloco de código",
        "Para sair da função atual"
    ],
    correta: 0
    }
]

// ================= ELEMENTOS =================
const quiz = document.querySelector("#quiz")
const template = document.querySelector("template")
const corretas = new Set()
const totalDePerguntas = perguntas.length
const mostrarTotal = document.querySelector('#acertos span')

// ================= CARREGAR COOKIES =================
let progressoSalvo = getCookie('quizProgresso')
progressoSalvo = progressoSalvo ? JSON.parse(progressoSalvo) : {}

const acertosSalvos = getCookie('quizAcertos')
if (acertosSalvos) {
    mostrarTotal.textContent = acertosSalvos + ' de ' + totalDePerguntas
} else {
    mostrarTotal.textContent = '0 de ' + totalDePerguntas
}

// ================= MONTAR QUIZ =================
for (let item of perguntas){
    const quizItem = template.content.cloneNode(true)
    quizItem.querySelector('h3').textContent = item.pergunta

    const index = perguntas.indexOf(item)

    for (let resposta of item.resposta){
        const dt = quizItem.querySelector('dl dt').cloneNode(true)
        const input = dt.querySelector('input')

        dt.querySelector('span').textContent = resposta
        input.setAttribute('name', 'pergunta' + index)
        input.value = item.resposta.indexOf(resposta)

        // RESTAURAR RESPOSTA SALVA
        if (progressoSalvo[index] !== undefined) {
            input.checked = progressoSalvo[index] == input.value
            input.disabled = true
            item.respondida = true

            if (progressoSalvo[index] == item.correta) {
                corretas.add(item)
            }
        }

        input.onchange = (event)=> {
            if (item.respondida) return

            item.respondida = true

            const respostaEscolhida = event.target.value
            const estaCorreta = respostaEscolhida == item.correta

            const inputs = event.target.closest('.quiz-item').querySelectorAll('input')
            inputs.forEach(input => input.disabled = true)

            if (estaCorreta) {
                corretas.add(item)
            }

            // SALVAR RESPOSTAS
            progressoSalvo[index] = respostaEscolhida
            setCookie('quizProgresso', JSON.stringify(progressoSalvo), 7)

            // SALVAR ACERTOS
            setCookie('quizAcertos', corretas.size, 7)

            mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
        }

        quizItem.querySelector('dl').appendChild(dt)
    }

    quizItem.querySelector('dl dt').remove()
    quiz.appendChild(quizItem)
}