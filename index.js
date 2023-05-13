//raiz do projeto com require express e a porta 3000
const express = require("express");
const app = express();
const port = 3000;

//usando json e public
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//recebe dados pela rota mirror
app.post("/mirror", function (req, res, next) {
  console.log(req.body);
  res.send(req.body);
});

//define a rota "/" como a raiz
//app.get('/', (req, res) => {
//res.send('Hello World!')
//})

//cria uma rota que converte os parâmetros de
//consulta de uma solicitação GET em um objeto JSON
//e envia-o como resposta para o cliente
app.get("/querytojson", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

//inicia o servidor. Ele deve ouvir na porta especificada
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//cria uma rota que converte os valores
//dos parâmetros dinâmicos de uma solicitação
//GET em um objeto JSON e envia-o como
//resposta para o cliente
app.get("/paramtojson/name/:name/role/:role", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

let zoo = [
  { animal: "DOG", name: "Pluto" },
  { animal: "CAT", name: "Hercules" },
  { animal: "BIRD", name: "Tweety" },
  { animal: "DOG", name: "Spiff" },
  { animal: "CAT", name: "Tom" },
  { animal: "BIRD", name: "Road Runner" },
];

//rota GET zoo, recebe uma parâmetro via URL, usa
//a função filter para identificar se há ocorrência
//no vetor
app.get("/zooNome", (req, res) => {
  //recebe o dados da query name
  const letter = req.query.name;

  //faz a consulta no array
  const filtroName = zoo.filter((animal) => animal.name.includes(letter));
  //envia a resposta que ficou em filteredZoo
  res.send(filtroName);
});

// recebe o valor do parâmetro 'animal' da query string
// filtra o vetor 'zoo' pelo valor do campo 'animal'
// envia a resposta com os objetos filtrados
app.get("/zooAnimal", (req, res) => {
  const animal = req.query.animal;
  const filtroAnimal = zoo.filter((item) => item.animal === animal);
  res.send(filtroAnimal);
});

//endpoint do slide
app.post("/produto", (req, resp) => {
  let respostaHtml = "<html>";
  respostaHtml += "<head></head>";
  respostaHtml += "<body>";
  respostaHtml += "<h1>Produto cadastrado</h1>";
  respostaHtml += "<table>";
  respostaHtml +=
    "<tr> <td>Produto:</td> <td>" + req.body.produto + "</td></tr>";
  respostaHtml +=
    "<tr> <td>Quantidade:</td> <td>" + req.body.quantidade + "</td></tr>";
  respostaHtml += "<tr> <td>Data:</td> <td>" + req.body.data + "</td></tr>";
  respostaHtml += "</table>";
  respostaHtml += "</body>";
  respostaHtml += "</html>";
  resp.send(respostaHtml);
});

//usando post com url zpp e endpoint com a pagina html
app.post("/zoo", (req, resp) => {
  const animal = req.body.animal;
  const name = req.body.name;
  //metodo push usado para adc nome e animal no array
  zoo.push({ animal: animal, name: name });

  //endpoint da pg html e css
  let respostaHtml = "<html>";
  respostaHtml += "<head><style>";
  respostaHtml += "table, th, td {";
  respostaHtml += "border: 1px solid black;";
  respostaHtml += "border-collapse: collapse;";
  respostaHtml += "margin 5px auto;";
  respostaHtml += "padding: 8px;";
  respostaHtml += "text-align: center;";
  respostaHtml += "margin: 5px auto;";
  respostaHtml += "width: 60%;";
  respostaHtml += "background-color: #fff;";
  respostaHtml += "box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);";
  respostaHtml += "}";

  respostaHtml +=  "body {";
  respostaHtml +=  "font-family: Arial, sans-serif;";
  respostaHtml +=  "background-color: #f2f2f2;";
  respostaHtml +=  "margin: 0;";
  respostaHtml +=  "padding: 0;";
  respostaHtml +=  "text-align: center;";
  respostaHtml += "}";

  respostaHtml += "th,td {";
  respostaHtml += "background-color: #ddd";
  respostaHtml += "padding: 10px;";
  respostaHtml += "text-align: left;";
  respostaHtml += "border-bottom: 1px solid #ddd;";
  respostaHtml += "}";

  respostaHtml +=  "button {";
  respostaHtml +=  "display: block;";
  respostaHtml +=  "margin: 20px auto;";
  respostaHtml +=  "background-color: #fff;";
  respostaHtml +=  "color: #333;";
  respostaHtml +=  "border: 1px solid #333;";
  respostaHtml += "}";

  respostaHtml += "</style></head>";
  respostaHtml += "<body>";
  respostaHtml += "<h1>Animal cadastrado com sucesso!</h1>";
  respostaHtml += "<table>";
  respostaHtml +=
    "<tr> <td>Seu animal inserido: </td> <td>" + req.body.animal + "</td></tr>";
  respostaHtml +=
    "<tr> <td>Nome do animal inserido:</td> <td>" +
    req.body.name +
    "</td></tr>";
  respostaHtml += "<hr>";
  respostaHtml += "<h1>Tabela dos animais</h1>";
  
  //responsável por percorrer o array
  //retornando animal e nome a cada linha
  zoo.forEach((animal) => {
    respostaHtml += "<tr>";
    respostaHtml += "<td>" + animal.animal + "</td>";
    respostaHtml += "<td>" + animal.name + "</td>";
    respostaHtml += "</tr>";
  });
  respostaHtml += "</table>";
 //botão com a função history.back() para voltar pra pagina anterior
  respostaHtml += "<button onclick='history.back()'>Voltar</button>";

  respostaHtml += "</body>";
  respostaHtml += "</html>";
  resp.send(respostaHtml);
});

/*
app.get("/zoo", (req, res) => {
  Não funciona pois difere as letras maiúsculas das minúsculas
  const animal = req.query.animal;
  const filtroAnimal = zoo.filter((item) => item.animal === animal);
  const name = req.query.name;

  if (name {
    //caso name nao seja nulo, faz a consulta
    const filtroName = zoo.filter((item) => item.name.includes(name));
    res.send(filtroName);
  }
  res.send(filtroAnimal);
*/

app.get("/zoo", (req, res) => {
  const { animal, name } = req.query;
  let result = zoo;

  //se animal não for nulo, então converte a entrada para caracteres
  //minúsculos e depois compara com os caracteres de animal.toLowerCaso
  //também minúsculos
  if (animal) {
    if (animal == "TODOS") {
      result = zoo;
    }
    if (animal != "TODOS") {
      result = result.filter(
        (item) => item.animal.toLowerCase() === animal.toLowerCase()
      );
    }
  }

  //o mesmo que acontece em animal
  if (name) {
    result = result.filter(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
  }

  //endpoint da pg html e css
  let respostaHtml = "<html>";
  respostaHtml += "<head><style>";
  respostaHtml += "table, th, td {";
  respostaHtml += "border: 1px solid black;";
  respostaHtml += "border-collapse: collapse;";
  respostaHtml += "margin 5px auto;";
  respostaHtml += "padding: 8px;";
  respostaHtml += "text-align: center;";
  respostaHtml += "margin: 5px auto;";
  respostaHtml += "width: 60%;";
  respostaHtml += "background-color: #fff;";
  respostaHtml += "box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);";
  respostaHtml += "}";

  respostaHtml +=  "body {";
  respostaHtml +=  "font-family: Arial, sans-serif;";
  respostaHtml +=  "background-color: #f2f2f2;";
  respostaHtml +=  "margin: 0;";
  respostaHtml +=  "padding: 0;";
  respostaHtml +=  "text-align: center;";
  respostaHtml += "}";
  
  respostaHtml += "th,td {";
  respostaHtml += "background-color: #ddd";
  respostaHtml += "padding: 10px;";
  respostaHtml += "text-align: left;";
  respostaHtml += "border-bottom: 1px solid #ddd;";
  respostaHtml += "}";

  respostaHtml +=  "button {";
  respostaHtml +=  "display: block;";
  respostaHtml +=  "margin: 20px auto;";
  respostaHtml +=  "background-color: #fff;";
  respostaHtml +=  "color: #333;";
  respostaHtml +=  "border: 1px solid #333;";
  respostaHtml += "}";

  respostaHtml += "</style></head>";
  respostaHtml += "<body>";
  respostaHtml += "<h1>Animal pesquisado com sucesso!</h1>";
  respostaHtml += "<table>";
  respostaHtml += "<h1>Tabela dos animais</h1>";
  respostaHtml += "<tr>";
  respostaHtml += "<td> Animal </td>";
  respostaHtml += "<td> Nome </td>";
  respostaHtml += "</tr>";
  //responsável por percorrer o array
  //retornando animal e nome a cada linha
  result.forEach((result) => {
    respostaHtml += "<tr>";
    respostaHtml += "<td>" + result.animal + "</td>";
    respostaHtml += "<td>" + result.name + "</td>";
    respostaHtml += "</tr>";
  });
  respostaHtml += "</table>";

   //botão com a função history.back() para voltar pra pagina anterior
  respostaHtml += "<button onclick='history.back()'>Voltar</button>";

  respostaHtml += "</body>";
  respostaHtml += "</html>";

  res.send(respostaHtml);
});
