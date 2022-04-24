import React, {useState} from 'react';
import "./BlocoCliente.css"

import DFSCaminho from '../../utils/DFS';
import AEstrela from '../../utils/AEstrela';
import { verticeMaisProximo } from '../../utils/outros';
import mergeSort from '../../algoritmos/mergesort';
import CarImg from '../../assets/car.png';

const BlocoCliente = ({carros, vertices, cliente, DesenharCaminho, ApagarCaminho}) => {
    const [subPage, setSubPage] = useState(0);
    const [listaCarros, setListaCarros] = useState([]);
    const [comTempo, setComTempo] = useState(false);
    const [carroSelect, setCarroSelect] = useState(0);

    const verCarros = (withTime) =>{
        const caminhos = [];

        for(const id in carros){
            const carro = carros[id];

            if(!carro.ocupado && !carro.tem_cliente.includes(cliente.id)){
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
        carros[carroSelect.id].tem_cliente.push(cliente.id);
        setSubPage(0);
    }

    const RenderCarros = () => {
        if(comTempo){
            return listaCarros.map(carro => {
                // console.log(carro);
                return (
                    <div className='opcaoCliente' key={carro.id} 
                        onMouseEnter={() => DesenharCaminho(carro.resultado.caminho)}
                        onMouseLeave={() => ApagarCaminho(carro.resultado.caminho)}
                        onClick={() => SelectCarro(carro)}
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
                        onClick={() => SelectCarro(carro)}
                    >
                        <p>{carro.id}</p>
                        <p>{carro.resultado.dist.toFixed(2)} Km</p>
                        {/* <i className="fas fa-angle-right"></i> */}
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
                        <i className="fas fa-times-circle gray"></i>
                    </div>
                </>
            }
            { 
                !cliente.tem_carro && subPage == 0 && 
                <> 
                    <div className='opcaoCliente' onClick={() => verCarros(false)}>
                        <div className='opcaoText'>
                            <p>Ver Carros Livres</p>
                            <p>Pela distância</p>
                        </div>
                        <i className="fas fa-angle-right"></i>
                    </div>
                    
                    <div className='opcaoCliente' onClick={() => verCarros(true)}>
                        <div className='opcaoText'>
                            <p>Ver Carros Livres</p>
                            <p>Pelo tempo</p>
                        </div>

                        <i className="fas fa-angle-right"></i>
                    </div>
                </>
            }
            {
                !cliente.tem_carro && subPage == 1 &&
                <>     
                    <div className='opcaoCliente' onClick={() => setSubPage(0)}>
                        <i className="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                        {/* <p>Pelo tempo</p> */}
                    </div>               
                    {RenderCarros()}
                </>
            }

            {
                !cliente.tem_carro && subPage == 2 &&
                <>     
                    <div className='opcaoCliente' onClick={() => setSubPage(1)}>
                        <i className="fas fa-angle-left"></i>
                        <p>Voltar</p>
                    </div>    

                    <div className='opcaoImage'>
                        <div className='opcaoImageBox'>
                            <img src={CarImg} />
                        </div>
                        <p>Solicitar corrida com {carroSelect.id}?</p>
                        {comTempo && <p>Tempo: {carroSelect.resultado.tempo} horas</p>}
                        {!comTempo && <p>Distância: {carroSelect.resultado.dist} km</p>}
                    </div>

                    <div className='opcaoButton'
                        onClick={() => SelecionarCorrida()}
                        >
                        <p>Selecionar Corrida</p>
                        <i className="fas fa-check-circle"></i>
                    </div>
                </>
            }
        </div>
    );
}

export {BlocoCliente};