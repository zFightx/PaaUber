import React from "react";
import "./BlocoLeitura.css";

const BlocoLeitura = ({
  title,
  position,
  onChangeInput,
  onClickButton,
  onClickBackButton,
  erroLeitura,
}) => {
  const titulos = ["Arestas", "Carros", "Clientes"];

  return (
    <div className="container">
      <p className="title">{title}</p>
      <div className="inputBox">
        <input type="file" onChange={onChangeInput} />
      </div>

      {erroLeitura && (
        <div className="errorMessage">{`Arquivo de ${
          titulos[position - 1]
        } inválido!`}</div>
      )}

      <button
        className={`button ${erroLeitura === true ? "disabledButton" : ""}`}
        onClick={onClickButton}
        disabled={erroLeitura}
      >
        Avançar
      </button>
      <button
        className={`button backButton ${
          position === "1" ? "disabledButton" : ""
        }`}
        onClick={onClickBackButton}
        disabled={position == "1"}
      >
        Voltar
      </button>
      <div className="positionRow">
        <div className={`circle ${position == "1" ? "activeCircle" : ""}`} />
        <div className={`circle ${position == "2" ? "activeCircle" : ""}`} />
        <div className={`circle ${position == "3" ? "activeCircle" : ""}`} />
      </div>
    </div>
  );
};

export { BlocoLeitura };
