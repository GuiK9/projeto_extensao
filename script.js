/* 
    criar um veo tutorial básico com o Marka e usar de dados base para ajudar o usuário
*/

var request = indexedDB.open("Marka", 1);
var db;

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("Banco de dados aberto com sucesso");
};

request.onerror = function(event) {
  console.error("Erro ao abrir o banco de dados", event.target.error);
};

request.onupgradeneeded = function(event) {
  db = event.target.result;

  var objectStore = db.createObjectStore("links", { keyPath: "link", autoIncrement:false });

  objectStore.createIndex("link", "link", { unique: false });
  objectStore.createIndex("registros", "registros", { unique: false });

  console.log("Banco de dados e tabela criados com sucesso");
};

function adicionarRegistro(registro) {
    var transaction = db.transaction(["links"], "readwrite")
    var store = transaction.objectStore("links")
    store.add(registro)
}

function mostrarRegistros() {
    var transaction = db.transaction(["links"], "readonly");
    var registrosStore = transaction.objectStore("links");
    var getRequest = registrosStore.getAll();
  
    getRequest.onsuccess = function(event) {
      var registros = event.target.result;
  
      // Mostrar os registros no console
      registros.forEach(function(registro) {
        console.log(registro);
      });
    };
  
    getRequest.onerror = function(event) {
      console.error("Erro ao recuperar registros", event.target.error);
    };
  }

/* 
  Código padrão para popular o db para teste


[
  {
    "link": "http://exemplo1.com",
    "registros": [
      { "tempo": "12:22", "descricao": "ele fala sobre o programa llm" },
      { "tempo": "13:45", "descricao": "apresentação do novo produto" }
    ]
  },
  {
    "link": "http://exemplo2.com",
    "registros": [
      { "tempo": "15:10", "descricao": "reunião com a equipe de desenvolvimento" },
      { "tempo": "17:30", "descricao": "análise de desempenho trimestral" },
      { "tempo": "19:00", "descricao": "jantar de confraternização" }
    ]
  }
].forEach(registro =>{
    adicionarRegistro(registro)
}) */



