/* 

    Bibiliotecas utilizadas: jQuery, Bootstrap, bootstrap-tables

    Os grafos precisam estar na pasta 'graphs' com os nomes 'grafo.txt'
    'clientes.txt' e 'carros.txt'

    ex: graphs/grafo.txt

*/

window.onload =  function() { main() };


var mapGraph     = [];
var clienteGraph = [];
var carroGraph   = [];

// ---------------- Criando os nós -------------------------- //

function Node(aresta_n, v_origem, loc_v_origem_x, loc_v_origem_y, v_destino, loc_v_destino_x, loc_v_destino_y, distancia, velocidade) {

    this.aresta_n      = aresta_n;
    this.v_origem      = v_origem;
    this.loc_v_origem  = [loc_v_origem_x, loc_v_origem_y];
    this.v_destino     = v_destino;
    this.loc_v_destino = [loc_v_destino_x, loc_v_destino_y];
    this.distancia     = distancia;
    this.velocidade    = velocidade;

    this.tem_carro = false;
    this.tem_cliente = false; 
    
}

function ClienteNode(cliente_id, loc_cliente_x, loc_cliente_y, dest_cliente_x, dest_cliente_y) {

    this.cliente_id   = cliente_id;
    this.loc_cliente  = [loc_cliente_x, loc_cliente_y];
    this.dest_cliente = [dest_cliente_x, dest_cliente_y];

}

function CarroNode(carro_id, loc_carro_x, loc_carro_y, aresta_id) {

    this.carro_id  = carro_id;
    this.loc_carro = [loc_carro_x, loc_carro_y];
    this.aresta_id = aresta_id;

}

//------------------------- Grafo --------------------------//

function Graph() {

    this.nodes = [];
    this.graph = {};

    this.start = null;
    this.end   = null;

}

Graph.prototype.addNode = function(node) {

    this.nodes.push(node);
    var title = node.value;

    // Lookup table
    this.graph[title] = node;

}

Graph.prototype.setStart = function(index) {

    this.start = this.nodes[index];
    return this.start;

}

Graph.prototype.setEnd = function(index) {

    this.end = this.nodes[index];
    return this.end;

}

// Lendo um arquivo texto
var result;
function readTextFile(file) {

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){

                result = rawFile.responseText;

            }
        }
    }

    rawFile.send(null);

}

// p5.js: É executado primeiro
function main() {

    // Inicializando os Grafos
    mapGraph     = new Graph();
    clienteGraph = new Graph();
    carroGraph   = new Graph();

    readTextFile("./graphs/grafo.txt");

    // Retirando a primeira linha do arquivo texto
    let lines = result.split('\n');
    lines.splice(0, 1);
    let finalResult = lines.join('\n');

    // Transformando string em número e colocando em um array
    let resultArray = [];
    for( var i = 0; i < finalResult.length; i++ ) {

        let splitResult = finalResult.split(/\s+/)[i];

        if(splitResult != undefined){
            resultArray.push(Number(splitResult));
        }

    }
    
    // Preenchendo o grafo do mapa
    for( var i = 0; i < resultArray.length ; i = i + 9 ) {

        let node = new Node(resultArray[i], resultArray[i+1], resultArray[i+2],
            resultArray[i+3], resultArray[i+4], resultArray[i+5], resultArray[i+6],
            resultArray[i+7], resultArray[i+8], resultArray[i+9]);

            mapGraph.addNode(node);
    }

    readTextFile("./graphs/clientes.txt");

    // Retirando a primeira linha do arquivo texto
    lines = result.split('\n');
    lines.splice(0, 1);
    finalResult = lines.join('\n');

    // Transformando string em número e colocando em um array
    resultArray = [];
    for( var i = 0; i < finalResult.length; i++ ) {

        let splitResult = finalResult.split(/\s+/)[i];

        if(splitResult != undefined){
            resultArray.push(Number(splitResult));
        }

    }

    // Preenchendo o grafo de clientes
    for( var i = 0; i < resultArray.length ; i = i + 5 ) {

        let node = new ClienteNode(resultArray[i], resultArray[i+1], resultArray[i+2],
            resultArray[i+3], resultArray[i+4]);

            clienteGraph.addNode(node);
    }

    readTextFile("./graphs/carros.txt");

    // Retirando a primeira linha do arquivo texto
    lines = result.split('\n');
    lines.splice(0, 1);
    finalResult = lines.join('\n');

    // Transformando string em número e colocando em um array
    resultArray = [];
    for( var i = 0; i < finalResult.length; i++ ) {

        let splitResult = finalResult.split(/\s+/)[i];

        if(splitResult != undefined){
            resultArray.push(Number(splitResult));
        }

    }

    // Preenchendo o grafo de clientes
    for( var i = 0; i < resultArray.length ; i = i + 4 ) {

        let node = new CarroNode(resultArray[i], resultArray[i+1], resultArray[i+2],
            resultArray[i+3]);

            carroGraph.addNode(node);
    }

    // Preenchendo a tabela 
    $('#tableGraph').bootstrapTable({

        columns: [{
                field: 'aresta_n',
                title: 'Aresta_n'
            }, {
                field: 'v_origem',
                title: 'v_origem'
            }, {
                field: 'loc_v_origem',
                title: 'Loc_v_origem'
            }, {
                field: 'v_destino',
                title: 'v_destino'
            }, {
                field: 'loc_v_destino',
                title: 'Loc_v_destino'
            }, {
                field: 'distancia',
                title: 'Distância(km)'
            }, {
                field: 'velocidade',
                title: 'Velocidade(km/h)'
            }],
        
            data: mapGraph.nodes

    });

    // Preenchendo a tabela
    $('#tableClienteGraph').bootstrapTable({

        columns: [{
                field: 'cliente_id',
                title: 'Cliente_id'
            }, {
                field: 'loc_cliente',
                title: 'loc_cliente'
            }, {
                field: 'dest_cliente',
                title: 'dest_cliente'
            }],
        
            data: clienteGraph.nodes

    });

    // Preenchendo a tabela
    $('#tableCarroGraph').bootstrapTable({

        columns: [{
                field: 'carro_id',
                title: 'Carro_id'
            }, {
                field: 'loc_carro',
                title: 'loc_carro'
            }, {
                field: 'aresta_id',
                title: 'aresta_id'
            }],
        
            data: carroGraph.nodes

    });

    console.log("\tVisualização dos grafos\n\n");    
    console.log(mapGraph);
    console.log(clienteGraph);
    console.log(carroGraph);
    console.log("\n");
    console.log(mapGraph.nodes[0]);

}
