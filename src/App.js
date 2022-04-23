// import logo from './logo.svg';
import { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";
import { CreateMap, CreateCarros, CreateClientes } from "./Create/Create";
import { BlocoLeitura } from "./Components/BlocoLeitura/BlocoLeitura";
import { graphConfig } from "./Components/Graph/graphConfig";
import "./App.css";
import CarImg from "./assets/car.png";
import ClientImg from "./assets/traveler.png";

function App() {
    const [grafo, setGrafo] = useState({});
    const [carros, setCarros] = useState({});
    const [clientes, setClientes] = useState({});
    const [arestas, setArestas] = useState({});
    const [showGrafo, setShowGrafo] = useState(false);
    const [dataGrafo, setDataGrafo] = useState({});
    const [posicaoBloco, setPosicaoBloco] = useState("1");

    const setterObject = {
        setGrafo: setGrafo,
        setArestas: setArestas,
        setShowGrafo: setShowGrafo,
    }

    const ConvertData = () => {
        const keys = Object.keys(grafo);
        if(keys.length == 0)
            return;
            
        const data={
            nodes : [],
            links : [],
        };

        for( const numero in grafo ){
            const vertice = grafo[numero];
            data.nodes.push({id: numero, x: vertice.loc.x * 50, y: vertice.loc.y * 50});
            
            for( const destino in vertice.vizinhos ){
                const vizinho = vertice.vizinhos[destino];
                
                data.links.push({source: numero, target: destino, label: `${vizinho.distancia}km, ${vizinho.velocidade}km/h`});
            }
        }

        setDataGrafo(data);
    }

    const ConvertCarros = () =>{
        const keys = Object.keys(carros);
        if(keys.length == 0)
            return;

        for( const numero in carros ){
            const carro = carros[numero];

            dataGrafo.nodes.push({ id : `${numero}`, x: carro.loc.x * 50, y: carro.loc.y * 50, svg: CarImg, "labelPosition": "top", "fontColor": "#E8DF2E"});
        }

        setDataGrafo(dataGrafo);
    }

    const ConvertClientes = () =>{
        const keys = Object.keys(clientes);
        if(keys.length == 0)
            return;

        for( const numero in clientes ){
            const cliente = clientes[numero];

            dataGrafo.nodes.push({ id : `${numero}`, x: cliente.loc.x * 50 , y: cliente.loc.y * 50, svg: ClientImg, "labelPosition": "top", "fontColor": "#6DADD6"  });
        }

        setDataGrafo(dataGrafo);
        setShowGrafo(true);
    }

    useEffect(() => {
        ConvertData();
        ConvertCarros();
        ConvertClientes();
    }, [grafo, carros, clientes]);  

    return (
        <div className="App">
            { !showGrafo &&
                <header className="App-header">
                    <BlocoLeitura title="Seleciona o arquivo de arestas" position="1" onChangeInput={(e) => CreateMap(e, setterObject)} onClickButton={() => setPosicaoBloco((antigaPosicao) => antigaPosicao+1)} />
                    {/* <BlocoLeitura title="Seleciona o arquivo de carros" position="2" onChangeInput={(e) => CreateCarros(e, setCarros)} />
                    <BlocoLeitura title="Seleciona o arquivo de clientes" position="3" onChangeInput={(e) => CreateClientes(e, setClientes)} />              */}
                </header>
            }

            { showGrafo && <Graph
                id="graph-id" // id is mandatory
                data={dataGrafo}
                config={graphConfig}
            />}
        </div>
    );
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





export default App;
