import AEstrela from "../utils/AEstrela";
import DFSCaminho from "../utils/DFS";

const ReadFile = async (event, tipo,cb) => {
    var fr=new FileReader();
    fr.onload=function(){
        const read = fr.result;
        cb(read);
        // if (tipo === 1){
        //     setLeituraGrafo(read)
        // } else if (tipo === 2){
        //     setLeituraPessoa(read)
        // } else {
        //     setLeituraCarro(read)
        // }
    }
    fr.readAsText(event.target.files[0]);
}


const CreateMap = (event, setterObject) => {
    const arestas = {};
    const vertices = {};
    
    ReadFile(event, 1, (result) => {
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
        setterObject.setGrafo(vertices);
        setterObject.setArestas(arestas);

        AEstrela(vertices, vertices[3], vertices[6], true);
        const caminhos = [];
        const caminho = {
            vertices : [],
            dist : 0,
            tempo: 0,
        }
        DFSCaminho(vertices, vertices[3], vertices[6], caminho, caminhos);
        console.log(caminhos);

        
    });
}

const CreateClientes = (event, setClientes) => {
    ReadFile(event, 2, function(result){
        const clientes = {};

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

            clientes[node.id]= node;
        }

        setClientes(clientes);
    });
}

const CreateCarros = (event, setCarros) => {
    ReadFile(event, 3, function(result){
        const carroGraph = {};

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

            carroGraph[node.id] = node;
        }

        setCarros(carroGraph);
    });
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
    const cliente = {
        id: `cl_${cliente_id}`,
        loc:{
            x:loc_cliente_x,
            y: loc_cliente_y
        },
        dest:{
            x:dest_cliente_x,
            y: dest_cliente_y
        }
    }

    return cliente
}

function CarroNode(carro_id, loc_carro_x, loc_carro_y, aresta_id) {
    const carro = {
        id: `ca_${carro_id}`,
        loc:{
            x:loc_carro_x,
            y: loc_carro_y
        },
        aresta: aresta_id,
    }

    return carro;
}


export { ReadFile, CreateMap, CreateClientes, CreateCarros };