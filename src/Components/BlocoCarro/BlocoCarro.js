import React, {useState} from 'react';
import "./BlocoCarro.css"

import DFSCaminho from '../../utils/DFS';
import AEstrela from '../../utils/AEstrela';
import { verticeMaisProximo } from '../../utils/outros';
import mergeSort from '../../algoritmos/mergesort';
import UserImg from '../../assets/user.png';

const BlocoCarro = ({addClass, carro, vertices, clientes, DesenharCaminho, ApagarCaminho, setDadosCorridas, corridas, DeletarCarro}) => {
    const [subPage, setSubPage] = useState(0);
    const [comTempo, setComTempo] = useState(false);
    const [clienteSelect, setClienteSelect] = useState({});
    const [listaClientes, setListaClientes] = useState([]);
    const [listaCaminhos, setListaCaminhos] = useState([]);

    const RenderClientes = () => {
        return listaClientes.map(cliente => 
            <div className='opcaoCliente' key={cliente.id} 
                onMouseEnter={() => {DesenharCaminho(cliente.resultado.caminho, [cliente.id, carro.id])}}
                onMouseLeave={() => {ApagarCaminho(cliente.resultado.caminho)}}
                onClick={() => SelectCliente(cliente)}
            >
                <div className='opcaoText'>
                    <p className='white'>{cliente.id}</p>
                    <div className='opcaoTextLine'>
                        {   !comTempo &&
                            <>
                                <i className="fas fa-road"></i>
                                <p>{cliente.resultado.dist.toFixed(2)} km</p>
                                <i className="far fa-clock"></i>
                                <p>{cliente.resultado.tempo.toFixed(2)} horas</p>
                            </>
                        }

                        {   comTempo &&
                            <>
                                <i className="far fa-clock"></i>
                                <p>{cliente.resultado.tempo.toFixed(2)} horas</p>
                                <i className="fas fa-road"></i>
                                <p>{cliente.resultado.dist.toFixed(2)} km</p>
                            </>
                        }
                        {/* <p>{cliente.resultado.tempo.toFixed(2)} horas</p> */}
                    </div>
                </div>
                <i className="fas fa-angle-right"></i>
            </div>
        );
    }

    const SelectCliente = (cliente) => {
        setClienteSelect(cliente);
        setSubPage(2);
    }

    const VerClientes = (withTime) => {
        const caminhos = [];

        carro.tem_cliente.forEach(clienteId => {
            const cliente = clientes[clienteId];

            const start = vertices[verticeMaisProximo(carro.loc.x, carro.loc.y, vertices)];
            const end = vertices[verticeMaisProximo(cliente.loc.x, cliente.loc.y, vertices)];
            const dest = vertices[verticeMaisProximo(cliente.dest.x, cliente.dest.y, vertices)];

            const caminho = AEstrela(vertices, start, end, withTime);
            const caminho2 = AEstrela(vertices, end, dest, withTime);
            
            // console.log(caminho);
            caminhos.push({
                id: clienteId,
                resultado: caminho,     // caminho do carro até o cliente
                resultado2: caminho2,   // caminho do cliente até o destino
            });
        });

        setComTempo(withTime);
        setListaClientes(caminhos);
        setSubPage(1);

        mergeSort(caminhos, 0, caminhos.length-1);
    }

    const VerCaminhos = () => {
        const start = vertices[verticeMaisProximo(carro.loc.x, carro.loc.y, vertices)];
        const end = vertices[verticeMaisProximo(clientes[clienteSelect.id].loc.x, clientes[clienteSelect.id].loc.y, vertices)];

        const resultados = DFSCaminho(vertices, start, end);
        const caminhos = [];
        resultados.forEach(caminho => caminhos.push({resultado: caminho}));

        mergeSort(caminhos, 0, caminhos.length-1);

        setListaCaminhos(caminhos);
        // console.log(caminhos);
        setSubPage(3);
    }

    const VerTrajetos = () => {
        const start = vertices[verticeMaisProximo(clientes[clienteSelect.id].loc.x, clientes[clienteSelect.id].loc.y, vertices)];
        const end = vertices[verticeMaisProximo(clientes[clienteSelect.id].dest.x, clientes[clienteSelect.id].dest.y, vertices)];

        const resultados = DFSCaminho(vertices, start, end);
        const caminhos = [];
        resultados.forEach(caminho => caminhos.push({resultado: caminho}));

        mergeSort(caminhos, 0, caminhos.length-1);

        setListaCaminhos(caminhos);
        // console.log(caminhos);
        setSubPage(4);
    }

    const RenderCaminhos = (secondColor) => {
        return listaCaminhos.map( (caminho, index) =>  
            <div className='opcaoCliente' key={`caminho_${index}`} 
                onMouseEnter={() => {DesenharCaminho(caminho.resultado.vertices, secondColor ? [clienteSelect.id] : [clienteSelect.id, carro.id], secondColor)}}
                onMouseLeave={() => {ApagarCaminho(caminho.resultado.vertices)}}
                onClick={() => TrocarCaminho(caminho.resultado, secondColor)}
            >
                <div className='opcaoText'>
                    <p className='white'>{`Estrada ${index+1}`}</p>
                    {   !comTempo &&
                        <div className='opcaoTextLine'>
                            <i className="fas fa-road"></i>
                            <p>{caminho.resultado.dist.toFixed(2)} km</p>
                            <i className="far fa-clock"></i>
                            <p>{caminho.resultado.tempo.toFixed(2)} horas</p>
                        </div>
                    }
                    {   comTempo &&
                        <div className='opcaoTextLine'>
                            <i className="far fa-clock"></i>
                            <p>{caminho.resultado.tempo.toFixed(2)} horas</p>
                            <i className="fas fa-road"></i>
                            <p>{caminho.resultado.dist.toFixed(2)} km</p>
                        </div>
                    }
                </div>
            </div>
        );
    }

    const TrocarCaminho = (caminho, second) => {
        const novoClienteSelect = {...clienteSelect};
        caminho.caminho = caminho.vertices;

        if(!second){
            novoClienteSelect.resultado = caminho;
        }
        else{
            novoClienteSelect.resultado2 = caminho;
        }

        setClienteSelect(novoClienteSelect);
        setSubPage(2);
    }

      // funcao recebe o trajeto que tem o tempo e faz a media
    const MediaTempoCorridas = (tempoCorrida, tempoEspera, dist) => {
        
    };

    const AceitarCorrida = () => {
        clientes[clienteSelect.id].tem_carro = true;
        carro.ocupado = true;

        let tempoEspera = clienteSelect.resultado.tempo;
        let tempoCorrida = clienteSelect.resultado2.tempo;
        let dist = clienteSelect.resultado2.dist; 
        setDadosCorridas((dadosAtuais) => [...dadosAtuais, {tempoCorrida: tempoCorrida, tempoEspera: tempoEspera, dist: dist}]);

        corridas.push({
            carro: carro,
            cliente: clientes[clienteSelect.id],
            toCliente: clienteSelect.resultado,
            toDestino: clienteSelect.resultado2,
            movendo: "toCliente",
            moveu: 0,
        });
        console.log(corridas);
    }

    return (
        <div className={`blocoCliente blocoCarro ${addClass}`} onMouseLeave={ApagarCaminho} >
            <p className='titleCliente'>Carro {carro.id}</p>
            {
                carro.ocupado &&
                <> 
                    <div className='opcaoCliente'>
                        <p>Carro indo para o cliente...</p>
                        <i className="fas fa-times-circle gray"></i>
                    </div>
                </>
            }
            { !carro.ocupado && subPage == 0 && 
                <> 
                    <div className='opcaoCliente'
                        onClick={() => VerClientes(false)}
                    >
                        <div className='opcaoText'>
                            <p>Ver Solicitações</p>
                            <p>por distância</p>
                        </div>
                        <i className="fas fa-angle-right"></i>
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => VerClientes(true)}
                    >
                        <div className='opcaoText'>
                            <p>Ver Solicitações</p>
                            <p>por tempo</p>
                        </div>
                        <i className="fas fa-angle-right"></i>
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => DeletarCarro(carro.id)}
                    >
                        <div className='opcaoText'>
                            <p>Excluir</p>
                            <p>apagar totalmente</p>
                        </div>
                        <i class="fas fa-times"></i>
                    </div>
                </>
            }
            { !carro.ocupado && subPage == 1 && 
                <> 
                    <div className='opcaoCliente'
                        onClick={() => setSubPage(0)}
                    >
                        <i className="fas fa-angle-left"></i>
                        <p>Voltar</p>
                        {/* <p>{carro.resultado.tempo.toFixed(2)} horas</p> */}
                    </div>

                    {RenderClientes()}
                </>
            }
            { !carro.ocupado && subPage == 2 &&
                <>
                    <div className='opcaoCliente'
                        onClick={() => setSubPage(1)}
                    >
                        <i className="fas fa-angle-left"></i>
                        <p>Voltar</p>
                    </div>

                    <div className='opcaoImage'>
                        <div className='opcaoImageBox'>
                            <img src={UserImg} />
                        </div>
                        <p>Aceitar corrida de {clienteSelect.id}?</p>
                        {comTempo && 
                            <>
                                <p>Tempo: {clienteSelect.resultado.tempo.toFixed(2)} horas</p>
                                <p>Total: {(clienteSelect.resultado.tempo + clienteSelect.resultado2.tempo).toFixed(2)} horas</p>
                            </>
                        }
                        {!comTempo && 
                            <>
                                <p>Distância: {clienteSelect.resultado.dist.toFixed(2)} km</p>
                                <p>Distância Total: {(clienteSelect.resultado.dist + clienteSelect.resultado2.dist).toFixed(2)} km</p>
                            </>
                        }
                    </div>

                    {/* <div className='opcaoCliente'>
                        <p>{clienteSelect.id}</p>
                    </div> */}

                    <div className='opcaoCliente'
                        onMouseEnter={() => {ApagarCaminho(clienteSelect.resultado2.caminho);DesenharCaminho(clienteSelect.resultado.caminho, [clienteSelect.id, carro.id], false)}}
                        onMouseLeave={() => {ApagarCaminho(clienteSelect.resultado.caminho)}}
                    >
                        <div className='opcaoText'>
                            <p className='white'>Caminho Cliente</p>
                            <div className='opcaoTextLine'>
                                <i className="fas fa-road"></i>
                                <p>{clienteSelect.resultado.dist.toFixed(2)} km</p>
                                <i className="far fa-clock"></i>
                                <p>{clienteSelect.resultado.tempo.toFixed(2)} horas</p>
                            </div>
                        </div>
                    </div>

                    <div className='opcaoCliente'
                        onMouseEnter={() => {ApagarCaminho(clienteSelect.resultado.caminho);DesenharCaminho(clienteSelect.resultado2.caminho, [clienteSelect.id], true)}}
                        onMouseLeave={() => {ApagarCaminho(clienteSelect.resultado2.caminho)}}
                    >

                        <div className='opcaoText'>
                            <p className='white'>Trajeto Destino</p>
                            <div className='opcaoTextLine'>
                                <i className="fas fa-road"></i>
                                <p>{clienteSelect.resultado2.dist.toFixed(2)} km</p>
                                <i className="far fa-clock"></i>
                                <p>{clienteSelect.resultado2.tempo.toFixed(2)} horas</p>
                            </div>
                        </div>
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => VerCaminhos()}
                    >
                        <p>Outras opções de ir até o cliente</p>
                        <i className="fas fa-angle-right"></i>
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => VerTrajetos()}
                    >
                        <p>Outras opções de trajetos até o destino</p>
                        <i className="fas fa-angle-right"></i>
                    </div>

                    <div className='opcaoButton'
                        onClick={() => AceitarCorrida()}
                        >
                        <p>Aceitar Corrida</p>
                        <i className="fas fa-check-circle"></i>
                    </div>
                </>
            }
            { !carro.ocupado && subPage == 3 && 
                <> 
                    <div className='opcaoCliente'
                        onClick={() => setSubPage(2)}
                    >
                        <i className="fas fa-angle-left"></i>
                        <p>Voltar</p>
                        {/* <p>{carro.resultado.tempo.toFixed(2)} horas</p> */}
                    </div>

                    {RenderCaminhos(false)}
                </>
            }
            { !carro.ocupado && subPage == 4 && 
                <> 
                    <div className='opcaoCliente'
                        onClick={() => setSubPage(2)}
                    >
                        <i className="fas fa-angle-left"></i>
                        <p>Voltar</p>
                        {/* <p>{carro.resultado.tempo.toFixed(2)} horas</p> */}
                    </div>

                    {RenderCaminhos(true)}
                </>
            }
        </div>
    );
}

export {BlocoCarro};
