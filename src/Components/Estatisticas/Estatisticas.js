import './Estatisticas.css';

const Estatisticas = ({dadosCorridas}) => {
    // Media de tempo de todas as viagens
    const tempoMedioEspera = dadosCorridas.reduce((acc, curr) => acc + curr.tempoEspera, 0) / dadosCorridas.length;       // media aritmetica
    const tempoMedioViagens = dadosCorridas.reduce((acc, curr) => acc + curr.tempoViagem * curr.dist, 0) / dadosCorridas.reduce((acc, curr) => acc + curr.dist, 0); //media ponderada
    return(
        <div className="containerEstatisticas">
            <div className="titleEstatisticas">Estatísticas</div>
            <div className="data">Tempo médio de espera: {tempoMedioEspera}</div>
            <div className="data">Tempo médio de viagem: {tempoMedioViagens}</div>
        </div>
    )
}

export  {Estatisticas};