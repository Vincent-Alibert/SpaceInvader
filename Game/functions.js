//randomInt
export function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function mutableRemoveIndex(array, index) {
  if (index >= array.length) {
    console.error("ERROR: mutableRemoveIndex: index is out of range");
    return;
  }

  if (array.length <= 0) {
    console.error("ERROR: mutableRemoveIndex: empty array");
    return;
  }

  array[index] = array[array.length - 1];
  array[array.length - 1] = undefined;

  array.length = array.length - 1;
}
