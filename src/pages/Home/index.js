import styled from 'styled-components'

const StyledDiv = styled.div `

`



function Home ({CreateMap, leituraGrafo, CreateCarros, leituraCarro, CreateClientes, leituraPessoa}) {

    

    return <StyledDiv>
        
        <input type="file" onChange={CreateMap} />
        <p>Grafos: {leituraGrafo}</p>
        <input type="file" onChange={CreateCarros} />
        <p>Carro: {leituraCarro}</p>
        <input type="file" onChange={CreateClientes} />
        <p>Pessoa: {leituraPessoa}</p> 
    </StyledDiv>

}

export default Home;