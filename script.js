const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.querySelector('#gameSelect')
const questionInput = document.querySelector('#question')
const askButton = document.querySelector('#askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHTML = (text) => { const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const askAI = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const questionText = 
    `## Especialidade: Você é um assistente especializado no jogo ${game}.
    ## Tarefa:Você deve responder as perguntas do usuário sobre o jogo especificado, utilizando de informações disponíveis na internet para se manter atualizado.
    ## Regras: 
     - Não tente inventar uma resposta, se não souber a resposta, busque informações na internet e caso não ache diga que não sabe e não encontrou nada. 
     - Caso a pergunta não seja sobre o jogo, diga que a pergunta está relacionada ao jogo. 
     - Considere a data atual ${new Date().toLocaleDateString('pt-BR')}.
    ## Resposta: seja direto e objetivo, fornecendo uma resposta clara e concisa, evite informações desnecessárias. Responda em markdown. Evite saudações e despedidas. Caso a pergunta seja um pedido de build separe a resposta por seções para cada elemento para formar a construção final do personagem, por exemplo: no jogo league of legends voce pode separar por itens, runas, e dicas de como usar, e no jogo warframe voce pode separar por mods, armas que tem sinergia, arcanos e etc. Caso a pergunta seja mais livre se atente a construir ela de forma coesa e bem separada por topicos, tente fazer o texto ser sequencial e facil de ser lido, porem sem perder as informações.
     --
    Pergunta do usuário: ${question}
      `
    
    const contents = [{
        role: "user",
        parts: [{
            text: questionText
        }]
    }]

    const tools = [{
        google_search:{} 
    }]

const response = await fetch(geminiURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'},
    body: JSON.stringify({contents, tools})
})

const data = await response.json()
return data.candidates[0].content.parts[0].text
}
const sendForm = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value
    
    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos.')
        return
    }
    askButton.disabled = true
    askButton.textContent = 'Enviando...'
    askButton.classList.add('loading')

    try {
     const text = await askAI(question, game, apiKey)
    aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
    aiResponse.classList.remove('hidden')
}
    catch (error) {
    console.log('Erro ao enviar a pergunta:', error)    
    }
    finally {
        askButton.disabled = false
        askButton.textContent = 'Perguntar'
        askButton.classList.remove('loading')
    }
}

form.addEventListener('submit', sendForm)