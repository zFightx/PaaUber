import { text } from 'd3';
import React, {useState} from 'react';
import car from '../../assets/car.png'
import "./BlocoAdicionarCarro.css";
import { CarroNode } from '../../Create/Create';

const BlocoAdicionarCarro = ({setCarros, setDataGrafo}) => {
    
    const [idCarro, setIdCarro] = useState ('');
    const [xCarro, setXCarro] = useState ('');
    const [yCarro, setYCarro] = useState ('');
    const [idCarroAresta, setIdCarroAresta] = useState ('');

    const handleSubmit = event => {
        event.preventDefault();
        alert('You have submitted the form.')
        const carro = CarroNode(idCarro, xCarro, yCarro, idCarroAresta);
        setCarros( carros => {carros['ca_'+idCarro] = carro; return carros});
        setDataGrafo (data => {data.nodes.push({id: 'ca_'+idCarro, x: 50*xCarro, y: 50*yCarro, svg: car, "labelPosition": "top", "fontColor": "#E8DF2E"}); return {...data}});
    }
    
    
    const handleChangeIdCarro = event => {
        setIdCarro(event.target.value);
    };

    const handleChangeXCarro = event => {
        setXCarro(event.target.value);
    };

    const handleChangeYCarro = event => {
        setYCarro(event.target.value);
    };

    const handleChangeIdCarroAresta = event => {
        setIdCarroAresta(event.target.value);
    };

    return(
        <form onSubmit={handleSubmit} className='blocoAdicionarCarro'>
            <p className='titleAdicionarCarro'> Adicionar Carro</p>
            <div className='blocoAdicionarInputs'>
                <label className='labelAdicionarCarro'>Digite o id do carro:</label>
                <input className='labelAdicionarCarros' placeholder='valor inteiro' type="text" onChange={handleChangeIdCarro} />
                
                <label className='labelAdicionarCarro'>Digite a posição X do carro:</label>
                <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeXCarro} />

                <label className='labelAdicionarCarro'>Digite a posição Y do carro:</label>
                <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeYCarro} />

                <label className='labelAdicionarCarro'>Digite o id da aresta que o carro está:</label>
                <input className='labelAdicionarCarros' placeholder='valor inteiro' type="text" onChange={handleChangeIdCarroAresta} />

                <input className='submitAdicionarCarro' type="submit" value="Enviar" />
            </div>

        </form>
    );
}

export {BlocoAdicionarCarro};