// ================= MUSICA =================
const audio = document.getElementById('audio')
audio.volume = 0.4
window.addEventListener('click', () => {
    audio.play()
})

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
        pergunta: "Qual era o papel principal dos profetas no Antigo Testamento?",
        resposta: [
            "Governar Israel politicamente",
            "Ser porta-vozes de Deus e confrontar o povo",
            "Prever o futuro detalhadamente",
            "Escrever leis para Israel seguir firmemente",
            "Liderar guerras contra inimigos e seguir adiante do povo"
        ],
        correta: 1
    },
    {
        pergunta: "O que caracteriza a divisão entre profetas maiores e menores?",
        resposta: [
            "Período histórico",
            "Grau de proximidade com Deus",
            "Tamanho dos livros",
            "Quantidade de milagres realizados",
            "Importância espiritual"
        ],
        correta: 2
    },
    {
        pergunta: "Qual dessas NÃO é uma característica da linguagem profética apresentada?",
        resposta: [
            "Apelo emocional",
            "Fala figurativa",
            "Mensagem direta",
            "Uso de metáforas",
            "Linguagem política"
        ],
        correta: 4
    },
    {
        pergunta: "O ciclo apresentado na mensagem central dos profetas é:",
        resposta: [
            "Fé → bênção → riqueza",
            "Lei → sacrifício → perdão",
            "Pecado → juízo → restauração",
            "Prosperidade → guerra → vitória",
            "Idolatria → conquista → exílio"
        ],
        correta: 2
    },
    {
        pergunta: "Após o reinado de Salomão, o que aconteceu com o reino?",
        resposta: [
            "Foi dominado por Babilônia",
            "Permaneceu unido por séculos",
            "Foi dividido em Israel e Judá",
            "Tornou-se um império mundial",
            "Foi destruído imediatamente"
        ],
        correta: 2
    },
    {
        pergunta: "Qual era a capital de Israel (Reino do Norte)?",
        resposta: [
            "Nínive",
            "Samaria",
            "Judá",
            "Belém",
            "Jerusalém"
        ],
        correta: 1
    },
    {
        pergunta: "Qual profeta usou o casamento como metáfora da infidelidade de Israel?",
        resposta: [
            "Joel",
            "Oséias",
            "Miquéias",
            "Amós",
            "Jeremias"
        ],
        correta: 1
    },
    {
        pergunta: "Qual alternativa melhor resume o problema denunciado por um dos profetas do Reino do Norte?",
        resposta: [
            "Falta de líderes políticos",
            "Ausência total de religião em Israel",
            "Dominação estrangeira direta",
            "Prosperidade econômica acompanhada de injustiça social",
            "Falta de conhecimento militar do povo"
        ],
        correta: 3
    },
    {
        pergunta: "Qual é o ponto central do conflito apresentado por um dos profetas antes da invasão babilônica?",
        resposta: [
            "A dificuldade de reconstruir o templo",
            "A rejeição completa da fé pelo povo",
            "O questionamento sobre como Deus permite e usa a injustiça",
            "A revolta contra a lei de Moisés",
            "A dúvida sobre a existência de Deus"
        ],
        correta: 2
    },
    {
        pergunta: "Qual livro foi provavelmente escrito por Jeremias e expressa luto pela queda de Jerusalém?",
        resposta: [
            "Naum",
            "Lamentações",
            "Daniel",
            "Isaías",
            "Ezequiel"
        ],
        correta: 1
    },
    {
        pergunta: "Qual profeta atuou durante o exílio babilônico e falou sobre restauração e responsabilidade individual?",
        resposta: [
            "Amós",
            "Obadias",
            "Ezequiel",
            "Jonas",
            "Ageu"
        ],
        correta: 2
    },
    {
        pergunta: "Qual profeta criticou uma religiosidade fria no período pós-exílio?",
        resposta: [
            "Miquéias",
            "Naum",
            "Joel",
            "Malaquias",
            "Zacarias"
        ],
        correta: 3
    },
    {
        pergunta: "Qual profeta anunciou a queda de Nínive destacando a justiça implacável de Deus?",
        resposta: [
            "Naum",
            "Jonas",
            "Amós",
            "Malaquias",
            "Zacarias"
        ],
        correta: 0
    },
    {
        pergunta: "Qual desses profetas atuou após o exílio com foco na reconstrução do templo e motivação do povo?",
        resposta: [
            "Isaías",
            "Jeremias",
            "Obadias",
            "Ageu",
            "Habacuque"
        ],
        correta: 3
    },
    {
        pergunta: "Qual alternativa melhor descreve a diferença entre Jonas e Naum em relação a Nínive?",
        resposta: [
            "Ambos focam em Israel, não em Nínive",
            "Ambos anunciam apenas destruição",
            "Jonas ignora Nínive e Naum a salva",
            "Jonas anuncia juízo e Naum anuncia restauração",
            "Jonas anuncia misericórdia e Naum anuncia juízo"
        ],
        correta: 4
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