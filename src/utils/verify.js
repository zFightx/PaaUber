// const result = `Aresta_n v_origem Loc_v_origem_x Loc_v_origem_y v_destino Loc_v_destino_x Loc_v_destino_y Dist�ncia_km Velocidade_km_h
// 1 1 2.2 4.3 2 5.1 3.2 3.1 40
// 2 2 5.1 3.2 3 7.4 4.4 2.6 35
// 3 3 7.4 4.4 1 2.2 4.3 5.2 38
// 4 1 2.2 4.3 4 6.5 6.2 4.7 40
// 5 1 2.2 4.3 5 3.5 5.0 1.5 40
// 6 5 3.5 5.0 2 5.1 3.2 2.4 40
// 7 2 5.1 3.2 4 6.5 6.2 3.3 40
// 8 4 6.5 6.2 6 8.4 3.9 3.0 40
// 9 2 5.1 3.2 6 8.4 3.9 3.4 40
// 10 6 8.4 3.9 3 7.4 4.4 1.1 60`;



const verifyGrafo = (result) => {
    // let valoresColunas = ["Aresta_n", "v_origem", "Loc_v_origem_x", "Loc_v_origem_y", "v_destino", "Loc_v_destino_x", "Loc_v_destino_y", "Dist�ncia_km", "Velocidade_km_h"]
    // let linhas = result.split('\n');

    // let colunas = linhas[0].split(" ");

    // if (colunas.length !== valoresColunas.length){
    //     return false;
    // } else{
    //     colunas.forEach((coluna, index) => {
    //         if (coluna !== valoresColunas[index]){
    //             return false;
    //         } 
    //     })
    // }
    
    // let arestaIds = []
    // for (let i= 1; i < linhas.length; i++){
    //     let elementosLinha = linhas[i].split(" ");
    //     let arestaN = elementosLinha[0];
        
        
    //     let isArestaRepetida = arestaIds.includes(arestaN);
    //     let isArestaNInteiro = Number.isInteger(Number(arestaN));
    //     let isVOrigemInteiro = Number.isInteger(Number(elementosLinha[1]));
    //     let isVDestinoInteiro = Number.isInteger(Number(elementosLinha[4]));
    //     let isMesmoTamanho = (elementosLinha.length == valoresColunas.length);
    //     let temValorVazio = elementosLinha.includes("");
    //     let temLetra = elementosLinha.find(element => isNaN(Number(element)));
    //     console.log(elementosLinha)
    //     if ( isArestaRepetida || !isArestaNInteiro || !isVOrigemInteiro  || !isVDestinoInteiro || !isMesmoTamanho || temValorVazio || temLetra  )
    //     {
    //         return false;
    //     }
    //     arestaIds.push(arestaN);
    // }
    
    
    
    return true;
}



export {verifyGrafo};