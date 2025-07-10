const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.querySelector('#gameSelect')
const questionInput = document.querySelector('#question')
const askButton = document.querySelector('#askButton')
const form = document.getElementById('form')

const askAI = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const questionText = `Você é um especialista no jogo ${game}. Responda a pergunta: ${question}`
    const content = [{
        parts: [{
            text: questionText
        }]
    }]
}

const sendForm = (event) => {
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