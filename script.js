/* 
    criar um veo tutorial básico com o Marka e usar de dados base para ajudar o usuário
*/

var request = indexedDB.open("Marka", 2);
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

  var objectStore = db.createObjectStore("links", { keyPath: "id", autoIncrement:true });

  objectStore.createIndex("link", "link", { unique: false });
  objectStore.createIndex("tempo", "tempo", { unique: false });
  objectStore.createIndex("descricao", "descricao", { unique: false });

  console.log("Banco de dados e tabela criados com sucesso");
};

function adicionarRegistro(link, tempo, descricao) {
  var transaction = db.transaction(["links"], "readwrite");
  var objectStore = transaction.objectStore("links");
  var request = objectStore.add({ link: link, tempo: tempo, descricao: descricao });

  request.onsuccess = function(event) {
    console.log("Registro adicionado com sucesso");
  };

  request.onerror = function(event) {
    console.error("Erro ao adicionar registro", event.target.error);
  };
}

function recuperarRegistros() {
  var transaction = db.transaction(["links"]);
  var objectStore = transaction.objectStore("links");
  var getRequest = objectStore.getAll();

  getRequest.onsuccess = function(event) {
    var registros = event.target.result;
    registros.forEach(function(registro) {
      console.log("ID:", registro.id, "Link:", registro.link, "Tempo:", registro.tempo, "Descrição:", registro.descricao);
    });
  };

  getRequest.onerror = function(event) {
    console.error("Erro ao recuperar links", event.target.error);
  };
}
