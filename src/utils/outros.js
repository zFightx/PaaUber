import {Euclidiana} from './Heuristica.js';

function verticeMaisProximo(x, y, vertices){
    let vertMaisProx = null;
    let distanciaMinima = Number.MAX_VALUE;
    for(let vertice in vertices){
        const distancia = Euclidiana({x, y}, vertices[vertice].loc);
        if(distancia < distanciaMinima){
            distanciaMinima = distancia;
            vertMaisProx = vertice;
        }
    }
    return vertMaisProx;
}


 


export {verticeMaisProximo};