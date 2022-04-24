import { text } from 'd3';
import React, {useState} from 'react';
import car from '../../assets/car.png';
import traveler from '../../assets/traveler.png';
import "./BlocoAdicionarCarro.css";
import { CarroNode, ClienteNode } from '../../Create/Create';

const BlocoAdicionarCarro = ({setCarros, setDataGrafo, setClientes}) => {
    
    const [idCarro, setIdCarro] = useState ('');
    const [xCarro, setXCarro] = useState ('');
    const [yCarro, setYCarro] = useState ('');
    const [subPage, setSubPage] = useState(0);
    const [idCliente, setIdCliente] = useState('');
    const [positionXCliente, setPositionXCliente] = useState('');
    const [positionYCliente, setPositionYCliente] = useState('');
    const [destinoXCliente, setDestinoXCliente] = useState('');
    const [destinoYCliente, setDestinoYCliente] = useState('');


    const handleSubmitCarro = event => {
        event.preventDefault();
        alert('Carro adicionado!');
        const carro = CarroNode(idCarro, xCarro, yCarro, 0);
        setCarros( carros => {carros['ca_'+idCarro] = carro; return carros});
        setDataGrafo (data => {data.nodes.push({id: 'ca_'+idCarro, x: 50*xCarro, y: 50*yCarro, svg: car, "labelPosition": "top", "fontColor": "#E8DF2E"}); return {...data}});
    }

    const handleSubmitCliente = event => {
        event.preventDefault();
        alert('Cliente adicionado!');
        const cliente = ClienteNode(idCliente, positionXCliente, positionYCliente, destinoXCliente, destinoYCliente);
        setClientes (clientes => {clientes['cl_'+idCliente] = cliente; return clientes});
        setDataGrafo (data => {data.nodes.push({id: 'cl_'+idCliente, x: 50*positionXCliente, y: 50*positionYCliente, svg: traveler, "labelPosition": "top", "fontColor": "#E8DF2E"}); return {...data}});
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

    const handleChangeIdCliente = event => {
        setIdCliente(event.target.value);
    };

    const handleChangePositionXCliente = event => {
        setPositionXCliente(event.target.value);
    };

    const handleChangePositionYCliente = event => {
        setPositionYCliente(event.target.value);
    };

    const handleChangeDestinoXCliente = event => {
        setDestinoXCliente(event.target.value);
    };

    const handleChangeDestinoYCliente = event => {
        setDestinoYCliente(event.target.value);
    };

    return(
        <form onSubmit={handleSubmitCarro} className='blocoAdicionarCarro'>
            <p className='titleAdicionarCarro'>Adicionar</p> 
            { subPage === 0 &&
                <>
                <div className='opcaoCliente' onClick={() => setSubPage(1)}>
                        <div className='opcaoText'>
                            <p>Adicionar Carro</p>
                            <p> </p>
                        </div>
                        <i class="fas fa-angle-right"></i>
                    </div>
                    
                    <div className='opcaoCliente' onClick={() => setSubPage(2)}>
                        <div className='opcaoText'>
                            <p>Adicionar Cliente</p>
                            <p> </p>
                        </div>

                        <i class="fas fa-angle-right"></i>
                    </div>

                    <div className='opcaoCliente' onClick={() => setSubPage(3)}>
                        <div className='opcaoText'>
                            <p>Adicionar Vértice</p>
                            <p> </p>
                        </div>

                        <i class="fas fa-angle-right"></i>
                    </div>

                </>

            }{
                subPage === 1 &&
                <>

                    <div className='opcaoCliente' onClick={() => setSubPage(0)}>
                        <i class="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                    </div>

                    <div className='blocoAdicionarInputs'>
                        
                        <label className='labelAdicionarCarro'>Digite o id do carro:</label>
                        <input className='labelAdicionarCarros' placeholder='valor inteiro' type="text" onChange={handleChangeIdCarro} />
                        
                        <label className='labelAdicionarCarro'>Digite a posição X do carro:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeXCarro} />

                        <label className='labelAdicionarCarro'>Digite a posição Y do carro:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeYCarro} />

                        <input onChange={handleSubmitCarro} className='submitAdicionarCarro' type="submit" value="Enviar" />
                    </div>
                </>
            
            }
            {
                subPage === 2 &&
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(0)}>
                        <i class="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                        {/* <p>Pelo tempo</p> */}
                    </div>

                    <div className='blocoAdicionarInputs'>

                        <label className='labelAdicionarCarro'>Digite o id do cliente:</label>
                        <input className='labelAdicionarCarros' placeholder='valor inteiro' type="text" onChange={handleChangeIdCliente} />

                        <label className='labelAdicionarCarro'>Digite a posição x do cliente:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangePositionXCliente} />

                        <label className='labelAdicionarCarro'>Digite a posição y do cliente:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangePositionYCliente} />

                        <label className='labelAdicionarCarro'>Digite a posição x do destino:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeDestinoXCliente} />

                        <label className='labelAdicionarCarro'>Digite a posição y do destino:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeDestinoYCliente} />

                        <input onChange={handleSubmitCliente} className='submitAdicionarCarro' type="submit" value="Enviar" />

                    </div>
                
                </>
            }
            {
                subPage === 3 &&
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(0)}>
                        <i class="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                        {/* <p>Pelo tempo</p> */}
                    </div>
                
                
                </>
            }
            

        </form>
    );
}

export {BlocoAdicionarCarro};