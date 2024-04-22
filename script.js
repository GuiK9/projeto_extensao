const listLinks = document.getElementById('listLinks')
const request = window.indexedDB.open('Marka', 1)

var db = null

request.onerror = (event) => {
    console.log('error on open db');
};

request.onsuccess = (event) => {
    db = event.target.result
}

request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // Criar uma loja de objetos chamada "ExemploStore"
    var objectStore = db.createObjectStore('ExemploStore', { keyPath: 'id', autoIncrement: true });

    console.log('Loja de objetos criada com sucesso');
};


/*const form = document.querySelector('form')
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
    const images = document.querySelectorAll('.ytp-progress-bar')
    images.forEach((video) => {
        console.log(video)
    })
} */