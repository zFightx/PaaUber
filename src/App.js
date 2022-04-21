// import logo from './logo.svg';
import { useState, useEffect } from "react"
import "./App.css";
import Home from '../src/pages/Home/index'



function App() {

    const [leituraGrafo, setLeituraGrafo] = useState('')


    const readFile = (event, cb) => {
        var fr=new FileReader();
        fr.onload=function(){
            const read = fr.result;
            cb(read);
            setLeituraGrafo(read)
        }
        fr.readAsText(event.target.files[0]);
    }
    
    const CreateMap = (event) => {
        readFile(event, function(result){
            // Retirando a primeira linha do arquivo texto
            let lines = result.split('\n');
            lines.splice(0, 1);
            let finalResult = lines.join('\n');
    
            // Transformando string em número e colocando em um array
            let resultArray = [];
            for( var i = 0; i < finalResult.length; i++ ) {
                let splitResult = finalResult.split(/\s+/)[i];
    
                if(splitResult !== undefined){
                    resultArray.push(Number(splitResult));
                }
            }
    
            const vertices = {};
    
            // Preenchendo o grafo do mapa
            for( var i = 0; i < resultArray.length ; i = i + 9 ) {
                console.log(resultArray[i], resultArray[i+1], resultArray[i+2], resultArray[i+3], resultArray[i+4], resultArray[i+7], resultArray[i+8]);
                const [aresta_n, v_origem, loc_v_origem_x, loc_v_origem_y, v_destino, distancia, velocidade] = [resultArray[i], resultArray[i+1], resultArray[i+2], resultArray[i+3], resultArray[i+4], resultArray[i+7], resultArray[i+8]];
    
                if(!vertices[v_origem]){
                    let vertice = Node(aresta_n, v_origem, loc_v_origem_x, loc_v_origem_y, v_destino, distancia, velocidade);
                    vertices[v_origem] = vertice;
                }
                else{
                    let vertice = vertices[v_origem];
                    vertice.vizinhos[1]= {
                        aresta_n: aresta_n,
                        v_destino: v_destino,
                        distancia: distancia,
                        velocidade: velocidade,
                        tem_carro: false,
                        tem_cliente: false,
                    };
                }
            }
    
            console.log(vertices);
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
    
                if(splitResult !== undefined){
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
    
                if(splitResult !== undefined){
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
                <p>Grafos: {leituraGrafo}</p>
                <input type="file" onChange={CreateClientes} />
                <p>Grafos: {leituraGrafo}</p>                
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








const AEstrela = () => {
    // const start = graph.start;
    // const goal = graph.end;

    // const queue = [];
    // const visited = [];
    // const moves = [];

    // // Calcula heurística do start e insere na fila e visitados
    // const hi = heuristic(start);
    // queue.push(start, [], 0, hi);
    // visited.push(start);

    // while(queue.length > 0){
    //     //  remove por prioridade e expande
    //     const v = queue.at(queue.length-1);
    //     queue.pop();

    //     // Se for objetivo, encerra
    //     if(v == goal){
    //         moves = v;
    //         break;
    //     }

    //     // Expandindo
    //     v.Successors.forEach(element => {
    //         // Calcula heurística e pega a distancia
    //         const h = heuristic(element)
    //         const d = element.dist;

    //         // Se nao tiver sido visitado anteriormente
    //         if(visited.indexOf(v) == -1){
    //             // Cria a rota
    //             const road = v;
    //             // road.push(i[1])

    //             // Insere na fila com prioridade usando heurística
    //             // queue.push( (i[0], road, d+v[2]), d+v[2]+h)
    //             // visited.push(i[0])  
    //         }
    //         // Se ja foi visitado, então verifica se distancia eh menor
    //         else{
    //             queue.forEach(element => {
    //                 // if( j[2][0] == i[0]){
    //                 //     if (d+h+v[2] < j[2][2]){
    //                 //         queue.splice(index, 1);
                            
    //                 //         const road = v[1]
    //                 //         road.push(i[1])
                            
    //                 //         queue.push( (i[0], road, d+v[2]), d+v[2]+h);
    //                 //         // break;
    //                 //     }
    //                 // }
    //             })
    //         }
    //     });
    // }

    // return moves;


    // start = problem.getStartState()
    // queue = util.PriorityQueue()
    // visited = []
    // moves = []

    // # Calcula heurística do start e insere na fila e visitados
    // hi = heuristic(start, problem)
    // queue.push( (start, [], 0), hi)
    // visited.append(start)

    // while not queue.isEmpty():
    //     # remove por prioridade e expande
    //     v = queue.pop()
        
    //     # Se for objetivo, encerra
    //     if problem.isGoalState(v[0]):
    //         moves = v[1]
    //         break

    //     # Expandindo
    //     for i in problem.getSuccessors(v[0]):
    //         # Calcula heurística e pega a distancia
    //         h = heuristic(i[0], problem)
    //         d = i[2]

    //         # Se nao tiver sido visitado anteriormente
    //         if not i[0] in visited:
    //             #Cria a rota
    //             road = v[1][:]
    //             road.append(i[1])

    //             # Insere na fila com prioridade usando heuristica
    //             queue.push( (i[0], road, d+v[2]), d+v[2]+h)
    //             visited.append(i[0])  
                
    //         # Se ja foi visitado, entao verifica se distancia eh menor
    //         else:
    //             for index, j in enumerate(queue.heap):
    //                 if j[2][0] == i[0]:
    //                     if d+h+v[2] < j[2][2]:
    //                         del queue.heap[index]

    //                         road = v[1][:]
    //                         road.append(i[1])
    
    //                         queue.push( (i[0], road, d+v[2]), d+v[2]+h)
    //                         break
    
    // return moves
}

export default App;
