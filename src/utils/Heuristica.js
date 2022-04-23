const Euclidiana = (v1, v2) => {
    const a = (v1.x - v2.x);
    const b = (v1.y - v2.y);
    return Math.sqrt( (a * a) +  (b * b));
}

const Manhattan = (v1, v2) => {
    const a = Math.abs(v1.x - v2.x);
    const b = Math.abs(v1.y - v2.y);
    return a + b;
}



export { Euclidiana, Manhattan};
