// vertices : [...caminho.vertices, vertices[destino]],
// dist : start.vizinhos[destino].distancia + caminho.dist,
// tempo : (start.vizinhos[destino].distancia/start.vizinhos[destino].velocidade) + caminho.tempo
function merge(arr, left, middle, right, withTime) {
    let heuristica = withTime ? "tempo" : "dist";
    var array1 = middle - left + 1;
    var array2 = right - middle;
  
    // Create temp arrays
    var L = new Array(array1); 
    var R = new Array(array2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < array1; i++)
        L[i] = arr[left + i];
    for (var j = 0; j < array2; j++)
        R[j] = arr[middle + 1 + j];
  
    // Merge the temp arrays back into arr[left..right]
  
    // Initial index of first subarray
    var i = 0;
  
    // Initial index of second subarray
    var j = 0;
  
    // Initial index of merged subarray
    var k = left;
  
    while (i < array1 && j < array2) {
        if (L[i].resultado[heuristica] <= R[j].resultado[heuristica]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < array1) {
        arr[k] = L[i];
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < array2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
  
// left is for left index and right is
// right index of the sub-array
// of arr to be sorted */
// [l1,2,3,r4,5]
// mergerSort(arr, 0, arr.length - 1);
function mergeSort(arr,left, right, withTime){
    if(left>=right){
        return;//returns recursively
    }
    var middle =left+ parseInt((right-left)/2);
    mergeSort(arr,left,middle, withTime);       // primeira metade
    mergeSort(arr,middle+1,right, withTime);    // segunda metade
    merge(arr,left,middle,right, withTime);
}


const mergeByPosition = (arr, left, middle, right, position) => {
    
    var array1 = middle - left + 1;
    var array2 = right - middle;
  
    // Create temp arrays
    var L = new Array(array1); 
    var R = new Array(array2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < array1; i++)
        L[i] = arr[left + i];
    for (var j = 0; j < array2; j++)
        R[j] = arr[middle + 1 + j];
  
    // Merge the temp arrays back into arr[left..right]
  
    // Initial index of first subarray
    var i = 0;
  
    // Initial index of second subarray
    var j = 0;
  
    // Initial index of merged subarray
    var k = left;
  
    while (i < array1 && j < array2) {
        if (L[i][position] <= R[j][position]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < array1) {
        arr[k] = L[i];
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < array2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}


const mergeSortPosition = (arr,left,right, position) => {  //axle
    if(left>=right){
        return;//returns recursively
    }
    var middle =left+ parseInt((right-left)/2);
    mergeSortPosition(arr,left,middle, position);       // primeira metade
    mergeSortPosition(arr,middle+1,right, position);    // segunda metade
    mergeByPosition(arr,left,middle,right, position);
}





export {mergeSortPosition};
export default mergeSort;