// import logo from './logo.svg';
import { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";
import { CreateMap, CreateCarros, CreateClientes } from "./Create/Create";
import { BlocoLeitura } from "./Components/BlocoLeitura/BlocoLeitura";
import { BlocoCliente } from "./Components/BlocoCliente/BlocoCliente";
import { BlocoCarro } from "./Components/BlocoCarro/BlocoCarro";
import { graphConfig } from "./Components/Graph/graphConfig";
import "./App.css";
import { BlocoAdicionarCarro } from "./Components/BlocoAdicionarCarro/BlocoAdicionarCarro";
import CarImg from "./assets/car.png";
import ClientImg from "./assets/traveler.png";
import Transparente from "./assets/transparente.png";
import { mergeSortPosition } from "./algoritmos/mergesort";
import DFSCaminho from "./utils/DFS";

function App() {
  const [grafo, setGrafo] = useState({});
  const [erroLeituraGrafo, setErroLeituraGrafo] = useState(false);
  const [carros, setCarros] = useState({});
  const [erroLeituraCarros, setErroLeituraCarros] = useState(false);
  const [clientes, setClientes] = useState({});
  const [erroLeituraClientes, setErroLeituraClientes] = useState(false);
  const [arestas, setArestas] = useState({});
  const [showGrafo, setShowGrafo] = useState(false);
  const [dataGrafo, setDataGrafo] = useState({});
  const [posicaoBloco, setPosicaoBloco] = useState(1);
  const [showBlocoCliente, setShowBlocoCliente] = useState(false);
  const [showBlocoCarro, setShowBlocoCarro] = useState(false);
  const [clienteId, setClientId] = useState("0");
  const [carroId, setCarroId] = useState("0");
  const [corridas, setCorridas] = useState([]);
  const [temposCorridas, setTemposCorridas] = useState([0]);
  const [umaVez, setUmaVez] = useState(false);
  const [interval, setVarInterval] = useState(false);

  // Media de tempo de todas as viagens
  //   {temposCorridas.reduce((acc, curr) => acc + curr, 0) /
  //               temposCorridas.length}

  const setterObjectGrafo = {
    setGrafo: setGrafo,
    setErroLeituraGrafo: setErroLeituraGrafo,
    setArestas: setArestas,
    setShowGrafo: setShowGrafo,
  };

  const setterObjectCarros = {
    setCarros: setCarros,
    setErroLeituraCarros: setErroLeituraCarros,
  };

  const setterObjectClientes = {
    setClientes: setClientes,
    setErroLeituraClientes: setErroLeituraClientes,
  };

  const ConvertData = () => {
    const keys = Object.keys(grafo);
    if (keys.length == 0 || umaVez) return;

    const data = {
      nodes: [],
      links: [],
    };

    for (const numero in grafo) {
      const vertice = grafo[numero];
      data.nodes.push({
        id: numero,
        x: vertice.loc.x * 50,
        y: vertice.loc.y * 50,
      });

      for (const destino in vertice.vizinhos) {
        const vizinho = vertice.vizinhos[destino];

        data.links.push({
          source: numero,
          target: destino,
          label: `${vizinho.distancia}km, ${vizinho.velocidade}km/h`,
        });
      }
    }

    setDataGrafo(data);
  };

  const ConvertCarros = () => {
    const keys = Object.keys(carros);
    if (keys.length == 0 || umaVez) return;

    for (const numero in carros) {
      const carro = carros[numero];

      dataGrafo.nodes.push({
        id: `${numero}`,
        x: carro.loc.x * 50,
        y: carro.loc.y * 50,
        svg: CarImg,
        labelPosition: "top",
        fontColor: "#E8DF2E",
      });
    }

    setDataGrafo(dataGrafo);
  };

  const ConvertClientes = () => {
    const keys = Object.keys(clientes);
    if (keys.length == 0 || umaVez) return;

    for (const numero in clientes) {
      const cliente = clientes[numero];

      dataGrafo.nodes.push({
        id: `${numero}`,
        x: cliente.loc.x * 50,
        y: cliente.loc.y * 50,
        svg: ClientImg,
        labelPosition: "top",
        fontColor: "#6DADD6",
      });
    }

    const nodes_x = [...dataGrafo.nodes];
    mergeSortPosition(nodes_x, 0, nodes_x.length - 1, "x");
    const nodes_y = [...dataGrafo.nodes];
    mergeSortPosition(nodes_y, 0, nodes_y.length - 1, "y");

    // console.log(nodes_x);
    // console.log(nodes_y);

    const x1 = nodes_x[0].x;
    const x2 = nodes_x[nodes_x.length - 1].x;
    const y1 = nodes_y[0].y;
    const y2 = nodes_y[nodes_y.length - 1].y;

    const delta_x = Math.floor((x2 + x1) / 2);
    const delta_y = Math.floor((y2 + y1) / 2);
    dataGrafo.nodes.push({
      id: "center",
      x: delta_x,
      y: delta_y,
      color: "transparent",
      fontColor: "transparent",
      opacity: 0,
      mouseCursor: "default",
      svg: Transparente,
    });

    // console.log(delta_x, delta_y);

    setDataGrafo(dataGrafo);
    setShowGrafo(true);
    setUmaVez(true);

    // console.log("rodou");
    setTimeout(() => {
      dataGrafo.focusedNodeId = "center";
      const data = { ...dataGrafo };
      setDataGrafo(data);

      setTimeout(() => {
        dataGrafo.focusedNodeId = null;
        const data = { ...dataGrafo };
        setDataGrafo(data);
      }, 1000);
    }, 1000);
  };

  const onClickNode = (nodeId) => {
    if (nodeId.includes("cl_")) {
      setClientId(nodeId);
      setShowBlocoCarro(false);
      setShowBlocoCliente((value) => !value);
    } else if (nodeId.includes("ca_")) {
      setCarroId(nodeId);
      setShowBlocoCliente(false);
      setShowBlocoCarro((value) => !value);
    }

    // for(const id in carros){
    //     console.log(carros[id].tem_cliente);
    // }

    // console.log(carros);
    // console.log(clientes);    
    
    // if(interval){
    //     clearInterval(interval);
    //     interval = null;
    // }

    if(!interval){
        // console.log("ATIVOU INTERVAL");
        setVarInterval(true);
        setInterval(() => {
            MoverCarro();
        }, 1000);
    }
  };

  const MoverCarro = () =>{
    // console.log(corridas);

    corridas.forEach((corrida, corrida_id) => {
        // console.log(corrida.movendo);
        if(corrida[corrida.movendo].caminho.length < 2){
            if(corrida.movendo == "toCliente"){
                let node_cliente = null;
                dataGrafo.nodes.forEach((node, index) =>{ 
                    if(node.id == corrida.cliente.id){
                        node_cliente = node;
                        dataGrafo.nodes.splice(index, 1);
                    }
                });

                const data = {...dataGrafo};
                setDataGrafo(data);

                corrida.movendo = "toDestino";
                corrida.bkpCliente = node_cliente;
            }
            else{
                const index_cliente = carros[corrida.carro.id].tem_cliente.find(element => element == corrida.cliente.id);
                carros[corrida.carro.id].tem_cliente.splice(index_cliente, 1);
                carros[corrida.carro.id].ocupado = false;
                clientes[corrida.cliente.id].tem_carro = false;
                
                // console.log(corrida.toDestino.caminho[0]);
                corrida.bkpCliente.x = corrida.toDestino.caminho[0].loc.x * 50;
                corrida.bkpCliente.y = corrida.toDestino.caminho[0].loc.y * 50;
                dataGrafo.nodes.push(corrida.bkpCliente);
                const data = {...dataGrafo};
                setDataGrafo(data);

                corridas.splice(corrida_id, 1);
            }
            
            return;
        }

        const pontoA = {...corrida[corrida.movendo].caminho[0].loc};
        const pontoB = {...corrida[corrida.movendo].caminho[1].loc};

        pontoA.x *= 50;
        pontoA.y *= 50;
        pontoB.x *= 50;
        pontoB.y *= 50;

        // m = (y2 - y1) / (x2 - x1)
        const coeficiente = (pontoB.y - pontoA.y) / (pontoB.x - pontoA.x);

        // y = mx + n
        const n =  pontoA.y - (coeficiente*pontoA.x);

        corrida.moveu += 15;

        let sinal = (pontoA.x < pontoB.x) ? 1 : -1;
        
        const x = pontoA.x + (sinal * corrida.moveu);
        const y = (coeficiente*x) + n;
        // console.log(x, y);

        if(sinal < 0){
            if(x <= pontoB.x){
                corrida[corrida.movendo].caminho.splice(0, 1);
                corrida.moveu = 0;
            }
        }
        else{
            if(x >= pontoB.x){
                corrida[corrida.movendo].caminho.splice(0, 1);
                corrida.moveu = 0;
            }
        }

        let bkpNode = null;
        dataGrafo.nodes.forEach((node, index) => {
            if(node.id == corrida.carro.id){
                node.x = x;
                node.y = y;
                bkpNode = node;

                dataGrafo.nodes.splice(index, 1);
            }
        });

        setTimeout(() => {
            dataGrafo.nodes.push(bkpNode);
            const data = { ...dataGrafo };
            setDataGrafo(data); 
        },100);
    });
    
    const data = { ...dataGrafo };
    setDataGrafo(data);     
  }

  const DesenharCaminho = (caminho, include, secondColor) => {
    caminho.forEach((vertice, index) => {
      dataGrafo.nodes.forEach((node) => {
        if (vertice.numero == node.id || include.includes(node.id)) {
          node.color = secondColor ? "#562cca" : "#3a73c9";
          node.opacity = "1.0";
        }
      });

      dataGrafo.links.forEach((link) => {
        if (index != caminho.length - 1) {
          if (link.source == vertice.numero && link.target == caminho[index + 1].numero) {
            link.color = secondColor ? "red" : "#3a73c9";
            link.opacity = "1.0";
          }
        }
      });
    });

    // if(include){
    //     console.log(include);
    //     dataGrafo.nodes.filter(node => node.id == include)[0].opacity = "1.0";
    //     console.log(dataGrafo.nodes.filter(node => node.id == include)[0]);
    // }

    const data = { ...dataGrafo };
    graphConfig.node.opacity = 0.1;
    graphConfig.link.opacity = 0.1;

    setDataGrafo(data);
  };

  const ApagarCaminho = (caminho) => {
    // caminho.forEach((vertice, index) => {
      dataGrafo.nodes.forEach((node) => {
        node.color = "red";
        node.opacity = null;
        // if (vertice.numero == node.id) {
        // }
      });

      dataGrafo.links.forEach((link) => {
        link.color = "#A9A29D";
        link.opacity = null;
        // if (index != caminho.length - 1) {
        //   if (link.source == vertice.numero && link.target == caminho[index + 1].numero) {
        //   }
        // }
      });
    // });

    const data = { ...dataGrafo };
    graphConfig.node.opacity = 1.0;
    graphConfig.link.opacity = 1.0;
    setDataGrafo(data);
  };

  useEffect(() => {
    ConvertData();
    ConvertCarros();
    ConvertClientes();
  }, [grafo, carros, clientes]);

  return (
    <div className="App">
      <div>
        <BlocoAdicionarCarro
          setCarros={setCarros}
          setDataGrafo={setDataGrafo}
          setClientes={setClientes}
        />
      </div>

      {!showGrafo && (
        <header className="App-header">
          {posicaoBloco == 1 && (
            <BlocoLeitura
              title="Seleciona o arquivo de arestas"
              position="1"
              onChangeInput={(e) => CreateMap(e, setterObjectGrafo)}
              onClickButton={() => setPosicaoBloco((antiga) => antiga + 1)}
              onClickBackButton={() => setPosicaoBloco((antiga) => antiga - 1)}
              erroLeitura={erroLeituraGrafo}
            />
          )}
          {posicaoBloco == 2 && (
            <BlocoLeitura
              title="Seleciona o arquivo de carros"
              position="2"
              onChangeInput={(e) => CreateCarros(e, setterObjectCarros)}
              onClickButton={() => setPosicaoBloco((antiga) => antiga + 1)}
              onClickBackButton={() => setPosicaoBloco((antiga) => antiga - 1)}
              erroLeitura={erroLeituraCarros}
            />
          )}
          {posicaoBloco == 3 && (
            <BlocoLeitura
              title="Seleciona o arquivo de clientes"
              position="3"
              onChangeInput={(e) => CreateClientes(e, setterObjectClientes)}
              onClickButton={() => setPosicaoBloco((antiga) => antiga + 1)}
              onClickBackButton={() => setPosicaoBloco((antiga) => antiga - 1)}
              erroLeitura={erroLeituraClientes}
            />
          )}
        </header>
      )}
      {showGrafo && (
        <div className="Grafo">
          <Graph
            id="graph-id" // id is mandatory
            data={dataGrafo}
            config={graphConfig}
            onClickNode={onClickNode}
            // onClickLink={onClickLink}
          />
        </div>
      )}

      {showBlocoCliente && (
        <BlocoCliente
          carros={carros}
          vertices={grafo}
          cliente={clientes[clienteId]}
          DesenharCaminho={DesenharCaminho}
          ApagarCaminho={ApagarCaminho}
        />
      )}
      {showBlocoCarro && (
        <BlocoCarro
          carro={carros[carroId]}
          vertices={grafo}
          clientes={clientes}
          DesenharCaminho={DesenharCaminho}
          ApagarCaminho={ApagarCaminho}
          setTemposCorridas={setTemposCorridas}
          corridas={corridas}
        />
      )}
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
