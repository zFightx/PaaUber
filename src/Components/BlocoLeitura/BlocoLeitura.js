import React, { useRef } from "react";
import "./BlocoLeitura.css";

const BlocoLeitura = ({
  title,
  position,
  onChangeInput,
  onClickButton,
  onClickBackButton,
  arquivoLido,
  erroLeitura,
}) => {
  const titulos = ["Arestas", "Carros", "Clientes"];
  const inputRef = useRef(null);

  return (
    <div className="container">
      <p className="title">{title}</p>
      <div className="inputBox">
        <input ref={inputRef} type="file" onChange={onChangeInput} />

        <span className="inputLabel" onClick={() => inputRef.current.click()}>
          {arquivoLido ? arquivoLido.name : "Nenhum arquivo escolhido"}
        </span>
      </div>

      {erroLeitura && (
        <div className="errorMessage">{`Arquivo de ${
          titulos[position - 1]
        } inválido!`}</div>
      )}

      <button
        className={`button ${
          erroLeitura || !arquivoLido ? "disabledButton" : ""
        }`}
        onClick={onClickButton}
        disabled={erroLeitura || !arquivoLido}
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
