const DFSCaminho = (vertices, start, end, caminho, todosCaminhos) =>{
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
            
            DFSCaminho(vertices, vertices[destino], end, novoCaminho, todosCaminhos);
        }
    }
}

export default DFSCaminho;