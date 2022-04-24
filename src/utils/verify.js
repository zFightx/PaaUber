const verifyColunas = (valoresColunas, linhas) => {
  let colunas = linhas[0].split(" ");

  if (colunas.length !== valoresColunas.length) {
    return false;
  } else {
    colunas.forEach((coluna, index) => {
      if (coluna !== valoresColunas[index]) {
        return false;
      }
    });
  }
  return true;
};

const verifyGrafo = (leitura) => {
  let valoresColunas = [
    "Aresta_n",
    "v_origem",
    "Loc_v_origem_x",
    "Loc_v_origem_y",
    "v_destino",
    "Loc_v_destino_x",
    "Loc_v_destino_y",
    "Dist�ncia_km",
    "Velocidade_km_h",
  ];
  let linhas = leitura.split("\n");

  if (!verifyColunas(valoresColunas, linhas)) {
    return false;
  }

  let arestaIds = [];
  for (let i = 1; i < linhas.length; i++) {
    let elementosLinha = linhas[i].split(" ");
    let arestaN = elementosLinha[0];

    let isArestaRepetida =
      arestaIds.includes(arestaN) ||
      arestaIds.includes(Number(arestaN).toString());
    let isArestaNInteiro = Number.isInteger(Number(arestaN));
    let isVOrigemInteiro = Number.isInteger(Number(elementosLinha[1]));
    let isVDestinoInteiro = Number.isInteger(Number(elementosLinha[4]));
    let isMesmoTamanho = elementosLinha.length == valoresColunas.length;
    let temValorVazio = elementosLinha.includes("");
    let temLetra = elementosLinha.find((element) => isNaN(Number(element)));
    if (
      isArestaRepetida ||
      !isArestaNInteiro ||
      !isVOrigemInteiro ||
      !isVDestinoInteiro ||
      !isMesmoTamanho ||
      temValorVazio ||
      temLetra
    ) {
      return false;
    }
    arestaIds.push(arestaN);
  }

  return true;
};

const verifyCarros = (result) => {
  let valoresColunas = ["Carro_id", "loc_carro_x", "loc_carro_y", "aresta_id"];

  let linhas = result.split("\n");

  if (!verifyColunas(valoresColunas, linhas)) {
    return false;
  }

  let carroIds = [];
  for (let i = 1; i < linhas.length; i++) {
    let elementosLinha = linhas[i].split(" ");
    let carroId = elementosLinha[0];

    let isCarroIdRepetido =
      carroIds.includes(carroId) ||
      carroIds.includes(Number(carroId).toString());
    let isCarroIdInteiro = Number.isInteger(Number(carroId));
    let isArestaIdInteiro = Number.isInteger(Number(elementosLinha[3]));
    let isMesmoTamanho = elementosLinha.length == valoresColunas.length;
    let temValorVazio = elementosLinha.includes("");
    let temLetra = elementosLinha.find((element) => isNaN(Number(element)));

    if (
      isCarroIdRepetido ||
      !isCarroIdInteiro ||
      !isArestaIdInteiro ||
      !isMesmoTamanho ||
      temValorVazio ||
      temLetra
    ) {
      return false;
    }
    carroIds.push(carroId);
  }

  return true;
};

const verifyClientes = (result) => {
  let valoresColunas = [
    "Cliente_id",
    "loc_cliente_x",
    "loc_cliente_y",
    "dest_cliente_x",
    "dest_cliente_y",
  ];

  let linhas = result.split("\n");

  if (!verifyColunas(valoresColunas, linhas)) {
    return false;
  }

  let clienteIds = [];
  for (let i = 1; i < linhas.length; i++) {
    let elementosLinha = linhas[i].split(" ");
    let clienteId = elementosLinha[0];

    let isClienteIdRepetido =
      clienteIds.includes(clienteId) ||
      clienteIds.includes(Number(clienteId).toString());
    let isClienteIdInteiro = Number.isInteger(Number(clienteId));
    let isMesmoTamanho = elementosLinha.length == valoresColunas.length;
    let temValorVazio = elementosLinha.includes("");
    let temLetra = elementosLinha.find((element) => isNaN(Number(element)));

    if (
      isClienteIdRepetido ||
      !isClienteIdInteiro ||
      !isMesmoTamanho ||
      temValorVazio ||
      temLetra
    ) {
      return false;
    }
    clienteIds.push(clienteId);
  }

  return true;
};

export { verifyGrafo, verifyCarros, verifyClientes };
