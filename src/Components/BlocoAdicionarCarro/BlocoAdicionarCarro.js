import { text } from 'd3';
import React, {useState} from 'react';
import car from '../../assets/car.png';
import traveler from '../../assets/traveler.png';
import "./BlocoAdicionarCarro.css";
import { CarroNode, ClienteNode, Node } from '../../Create/Create';

const BlocoAdicionarCarro = ({setCarros, setDataGrafo, setClientes, carros, clientes, grafo, setGrafo}) => {
    
    const [idCarro, setIdCarro] = useState ('');
    const [xCarro, setXCarro] = useState ('');
    const [yCarro, setYCarro] = useState ('');
    const [subPage, setSubPage] = useState(0);
    const [idCliente, setIdCliente] = useState('');
    const [positionXCliente, setPositionXCliente] = useState('');
    const [positionYCliente, setPositionYCliente] = useState('');
    const [destinoXCliente, setDestinoXCliente] = useState('');
    const [destinoYCliente, setDestinoYCliente] = useState('');
    const [idVertice, setIdVertice] = useState('');
    const [xVertice, setXVertice] = useState('');
    const [yVertice, setYVertice] = useState('');
    const [idAresta, setIdAresta] = useState('');


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
        setDataGrafo (data => {data.nodes.push({id: 'cl_'+idCliente, x: 50*positionXCliente, y: 50*positionYCliente, svg: traveler, "labelPosition": "top", "fontColor": "#6DADD6"}); return {...data}});
    }

    const handleSubmitVertice = event => {
        event.preventDefault();
        alert('Vértice adicionado!');
        const vertice = Node(0, idVertice, xVertice, yVertice, [], 0, 0);
        setGrafo (grafo => {grafo[idVertice] = vertice; return grafo})
        setDataGrafo (data => {data.nodes.push({id: idVertice, x: 50*xVertice, y: 50*yVertice}); return {...data}});
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

    const handleChangeIdVertice = event => {
        setIdVertice(event.target.value);
    };

    const handleChangeXVertice = event => {
        setXVertice(event.target.value);
    };

    const handleChangeYVertice = event => {
        setYVertice(event.target.value);
    };

    const RenderCoordCarros = () =>{
        const render = [];

        for(const numero in carros){
            render.push(carros[numero]);
        }
        
        return render.map( carro => {
            return (
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(4)}>
                        <div className='opcaoText'>
                            <p className='white'>{carro.id}</p>
                        </div>  
                        <p>{`x: ${carro.loc.x.toFixed(2)} , y: ${carro.loc.y.toFixed(2)}`}</p>
                    </div>
                </>
            )
        } );
    }

    const RenderCoordClientes = () =>{
        const render = [];

        for(const numero in clientes){
            render.push(clientes[numero]);
        }

        return render.map( clientes => {
            return (
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(4)}>
                        <div className='opcaoText'>
                        <div className='opcaoText'>
                            <p className='white'>{clientes.id}</p>
                            <div className='opcaoTextLine'>
                                <p>{`Localização x: ${clientes.loc.x.toFixed(2)} , y: ${clientes.loc.y.toFixed(2)}`}</p>
                            </div>
                            <div className='opcaoTextLine'>
                                <p>{`Destino x: ${clientes.dest.x.toFixed(2)} , y: ${clientes.dest.y.toFixed(2)}`}</p>
                            </div>
                        </div>

                        </div>
                    </div>
                </>
            )
        } );
    }

    const RenderCoordVertices = () =>{
        const render = [];

        for(const numero in grafo){
            render.push(grafo[numero]);
        }

        return render.map( grafo => {
            return (
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(4)}>
                        <div className='opcaoText'>
                            <p className='white'>{grafo.numero}</p>
                        </div>  
                        <p>{`x: ${grafo.loc.x.toFixed(2)} , y: ${grafo.loc.y.toFixed(2)}`}</p>
                    </div>
                </>
            )
        } );
    }

    return(
        <form onSubmit={handleSubmitCarro} className='blocoAdicionarCarro'>
            <p className='titleAdicionarCarro'>Gerenciar</p> 
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

                    <div className='opcaoCliente' onClick={() => setSubPage(8)}>
                        <div className='opcaoText'>
                            <p>Adicionar Aresta</p>
                            <p> </p>
                        </div>

                        <i class="fas fa-angle-right"></i>
                    </div>

                    <div className='opcaoCliente' onClick={() => setSubPage(4)}>
                        <div className='opcaoText'>
                            <p>Visualizar Posições</p>
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

                        <input onClick={handleSubmitCarro} className='submitAdicionarCarro' type="submit" value="Enviar" />
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

                        <input onClick={handleSubmitCliente} className='submitAdicionarCarro' type="submit" value="Enviar" />

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
                    </div>  
                    
                    <div className='blocoAdicionarInputs'>

                        <label className='labelAdicionarCarro'>Digite o id do vértice:</label>
                        <input className='labelAdicionarCarros' placeholder='valor inteiro' type="text" onChange={handleChangeIdVertice} />

                        <label className='labelAdicionarCarro'>Digite a posição x do vértice:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeXVertice} />
                        
                        <label className='labelAdicionarCarro'>Digite a posição y do vértice:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeYVertice} />

                        <input onClick={handleSubmitVertice} className='submitAdicionarCarro' type="submit" value="Enviar" />

                    </div>              
                </>
            }
            {
                subPage === 8 &&
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(0)}>
                        <i class="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                    </div>
                
                    <div className='blocoAdicionarInputs'>

                        <label className='labelAdicionarCarro'>Digite o id do vértice de origem da aresta:</label>
                        <input className='labelAdicionarCarros' placeholder='valor inteiro' type="text" onChange={handleChangeIdVertice} />

                        <label className='labelAdicionarCarro'>Digite a posição x do vértice:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeXVertice} />
                        
                        <label className='labelAdicionarCarro'>Digite a posição y do vértice:</label>
                        <input className='labelAdicionarCarros' placeholder='valor do tipo float' type="text" onChange={handleChangeYVertice} />

                        <input onClick={handleSubmitVertice} className='submitAdicionarCarro' type="submit" value="Enviar" />

                    </div> 
                
                
                
                
                </>
            }

            {
                subPage === 4 &&
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(0)}>
                        <i class="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                    </div>

                    <div className='opcaoCliente' onClick={() => setSubPage(5)}>
                        <div className='opcaoText'>
                            <p>Visualizar Carros</p>
                            <p>coordenadas</p>
                        </div>
                        <i class="fas fa-angle-right"></i>
                    </div>
                    
                    <div className='opcaoCliente' onClick={() => setSubPage(6)}>
                        <div className='opcaoText'>
                            <p>Visualizar Clientes</p>
                            <p>coordenadas e destino</p>
                        </div>

                        <i class="fas fa-angle-right"></i>
                    </div>

                    <div className='opcaoCliente' onClick={() => setSubPage(7)}>
                        <div className='opcaoText'>
                            <p>Visualizar Vértices</p>
                            <p>coordenadas</p>
                        </div>

                        <i class="fas fa-angle-right"></i>
                    </div>
                
                </>
            }

            {
                subPage === 5 &&
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(4)}>
                        <i class="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                    </div>
                    {RenderCoordCarros()}
                </>
            }

            {
                subPage === 6 &&
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(4)}>
                        <i class="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                    </div>
                    {RenderCoordClientes()}
                </>
            }

            {
                subPage === 7 &&
                <>
                    <div className='opcaoCliente' onClick={() => setSubPage(4)}>
                        <i class="fas fa-angle-left"></i>
                        <div className='opcaoText'>
                            <p>Voltar</p>
                        </div>  
                    </div>
                    {RenderCoordVertices()}
                </>
            }
            

        </form>
    );
}

export {BlocoAdicionarCarro};