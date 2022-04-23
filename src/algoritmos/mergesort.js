function merge(arr, left, middle, right)
{
    var n1 = middle - left + 1;
    var n2 = right - middle;
  
    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[middle + 1 + j];
  
    // Merge the temp arrays back into arr[left..right]
  
    // Initial index of first subarray
    var i = 0;
  
    // Initial index of second subarray
    var j = 0;
  
    // Initial index of merged subarray
    var k = left;
  
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
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
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
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
    mergeSort(arr,left,middle);
    mergeSort(arr,middle+1,right);
    merge(arr,left,middle,right);
}

export default mergeSort;