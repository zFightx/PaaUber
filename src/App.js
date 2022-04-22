// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";


let leitura = '';
let vertices = {}; 
let arestas ={};

function App() {
    const [grafo, setGrafo] = useState({});
    const [arestas, setArestas] = useState({});
    const [leituraGrafo, setLeituraGrafo] = useState('');
    const [leituraCarro, setLeituraCarro] = useState('');
    const [leituraPessoa, setLeituraPessoa] = useState('');

    const readFile = (event, tipo,cb) => {
        var fr=new FileReader();
        fr.onload=function(){
            const read = fr.result;
            cb(read);
            if (tipo === 1){
                setLeituraGrafo(read)
            } else if (tipo === 2){
                setLeituraPessoa(read)
            } else {
                setLeituraCarro(read)
            }
        }
        fr.readAsText(event.target.files[0]);
    }
    
    const CreateMap = (event) => {
    
        readFile(event, 1, (result) => {
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
                console.log(resultArray[i], resultArray[i+1], resultArray[i+2], resultArray[i+3], resultArray[i+4], resultArray[i+7], resultArray[i+8]);
                const [aresta_n, v_origem, loc_v_origem_x, loc_v_origem_y, v_destino, distancia, velocidade] = [resultArray[i], resultArray[i+1], resultArray[i+2], resultArray[i+3], resultArray[i+4], resultArray[i+7], resultArray[i+8]];
                
                arestas[aresta_n] = {
                    v_origem: v_origem,
                    v_destino: v_destino,
                }
                
                if(!vertices[v_origem]){
                    let vertice = Node(aresta_n, v_origem, loc_v_origem_x, loc_v_origem_y, v_destino, distancia, velocidade);
                    vertices[v_origem] = vertice;
                }
                else{
                    let vertice = vertices[v_origem];
                    vertice.vizinhos[v_destino]= {
                        aresta_n: aresta_n,
                        distancia: distancia,
                        velocidade: velocidade,
                        tem_carro: false,
                        tem_cliente: false,
                    };
                }
            }
    
            console.log(vertices);
            console.log(arestas);
    
            AEstrela(vertices[3], vertices[6], true);
        });
    }
    
    const CreateClientes = (event) => {
        readFile(event, 2, function(result){
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
        readFile(event, 3, function(result){
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

    return (
        <div className="App">
            <header className="App-header">
                <input type="file" onChange={CreateMap} />
                <p>Grafos: {leituraGrafo}</p>
                <input type="file" onChange={CreateCarros} />
                <p>Carro: {leituraCarro}</p>
                <input type="file" onChange={CreateClientes} />
                <p>Pessoa: {leituraPessoa}</p>                 
            </header>
        </div>
    );
}

function Node(aresta_n, v_origem, loc_v_origem_x, loc_v_origem_y, v_destino, distancia, velocidade) {
    const vertice = {
        numero: v_origem,
        loc:{
            x:loc_v_origem_x,
            y: loc_v_origem_y
        },
        vizinhos:{
            [v_destino]:{
                aresta_n: aresta_n,
                distancia: distancia,
                velocidade: velocidade,
                tem_carro: false,
                tem_cliente: false,
            }}
    }
    return vertice;
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

function verticeMaisProximo(x, y, vertices){
    let vertMaisProx = null;
    let distanciaMinima = Number.MAX_VALUE;
    for(let vertice in vertices){
        const distancia = Euclidiana({x, y}, vertices[vertice].loc);
        if(distancia < distanciaMinima){
            distanciaMinima = distancia;
            vertMaisProx = vertice;
        }
    }
    return vertMaisProx;
}

// function Graph() {
//     this.nodes = [];
//     this.graph = {};

//     this.start = null;
//     this.end   = null;
// }

// Graph.prototype.addNode = function(node) {
//     this.nodes.push(node);
//     var title = node.value;

//     // Lookup table
//     this.graph[title] = node;

// }

// Graph.prototype.setStart = function(index) {
//     this.start = this.nodes[index];
//     return this.start;

// }

// Graph.prototype.setEnd = function(index) {
//     this.end = this.nodes[index];
//     return this.end;

// }

const Euclidiana = (v1, v2) => {
    const a = (v1.x - v2.x);
    const b = (v1.y - v2.y);
    return Math.sqrt( (a * a) +  (b * b));
}

const Manhattan = (v1, v2) => {
    const a = Math.abs(v1.x - v2.x);
    const b = Math.abs(v1.y - v2.y);
    return a + b;
}

const inserirComPrioridade = (array, vertice) => {
    let i = 0;
    while(i < array.length && array[i].peso < vertice.peso){
        i++;
    }
    array.splice(i, 0, vertice);
}

const AEstrela = (start, end, withTime) => {
    const queue = [];
    const visited = [];
    let caminho = [];

    // Calcula heurística do start e insere na fila e visitados
    const hi = 0;
    queue.push({
        vertice : start,
        dist : 0,
        tempo: 0,
        caminho : [],
    });
    
    visited.push(start.numero);

    while(queue.length > 0){
        //  remove por prioridade e expande
        const v = queue[0];
        queue.splice(0, 1);

        // Se for objetivo, encerra
        if(v.vertice.numero == end.numero){
            caminho.push(v);
            break;          
        }

        // Expandindo
        for( const destino in v.vertice.vizinhos){
            let vizinho = v.vertice.vizinhos[destino];

            // Calcula heurística e pega a distancia
            const h = Manhattan(v.vertice.loc, vertices[destino].loc);
            const d = vizinho.distancia;
            const tempo = d/vizinho.velocidade;

            // Se nao tiver sido visitado anteriormente
            if(visited.indexOf(destino) == -1){
                // Cria a rota
                const rota = {
                    vertice : vertices[destino],
                    dist: d+v.dist,
                    peso: withTime ? tempo+v.tempo : d+v.dist+h,
                    tempo: tempo + v.tempo,
                    caminho: [...v.caminho, vertices[destino]],
                };

                // Insere na fila com prioridade usando heurística
                inserirComPrioridade(queue, rota);
                visited.push(destino);
            }

            // Se ja foi visitado, então verifica se distancia eh menor
            else{
                queue.forEach((elements, index) => {
                    if( elements.vertice.numero == destino ){
                        let heuristica = withTime ? tempo+v.peso : d+v.peso+h;
                        if(heuristica < elements.peso){
                            queue.splice(index, 1);

                            const rota = elements;
                            rota.caminho = [...v.caminho, vertices[destino]];
                            rota.dist = d+v.dist;
                            rota.peso = withTime ? tempo+v.tempo : d+v.dist+h;
                            rota.tempo = tempo + v.tempo;

                            inserirComPrioridade(queue, rota);
                        }
                    }
                })
            }
        }
    }

    console.log(caminho);
    return caminho;
}

export default App;
