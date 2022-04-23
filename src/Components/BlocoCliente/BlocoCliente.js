import React, {useState} from 'react';
import "./BlocoCliente.css"

import DFSCaminho from '../../utils/DFS';
import AEstrela from '../../utils/AEstrela';
import { verticeMaisProximo } from '../../utils/outros';
import mergeSort from '../../algoritmos/mergesort';

const BlocoCliente = ({carros, vertices}) => {
    const [subPage, setSubPage] = useState(0);
    const [listaCarros, setListaCarros] = useState([]);
    const [comTempo, setComTempo] = useState(false);

    const verCarros = (withTime) =>{
        const caminhos = [];

        for(const id in carros){
            const carro = carros[id];
            const start = vertices[verticeMaisProximo(carro.loc.x, carro.loc.y, vertices)];
            const end = vertices[6];

            const caminho = AEstrela(vertices, start, end, withTime);
            caminhos.push({
                id: id,
                caminho: caminho
            });
            // const caminhos = DFSCaminho(vertices, start, end);
        }

        setComTempo(withTime);
        setListaCarros(caminhos);
        setSubPage(1);

        const vetor = [ 5 , 4, 3 ,2, 10];
        const ordenado = mergeSort(vetor, 0, vetor.length-1);
        console.log(vetor);
    }

    const RenderCarros = () => {
        if(comTempo){
            return listaCarros.map(carro => {
                return (
                    <div className='opcaoCliente'>
                        <p>{carro.id}</p>
                        <p>{carro.caminho.tempo.toFixed(2)} horas</p>
                    </div>
                );
            });
        }
        else{
            return listaCarros.map(carro => {
                return (
                    <div className='opcaoCliente'>
                        <p>{carro.id}</p>
                        <p>{carro.caminho.dist.toFixed(2)} Km</p>
                    </div>
                );
            });
        }
    }

    return (
        <div className="blocoCliente">
            <p className='titleCliente'>Cliente</p>
            { subPage == 0 && 
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
                subPage == 1 &&
                <>     
                    <div className='opcaoCliente' onClick={() => setSubPage(0)}>
                        <p>Voltar</p>
                        {/* <p>Pelo tempo</p> */}
                    </div>               
                    {RenderCarros()}
                </>
            }
        </div>
    );
}

export {BlocoCliente};