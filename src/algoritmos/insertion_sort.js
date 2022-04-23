function insertion_sort(vet) {

    // vet = vetor para ordenar

    let i, j, tmp, count=0, n=vet.length;

    for(i=1; i<n; i++){
        tmp = vet[i];

        for(j = i-1; j >= 0 && tmp < vet[j]; j--) {
           vet[j+1] = vet[j];
            count++;
        }

        vet[j+1] = tmp;
    }

    return vet
}

let a = [1,4,5,2,3,0];

console.log(insertion_sort(a));