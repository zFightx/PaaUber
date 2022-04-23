// Utilizar a mergesort

function sort (a, b, r, c) {
    let i, j, k, w;

    for (i = a; i < b; ++i) {
        w[i-a] = c[i];
    }

    for (j = b; j < r; ++j) {
        w[r-a+b-j-1] = c[j];
    }
    
    i = 0; j = r-a-1;
    for ( k = a; k < r; ++k) {
        if (w[i] <= w[j]) {
            c[k] = w[i++];
        } 
        else c[k] = w[j--];
    }
}

// vetor = vetor de numeros a serem ordenados

function mergesort (vetor) {
    let n = vetor.length
    let b = 1;
    while (b < n) {
        p = 0;
        while (p + b < n) {
           r = p + 2*b;
           
           if (r > n) {
               r = n;
           }
           sort(p, p+b, r, vetor);
           p = p + 2*b; 
        }
        b = 2*b;
    }

    return vetor;
}