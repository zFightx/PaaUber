import { Manhattan } from "./Heuristica";

const inserirComPrioridade = (array, vertice) => {
    let i = 0;
    while(i < array.length && array[i].peso < vertice.peso){
        i++;
    }
    array.splice(i, 0, vertice);
}

const AEstrela = (vertices, start, end, withTime) => {
    const queue = [];
    const visited = [];
    let caminho = [];

    // Calcula heurística do start e insere na fila e visitados
    // const hi = 0;
    queue.push({
        vertice : start,
        dist : 0,
        tempo: 0,
        caminho : [],
    });
    
    visited.push(start.numero);

    while(queue.length > 0){
        //  remove por prioridade e expande
        const v = queue[0];
        queue.splice(0, 1);

        // Se for objetivo, encerra
        if(v.vertice.numero == end.numero){
            caminho.push(v);
            break;          
        }

        // Expandindo
        for( const destino in v.vertice.vizinhos){
            let vizinho = v.vertice.vizinhos[destino];

            // Calcula heurística e pega a distancia
            const h = Manhattan(v.vertice.loc, vertices[destino].loc);
            const d = vizinho.distancia;
            const tempo = d/vizinho.velocidade;

            // Se nao tiver sido visitado anteriormente
            if(visited.indexOf(destino) == -1){
                // Cria a rota
                const rota = {
                    vertice : vertices[destino],
                    dist: d+v.dist,
                    peso: withTime ? tempo+v.tempo : d+v.dist+h,
                    tempo: tempo + v.tempo,
                    caminho: [...v.caminho, vertices[destino]],
                };

                // Insere na fila com prioridade usando heurística
                inserirComPrioridade(queue, rota);
                visited.push(destino);
            }

            // Se ja foi visitado, então verifica se distancia eh menor
            else{
                queue.forEach((elements, index) => {
                    if( elements.vertice.numero == destino ){
                        let heuristica = withTime ? tempo+v.peso : d+v.peso+h;
                        if(heuristica < elements.peso){
                            queue.splice(index, 1);

                            const rota = elements;
                            rota.caminho = [...v.caminho, vertices[destino]];
                            rota.dist = d+v.dist;
                            rota.peso = withTime ? tempo+v.tempo : d+v.dist+h;
                            rota.tempo = tempo + v.tempo;

                            inserirComPrioridade(queue, rota);
                        }
                    }
                })
            }
        }
    }

    console.log(caminho);
    return caminho;
}


export default AEstrela;