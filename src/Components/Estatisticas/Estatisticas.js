import "./Estatisticas.css";

const Estatisticas = ({ dadosCorridas }) => {
  // Media de tempo de todas as viagens
  const tempoMedioEspera =
    dadosCorridas.reduce((acc, curr) => acc + curr.tempoEspera, 0) /
    dadosCorridas.length;
  // media aritmetica
  const tempoMedioViagens =
    dadosCorridas.reduce(
      (acc, curr) => acc + curr.tempoCorrida * curr.dist,
      0
    ) / dadosCorridas.reduce((acc, curr) => acc + curr.dist, 0); //media ponderada

  console.log(tempoMedioViagens);
  return (
    <div className="containerEstatisticas">
      <div className="titleEstatisticas">Estatísticas</div>
      <div className="data">
        {`Tempo médio de espera: ${
          tempoMedioEspera ? tempoMedioEspera.toFixed(2) : 0
        }`}{" "}
        horas
      </div>
      <div className="data">
        {`Tempo médio de viagem: ${
          tempoMedioViagens ? tempoMedioViagens.toFixed(2) : 0
        }`}{" "}
        horas
      </div>
    </div>
  );
};

export { Estatisticas };
