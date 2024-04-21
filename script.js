const form = document.querySelector('form')
const input = document.querySelector('.input')

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    console.log('===== flag11 =====')
    console.log(tab.id)


    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: replaceImages
    })
})

const replaceImages = () => {
    console.log('===== flag =====')

    const images = documents.querySelectorAll('img')
    console.log('===== flag =====')
    images.forEach(image => {
        image.src = 'as'
    });

}
/* 217767661 */