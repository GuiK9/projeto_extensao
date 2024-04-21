const form = document.querySelector('form')
const input = document.querySelector('.input')

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: replaceImages,
        args: [input.value]
    })
})

const replaceImages = (url) => {
    const images = document.querySelectorAll('img')
    images.forEach((image) => image.src = url)
}