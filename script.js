const perguntas = [
    {
    pergunta: "Qual é a forma correta de declarar uma variável em JavaScript?",
    resposta: [
        "var x = 10;",
        "variável x = 10;",
        "let x = 10;"
    ],
    correta: 2
    },
    {
    pergunta: "Qual dos seguintes não é um tipo de dado primitivo em JavaScript?",
    resposta: [
        "Número",
        "Matriz (Array)",
        "Booleano"
    ],
    correta: 1
    },
    {
    pergunta: "O que o seguinte código imprimirá: console.log(2 + '2');?",
    resposta: [
        "4",
        "22",
        "Erro de Sintaxe"
    ],
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
    resposta: [
        "parseFloat()",
        "parseInt()",
        "toFixed()"
    ],
    correta: 0
    },
    {
    pergunta: "Qual é o resultado de typeof null em JavaScript?",
    resposta: [
        "null",
        "objeto",
        "indefinido"
    ],
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
    resposta: [
        "push()",
        "add()",
        "append()"
    ],
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
        "Para pular o restante do bloco de código e ir para a próxima iteração",
        "Para sair da função atual"
    ],
    correta: 0
    }
];

const quiz = document.querySelector("#quiz")
const template = document.querySelector("template")

const corretas = new Set()
const totalDePerguntas = perguntas.length
//seleciona o span de acertos
const mostrarTotal = document.querySelector('#acertos span')
//muda o texto do span para o valor de perguntas corretas pelo total
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas

//repetição das perguntas
for (let item of perguntas){
    //seleciona o item pergunta
    const quizItem = template.content.cloneNode(true)
    //define o texto da pergunta
    quizItem.querySelector('h3').textContent = item.pergunta

    //repetição das respostas
    for (let resposta of item.resposta){
        //seleciona o item de resposta
        const dt = quizItem.querySelector('dl dt').cloneNode(true)
        //define o texto da resposta
        dt.querySelector('span').textContent = resposta
        //coloca um atributo em cada input para selecionar um por pergunta
        dt.querySelector('input').setAttribute('name', 'pergunta' + perguntas.indexOf(item))
        //faz os inputs aparecerem com valores diferentes
        dt.querySelector('input').value = item.resposta.indexOf(resposta)
        //seleciona o evento de mudança
        dt.querySelector('input').onchange = (event)=> {
            //diz se o valor do input clicado é igual ao valor da resposta correta
            const estaCorreta = event.target.value == item.correta
            //apaga o valor das respostas certas se mudar o input
            corretas.delete(item)
            //se estiver correto vai adicionar o acerto
            if (estaCorreta) {
                corretas.add(item)
            }
            //muda o texto do span para o valor de perguntas corretas pelo total
            mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
        }
        
        //coloca as respostas na tela
        quizItem.querySelector('dl').appendChild(dt)
    }
    //remove "Resposta"
    quizItem.querySelector('dl dt').remove()

    //coloca a pergunta na tela
    quiz.appendChild(quizItem)
}

