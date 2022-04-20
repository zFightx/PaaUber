// import logo from './logo.svg';
import "./App.css";

let leitura = '';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* <p>{leitura}</p> */}
                <input type="file" onChange={CreateMap} />
                <input type="file" onChange={CreateCarros} />
                <input type="file" onChange={CreateClientes} />                
            </header>
        </div>
    );
}

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

const readFile = (event, cb) => {
    var fr=new FileReader();
    fr.onload=function(){
        const read = fr.result;
        cb(read);
    }
    fr.readAsText(event.target.files[0]);
}

const CreateMap = (event) => {
    readFile(event, function(result){
        const mapGraph = new Graph();

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

        console.log(mapGraph);
    });
}

const CreateClientes = (event) => {
    readFile(event, function(result){
        const clientes = [];

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
        // Preenchendo o grafo de clientes
        for( var i = 0; i < resultArray.length ; i = i + 5 ) {
            let node = new ClienteNode(resultArray[i], resultArray[i+1], resultArray[i+2],
            resultArray[i+3], resultArray[i+4]);

            clientes.push(node);
        }

        console.log(clientes);
    });
}

const CreateCarros = (event) => {
    readFile(event, function(result){
        const carroGraph = [];

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
        // Preenchendo o grafo de clientes
        for( var i = 0; i < resultArray.length ; i = i + 4 ) {
            let node = new CarroNode(resultArray[i], resultArray[i+1], resultArray[i+2],
            resultArray[i+3]);

            carroGraph.push(node);
        }

        console.log(carroGraph);
    });
}

export default App;
