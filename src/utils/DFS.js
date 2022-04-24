﻿const DFSCaminho = (vertices, start, end) =>{
    const caminhos = [];
    const caminho = {
        vertices : [start],
        dist : 0,
        tempo: 0,
    }

    DFS(vertices, start,end, caminho, caminhos);

    return caminhos;
}

const DFS = (vertices, start, end, caminho, todosCaminhos) =>{
    if(start.numero == end.numero){
        todosCaminhos.push(caminho);
        return;
    }

    for( const destino in start.vizinhos ){
        if(caminho.vertices.filter(vertice => vertice.numero == destino ).length == 0){
            const novoCaminho = {
                vertices : [...caminho.vertices, vertices[destino]],
                dist : start.vizinhos[destino].distancia + caminho.dist,
                tempo : (start.vizinhos[destino].distancia/start.vizinhos[destino].velocidade) + caminho.tempo
            };
            
            DFS(vertices, vertices[destino], end, novoCaminho, todosCaminhos);
        }
    }
}

export default DFSCaminho;