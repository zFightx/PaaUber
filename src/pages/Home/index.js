


function Home ({setLeituraGrafo}) {

    const readFile = (event, cb) => {
        var fr=new FileReader();
        fr.onload=function(){
            const read = fr.result;
            cb(read);
            setLeituraGrafo(read)
        }
        fr.readAsText(event.target.files[0]);
    }

    const CreateMap = (event) => {
        readFile(event, function(result){
            // Retirando a primeira linha do arquivo texto
            let lines = result.split('\n');
            lines.splice(0, 1);
            let finalResult = lines.join('\n');
    
            // Transformando string em número e colocando em um array
            let resultArray = [];
            for( var i = 0; i < finalResult.length; i++ ) {
                let splitResult = finalResult.split(/\s+/)[i];
    
                if(splitResult !== undefined){
                    resultArray.push(Number(splitResult));
                }
            }
    
            const vertices = {};
    
            // Preenchendo o grafo do mapa
            for( var i = 0; i < resultArray.length ; i = i + 9 ) {
                console.log(resultArray[i], resultArray[i+1], resultArray[i+2], resultArray[i+3], resultArray[i+4], resultArray[i+7], resultArray[i+8]);
                const [aresta_n, v_origem, loc_v_origem_x, loc_v_origem_y, v_destino, distancia, velocidade] = [resultArray[i], resultArray[i+1], resultArray[i+2], resultArray[i+3], resultArray[i+4], resultArray[i+7], resultArray[i+8]];
    
                if(!vertices[v_origem]){
                    let vertice = Node(aresta_n, v_origem, loc_v_origem_x, loc_v_origem_y, v_destino, distancia, velocidade);
                    vertices[v_origem] = vertice;
                }
                else{
                    let vertice = vertices[v_origem];
                    vertice.vizinhos[1]= {
                        aresta_n: aresta_n,
                        v_destino: v_destino,
                        distancia: distancia,
                        velocidade: velocidade,
                        tem_carro: false,
                        tem_cliente: false,
                    };
                }
            }
    
            console.log(vertices);
        });
    }

    return <div>
        
        <input type="file" onChange={CreateMap} />
        
    </div>

}

export default Home;