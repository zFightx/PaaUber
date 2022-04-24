import React, {useState} from 'react';
import "./BlocoCliente.css"

import DFSCaminho from '../../utils/DFS';
import AEstrela from '../../utils/AEstrela';
import { verticeMaisProximo } from '../../utils/outros';
import mergeSort from '../../algoritmos/mergesort';

const BlocoCliente = ({carros, vertices, cliente, DesenharCaminho, ApagarCaminho}) => {
    const [subPage, setSubPage] = useState(0);
    const [listaCarros, setListaCarros] = useState([]);
    const [comTempo, setComTempo] = useState(false);
    const [carroSelect, setCarroSelect] = useState(0);

    const verCarros = (withTime) =>{
        const caminhos = [];

        for(const id in carros){
            const carro = carros[id];

            if(!carro.ocupado){
                const start = vertices[verticeMaisProximo(carro.loc.x, carro.loc.y, vertices)];
                const end = vertices[verticeMaisProximo(cliente.loc.x, cliente.loc.y, vertices)];
                
                const caminho = AEstrela(vertices, start, end, withTime);
                caminhos.push({
                    id: id,
                    resultado: caminho
                });
                // const caminhos = DFSCaminho(vertices, start, end);
            }
        }

        setComTempo(withTime);
        setListaCarros(caminhos);
        setSubPage(1);

        // console.log(caminhos);
        mergeSort(caminhos, 0, caminhos.length-1);
    }

    const SelectCarro = (carroId) => {
        setCarroSelect(carroId);
        setSubPage(2);
    }

    const SelecionarCorrida = () =>{
        carros[carroSelect].tem_cliente.push(cliente.id);
    }

    const RenderCarros = () => {
        if(comTempo){
            return listaCarros.map(carro => {
                // console.log(carro);
                return (
                    <div className='opcaoCliente' key={carro.id} 
                        onMouseEnter={() => DesenharCaminho(carro.resultado.caminho)}
                        onMouseLeave={() => ApagarCaminho(carro.resultado.caminho)}
                        onClick={() => SelectCarro(carro.id)}
                    >
                        <p>{carro.id}</p>
                        <p>{carro.resultado.tempo.toFixed(2)} horas</p>
                    </div>
                );
            });
        }
        else{
            return listaCarros.map(carro => {
                return (
                    <div className='opcaoCliente' key={carro.id}
                        onMouseEnter={() => DesenharCaminho(carro.resultado.caminho)}
                        onMouseLeave={() => ApagarCaminho(carro.resultado.caminho)}
                        onClick={() => SelectCarro(carro.id)}
                    >
                        <p>{carro.id}</p>
                        <p>{carro.resultado.dist.toFixed(2)} Km</p>
                    </div>
                );
            });
        }
    }

    return (
        <div className="blocoCliente">
            <p className='titleCliente'>Cliente {cliente.id}</p>
            {
                cliente.tem_carro &&
                <> 
                    <div className='opcaoCliente'>
                        <p>Cliente Aguardando o Motorista</p>
                    </div>
                </>
            }
            { 
                !cliente.tem_carro && subPage == 0 && 
                <> 
                    <div className='opcaoCliente' onClick={() => verCarros(false)}>
                        <p>Ver Carros Livres</p>
                        <p>Pela distância</p>
                    </div>
                    
                    <div className='opcaoCliente' onClick={() => verCarros(true)}>
                        <p>Ver Carros Livres</p>
                        <p>Pelo tempo</p>
                    </div>
                </>
            }
            {
                !cliente.tem_carro && subPage == 1 &&
                <>     
                    <div className='opcaoCliente' onClick={() => setSubPage(0)}>
                        <p>Voltar</p>
                        {/* <p>Pelo tempo</p> */}
                    </div>               
                    {RenderCarros()}
                </>
            }
            {
                !cliente.tem_carro && subPage == 2 &&
                <>     
                    <div className='opcaoCliente' onClick={() => setSubPage(1)}>
                        <p>Voltar</p>
                    </div>    

                    <div className='opcaoCliente'>
                        <p>{carroSelect}</p>
                    </div>

                    <div className='opcaoCliente'
                        onClick={() => SelecionarCorrida()}
                        >
                        <p>Selecionar Corrida</p>
                    </div>
                </>
            }
        </div>
    );
}

export {BlocoCliente};