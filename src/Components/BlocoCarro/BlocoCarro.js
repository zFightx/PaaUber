import React, {useState} from 'react';
import "./BlocoCarro.css"

import DFSCaminho from '../../utils/DFS';
import AEstrela from '../../utils/AEstrela';
import { verticeMaisProximo } from '../../utils/outros';
import mergeSort from '../../algoritmos/mergesort';

const BlocoCarro = ({carro, vertices, clientes, DesenharCaminho, ApagarCaminho}) => {
    const [subPage, setSubPage] = useState(0);
    const [comTempo, setComTempo] = useState(false);
    const [clienteSelect, setClienteSelect] = useState({});
    const [listaClientes, setListaClientes] = useState([]);
    const [listaCaminhos, setListaCaminhos] = useState([]);

    const RenderClientes = () => {
        return listaClientes.map(cliente => 
            <div className='opcaoCliente' key={cliente.id} 
                onMouseEnter={() => {DesenharCaminho(cliente.resultado.caminho)}}
                onMouseLeave={() => {ApagarCaminho(cliente.resultado.caminho)}}
                onClick={() => SelectCliente(cliente)}
            >
                <p>{cliente.id}</p>
                <p>{cliente.resultado.tempo.toFixed(2)} horas</p>
                <p>{cliente.resultado.dist.toFixed(2)} km</p>
                <p>{cliente.resultado.tempo.toFixed(2)} horas</p>
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
            
            console.log(caminho);
            caminhos.push({
                id: clienteId,
                resultado: caminho,
                resultado2: caminho2,
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
                onMouseEnter={() => {DesenharCaminho(caminho.resultado.vertices, secondColor)}}
                onMouseLeave={() => {ApagarCaminho(caminho.resultado.vertices)}}
            >
                <p>{`caminho_${index}`}</p>
                <p>{caminho.resultado.tempo.toFixed(2)} horas</p>
                <p>{caminho.resultado.dist.toFixed(2)} km</p>
            </div>
        );
    }

    const AceitarCorrida = () => {
        clientes[clienteSelect.id].tem_carro = true;
        carro.ocupado = true;
    }

    return (
        <div className="blocoCliente">
            <p className='titleCliente'>Carro {carro.id}</p>
            {
                carro.ocupado &&
                <> 
                    <div className='opcaoCliente'>
                        <p>Carro indo para o cliente...</p>
                    </div>
                </>
            }
            { !carro.ocupado && subPage == 0 && 
                <> 
                    <div className='opcaoCliente'
                        onClick={() => VerClientes(false)}
                    >
                        <p>Ver Solicitações por distância</p>
                        {/* <p>{carro.resultado.tempo.toFixed(2)} horas</p> */}
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => VerClientes(true)}
                    >
                        <p>Ver Solicitações por tempo</p>
                        {/* <p>{carro.resultado.tempo.toFixed(2)} horas</p> */}
                    </div>
                </>
            }
            { !carro.ocupado && subPage == 1 && 
                <> 
                    <div className='opcaoCliente'
                        onClick={() => setSubPage(0)}
                    >
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
                        <p>Voltar</p>
                    </div>

                    <div className='opcaoCliente'>
                        <p>{clienteSelect.id}</p>
                    </div>

                    <div className='opcaoCliente'
                        onMouseEnter={() => {ApagarCaminho(clienteSelect.resultado.caminho);DesenharCaminho(clienteSelect.resultado2.caminho, true)}}
                        onMouseLeave={() => {ApagarCaminho(clienteSelect.resultado2.caminho)}}
                    >
                        <p>Melhor Trajeto</p>
                        <p>{clienteSelect.resultado2.dist.toFixed(2)} km</p>
                        <p>{clienteSelect.resultado2.tempo.toFixed(2)} horas</p>
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => VerCaminhos()}
                    >
                        <p>Outras opções de ir até o cliente</p>
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => VerTrajetos()}
                    >
                        <p>Outras opções de trajetos até o destino</p>
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => AceitarCorrida()}
                    >
                        <p>Aceitar Corrida</p>
                    </div>
                </>
            }
            { !carro.ocupado && subPage == 3 && 
                <> 
                    <div className='opcaoCliente'
                        onClick={() => setSubPage(2)}
                    >
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